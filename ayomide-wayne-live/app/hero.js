import Link from "next/link";
import { FaRegCalendar,FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Ticket from "./ticketCard";

function Hero (){
return(
    <div className="bg-gradient-to-b from-emerald-300 to-white pt-24">
        <div className="grid grid-cols-2 container mt-8 mb-8">
         <div>
            <h1 className="text-4xl font-black uppercase py-4">The Listening Sheep</h1>
            <p>Live Spoken-Word and Worship Event by <span className="text-emerald-600 font-bold uppercase">Ayomide Wayne</span></p>
            <div className="pb-4 pt-4 flex gap-2"><span className="text-emerald-700  font-bold text-xl"><FaRegCalendar /></span>
            <span>Tue Feb 11, 2025</span>
            </div>
            <div className="pb-4 flex gap-2"><span className="text-emerald-600 font-bold text-xl"><FaRegClock /></span>
            <span>05:30 PM</span>
            </div>
            <div className="pb-4 flex gap-2"><span className="text-emerald-600 font-bold text-xl"><FaLocationDot /></span>
            <span>BKM Mutfak Kibris, Terminal, Lefkosa.</span>
            </div>
            </div>  
            <div>
                <Ticket/></div> 
        </div>
        <div className="container border-b-[0.5px] border-[#4e4e4e]">
            </div>
    </div>
)

}

export default Hero;