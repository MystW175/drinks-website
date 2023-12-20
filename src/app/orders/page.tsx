import { prisma } from "@/lib/db/prisma";
import OrderItem from "./orderItem";

export default async function OrderPage() {
    const orders = await prisma.order.findMany({
        orderBy: {orderDate: "desc"},
        include: { items: { include: { product: true } } },
      })

    if (orders.length == 0)
        return (
        <div  className="mx-8">
            <h3 className="text-lg font-medium  pt-3">Orders</h3>
            <p className="text-gray-700 pb-3 text-sm  ">Your orders and order history are shown here.</p>
            <div className="border-t-[1px] my-3"></div>
            <h4 className="font-medium">You currently have zero orders</h4>
        </div>
        );

    return (
        <div className="mx-3 sm:mx-8 2xl:max-w-[1300px] 2xl:mx-auto">
            <h3 className="text-lg font-medium  pt-3">Orders</h3>
            <p className="text-gray-700 pb-3 text-sm  ">Your orders and order history are shown here.</p>
            {orders.map(order => (
            <OrderItem order={order} key={order.id}/>
            ))}
        </div>
    );
}
