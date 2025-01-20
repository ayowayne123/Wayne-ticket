import Link from "next/link";


function About (){
return(
    <section className="container py-8">
      <h2 className="text-2xl font-bold uppercase">About</h2>
      <div className="flex w-full gap-12">
      <div className=" grow">
       <p>The listening Sheep is a spoken-word and worship event where we give God room to unearth his heart; where we come to truly listen.
       This Program is rooted in John 10:27-28, and we are reminded that the path to eternal life begins with listening</p> 
        <span className="my-2 italic">
            "My sheep hear my voice, and I know them, and they follow me:
 And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand."</span>
<p></p>
      </div>
      <div className="border border-black rounded-lg overflow-hidden h-40 w-60 shrink-0 flex gap-2 flex-col items-center justify-center p-4 ">
<h1 className="font-bold uppercase text-xl text-center">The Listening Sheep</h1>
<Link scroll href='#tickets' className="bg-emerald-700 p-3 text-white">Book Now</Link>
      </div>
      </div>
    </section>
)

}

export default About;