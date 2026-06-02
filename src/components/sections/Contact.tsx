"use client";

import { useState } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitBtnRef = useMagneticEffect(0.2) as React.RefObject<HTMLButtonElement | null>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please check your connection.");
    }
  };

  return (
    <section className="mt-section-gap mb-section-gap flex flex-col items-center w-full reveal-section" id="contact">
      <div className="text-center mb-stack-lg">
        <h2 className="font-headline-xl text-headline-xl mb-stack-sm text-on-surface">Get In Touch</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Let's build something extraordinary together. Whether you have a project in mind or just want to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full max-w-5xl">
        {/* Contact Form */}
        <div className="md:col-span-7 glass-card rounded-xl p-stack-lg relative overflow-hidden">
          {formSubmitted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md rounded-xl p-6 z-20 text-center transition-all animate-fade-in">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 animate-bounce">
                check_circle
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Message Sent Successfully!</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Thank you for reaching out! I will get back to you as soon as possible.
              </p>
            </div>
          ) : null}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-surface-container-lowest/50 border border-primary/10 rounded-lg px-4 py-3 text-on-surface placeholder-transparent focus:border-primary focus:outline-none transition-all"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-3 text-on-surface-variant/70 text-sm pointer-events-none transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-1.5"
                >
                  Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-surface-container-lowest/50 border border-primary/10 rounded-lg px-4 py-3 text-on-surface placeholder-transparent focus:border-primary focus:outline-none transition-all"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-3 text-on-surface-variant/70 text-sm pointer-events-none transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-1.5"
                >
                  Email
                </label>
              </div>
            </div>

            <div className="relative group">
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder=" "
                className="peer w-full bg-surface-container-lowest/50 border border-primary/10 rounded-lg px-4 py-3 text-on-surface placeholder-transparent focus:border-primary focus:outline-none transition-all"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 top-3 text-on-surface-variant/70 text-sm pointer-events-none transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-1.5"
              >
                Subject
              </label>
            </div>

            <div className="relative group">
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder=" "
                className="peer w-full bg-surface-container-lowest/50 border border-primary/10 rounded-lg px-4 py-3 text-on-surface placeholder-transparent focus:border-primary focus:outline-none transition-all resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-on-surface-variant/70 text-sm pointer-events-none transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-1.5"
              >
                Message
              </label>
            </div>

            <button
              ref={submitBtnRef}
              className="w-full bg-primary text-on-primary font-headline-md text-headline-md py-4 rounded-lg mt-stack-sm shadow-[0_0_15px_rgba(155,202,255,0.4)] hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
              type="submit"
            >
              Send Message
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

        {/* Socials & Info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-xl p-stack-lg border border-primary/10 hover:border-primary/30">
            <h3 className="font-headline-md text-headline-md mb-stack-md text-on-surface font-bold">Connect</h3>
            <div className="flex flex-col gap-4">
              <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5 group" href="mailto:kibriyaamit17@gmail.com">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/30 group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <span className="font-body-md text-body-md">kibriyaamit17@gmail.com</span>
              </a>
              <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5 group" href="https://github.com/kibriya41">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/30 group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <span className="font-body-md text-body-md">GitHub</span>
              </a>
              <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5 group" href="#">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/30 group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <span className="font-body-md text-body-md">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="glass-card rounded-xl p-stack-lg relative overflow-hidden border border-tertiary/10 hover:border-tertiary/30 group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md mb-stack-sm text-primary font-bold">Availability</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">Currently open to new opportunities and freelance projects starting next month.</p>
              <div className="flex items-center gap-2 text-tertiary font-label-md text-label-md">
                <span className="material-symbols-outlined animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Fast Response Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
