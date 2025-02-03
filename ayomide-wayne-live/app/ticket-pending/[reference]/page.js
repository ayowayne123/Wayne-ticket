"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


export default function TicketPending({ params }) {
    const router = useRouter();
    const ticketReference = use(params).reference;
    const [ticketData, setTicketData] = useState(null);
    const eventDetails = {
        name: "The Listening Sheep - A SPOKEN-WORD WORSHIP EXPERIENCE",
        date: "Tuesday, February 11, 2024",
        time: "5:30 PM",
        venue: "BKM Mutfak, Terminal, Lefkosa",
        contact: "+90 533 876 7745",
    };

    useEffect(() => {
        async function fetchTicket() {
            try {
                const response = await fetch(`https://api.thelisteningsheeptickets.live/api/tickets/${ticketReference}`);
                const data = await response.json();
                if (data.success && data.data.status === "pending") {
                    setTicketData(data.data);
                } else {
                    router.push("/404");
                }
            } catch (error) {
                console.error("Error fetching ticket details:", error);
                router.push("/404");
            }
        }
        fetchTicket();
    }, [ticketReference, router]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(ticketReference);
        toast('Ticket reference copied to clipboard!');
    };

    if (!ticketData) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
            <Toaster/>
            <div className="p-6 container text-center">
                <h1 className="text-2xl font-bold text-yellow-600">Ticket Pending</h1>
                <p className="text-gray-700 mt-2">
                    Dear {ticketData.name.split(" ")[0]}, your ticket is still pending..
                </p>
                <p className="text-gray-700 mt-2">
                    Once your payment is confirmed, you will receive a confirmation email with your official ticket.
                </p>
                <div className="mb-4">
                        <span className="font-semibold text-gray-700">Your Ticket Reference:</span>
                        <div className="mt-2 text-lg font-semibold text-gray-800">{ticketReference}</div>
                        <button
                            onClick={copyToClipboard}
                            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Copy Reference
                        </button>
                    </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">What to do next:</h2>
                    <ul className="list-disc pl-6 mt-2 text-left text-gray-700 ">
                        <li>Make sure your payment has been successfully completed.</li>
                        <li className="pt-5 leading-[150%]">
                            If payment is completed, please send a screenshot of payment alongside your reference number to <Link href="https://www.instagram.com/thelisteningsheep/"
                                target="_blank"
                                rel="noopener noreferrer" className="font-semibold text-black p-2 text-sm rounded bg-purple-500 text-white hover:bg-black">@thelisteningsheep</Link> on Instagram or via WhatsApp: 
                                <Link href="https://wa.me/905338767745"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-black p-2 my-2 text-sm rounded bg-green-500 text-white hover:bg-black">+905338767745</Link>.
                        </li>
                        <li className="pt-5 text-gray-700 leading-[150%]">If you selected cash payment, please send your ticket reference number to request information on how to meet up on   <Link href="https://wa.me/905338767745"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-black p-2 my-2 text-sm rounded bg-green-500 text-white hover:bg-black">+905338767745</Link>.</li>
                    </ul>
                </div>

                <div className="mt-6 bg-gray-200 p-3 rounded-lg max-w-sm mx-auto">
                    <p className="font-semibold">Once payment is confirmed, you will receive an email with your ticket details.</p>
                </div>

                <div className="mt-6">
                  

                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
