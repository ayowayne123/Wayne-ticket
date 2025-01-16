import Link from "next/link";

function Header (){
return(
    <div className="absolute container h-20  left-0 right-0">
        <div className="w-full h-full flex justify-between items-center">
<div className="font-playfair text-2xl font-bold tracking-tight ">
Ayomide Wayne
</div>
<Link href='/' className="flex text-white bg-black rounded-lg w-48 h-12 items-center justify-center font-bold text-sm">Become a Volunteer</Link>
        </div>
    </div>
)

}

export default Header;