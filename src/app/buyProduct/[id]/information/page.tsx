import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";
import OrderSummary from "@/components/orderSummary";
import BreadCrumb from "@/components/breadCrumb";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import FormSubmitButton from "@/components/formSubmit";

interface ProductPageProps {
    params: {
        id: string,
    },
}

const states=[
    { name:  "Andhra Pradesh", value: "1" },
    { name: "Arunachal Pradesh", value: "2" },
    { name: "Assam", value: "3" },
    { name: "Bihar", value: "4" },
    { name: "Chhattisgarh", value: "5" },
    { name: "Goa", value: "6" },
    { name: "Gujarat", value: "7" },
    { name: "Haryana", value: "8" },
    { name: "Himachal Pradesh", value: "9" },
    { name: "Jharkhand", value: "10" },
    { name: "Karnataka", value: "11" },
    { name: "Kerala", value: "12" },
    { name: "Madhya Pradesh", value: "13" },
    { name: "Maharashtra", value: "14" },
    { name: "Manipur", value: "15" },
    { name: "Meghalaya", value: "16" },
    { name: "Mizoram", value: "17" },
    { name: "Nagaland", value: "18" },
    { name: "Odisha", value: "19" },
    { name: "Punjab", value: "20" },
    { name: "Rajasthan", value: "21" },
    { name: "Sikkim", value: "22" },
    { name: "Tamil Nadu", value: "23" },
    { name: "Telangana", value: "24" },
    { name: "Tripura", value: "25" },
    { name: "Uttar Pradesh", value: "26" },
    { name: "Uttarakhand", value: "27" },
    { name: "West Bengal", value: "28" },
]

async function addInfo(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/");
    }

    const email = formData.get('email')?.toString();
    const address = formData.get('address')?.toString();
    const state = formData.get('state')?.toString();
    const pincode = Number(formData.get('pincode') || 0);
    const firstname = formData.get('firstname')?.toString();
    const lastname = formData.get('lastname')?.toString();
    const apartment = formData.get('apartment')?.toString();


    if(!email || !address || !state || !pincode || !firstname || !lastname || !apartment){
        throw Error('Missing required fields');
    }

    redirect("./payment");
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound();
    return product;

})

export default async function BuyProduct({ params: { id } }: ProductPageProps) {
    const product = await getProduct(id);
    const quantity = 1;
    return (
        <div className="mx-5 mb-3">
            <BreadCrumb id={id}/>

            <div className="flex flex-col md:flex-row gap-4 justify-evenly">
                <OrderSummary product={product} quantity={quantity}/>

                <form action={addInfo}>

                <div className="p-2 w-full md:w-[50vw]">
                    <label className="label font-bold">Contact</label>
                    <input required name="email" type="text" id="email" placeholder="Email or phone number" className="w-full md:max-w-lg input input-bordered" />

                    <div className="m-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="checkbox checkbox-sm checkbox-success" />
                            <span className="label-text">Email me with news and offers</span>
                        </label>
                    </div>

                    <label className="label font-bold">Shipping Address</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2 md:max-w-lg">
                        <select required name= "state" defaultValue="State" className="select select-bordered w-full sm:w-[50%] ">
                            <option disabled>State</option>
                            {states.map((state)=>(
                                <option key={state.name} value={state.value}>{state.name}</option>
                            ))}
                        </select>
                        <input required name="pincode" type="text" placeholder="Pincode" className="w-full sm:w-[50%] input input-bordered" />
                        
                    </div>
                    <div className="flex flex-col sm:flex-row w-full md:max-w-lg gap-2">
                        <input required name="firstname" type="text" placeholder="First Name" className="mb-2 w-full sm:w-[50%] input input-bordered" />
                        <input required name="lastname" type="text" placeholder="Last Name" className="mb-2 w-full sm:w-[50%] input input-bordered" />
                    </div>
                    <input required name="address" id="address" type="text" placeholder="Address" className="mb-2 w-full md:max-w-lg input input-bordered" />
                    <input required name="apartment" type="text" placeholder="Apartment/Block" className="mb-2 w-full md:max-w-lg input input-bordered" />
                    <input  name="landmark" type="text" placeholder="Notable Landmarks(optional)" className="mb-2 w-full md:max-w-lg input input-bordered" />

                    <div className="m-2 mb-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="checkbox checkbox-sm checkbox-success" />
                            <span className="label-text">Save this information</span>
                        </label>
                    </div>
                    <div className="flex justify-center md:justify-normal">
                        <FormSubmitButton className="normal-case w-full md:btn-wide"> Continue to shipping</FormSubmitButton>
                    </div>
                </div>

                </form>

            </div>

        </div>
    );
}