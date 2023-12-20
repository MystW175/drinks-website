import { formatPrice } from "@/lib/format";
import CartEntry from "./cartEntry";
import { getCart } from "@/lib/db/cart";
import { setProductQuantity } from "./actions";
import PlaceOrderButton from "./placeOrder";

export const metadata = {
  title: "Your Cart",
};

export default async function CartPage() {
  const cart = await getCart();

  var isCart = true;
  if (!cart || cart.items.length == 0) {
    isCart = false;
  }

  const noCart = isCart ? 'hidden': '';
  const yesCart = isCart ? '': 'hidden';

  return (
    <>
      <div className={`${noCart} flex pt-6 sm:py-6 justify-around items-center md:items-end`}>
        <div>
          <h3 className="text-center text-xl mx-6 mt-8">Your Cart</h3>
          <div className="h-48"><p className=" text-center my-2">Cart is empty. Browse and add items</p></div>
        </div>
      </div>

      <div className={`${yesCart} pt-6 sm:py-6`}>

        <div className="flex flex-wrap-reverse gap-5 justify-around items-center md:items-end">
          <div>
            <h3 className="text-xl mx-6">Your Cart</h3>
            <div className="grid grid-cols-1 gap-4 items-start m-4">
              {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity} />
              ))}
            </div>
          </div>
          {cart?.items.length != 0 &&
            <div className="flex flex-col justify-center items-end m-3 px-3 w-full sm:w-[500px] md:w-auto">
              <div className="card card-bordered border-gray-300 mt-6 h-min w-full">
                <h3 className="text-center text-xl mt-3">Order Summary</h3>
                <div className="card-body items-center w-full sm:w-auto gap-3">
                  <div className="flex justify-between w-full">
                    <p className="text-xl"> Cart Total:</p>
                    <p className="text-right text-xl">{formatPrice(cart?.subtotal || 0)}</p>
                  </div>
                  <PlaceOrderButton />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );

}