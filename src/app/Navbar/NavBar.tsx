import { redirect } from "next/navigation";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import ProfileButton from "./ProfileButton";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import NavLinks from "./Navlinks";
import MobileNav from "./MobileNav";
import { searchProducts } from "./actions";
import Searchbox from "./Searchbox";


export default async function NavBar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);


  return (
    <div className="navbar flex pr-4 lg:px-4 justify-between text-primary-content sticky top-0 bg-white z-20">
      
      <div className="">

        <MobileNav/>

        <Link href="/" className="font-bond sm:text-xl lg:ml-3 whitespace-nowrap">Condensed Fluids</Link>
        <NavLinks />
      </div>

      <div className="flex-none gap-2">
        <Searchbox/>

        <ShoppingCartButton cart={cart} />

        <ProfileButton session={session} />

      </div>
    </div>);
}