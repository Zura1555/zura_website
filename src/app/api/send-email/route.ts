import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Email validation function (server-side)
function validateEmail(email: string): boolean {
  if (!email) return false;

  // Check for valid email format first
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  // Check for allowed domains (gmail.com or common work email domains)
  const allowedDomains = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'company.com',
    'microsoft.com',
    'google.com',
    'apple.com',
    'amazon.com',
    'meta.com',
    'netflix.com',
    'linkedin.com'
  ];

  const domain = email.split('@')[1]?.toLowerCase();

  // Allow gmail.com specifically or any domain that looks like a work email
  if (domain === 'gmail.com') return true;

  // For work emails, check if it's in our allowed list or if it looks like a corporate domain
  const personalDomains = ['yahoo.com', 'hotmail.com', 'aol.com', 'live.com'];
  const isPersonalDomain = personalDomains.includes(domain || '');

  return allowedDomains.includes(domain || '') || (!isPersonalDomain && Boolean(domain) && domain.includes('.'));
}

export async function POST(req: NextRequest) {
  logger.info('Contact form API route called');

  try {
    // Rate limiting: 5 requests per minute per IP
    const clientIp = getClientIp(req);
    const rateLimitResult = rateLimit(clientIp, {
      interval: 60000, // 1 minute
      maxRequests: 5,
    });

    if (!rateLimitResult.success) {
      const resetInSeconds = Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000);
      logger.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        {
          message: `Too many requests. Please try again in ${resetInSeconds} seconds.`,
          resetAt: rateLimitResult.resetAt
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
            'Retry-After': resetInSeconds.toString(),
          }
        }
      );
    }

    const body = await req.json() as ContactFormData;
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format and domain
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'Please use a Gmail account (@gmail.com) or a valid work email address.' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const fromEmail = process.env.CONTACT_EMAIL_FROM;
    const toEmail = process.env.CONTACT_EMAIL_TO;

    if (!fromEmail || !toEmail) {
      logger.error('Email configuration is missing');
      return NextResponse.json(
        { message: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Send email
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Message from ${name} on your Website`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    logger.info(`Contact form submission from ${name} (${email}) processed successfully`);
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
        }
      }
    );

  } catch (error) {
    logger.error('Failed to process contact form:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
