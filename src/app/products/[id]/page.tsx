import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import PriceTag from "@/components/priceTag";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "./addToCartButton";
import BuyNowButton from "./buyNowButton";
import { incProductQuantity } from "./actions";

interface ProductPageProps{
    params: {
        id: string,
    }
}

const getProduct = cache(async (id: string) =>{
    const product = await prisma.product.findUnique({where: {id}});
    if(!product) notFound();
    return product;
})

export async function generateMetadata({params: {id}}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);
    
    return{
        title: product.name + "/Product Page",
        description: product.description,
        openGraph: {
            images: [{url: product.imageUrl}],
        }
    };
}

export default async function ProductPage({params: {id}}: ProductPageProps) {
    const product = await getProduct(id);
    
    return (
        <div className="m-3 mt-6 sm:m-5 flex justify-center">
            <div className="flex flex-col gap-6 md:flex-row items-center w-fit">
                <Image src={product.imageUrl} alt={product.name} width={400} height={400} className=" w-full sm:w-auto rounded-lg object-cover" priority></Image>
                <div className="w-full md:w-auto">
                    <h1 className="text-3xl">{product.name}</h1>
                    <PriceTag price={product.price} className="mb-5 mt-1 p-4 bg-green-200 text-lg"></PriceTag>
                    <p className="">{product.description}</p>
                    
                    <div className="my-5 flex gap-3 justify-start flex-col md:flex-row">
                        <BuyNowButton className='w-full md:w-36'productId={product.id}/>
                        <AddToCartButton className='w-full md:w-36' productId={product.id} incrementProductQuantity={incProductQuantity}/>
                    </div>

                </div>
            </div>
            
        </div>
    )
}