import { Cart, CartItem, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

export type AddressWithSavedAddress = Prisma.AddressGetPayload<{
    include: { items: true }
}>


export async function getAddress(): Promise<AddressWithSavedAddress | null> {
    const session = await getServerSession(authOptions);

    let Address: AddressWithSavedAddress | null = null;

    if (session) {
        Address = await prisma.address.findFirst({
            where: { userId: session.user.id },
            include: { items: true } });
    }

    if (!Address) {
        return null;
    }

    return {
        ...Address,
    }
}
export async function createAddress(): Promise<AddressWithSavedAddress> {
    const session = await getServerSession(authOptions);
    let newAddress = await prisma.address.create({
        data: { userId: session?.user.id },
        })
    return {
        ...newAddress,
        items: [],
    };
}

