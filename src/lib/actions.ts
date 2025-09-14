"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Here, you would typically send an email using a service like Resend, SendGrid, or Nodemailer.
  // For this example, we'll just log the data to the console.
  console.log("Contact form submitted successfully:");
  console.log(validatedFields.data);

  return {
    message: "Thank you for your message! I'll get back to you soon.",
    success: true,
  };
}
