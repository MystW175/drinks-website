"use client";

import { useState } from "react";

export default function DeleteAccount() {
    const [open, setOpen] = useState(false)
    function closeModal() {
        setOpen(false)
        console.log('close')
    }

    function openModal() {
        setOpen(true)
        console.log('open')
    }

    const transition = open ? 'opacity-0' : 'opacity-100'
    return (
        <div>
            <button className="btn btn-error normal-case text-white" onClick={openModal}>Delete Account</button>

            <div className={open ? '' : 'transition-opacity hidden'}>

                <div className="card relative z-40">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                    <div className="fixed inset-0 z-10 w-full overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <div className="h-6 w-6 text-red-600 flex justify-center items-center" aria-hidden="true">
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <div className="text-base font-semibold leading-6 text-gray-900">
                                                Delete account
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete your account? All of your data will be permanently
                                                    removed. This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto duration-300"
                                        onClick={closeModal}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border-[1px] border-black bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto duration-300"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}