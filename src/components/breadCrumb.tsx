"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

interface BreadCrumbProps {
    id: string,
}

export default function BreadCrumb({id}: BreadCrumbProps){
    const pathname = usePathname();
    const paymentLink = "/buyProduct/" + id + "/payment";
    const informationLink = "/buyProduct/" + id + "/information";
    

    return(
        <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={'/products/' +id}>Products</Link></li>
                    <li><Link href={informationLink} 
                        className={` ${pathname === informationLink ? 'text-secondary' : ''}`}>Information</Link></li>
                    <li><Link href={paymentLink} 
                        className={` ${pathname === paymentLink ? 'text-secondary' : ''}`}>Payment</Link></li>
                </ul>
        </div>);
}