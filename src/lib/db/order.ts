import { Order, OrderItem, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { redirect } from "next/navigation";

export type OrderWithProducts = Prisma.OrderGetPayload<{
    include: { 
        items: { include: { product: true } } }
}>

export type OrderItemWithProducts = Prisma.OrderItemGetPayload<{
    include: { product: true };
}>;

export type OrderList = OrderWithProducts & {
    subtotal: number;
}

export async function getOrder(): Promise<OrderList | null> {
    const session = await getServerSession(authOptions);

    let order: OrderWithProducts | null = null;

    order = await prisma.order.findFirst({
        where: { userId: session?.user.id },
        include: { items: { include: { product: true } } },
    });

    if (!order) {
        return null;
    }

    return {
        ...order,
        subtotal: order.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    }
}
export async function createOrder(): Promise<OrderList> {
    const session = await getServerSession(authOptions);

    let newOrder: Order;
    const ordernumber = Math.floor(10000 + Math.random() * 90000);

    if(session){
        newOrder = await prisma.order.create({
            data: { 
                userId: session?.user.id,
                orderNumber: ordernumber,
             },
        });
    }
    else{
        newOrder = await prisma.order.create({
            data: {  orderNumber: ordernumber },
        });
    }

    return {
        ...newOrder,
        items: [],
        subtotal: 0,
    };
}