import Link from "next/link";

function Hero (){
return(
    <div className="bg-gradient-to-b from-emerald-300 to-white pt-24">
        <div className="grid grid-cols-2 container mt-8">
         <div>
            <h1 className="text-4xl font-black uppercase py-4">The Listening Sheep</h1>
            <p>Live Spoken-Word Event by <span>Ayomide Wayne</span></p>
            </div>   
        </div>
    </div>
)

}

export default Hero;