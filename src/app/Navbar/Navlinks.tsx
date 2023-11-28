"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const navigation = [
    { name: 'All Products', href: '/allProducts', },
    { name: 'Drinks', href: '/search?query=Beverage',},
    { name: 'Accessories', href: '/search?query=Accessories', },
]

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div className="hidden lg:block">

            <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            pathname === item.href
                                ? 'bg-gray-900 text-white'
                                : ' hover:bg-gray-200',
                            'rounded-lg px-3 py-2 text-sm font-medium transition-all whitespace-nowrap'
                        )}
                        aria-current={pathname === item.href ? 'page' : undefined}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

        </div>
    );
}