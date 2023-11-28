import DeleteAddressButton from "@/app/profile/deleteAddressButton";
import { getAddress } from "@/lib/db/addr";

export default async function AddressData() {
    const userAddress = await getAddress();

    if(!userAddress?.items.length)
    {
        return (
        <p className="mb-2">No addresses saved</p>
        );
    }

    return (
        <div>
            <div className="border-t-[1px] mt-3"></div>
            {userAddress?.items.map((addressItem, index) => (
                <div className="py-3" key={addressItem.id}>
                    <div className="flex justify-between">
                        <h4 className="font-medium">Address {index + 1}</h4>
                        <div className="flex gap-4">
                            <button className="link link-hover text-blue-700 font-medium transition-colors w-min h-min">Edit</button>
                           <DeleteAddressButton id={addressItem.id} />
                        </div>
                    </div>
                    <p className="">{addressItem.name + ", " + addressItem.buildingNo + ", " + addressItem.street + ", " + addressItem.city + ", " + addressItem.state
                        + ", " + addressItem.postalCode}</p>
                    <div className="border-t-[1px] mt-5"></div>
                </div>
            ))}
        </div>
    );
}