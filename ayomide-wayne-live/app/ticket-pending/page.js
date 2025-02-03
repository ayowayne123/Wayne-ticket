"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const TicketPending = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Ticket Pending</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your ticket has not been confirmed yet. It seems like the payment hasn't been processed or confirmed.
      </p>
      <p className="text-md text-gray-600 mb-6">
        Please check back later or contact support for more details.
      </p>
      <button 
        onClick={() => router.push('/')} 
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}

export default TicketPending;
