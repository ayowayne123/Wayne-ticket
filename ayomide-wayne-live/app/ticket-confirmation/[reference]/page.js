"use client"
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import ticket from "@/public/ticket.png"

export default function TicketBooked({ params }) {
    const router = useRouter();
    const ticketReference = use(params).reference;
    const [ticketData, setTicketData] = useState(null);
    const eventDetails = {
        name: "The Listening Sheep - A SPOKEN-WORD WORSHIP EXPERIENCE",
        date: "Tuesday, February 11, 2024",
        time: "5:30 PM ",
        venue: "BKM Mutfak, Terminal, Lefkosa",
        contact: "+90 533 876 7745",
    };

    useEffect(() => {
        async function fetchTicket() {
            try {
                const response = await fetch(`https://api.thelisteningsheeptickets.live/api/tickets/${ticketReference}`);
                const data = await response.json();
                if (data.success && data.data.status==="confirmed") {
                    setTicketData(data.data);
                } 
                else if (data.success && data.data.status==="pending"){
                    router.push("/ticket-pending");
                }
                else {
                    router.push("/404");
                }
            } catch (error) {
                console.error("Error fetching ticket details:", error);
                router.push("/404");
            }
        }
        fetchTicket();
    }, [ticketReference, router]);
    const downloadTicket = async () => {
        if (!ticketData) return;
        const doc = new jsPDF();

        const img = new Image();

        img.src = ticket.src;
        
        img.onload = function () {
            // Set up the document content
            const ticketIndex = parseInt(ticketData.ticketNumber.substring(3)); // Extract the numeric part, e.g., 4
                const seatNumber = ticketIndex.toString().padStart(3, '0'); 
            doc.setFontSize(16);
            doc.text("Ticket Confirmation", 20, 20);
            
            // Add the image at the top (adjust the size and position as needed)
            doc.setFontSize(12);
            doc.text(`This is your ticket with Reference Number : ${ticketData.referenceNumber}`, 20, 30); 
            doc.text(`Seat Number: ${seatNumber}`, 20, 35);
            doc.addImage(img, "PNG", 20, 40, 170, 60); // Move image just below the title
            
            // Add a description
            doc.text(`Name: ${ticketData.name}`, 20, 110);
            doc.text(`Email: ${ticketData.email}`, 20, 120);
            doc.text(`Phone: ${ticketData.phoneNumber}`, 20, 130);
            doc.text(`This Ticket Admits one person`, 20, 140);
            doc.text(`Ticket Number: ${ticketData.ticketNumber}`, 20, 150);
   
        
            // Save the document
            doc.save(`Ticket-${ticketData.referenceNumber}.pdf`);
    };
};

    if (!ticketData) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
            <div className="  p-6 container text-center">
                <h1 className="text-2xl font-bold text-green-600">Ticket Successfully Booked!  </h1>
                <p className="text-gray-700 mt-2">Dear {ticketData.name.split(" ")[0]}, Thank you for reserving your spot at <span className="font-semibold">{eventDetails.name}</span>.</p>
                <p className="text-gray-700">Please come prepared with a listening heart and share to your friends/family also</p>
                
                <div className="mt-4 border-t pt-4 text-left">
                    <h2 className="text-lg font-semibold">Event Details:</h2>
                    <p><strong>Date:</strong> {eventDetails.date}</p>
                    <p><strong>Time:</strong> {eventDetails.time}</p>
                    <p><strong>Venue:</strong> {eventDetails.venue}</p>
                    <p><strong>Contact:</strong> {eventDetails.contact}</p>
                </div>

                <div className="mt-4 bg-gray-200 p-3 rounded-lg max-w-sm">
                    <p className="font-semibold">Your Ticket Reference:</p>
                    <p className="text-lg font-bold text-tls-Orange">{ticketData.referenceNumber}</p>
                </div>
                


                <p className="mt-4 text-gray-600">Check your email for further details.</p>

                <button  onClick={downloadTicket} className="mt-4 px-6 py-2 bg-tls-Green text-white rounded-lg hover:bg-black transition">
                    Download Ticket 
                </button>
            </div>
        </div>
    );
}

