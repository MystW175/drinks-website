import PriceTag from "@/components/priceTag";
import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import OrderSummary from "@/components/orderSummary";
import BreadCrumb from "@/components/breadCrumb";

interface ProductPageProps {
    params: {
        id: string,
    },
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound();
    return product;

})

export default async function PaymentsPage({ params: { id } }: ProductPageProps) {
    const product = await getProduct(id);
    const quantity = 1;
    return (
        <div className="mx-5 mb-3">
            <BreadCrumb id={id}/>

            <div className="flex flex-col md:flex-row gap-5 justify-evenly">
                <div className="flex flex-col"> 
                    <div className="md:hidden font-medium my-4 flex justify-between items-center w-full sm:w-[80vw] md:w-80 mx-auto">
                        <p>Show Order Summary</p>
                        <PriceTag className="px-0 border-none bg-opacity-0 text-[16px]" price={quantity * product.price} />
                    </div>
                    <OrderSummary product={product} quantity={quantity} />
                </div>

                <div className=" w-full md:w-[50vw]">
                    <p className="label font-bold"> Shipping Info</p>

                    <div className='p-5 card-bordered rounded-lg mb-6'>
                        <div className="flex justify-between">
                            <p>Contact</p>
                            <p>xyz@printer.gmail.com</p>
                        </div>
                        <Link href={'./information'} className="link link-secondary text-sm flex justify-end">Change</Link>
                        
                        <div className="flex justify-between">
                            <p className="whitespace-nowrap mr-4">Shipping to </p>
                            <p className="text-right">Joshua Regelia, 26 PoisonFang Street, Java Apartments, Aberforth, West Bengal-713101</p>
                        </div>
                        <Link href={'./information'} className="link link-secondary text-sm flex justify-end">Change</Link>

                    </div>

                    <div className="my-6 border-[1px] border-gray-200"></div>

                    <form action="">
                        <div className="mb-4">
                            <p className="px-1 pt-1 font-bold"> Payment</p>
                            <p className="px-1 text-sm">Transactions are encrypted</p>
                            <ul className="flex list-none gap-4 my-3">
                                <li>Cash</li>
                                <li>Card</li>
                                <li>Visa</li>
                                <li>PhonePay</li>
                                <li>Paypal</li>
                            </ul>
                        </div>
                        <div className="flex justify-center md:justify-normal">
                            <button type="submit" className="btn md:btn-wide btn-accent normal-case w-full max-w-lg">Checkout</button>
                        </div>
                    </form>

                </div>
                
            </div>

        </div>
    );
}