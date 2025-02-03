import Link from "next/link";

function Header (){
return(
    <div className="absolute container h-20  left-0 right-0">
        <div className="w-full h-full flex justify-between items-center">
<Link className="font-greatvibes text-xl lg:text-2xl " href="/">
Ayomide Wayne
</Link>
<Link  target="_blank"
            rel="noopener noreferrer" href='https://docs.google.com/forms/d/e/1FAIpQLScjygvLnZ_ZBurjvXmLS8AH6i_z6iBE3A0uORPts2ewlJV8Dw/viewform' className="flex text-white bg-black rounded-lg lg:w-48 lg:h-12 text-xs w-36 h-10 items-center justify-center font-bold lg:text-sm">Become a Volunteer</Link>
        </div>
    </div>
)

}

export default Header;