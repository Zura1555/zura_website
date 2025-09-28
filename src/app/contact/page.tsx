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
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
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
    <div className="container mx-auto max-w-5xl py-12 px-4 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Get In Touch</h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          Have a project in mind, a question, or just want to say hello? I'd love to hear from you.
        </p>
      </section>

      <section className="mt-16 mx-auto max-w-lg">
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={5} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90">
              {loading ? "Sending..." : "Send Message"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
            {status && <p className="text-sm text-center">{status}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
