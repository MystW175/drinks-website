"use client";

import { useState } from "react";

interface IncrementButtonProps{
    num: number,
}

export default function IncrementButton({num}:IncrementButtonProps){
    const [n, setNumber] = useState(num);

    function decrementNumber() {
        if(n>1){
            setNumber(n-1);
        }
    }
    
    function incrementNumber() {
        if(n<99){
            setNumber(n+1);
        }
    }

    return(
        <div className="flex justify-center w-fit items-center gap-1">
            <button className="btn btn-outline btn-xs btn-square" onClick={decrementNumber}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
            <p>{n}</p>
            <button className="btn btn-outline btn-xs btn-square" onClick={incrementNumber}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    )
}