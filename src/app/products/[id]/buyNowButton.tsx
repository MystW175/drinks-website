"use client";
import Link from "next/link";

interface buyProductButtonProps{
    productId: string,
    className?: string,
}

export default function BuyNowButton({productId, className} : buyProductButtonProps){
    return (
        <Link href={"/buyProduct/" + productId + '/information'}><button onClick={() => {}} className={`${className} btn btn-accent`}>Buy Now</button></Link>
    );
}