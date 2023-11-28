"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type formSubmitButtonProps = {
    children: React.ReactNode;
    className?: string, 
} & ComponentProps<"button">

export default function FormSubmitButton( {children, className, ...props} : formSubmitButtonProps){
    const {pending} = useFormStatus();
    return <button {...props} disabled={pending} className={`btn btn-wide btn-ghost bg-accent ${className}`} type='submit'>
        {pending && <span className="loading loading-spinner text-primary"/>}
        {children}
        </button>

}