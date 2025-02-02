import Image from "next/image";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ticket from "@/public/ticket.png"

function Ticket() {
  return (
    <Image src={ticket} alt='ticket' className="w-full object-cover max-w-md   h-40 text-white flex items-center justify-center rounded-lg shadow-lg overflow-hidden"/>
  );
}

export default Ticket;
