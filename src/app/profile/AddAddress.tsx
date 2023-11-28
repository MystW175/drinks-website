"use client";

import { useState, useTransition } from "react";
import addAddress from "./actions";
import SuccessMessage from "../uiTest/success";

export default function AddressModal() {

    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);



    async function formSubmit(formData: FormData){
        startTransition(async () => {
            await addAddress(formData);
        })
        setOpen(false);
        setIsOpen(true);
    }
    
    function closeModal() {
        setOpen(false)
    }
    
    function openModal() {
        setOpen(true)
    }

    function handleCallback(childVariable: boolean) {
        setIsOpen(childVariable);
    }

    return (
        <div className="">
            {isOpen && <SuccessMessage message='Address successfully added.' isOpen={isOpen} callback={handleCallback}/>}
           <button onClick={openModal} className="flex items-center w-fit text-blue-700 active:text-blue-500 link-hover transition-colors">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                Add Address
            </button>
            
            <div className={open ? '' : 'transition-opacity hidden'}>

                <div className="card relative z-10">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity" />

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden w-screen rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form action={formSubmit} id="address-form">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full ">
                                            <div className="text-base font-semibold leading-6 text-gray-900">
                                                New Address
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Name
                                                </p>
                                                <input required type="text" name="name" className="input input-bordered h-10 w-full"/>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Building No
                                                </p>
                                                <input required type="text" name="building" className="input input-bordered h-10 w-full"/>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Street
                                                </p>
                                                <input required type="text" name="street" className="input input-bordered h-10 w-full"/>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    City
                                                </p>
                                                <input required type="text" name="city" className="input input-bordered h-10 w-full"/>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    State
                                                </p>
                                                <input required type="text" name="state" className="input input-bordered h-10 w-full"/>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Pincode
                                                </p>
                                                <input required type="number" name="pincode" className="input input-bordered h-10 w-full"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto duration-300"
                                    >
                                        {isPending && <span className="loading loading-spinner text-black mr-2"/>}
                                        Add Address
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border-[1px] border-black bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 sm:mt-0 sm:w-auto duration-300"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}