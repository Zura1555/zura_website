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