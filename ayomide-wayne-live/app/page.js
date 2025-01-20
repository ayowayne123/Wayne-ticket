import Image from "next/image";
import Hero from "./hero";
import About from "./about";
import Tickets from "./tickets";
import Ticket from "./ticketCard";

export default function Home() {
  return (
    <div>
   <Hero/>
   <About/>
   <div className="container"><Ticket/></div>
   
   <Tickets/>
   
    
    </div>
  );
}
