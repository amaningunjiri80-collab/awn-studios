"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";

function BookingContent() {
  const searchParams = useSearchParams();
  const shootType = searchParams.get("type") || "";

  return (
    <div className="max-w-[600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
          Booking
        </span>
        <h1 className="text-3xl md:text-4xl font-light text-white mb-4">
          Check Availability
        </h1>
        <p className="text-[#A0A0A0] text-sm">
          Tell us about your shoot and we&apos;ll confirm availability within
          24 hours.
        </p>
      </motion.div>
      <BookingForm shootType={shootType} />
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12 min-h-screen">
      <Suspense fallback={<div className="text-center text-[#A0A0A0] pt-20">Loading...</div>}>
        <BookingContent />
      </Suspense>
    </div>
  );
}
