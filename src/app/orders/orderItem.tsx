import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "./progress";
import { Cart, Order } from "@prisma/client";
import { OrderWithProducts } from "@/lib/db/order";

interface OrderItemProps {
    order: OrderWithProducts;

}

export default async function OrderItem({ order }: OrderItemProps) {

    const subtotal =  order.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    const shipping_cost = 20;
    const total_cost = shipping_cost + subtotal;

    return (
        <div className="my-6 mb-10">
            <div className="mx-auto max-w-[600px] lg:max-w-full lg:w-full">

                {/* order header */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-end">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4">
                        <h3 className="text-3xl">Order #{order.orderNumber}</h3>
                        <Link href='' className="text-blue-700  hover:text-blue-400 transition-colors duration-150">
                            <p className="flex items-center gap-1 text-[14px] leading-[1.5rem] ">View invoice
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </p>
                        </Link>
                    </div>
                    <p className="text-[15px] flex gap-1">
                        <span className="text-gray-500">Order placed</span>
                        <span className="font-medium">
                            {new Date(order.orderDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                            })}
                        </span>
                    </p>
                </div>

                {/* order body */}
                {order?.items.map(orderItem => (
                    <div className=" border-[1px] rounded-xl bg-gray-50 bg-opacity-50 mb-6" key={orderItem.id}>

                        <div className="card-body px-4 sm:p-8 lg:flex-row gap-8 lg:gap-0">
                            <div className="flex flex-col sm:flex-row w-full gap-7 max-w-[700px]">
                                <Image width={200} height={200} alt={orderItem.product.name}
                                    src={orderItem.product.imageUrl}
                                    className="w-full sm:w-40 sm:h-40 object-cover rounded-lg"></Image>

                                <div className="flex flex-col gap-2 ">
                                    <h4 className="font-medium">{orderItem.product.name}</h4>
                                    <h4 className="font-medium text-[15px]">{formatPrice(orderItem.product.price)}</h4>
                                    <p className="text-[14px] text-gray-500">{orderItem.product.description}</p>
                                </div>
                            </div>

                            <div className="flex w-full lg:justify-evenly lg:gap-4">
                                <div className="flex flex-col gap-2 w-full lg:w-max">
                                    <h4 className="font-medium text-[15px]">Delivery address</h4>
                                    <p className="text-[14px] text-gray-500">Arshad Khan<br></br> Torendio 20 <br /> 16 Soniatia Street Pass <br /> West Bengal, 713101 </p>
                                </div>
                                <div className="flex flex-col gap-2 w-full  lg:w-max">
                                    <h4 className="font-medium text-[15px]">Contact info</h4>
                                    <p className="text-[14px] text-gray-500">my....175@gmail.com<br /></p>
                                </div>
                            </div>

                        </div>

                        <div className="border-b-[1px]"></div>

                        <div className="card-body gap-6 px-4 sm:p-8">
                            <h4 className="font-medium text-[15px]">Preparing to ship on <span>Dec 21, 2023</span></h4>
                            <ProgressBar progress={order.orderDate}/>
                        </div>

                    </div>
                ))}

                {/* billing address */}
                <div className=" border-[1px] rounded-xl bg-gray-50 bg-opacity-50">
                    <div className="card-body justify-between px-4 sm:p-8 lg:flex-row gap-8">

                        <div className="flex w-full lg:max-w-[500px] justify-between lg:gap-4">

                            <div className="flex flex-col gap-2 w-full lg:w-max">
                                <h4 className="font-medium text-[15px]">Billing address</h4>
                                <p className="text-[14px] text-gray-500">Arshad Khan<br></br> Torendio 20 <br /> 16 Soniatia Street Pass <br /> West Bengal, 713101 </p>
                            </div>

                            <div className="flex flex-col gap-2 w-full  lg:w-max">
                                <h4 className="font-medium text-[15px]">Payment information</h4>

                                <div className="flex gap-3">
                                    <div className="bg-blue-800 rounded-md h-6 w-10 object-cover flex justify-center items-center p-1">
                                        <Image alt="Visa Logo" width={100} height={100} src="/visa_logo.png"></Image>
                                    </div>
                                    <div>
                                        <p className="text-[14px]">Ending with 3423</p>
                                        <p className="text-[14px] text-gray-500">Expires on 03/25</p>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="w-full lg:max-w-[400px]">
                            <div className="flex justify-between">
                                <p className="text-[14px]">Subtotal</p>
                                <p className="flex justify-end text-[14px] font-medium">{formatPrice(subtotal || 0)}</p>
                            </div>
                            <div className="border-t-[1px] my-3"></div>
                            <div className="flex justify-between">
                                <p className="text-[14px]">Shipping</p>
                                <p className="flex justify-end text-[14px] font-medium">{formatPrice(shipping_cost)}</p>
                            </div>
                            <div className="border-t-[1px] my-3"></div>
                            <div className="flex justify-between">
                                <p className="text-[14px]">Order Total</p>
                                <p className="flex justify-end text-[14px] font-medium">{formatPrice(total_cost)}</p>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}