"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { createOrder } from "@/lib/db/order";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity:number){
    const cart = await getCart() ?? await createCart();
    const articleInCart = cart.items.find(item => item.productId === productId);

    if(quantity === 0){
        if(articleInCart){
            await prisma.cartItem.delete({
                where: { id: articleInCart.id}
            })
        }
    }
    else{
        if(articleInCart){
            await prisma.cartItem.update({
                where: { id: articleInCart.id},
                data: { quantity }
            })
        }
        else{
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                }
            })
        }
    }

    revalidatePath("/cart");
}

export async function create_Order(){

    const cart = await getCart();

    if(cart){
        const newOrder = await createOrder();

        for (let item of cart.items) {
        await prisma.orderItem.create({
            data: {
            productId: item.productId,
            quantity: item.quantity,
            orderId: newOrder.id
            }
        });
        }

        await prisma.cart.delete({ where: { id: cart.id } });
    }

    revalidatePath("/cart");
}