import { redirect } from "next/navigation";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import ProfileButton from "./ProfileButton";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import NavLinks from "./Navlinks";
import MobileNavLinks from "./MobileNavLinks";
import SearchBox from "./SearchBox";

async function searchProducts(formData: FormData) {
  "use server";
  
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function NavBar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <div className="navbar flex pr-4 sm:px-4 justify-between text-primary-content sticky top-0 bg-white z-20">
      
      <div className="">

        <MobileNavLinks/>

        <Link href="/" className="font-bond sm:text-xl sm:ml-3 whitespace-nowrap">Condensed Fluids</Link>
        <NavLinks />
        <SearchBox/>
      </div>

      <div className="flex-none gap-2">
        <form action={searchProducts} className="hidden md:block">
          <div className="form-control">
            <input name="searchQuery" placeholder="Search" className="input h-10 input-bordered rounded-xl pl-5 p-2 w-56 sm:w-80 text-sm" />
          </div>
        </form>

        <ShoppingCartButton cart={cart} />

        <ProfileButton session={session} />

      </div>
    </div>);
}