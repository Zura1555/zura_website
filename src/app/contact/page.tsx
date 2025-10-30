"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { toast } = useToast();

  // Email validation function
  const validateEmail = (email: string) => {
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
      'company.com', // Add more work domains as needed
      'microsoft.com',
      'google.com',
      'apple.com',
      'amazon.com',
      'meta.com',
      'netflix.com',
      'linkedin.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    
    // Allow gmail.com specifically or any domain that looks like a work email (contains a dot and isn't a common personal domain)
    if (domain === 'gmail.com') return true;
    
    // For work emails, check if it's in our allowed list or if it looks like a corporate domain
    // (not a common personal email provider)
    const personalDomains = ['yahoo.com', 'hotmail.com', 'aol.com', 'live.com'];
    const isPersonalDomain = personalDomains.includes(domain);
    
    return allowedDomains.includes(domain) || (!isPersonalDomain && Boolean(domain) && domain.includes('.'));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Double-check email validation before submission
    if (!isEmailValid || !email) {
      toast({
        title: "Invalid Email",
        description: "Please use a Gmail account (@gmail.com) or a valid work email address",
        variant: "destructive",
      });
      return;
    }
    
    setStatus('Sending...');
    setLoading(true);

    const formData = {
      name: (event.target as any).name.value,
      email: (event.target as any).email.value,
      message: (event.target as any).message.value,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
        toast({
          title: "Success!",
          description: data.message,
        });
        (event.target as any).reset();
      } else {
        setStatus('Sorry, an error occurred.');
        toast({
          title: "Oops!",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus('Sorry, an error occurred.');
      toast({
        title: "Oops!",
        description: "Failed to send message.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 sm:py-12 px-4 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Get In Touch</h1>
        <p className="mt-3 sm:mt-4 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
          Have a project in mind, a question, or just want to say hello? I'd love to hear from you.
        </p>
      </section>

      <section className="mt-12 sm:mt-16 mx-auto max-w-lg">
        <div className="rounded-lg border bg-card p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@gmail.com or work email"
                value={email}
                onChange={handleEmailChange}
                required
                aria-invalid={email && !isEmailValid ? "true" : "false"}
                aria-describedby={email && !isEmailValid ? "email-error" : undefined}
                className={email && !isEmailValid ? "border-red-500 focus:border-red-500" : ""}
              />
              {email && !isEmailValid && (
                <p id="email-error" role="alert" className="text-sm text-red-500">
                  Please use a Gmail account (@gmail.com) or a valid work email address
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows={5}
                required
                aria-required="true"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !isEmailValid || !email}
              className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={loading ? "Sending message" : "Send message"}
            >
              {loading ? "Sending..." : "Send Message"}
              <Send className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            {status && (
              <p className="text-sm text-center" role="status" aria-live="polite">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
