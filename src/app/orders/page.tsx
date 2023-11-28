import OrderSummary from "@/components/orderSummary";
import ProductCard from "@/components/productCard";
import { prisma } from "@/lib/db/prisma";

export default async function OrderPage(){
    const products = await prisma.product.findMany({
        orderBy: { id: "desc"}
    });
    return(
        <div className="">
            <h3 className="text-lg bg-gray-100 px-8 py-3">Orders</h3>
            <h2 className="px-8 py-2">Your Orders</h2>
            <p className="px-4">Note This is just for placeholder. Actual order list is yet to be made.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 mx-4 w-max gap-4">
 
            </div>
            <h2 className="px-8 py-2">Order History</h2>
        </div>
    );
}
