"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nsuId: "",
    department: "Executive Inquiries",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        nsuId: "",
        department: "Executive Inquiries",
        subject: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="form" className="py-16 bg-white border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="GET IN TOUCH"
          badgeVariant="orange"
          title="CONTACT &"
          highlightText="COMMUNITY"
          highlightColor="purple"
          subtitle="Reach out to chapter executives, propose sponsorship for HackStorm 2026, or submit research collaboration inquiries."
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Campus Details & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <NeoCard
              variant="default"
              shadow="lg"
              className="p-6 sm:p-8 border-[3px] border-black bg-[#f1eee7] space-y-6"
            >
              <div className="border-b-2 border-black pb-4">
                <NeoBadge variant="purple" size="sm">OFFICIAL COMMUNICATIONS</NeoBadge>
                <h3 className="font-heading font-black text-2xl uppercase text-black mt-2">
                  Chapter Headquarters
                </h3>
              </div>

              <div className="space-y-4 font-body text-sm text-black">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-black text-white shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-[#FFDE59]" />
                  </div>
                  <div>
                    <div className="font-display font-black uppercase text-xs">
                      Campus Location
                    </div>
                    <p className="font-medium text-black/80">
                      Room SAC 402 & ECE Innovation Labs, South Academic Building, North South University, Bashundhara R/A, Dhaka-1229
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-black text-white shrink-0 mt-0.5">
                    <Mail className="h-4 w-4 text-[#f47b2b]" />
                  </div>
                  <div>
                    <div className="font-display font-black uppercase text-xs">
                      Direct Email Inquiries
                    </div>
                    <p className="font-medium text-black/80">
                      acm@northsouth.edu • chair@nsuacmsc.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-black text-white shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-[#00D084]" />
                  </div>
                  <div>
                    <div className="font-display font-black uppercase text-xs">
                      Chapter Office Hours
                    </div>
                    <p className="font-medium text-black/80">
                      Sunday – Thursday: 10:00 AM – 06:00 PM (GMT+6)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-black">
                <div className="text-xs font-display font-black uppercase text-black mb-2">
                  Portal Support Hotline:
                </div>
                <div className="p-3 bg-black text-white font-mono text-xs flex items-center justify-between">
                  <span>dash.nsuacmsc.org</span>
                  <span className="text-[#00D084]">● SYSTEM ONLINE</span>
                </div>
              </div>
            </NeoCard>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <NeoCard
              variant="default"
              shadow="lg"
              className="p-6 sm:p-8 border-[3px] border-black bg-white"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mahir Faisal"
                      className="w-full p-2.5 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_#000]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@northsouth.edu"
                      className="w-full p-2.5 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_#000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* NSUID */}
                  <div>
                    <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                      NSUID / Student ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.nsuId}
                      onChange={(e) => setFormData({ ...formData, nsuId: e.target.value })}
                      placeholder="e.g. 2112903042"
                      className="w-full p-2.5 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_#000]"
                    />
                  </div>

                  {/* Department Routing */}
                  <div>
                    <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                      Target Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full p-2.5 bg-[#f1eee7] border-2 border-black font-display font-bold text-xs uppercase focus:outline-none focus:bg-white"
                    >
                      <option value="Executive Inquiries">Executive Committee</option>
                      <option value="HackStorm Sponsorship">HackStorm 2026 Sponsorship</option>
                      <option value="SIG Research Cohort">SIG Research / Lab Collaboration</option>
                      <option value="Portal & Technical Help">Portal Technical Support</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                    Subject / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your message..."
                    className="w-full p-2.5 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your detailed inquiry or collaboration proposal here..."
                    className="w-full p-2.5 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <NeoButton
                    type="submit"
                    variant="orange"
                    size="lg"
                    className="w-full shadow-[4px_4px_0px_0px_#000]"
                  >
                    <span>Transmit Message</span>
                    <Send className="h-4 w-4" />
                  </NeoButton>
                </div>

                {submitted && (
                  <div className="mt-4 p-3 bg-[#00D084] border-2 border-black font-display font-black text-xs uppercase text-black flex items-center gap-2 shadow-[3px_3px_0px_0px_#000]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Message received! Our secretarial team will reply within 24 business hours.</span>
                  </div>
                )}
              </form>
            </NeoCard>
          </div>
        </div>
      </div>
    </section>
  );
};
