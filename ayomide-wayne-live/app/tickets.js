"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";
import { FaPlus, FaMinus } from "react-icons/fa";

const locations = ["Girne", "Lefkosa", "Magusa", "Iskele", "Lefke", "Guzelyurt"];
const paymentMethods = ["Cash", "Naira Transfer", "TL Transfer"];
const nairaAccounts = [
  { name: "Benjamin Mayowa Oguntoye", number: "0128830047", bank: "GTBank" },
  { name: "Godwin Ayomide Ogu", number: "2088343479", bank: "Zenith Bank" },
];
const tlAccounts = [
  { name: "Isbank", iban: "TRXXXXXX" },
  { name: "Novabank", account: "1234567890" },
  { name: "Garanti Bank", iban: "TRXXXXXX" },
  { name: "Ziraat", iban: "TRXXXXXX" },
  { name: "Neubank", iban: "TRXXXXXX" },
];

export default function Tickets() {
  const [currentTab, setCurrentTab] = useState(1);
  const [ticketType, setTicketType] = useState(null);
  const [payForwardCount, setPayForwardCount] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    attendedBefore: "no",
  });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [timer, setTimer] = useState(1800);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const ticketPrices = {
    free: 0,
    single: 150,
    pay_forward: 150,
  };

  const totalAmount = ticketType === "pay_forward" ? ticketPrices[ticketType] * payForwardCount : ticketPrices[ticketType] || 0;

  useEffect(() => {
    if (isDialogOpen && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isDialogOpen, timer]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTicketBooking = () => {
    if (ticketType) {
      setCurrentTab(2);
    }
  };

  const handleSubmit = () => {
    if (ticketType === "free") {
      // Log everything to the console if the payment method is Free
      console.log("Form Data:", formData);
      console.log("Ticket Type:", ticketType);
      console.log("Total Amount:", totalAmount);
      console.log("Payment Method:", paymentMethod);
      // You can also add more data as needed
  
      // Optionally, handle what happens after logging, like moving to the next step
      setShowConfirmation(true);
    
    } else {
      setShowConfirmation(true);
      setCurrentTab(3); // Proceed to the next tab for non-Free payments
    }
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setIsDialogOpen(true);
    setTimer(1800);
  };

  const handleBack = () => {
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };

  return (
    <section id="tickets" className="container py-8">
      <h2 className="text-2xl font-bold uppercase">Tickets</h2>

      <div className="tabs">
        <span>{currentTab === 1 ? "Step 1: Select Ticket" : currentTab === 2 ? "Step 2: Personal Information" : "Step 3: Payment Method"}</span>
       
      </div>

      {currentTab === 1 && (
        <ul className="my-4 flex flex-col gap-4 max-w-[700px]">
          {["free", "single", "pay_forward"].map((type) => (
            <li key={type}>
              <input
                type="radio"
                name="ticketType"
                value={type}
                id={type}
                className="hidden peer"
                onChange={() => {
                  setTicketType(type);
                  setPayForwardCount(1); 
                }}
                checked={ticketType === type}
              />
              <label
                htmlFor={type}
                className={`cursor-pointer py-4 px-4 border-2 rounded-xl flex flex-col gap-3 ${
                  ticketType === type ? "text-tls-Green border-tls-Green" : "text-gray-400 border-gray-400"
                }`}
              >
                <span className="font-semibold text-xl">
                  {type === "free" ? "Free Ticket" : type === "single" ? "Buy 1 Ticket" : "Pay Forward (Max 10)"}
                </span>
                <span className="flex flex-row justify-between items-center">
                  <span className={ticketType === type ? "text-black" : "text-gray-400"}>
                    {type === "free" ? "0.00TL" : "150TL"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-2 rounded-full ${type === "pay_forward" && payForwardCount > 1 ? "bg-tls-Green text-white" : "bg-gray-200 text-gray-500 "}`}
                      onClick={() => type === "pay_forward" && setPayForwardCount(payForwardCount > 1 ? payForwardCount - 1 : 1)}
                      disabled={type !== "pay_forward" || payForwardCount <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="font-semibold text-lg">
                      {type === "pay_forward" ? payForwardCount : 1}
                    </span>
                    <button
                      className={`p-2 rounded-full ${type === "pay_forward" && payForwardCount < 10 ? "bg-tls-Green text-white" : "bg-gray-200 text-gray-500 "}`}
                      onClick={() => type === "pay_forward" && setPayForwardCount(payForwardCount < 10 ? payForwardCount + 1 : 10)}
                      disabled={type !== "pay_forward" || payForwardCount >= 10}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </span>
              </label>
            </li>
          ))}
          <li className="mt-4 text-lg font-semibold flex justify-between">
            <span>Total Amount:</span>
            <span>{totalAmount} TL</span>
          </li>
          <li className="flex flex-row gap-12">
          
            <button onClick={handleTicketBooking} disabled={!ticketType} className="bg-tls-Green px-4 py-2 rounded-lg font-semibold transition duration-300 text-white hover:bg-black">
              Book Ticket
            </button>
            <button className="bg-tls-Orange px-4 py-2 rounded-lg font-semibold transition duration-300 text-white hover:bg-black" onClick={handleBack} disabled={currentTab === 1}>Back</button>
          </li>
        </ul>
      )}

      {currentTab === 2 && (
       <div className="my-4 grid gap-4 max-w-[700px] ">
       <input
         className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tls-Green focus:border-tls-Green"
         name="name"
         placeholder="Name and Surname"
         onChange={handleInputChange}
       />
       <input
         className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tls-Green focus:border-tls-Green"
         name="email"
         placeholder="Email"
         onChange={handleInputChange}
       />
       <input
         className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tls-Green focus:border-tls-Green"
         name="phone"
         placeholder="Phone Number"
         onChange={handleInputChange}
       />
       <Select
         className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tls-Green focus:border-tls-Green"
         name="location"
         onChange={handleInputChange}
       >
         {locations.map((loc) => (
           <SelectItem key={loc} value={loc}>
             {loc}
           </SelectItem>
         ))}
       </Select>
       <button onClick={handleSubmit} className="w-full py-3 mt-4 bg-tls-Green text-white font-semibold rounded-lg hover:bg-tls-Green/80 focus:outline-none focus:ring-2 focus:ring-tls-Green focus:ring-offset-2">
         Proceed
       </button>
     </div>
     
      )}

{currentTab === 3 && (
  <div className="p-4">
    <h3 className="text-lg font-bold">Select Payment Method</h3>
    
    {/* Radio buttons for payment methods */}
    <div className="my-4">
      {paymentMethods.map((method) => (
        <div key={method} className="flex items-center gap-2">
          <input
            type="radio"
            id={method}
            name="paymentMethod"
            value={method}
            className=" peer"
            onChange={() => setPaymentMethod(method)} // Set payment method when selected
            checked={paymentMethod === method} // Check if selected
          />
          <label
            htmlFor={method}
            className={`cursor-pointer py-2 px-4 ${
              paymentMethod === method
                ? "text-tls-Green "
                : "text-gray-400 ="
            }`}
          >
            {method}
          </label>
        </div>
      ))}
    </div>

    {/* Confirm button */}
    <button className="w-32 py-3 mt-4 bg-tls-Green text-white font-semibold rounded-lg hover:bg-tls-Green/80 focus:outline-none focus:ring-2 focus:ring-tls-Green focus:ring-offset-2"
      onClick={() => {
        if (paymentMethod) {
          setIsDialogOpen(true); // Open dialog when a payment method is selected
        } else {
          alert("Please select a payment method.");
        }
      }}
    >
      Confirm
    </button>
  </div>
)}

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h3>Payment Information</h3>
        {paymentMethod === "Naira Transfer" && nairaAccounts.map((acc, idx) => (
          <p key={idx}>{acc.bank}: {acc.name}, {acc.number}</p>
        ))}
        {paymentMethod === "TL Transfer" && tlAccounts.map((acc, idx) => (
          <p key={idx}>{acc.name}: {acc.iban || acc.account}</p>

          
        ))}
        <p>Time left: {Math.floor(timer / 60)}:{timer % 60}</p>
      </Dialog>

    
    </section>
  );
}
