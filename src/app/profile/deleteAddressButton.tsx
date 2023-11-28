"use client";

import { deleteAddressItem } from "@/app/profile/actions";
import { useState, useTransition } from "react";


interface removeAddressButtonProps{
    id: string;
}
export default function DeleteAddressButton({id}: removeAddressButtonProps){

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false); 

    const deleteItem = async () => {
        setSuccess(false);
        startTransition(async () => {
            await deleteAddressItem(id);
            setSuccess(true);
        })
    }
    return(<div>
        <button onClick={deleteItem}
         className="link link-hover relative text-blue-700 hover:text-error font-medium transition-colors w-min h-min">
        Remove
        </button>
        {isPending && <span className="loading loading-spinner absolute left-32 text-black mr-2"/>}
        </div>
        );
}