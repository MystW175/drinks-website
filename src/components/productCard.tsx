import { Product } from "@prisma/client";
import Image from 'next/image'
import Link from "next/link";
import PriceTag from "@/components/priceTag";

interface  ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps){
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000*60*60*24*7;


    return (<Link href={"/products/" + product.id} className="">
        <div className="card w-full lg:w-80 bg-zinc-100 hover:shadow-xl transition-all">
            <figure><Image className="object-cover h-48" width={800} height={400} src={product.imageUrl} alt={product.name} /></figure>
            <div className="card-body p-6">
            <h2 className="flex justify-between card-title items-start">
                {product.name}
                {isNew && <div className="badge badge-secondary mt-[6px]">NEW</div>}
            </h2>
            <p className="text-sm">{product.description}</p>
            <PriceTag className="badge-success px-3 py-4 text-[16px]" price={product.price}/>
            <div className="card-actions justify-end">
                <div className="badge badge-outline text-xs">{product.tag1}</div> 
                <div className="badge badge-outline text-xs">{product.tag2}</div>
            </div>
            </div>
        </div>
  </Link>);
}