"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function TicketManagement() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        const response = await fetch("https://api.thelisteningsheeptickets.live/api/tickets"); // Fetch all tickets
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const confirmTicket = async (referenceNumber) => {
    try {
      const response = await fetch("https://api.thelisteningsheeptickets.live/api/tickets/payment-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceNumber,
          status: "confirmed",
        }),
      });

      if (response.ok) {
        toast.success("Ticket confirmed successfully!");
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.referenceNumber === referenceNumber
              ? { ...ticket, status: "confirmed" }
              : ticket
          )
        );
      } else {
        toast.error("Failed to confirm ticket.");
      }
    } catch (error) {
      console.error("Error confirming ticket:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-2xl font-semibold mb-4">Ticket Management</h1>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Reference</th>
              <th className="border border-gray-300 px-4 py-2">Ticket Type</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.referenceNumber} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{ticket.name}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.email}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.referenceNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.ticketType}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    ticket.status === "confirmed" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {ticket.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ticket.status === "pending" && (
                    <button
                      onClick={() => confirmTicket(ticket.referenceNumber)}
                      className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
