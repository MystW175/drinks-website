"use client";

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { searchProducts } from './actions';
import Link from "next/link";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const navigation = [
    { name: 'All Products', href: '/allProducts', },
    { name: 'Drinks', href: '/search?query=Beverage', },
    { name: 'Accessories', href: '/search?query=Accessories', },
]

export default function MobileNav() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        searchProducts(formData);
        setOpen(false);
        window.scrollTo({top: 0, behavior:"smooth"})
    };

    return (
        <div className='lg:hidden'>
            <button className='btn btn-sm sm:btn-md btn-ghost border-none outline-none' onClick={() => setOpen(true)}><svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></button>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute right-0 top-0 -ml-8 flex pt-4 sm:-ml-10 pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md hover:text-gray-400 focus:outline-none focus:border-none"
                                                onClick={() => setOpen(false)}
                                            >
                                                
                                                
                                                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full justify-start flex-col bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Navigation
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <form onSubmit={handleSubmit} className="md:hidden">
                                                <div className="form-control">
                                                    <input name="searchQuery" placeholder="Search" className={`input h-10 input-bordered mx-3 my-2 outline-none focus:outline-none rounded-xl pl-5 p-2 text-sm`} />
                                                </div>
                                            </form>
                                            <div className="flex flex-col gap-1 mx-4 mt-3">
                                            {navigation.map((item) => (
                                                <button className='hover:bg-gray-300 rounded-md flex' onClick={() =>setOpen(false)} key={item.name}>
                                                    
                                                <Link 
                                                href={item.href}
                                                className='w-full text-left p-2'
                                                >
                                                    {item.name}
                                                </Link>
                                                </button>
                                            ))}
                                        </div>
                                        </div>
                                        
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </div>
    )
}
