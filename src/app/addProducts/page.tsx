import FormSubmitButton from "@/components/formSubmit";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export const metadata = {
    title: "Add Products - Admin"
}

async function addProduct(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/addProducts");
    }

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const tag1 = formData.get('tag1')?.toString();
    const tag2 = formData.get('tag2')?.toString();
    const price = Number(formData.get('price') || 0);

    if(!name || !description || !imageUrl || !price || !tag1 || !tag2){
        throw Error('Missing required fields');
    }

    await prisma.product.create({
        data:{name, description, tag1, tag2, imageUrl, price },
    });

    redirect("/");
}

export default async function AddProductPage() {

    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/addProducts");
    }

    return <div className="m-5 flex flex-col items-center">
        <h1 className="text-3xl mb-3">Add Product</h1>
        <form action={addProduct} className="w-full flex flex-col items-center gap-2">

            <h2 className="mr-5 label">Product Name</h2>
            <input required name="name" className=" input input-secondary text-lg w-full max-w-lg" type="text" placeholder="Type product name here" />
            
            <h2 className="mr-5">Description</h2>
            <textarea required name="description" className="textarea textarea-secondary text-lg w-full max-w-lg" placeholder="Type product description here"></textarea>
            
            <div className="flex w-full max-w-lg gap-2">

            <div className="">
                <h2 className="mr-5 label">Tag 1</h2>
                <input required name="tag1" className=" input input-secondary text-lg w-full " type="text" placeholder="Type product tag here" />
            </div>

            <div>
                <h2 className="mr-5 label">Tag 2</h2>
                <input required name="tag2" className=" input input-secondary text-lg w-full" type="text" placeholder="Type product tag here" />
            </div>

            </div>
            
            
            <h2 className="mr-5">Image Url</h2>
            <input required name="imageUrl" className="input input-secondary text-lg w-full max-w-lg" type="url" placeholder="Type product Image Url here"/>
            
            <h2 className="mr-5">Price</h2>
            <input required name="price" className="input input-secondary text-lg w-full max-w-lg" type="number" placeholder="Type product price here"/>
            
            <FormSubmitButton >Submit</FormSubmitButton>

        </form>
    </div>
}