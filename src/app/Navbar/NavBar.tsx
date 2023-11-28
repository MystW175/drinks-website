import { redirect } from "next/navigation";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import ProfileButton from "./ProfileButton";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import NavLinks from "./Navlinks";
import MobileNavLinks from "./MobileNavLinks";

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
    <div className="navbar flex px-4 justify-between text-primary-content">
      
      <div className="">

        <div className="flex lg:hidden">
          <div className="dropdown dropdown-end -ml-3 -mr-2">
            <label tabIndex={0} className="btn btn-ghost btn-square">
              <span><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
            </label>
            <ul tabIndex={0} className="menu menu-sm w-[98vw] left-0 dropdown-content dropdown-bottom mt-3 z-[20] p-2 shadow bg-base-100">
              <li>
                <form action={searchProducts} className="block md:hidden">
                  <div className="form-control">
                    <input name="searchQuery" placeholder="Search" className="input h-10 input-bordered rounded-xl pl-5 p-2 w-full sm:w-80 text-sm" />
                  </div>
                </form>
              </li>
              <MobileNavLinks />
            </ul>
          </div>
        </div>

        <Link href="/" className="font-bond sm:text-xl sm:ml-3 whitespace-nowrap">Condensed Fluids</Link>
        <NavLinks />
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