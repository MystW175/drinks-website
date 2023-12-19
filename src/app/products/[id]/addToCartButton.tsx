"use client";

import { useState, useTransition } from "react";
import PopUp from "./slideover";

interface AddToCartButtonProps {
    productId: string;
    incrementProductQuantity: (productId: string) => Promise<void>;
    className?: string;
}

export default function AddToCartButton({ productId, incrementProductQuantity, className }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    return (
        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-normal">
            <button onClick={() => {
                setSuccess(false);
                startTransition(async () => {
                    await incrementProductQuantity(productId);
                    setSuccess(true);
                })
            }} className={`${className} btn disabled:btn-primary btn-primary`} disabled={isPending}>
                {!isPending && "Add To Cart"}
                {isPending && <span className="loading loading-spinner loading-md"></span>}
            </button>
            <PopUp isOpen={!isPending && success }/>
        </div>
    );
}