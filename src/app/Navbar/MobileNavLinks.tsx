"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const navigation = [
    { name: 'All Products', href: '/allProducts', },
    { name: 'Drinks', href: '/drinks',},
    { name: 'Accessories', href: '/accessories', },
]

export default function MobileNavLinks() {
    const pathname = usePathname();
    return (
            <>
                {navigation.map((item) => (
                    <li key={item.name}>
                    <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            pathname === item.href
                                ? 'bg-gray-900 text-white'
                                : ' hover:bg-gray-200',
                            'rounded-lg px-3 py-2 text-sm font-medium transition-all'
                        )}
                        aria-current={pathname === item.href ? 'page' : undefined}
                    >
                        {item.name}
                    </Link>
                    </li>
                ))}
        </>
    );
}