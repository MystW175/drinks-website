export function formatPrice(price: number){
    return price.toLocaleString("en-UK", {
        style: "currency",
        currency: "INR",
    })
}