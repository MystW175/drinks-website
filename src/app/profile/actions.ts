"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { createAddress, getAddress } from "@/lib/db/addr";


export default async function addAddress(formData: FormData){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/api/auth/signin?callbackUrl=/profile");
    }
    
    const Address = await getAddress() ?? await createAddress();


    const name = formData.get('name')?.toString();
    const buildingNo = formData.get('building')?.toString();
    const street = formData.get('street')?.toString();
    const city = formData.get('city')?.toString();
    const state = formData.get('state')?.toString();
    const postalCode = Number(formData.get('pincode') || 0);

    if(!name || !buildingNo || !street || !city || !state || !postalCode){
        throw Error('Missing required fields');
    }

    await prisma.savedAddress.create({
        data:{ name, buildingNo, street, city, state, postalCode, addressId: Address.id},
    });

    // name.reset
    // buildingNo = "";
    // street = "";
    // city = "";
    // state = "";
    // postalCode = ""; 

    revalidatePath("/profile");
}

export async function deleteAddressItem(id: string){
    await prisma.savedAddress.delete({
        where: {id}
    })
    revalidatePath('/profile');
}