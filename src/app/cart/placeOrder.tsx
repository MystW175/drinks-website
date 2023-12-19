'use client';

import { useState, useTransition } from "react";
import { create_Order } from "./actions";
import OrderConfirmation from "./orderConfirmation";

export default function PlaceOrderButton(){
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    return(
        <>
        <button onClick={() => {
            setSuccess(false);
            startTransition(async () => {
                await create_Order();
                setSuccess(true);
            })
        }} className="btn w-full min-w-[16rem] md:btn-wide btn-accent normal-case" disabled={isPending}>
            {!isPending && "Check Out"}
            {isPending && <span className="loading loading-spinner loading-md"></span>}
        </button>
        <OrderConfirmation isOpen={!isPending && success }/>
        </>
    );
}