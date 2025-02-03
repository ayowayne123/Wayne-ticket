"use client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import gtLogo from "@/public/Banks/GtLogo.png"
import zenithLogo from "@/public/Banks/Zenith.png"
import garantiLogo from "@/public/Banks/Garanti.png"
import novaLogo from "@/public/Banks/Nova.png"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Toaster } from "react-hot-toast";


export default function Tickets() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(1);
  const [ticketType, setTicketType] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const locations = ["Girne", "Lefkosa", "Magusa", "Iskele", "Lefke", "Guzelyurt"];
const paymentMethods = ["Cash", "Naira Transfer", "TL Transfer"];
const nairaAccounts = [
  { name: "Benjamin Mayowa Oguntoye", number: "0128830047", bank: "GTBank", logo: gtLogo },
  { name: "Godwin Ayomide Ogu", number: "2088343479", bank: "Zenith Bank" , logo: zenithLogo},
];
const tlAccounts = [
  { name: "Eniola Akinloluwa Sowunmi ", account: "700087269",bank: "NovaBank", logo: novaLogo },
  { name: "Benjamin Mayowa Oguntoye", iban: "TR41 0006 2000 4930 0006 6451 22",bank: "Garanti", logo: garantiLogo },
  // { name: "Garanti Bank", iban: "TRXXXXXX" },
  // { name: "Ziraat", iban: "TRXXXXXX" },
  // { name: "Neubank", iban: "TRXXXXXX" },
];
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
    setFormData({ ...formData, [e.target.name]: e.target.selectedValue || e.target.value });
  };

  const handleTicketBooking = () => {
    if (ticketType) {
      setCurrentTab(2);
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading state to true before starting the process
  
    if (!formData.name || !formData.email || !formData.phone ) {
      alert('Please fill in all fields before submitting.');
      setLoading(false); // Set loading state to false if validation fails
      return;
    }
    console.log(formData)
  
    if (ticketType === "free") {
      const requestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        location: formData.location || "Girne",
        numberOfTickets: 1,
        paymentType: "free",
      };
  
      try {
        const response = await fetch('https://api.thelisteningsheeptickets.live/api/tickets/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        const data = await response.json();
  
        console.log('Response from server:', data);
  
        if (response.ok) {
          setShowConfirmation(true);
          router.push(`/ticket-confirmation/${data.data.referenceNumber}`);
        } else {
          console.error('Failed to book ticket:', data);
        }
      } catch (error) {
        console.error('Error occurred during booking:', error);
      } finally {
        setLoading(false); // Set loading state to false after the request completes
      }
    } else {
      setLoading(false); // Set loading to false if not 'free' ticket type
      setCurrentTab(3);
    }
  };
  
  

  const handlePaidTickets = async () => {
   
      const requestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        location: formData.location || "Girne",
        numberOfTickets: payForwardCount || 1,
        paymentType: "paid",
      };
      setIsProcessing(true);
      try {
        const response = await fetch('https://api.thelisteningsheeptickets.live/api/tickets/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        const data = await response.json();
  
        // Log the response to the console
        console.log('Response from server:', data);
  
        // Handle successful response
        if (response.ok) {
          setShowConfirmation(true); // Show confirmation after a successful booking
          router.push(`/ticket-pending/${data.data.referenceNumber}`);
          setIsProcessing(false);
        } else {
          console.error('Failed to book ticket:', data);
        }
      } catch (error) {
        console.error('Error occurred during booking:', error);
      }
    }
 
  

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
      <div><Toaster/></div>
      <h2 className="lg:text-2xl text-xl font-bold uppercase pb-6">Tickets</h2>

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
                className={`cursor-pointer lg:py-4 lg:px-4 px-2 py-2 lg:text-base text-sm border-2 rounded-xl flex flex-col gap-3 ${
                  ticketType === type ? "text-tls-Green border-tls-Green" : "text-gray-400 border-gray-400"
                }`}
              >
                <span className="font-semibold lg:text-xl">
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
      <select
    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tls-Green focus:border-tls-Green"
    name="location"
    onChange={handleInputChange}
  >
    {locations.map((loc) => (
      <option key={loc} value={loc}>
        {loc}
      </option>
    ))}
  </select>
  <div className="my-4">
    <label className="block text-gray-700">Have you ever attended a Spoken Word event?</label>
    <div className="flex space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="attendedBefore"
          value="yes"
          onChange={handleInputChange}
          className="form-radio"
        />
        <span className="ml-2">Yes</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="attendedBefore"
          value="no"
          onChange={handleInputChange}
          className="form-radio"
        />
        <span className="ml-2">No</span>
      </label>
    </div>
    </div>
    <button
  onClick={handleSubmit}
  className="w-full py-3 mt-4 bg-tls-Green text-white font-semibold rounded-lg hover:bg-tls-Green/80 focus:outline-none focus:ring-2 focus:ring-tls-Green focus:ring-offset-2"
  disabled={loading}
>
  {loading ? (
    <div className="flex justify-center items-center">
      <div className="w-4 h-4 border-4 border-t-transparent border-solid border-white rounded-full animate-spin"></div>
    </div>
  ) : (
    'Proceed'
  )}
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
        if (paymentMethod === "Naira Transfer" || paymentMethod === "TL Transfer") {
          setIsDialogOpen(true); // Open dialog when a payment method is selected
        }
        else if (paymentMethod === "Cash"){
handlePaidTickets();
        }
        else {
          alert("Please select a payment method.");
        }
      }}
    >
      Confirm
    </button>
  </div>
)}
{
    (currentTab === 2 || currentTab === 3) && (
        <button
            className="bg-tls-Orange px-4 py-2 rounded-lg font-semibold transition duration-300 text-white hover:bg-black"
            onClick={handleBack}
            disabled={currentTab === 1}
        >
            Back
        </button>
    )
}


<Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
  <div className="flex flex-col md:flex-row w-full p-2 lg:p-4">
    
    {/* Left Column - List of Banks */}
    <div className="w-full md:w-1/3 border-r border-gray-300 p-2 lg:p-4">
     
      <div className="mt-4">
        {paymentMethod === "Naira Transfer" ? (
          <p className="font-medium">
            Total: <span className="text-gray-700">₦{totalAmount*48}</span>
          </p>
        ) : (
          <p className="font-medium">
            Total: <span className="text-gray-700">{totalAmount} TL</span>
          </p>
        )}
      </div>
      <h3 className="lg:text-lg  font-semibold mb-4">Pay With</h3>
      
      {paymentMethod === "Naira Transfer" &&
        nairaAccounts.map((acc, idx) => (
          <button
            key={idx}
            className={`w-full flex lg:flex-col flex-row items-start gap-2 p-3 border rounded-lg mb-2 
              ${selectedBank?.number === acc.number ? "border-green-500 bg-green-100" : "border-gray-300"}`}
            onClick={() => setSelectedBank(acc)}
          >
            {/* Bank Logo & Name */}
            <div className="flex items-center w-full gap-4">
              <div className="bg-slate-300 h-12 w-12 flex items-center justify-center rounded-md">
                <Image src={acc.logo} width={32} height={32} className="object-contain" alt="Bank Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{acc.bank}</span>
              </div>
            </div>
          </button>
        ))}

{paymentMethod === "TL Transfer" &&
              tlAccounts.map((acc, idx) => (
                <button
            key={idx}
            className={`w-full flex flex-col items-start gap-2 p-3 border rounded-lg mb-2 
              ${selectedBank?.account === acc.account || selectedBank?.iban === acc.iban ? "border-green-500 bg-green-100" : "border-gray-300"}`}
            onClick={() => setSelectedBank(acc)}
          >
            {/* Bank Logo & Name */}
            <div className="flex items-center w-full gap-4">
              <div className=" h-16 w-16 flex items-center justify-center rounded-md">
                <Image src={acc.logo} width={60} height={32} className="object-contain" alt="Bank Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{acc.bank}</span>
              </div>
            </div>
          </button>
              ))} 
        
    </div>

    {/* Right Column - Selected Bank Details */}
    <div className="w-full md:w-2/3 p-4">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>

      {selectedBank ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{selectedBank.bank || selectedBank.name}</h2>
          
          {/* Name & Copy */}
          {selectedBank.name && (
            <div className="flex justify-between items-center mt-2">
              <p className="font-medium">Name: <span className="text-gray-700">{selectedBank.name}</span></p>
              <FaCopy 
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(selectedBank.name);
                  toast("Copied to clipboard!", {
                    position: "bottom-center",
                    duration: 1200, // Duration should be inside the same object
                  });
                }}
              />
            </div>
          )}

          {/* Account Number & Copy */}
          {selectedBank.number && (
            <div className="flex justify-between items-center mt-2">
              <p className="font-medium">Account Number: <span className="text-gray-700">{selectedBank.number}</span></p>
              <FaCopy 
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(selectedBank.number);
                  toast("Copied to clipboard!", {
                    position: "bottom-center",
                    duration: 1200, // Duration should be inside the same object
                  });
                }}
              />
            </div>
          )}

          {/* Account Number & Copy */}
{selectedBank?.account && (
  <div className="flex justify-between items-center mt-2">
    <p className="font-medium">Account Number: <span className="text-gray-700">{selectedBank.account}</span></p>
    <FaCopy 
      className="cursor-pointer text-gray-500 hover:text-gray-700"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(selectedBank.account);
        toast("Copied to clipboard!", {
          position: "bottom-center",
          duration: 1200, // Duration should be inside the same object
        });
      }}
    />
  </div>
)}

{/* IBAN (if available) */}
{selectedBank?.iban && (
  <div className="flex justify-between items-center mt-2">
    <p className="font-medium">IBAN: <span className="text-gray-700">{selectedBank.iban}</span></p>
    <FaCopy 
      className="cursor-pointer text-gray-500 hover:text-gray-700"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(selectedBank.iban);
        toast("Copied to clipboard!", {
          position: "bottom-center",
          duration: 1200, // Duration should be inside the same object
        });
      }}
    />
  </div>
)}
        </div>
      ) : (
        <p className="text-gray-500">Select a bank to see details</p>
      )}
    </div>
  </div>

  {/* Timer & Confirm Button */}
  <div className="p-4 border-t mt-4 flex justify-between items-center">
    <p className="text-red-500">Time left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</p>
    <Button onClick={handlePaidTickets} className="bg-emerald-800 p-4 text-white">
    {isProcessing ? (
    <div className="flex justify-center items-center">
      <div className="w-4 h-4 border-4 border-t-transparent border-solid border-white rounded-full animate-spin"></div>
    </div>
  ) : (
    "Confirm"
  )}
    </Button>
  </div>
</Dialog>


    
    </section>
  );
}
