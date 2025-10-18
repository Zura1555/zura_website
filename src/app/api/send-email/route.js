// File: app/api/send-email/route.js

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  console.log('API route called');
  const { name, email, message } = await req.json();

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
  }

  // Email validation function (server-side)
  const validateEmail = (email) => {
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
    const isPersonalDomain = personalDomains.includes(domain);
    
    return allowedDomains.includes(domain) || (!isPersonalDomain && domain && domain.includes('.'));
  };

  // Validate email format and domain
  if (!validateEmail(email)) {
    return NextResponse.json({ 
      message: 'Please use a Gmail account (@gmail.com) or a valid work email address.' 
    }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'contact@zura.id.vn', // Your verified domain
      to: ['contact@zura.id.vn'], // YOUR NEW EMAIL ADDRESS
      subject: `New Message from ${name} on your Website`,
      reply_to: email, // Set the reply-to field to the user's email
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}