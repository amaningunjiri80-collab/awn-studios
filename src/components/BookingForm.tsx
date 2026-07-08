"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BookingFormProps {
  shootType?: string;
}

export default function BookingForm({ shootType = "" }: BookingFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    shoot_type: shootType,
    date: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", shoot_type: "", date: "", location: "", message: "" });
      }
    } catch {
      console.error("Booking submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-[#111] border border-white/5 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-lg font-light text-white mb-2">Request Sent!</h3>
        <p className="text-sm text-[#A0A0A0]">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          placeholder="Name *"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
        />
        <select
          name="shoot_type"
          value={form.shoot_type}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
        >
          <option value="">Select shoot type</option>
          <optgroup label="Sports — Individual">
            <option value="Photo Coverage">Photo Coverage</option>
            <option value="Video Mix">Video Mix</option>
            <option value="Photo + Video Combo">Photo + Video Combo</option>
          </optgroup>
          <optgroup label="Sports — Team">
            <option value="Team Game Coverage">Team Game Coverage</option>
            <option value="Team Highlight Video">Team Highlight Video</option>
            <option value="Team Combo">Team Combo</option>
          </optgroup>
          <optgroup label="Lifestyle">
            <option value="Mini Session">Mini Session</option>
            <option value="Standard Session">Standard Session</option>
            <option value="Extended Session">Extended Session</option>
            <option value="Couples (1 hr)">Couples (1 hr)</option>
          </optgroup>
          <optgroup label="Birthday & Studio Sessions">
            <option value="Studio Session">Studio Session</option>
            <option value="Party Coverage (3 hr)">Party Coverage (3 hr)</option>
            <option value="Party Coverage (5 hr, incl. BTS)">Party Coverage (5 hr, incl. BTS)</option>
          </optgroup>
          <optgroup label="Custom">
            <option value="Custom Project">Custom Project</option>
          </optgroup>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>
      <textarea
        name="message"
        rows={3}
        placeholder="Tell us about your project..."
        value={form.message}
        onChange={handleChange}
        className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors resize-none"
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 text-xs tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all disabled:opacity-50"
      >
        {loading ? "Sending..." : "Check Availability"}
      </motion.button>
    </form>
  );
}
