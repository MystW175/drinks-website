"use client";

import Image from "next/image";
import Link from "next/link";
import {Session} from "next-auth";
import ProfilePicPlaceHolder from "@/assets/profile-pic-placeholder.png";
import { signIn, signOut } from "next-auth/react";
import { useTransition } from "react";

interface ProfileButtonProps{
    session: Session | null;
}

export default function ProfileButton({session}: ProfileButtonProps) {

    const [isPending, startTransition] = useTransition();

    const user = session?.user;

    function closeDropdown(){
        const elem =  document.activeElement as HTMLElement;
        if(elem){
            elem.blur();
        }
    }

    const signOutfunc = async () => {
        // setSuccess(false);
        startTransition(async () => {
            await signOut({callbackUrl: "/"});
            // setSuccess(true);
        })
    }

    return (
        <div>
            { user ? 
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <Image width={100} height={100} alt="Profile pic" src={user?.image || ProfilePicPlaceHolder} />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <Link href="/profile" onClick={closeDropdown} className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                    </li>
                    <li><Link href="/orders" onClick={closeDropdown}>Orders</Link></li>
                    <li><a>Settings</a></li>
                    <li>
                        <button onClick={signOutfunc}>Sign Out {isPending &&<span className="loading loading-spinner loading-xs"></span>}</button>
                    </li>
                </ul>
            </div> 
            :
            <Link className="normal-case hover:text-secondary transition-all px-1 active:text-gray-700" href='/signin'>Sign In</Link>
            }
        </div>
    );
}