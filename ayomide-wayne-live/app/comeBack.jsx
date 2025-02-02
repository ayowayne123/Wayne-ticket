"use client"

import { useState, useEffect } from "react";
import { FaTicketAlt, FaUserAlt, FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import ticketImage from "@/public/ticket.png";

const ComeBack = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const targetDate = new Date("2025-02-03T00:00:00"); 
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft("Tickets are now available! 🎉");
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#2e420d] to-[#aacb56]">
      <div className="bg-[#2e420d] text-[#e5e5e5] p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-6">The Listening Sheep: Coming Soon! 🚀</h1>
        <p className="text-lg mb-6">
          Get ready for "The Listening Sheep" event. Tickets will be available soon! Come back tomorrow to grab yours!
        </p>

        <div className="flex justify-center mb-6">
          <Image src={ticketImage} alt="Event Ticket" className="w-80 h-40 rounded-md shadow-md object-contain" />
        </div>

        {/* Countdown Timer */}
        {timeLeft && (
          <div className="bg-[#9ca386] text-[#2e420d] p-6 rounded-lg shadow-xl mb-6">
            <h2 className="text-2xl font-semibold">Countdown to Tickets</h2>
            <p className="text-lg">{timeLeft}</p>
          </div>
        )}

        {/* Volunteer Link */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScjygvLnZ_ZBurjvXmLS8AH6i_z6iBE3A0uORPts2ewlJV8Dw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#53fb3b] text-[#2e420d] py-3 px-6 rounded-lg font-semibold mb-6 inline-block hover:bg-[#b3b3b3] transition duration-300"
        >
          <FaUserAlt className="inline-block mr-2" />
          Become a Volunteer
        </a>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 text-2xl mb-6">
          <a
            href="https://instagram.com/ayomide_wayne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e5e5e5] hover:text-[#aacb56] transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/+905338767745?text=Hi%20AY,%20I%27d%20like%20to%20know%20more%20about%20The%20Listening%20Sheep"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e5e5e5] hover:text-[#aacb56] transition duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://twitter.com/ayomide_wayne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e5e5e5] hover:text-[#aacb56] transition duration-300"
          >
            <FaTwitter />
          </a>
        </div>

        <footer className="mt-6 text-[#e5e5e5]">
          <p className="font-semibold">
            Tickets go live tomorrow – don’t miss out! 🎉
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ComeBack;
