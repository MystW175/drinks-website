import Image from "next/image";
import Link from "next/link";

interface HeroProps{
    name: string,
    imageUrl: string,
    desc: string,  
    productId: string,
}

export default async function Hero({name, imageUrl, desc, productId}: HeroProps) {
    return (
        <div className="hero w-full md:max-w-full sm:max-w-[400px] md:w-[90%]" style={{backgroundImage: `url(${imageUrl})`}}>
            
            <div className="hero-overlay bg-opacity-60 sm:bg-green-300"></div>
            <div className="hero-content flex-col md:flex-row text-white sm:text-black">
                <Image width={400} height={400} src={imageUrl} alt={name} className="hidden sm:block rounded-lg shadow-2xl w-full sm:w-[350px] md:w-[400px] h-60 md:h-[300px] object-cover" />
                <div className="">
                    <h1 className=" text-3xl md:text-5xl font-bold">{name}</h1>
                    <p className="py-6">{desc}</p>
                    <Link href={'/products/' + productId} className="btn btn-secondary">Check This Out</Link>
                </div>
            </div>
        </div>
    );
}