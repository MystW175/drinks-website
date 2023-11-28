import ProductCard from "@/components/productCard";
import { prisma } from "@/lib/db/prisma";
import {Metadata } from "next";

interface SearchPageProps{
    searchParams:  {query: string}
}

export function generateMetadata({
    searchParams:{query},
}: SearchPageProps) : Metadata{
    return {
        title: `Search:  ${query}`,
    };
}

export default async function SearchPage({searchParams:{query}}:SearchPageProps){
    const products = await prisma.product.findMany({
        where:{
            OR: [
                {name: { contains: query, mode: "insensitive"}},
                {description: { contains: query, mode: "insensitive"}},
                {tag1: { contains: query, mode: "insensitive"}},
                {tag2: { contains: query, mode: "insensitive"}},
            ]
        },
        orderBy:{id: "desc"}
    })

    if(products.length === 0){
        return <div className="text-center py-5 text-lg ">No products found</div>
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div>

            <h3 className="text-left w-full px-8 mt-8 font-medium">{query}</h3>
            <div className='my-4 mx-3 grid gap-y-5 gap-x-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {products.map(product => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>

            </div>
        </div>
    );
}