"use client";

import { useState } from "react";

interface SuccessMessageProps {
    isOpen: boolean;
    callback: (childVariable: boolean) => void;
    message: string;
}

export default function SuccessMessage({isOpen, callback, message}: SuccessMessageProps) {

    const [open, setOpen] = useState(isOpen)
    function closeModal() {
        setOpen(false)
        console.log('close')
        callback(false);
    }


    const show = open ? '' : ' transition-opacity hidden';

    return (

            <div className={show}>
            <div className="fixed z-40 top-0 right-0 w-full sm:max-w-lg p-2 justify-end ">
            <div className="transform overflow-hidden rounded-lg text-left shadow-xl transition-all my-8 w-full">
                <div className="bg-green-100 p-6 ">
                    <div className="flex items-center justify-between">

                        <div className="flex">
                        <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-green-400 mx-0 h-10 w-10">
                            <div className="h-10 w-10 text-white flex justify-center items-center" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                        </div>
                        <div className="ml-4 my-auto text-left">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-green-900">
                                    {message}
                                </p>
                            </div>
                        </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-square border-none bg-green-100 hover:bg-green-200 hover:shadow-sm text-green-500 duration-300"
                            onClick={closeModal}
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>

                </div>
            </div>
            </div>
            </div>
    );
}