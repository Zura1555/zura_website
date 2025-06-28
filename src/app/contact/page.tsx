"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Mail, Send } from "lucide-react";

import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const initialState: ContactFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
      {pending ? "Sending..." : "Send Message"}
      <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
      } else if (state.errors) {
        toast({
          title: "Oops!",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

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
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
              {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
              {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={5} required />
              {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
            </div>
            <SubmitButton />
          </form>
        </div>
      </section>
    </div>
  );
}
