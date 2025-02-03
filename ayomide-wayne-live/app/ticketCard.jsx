import Image from "next/image";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ticket from "@/public/ticket.png"

function Ticket() {
  return (
    <div className="relative lg:h-40 w-[300px] sm:w-[350px] h-36 lg:w-[460px]">

<Image src={ticket} alt='ticket' fill className="w-full object-contain   text-white flex items-center justify-center rounded-lg shadow-lg overflow-hidden"/>
    </div>
    
  );
}

export default Ticket;
