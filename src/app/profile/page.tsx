import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import BankAccountModal from "./AddBankAccount";
import AddressModal from "./AddAddress";
import AddressData from "./Address";
import DeleteAccount from "./deleteAccount";


export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <div className="my-5 px-3 sm:px-8 max-w-[800px]">
            
            <h3 className="text-lg font-medium  pt-3">Profile</h3>
            <p className="text-gray-700 pb-3 text-sm">Your account details are shown here. You can edit your account details.</p>
            <div className="border-t-[1px] my-3"></div>
            <div className="flex justify-between py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 w-[430px]" >
                    <h4 className="font-medium">Full name</h4>
                    <p>{user?.name}</p>
                </div>
                <div className="flex items-end">
                    <button className="link link-hover text-blue-700 font-medium transition-colors duration-150 w-min h-min">Update</button>
                </div>
            </div>
            <div className="border-t-[1px] my-3"></div>
            <div className="flex justify-between py-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 w-[430px]" >
                    <h4 className="font-medium">Email</h4>
                    <p>{user?.email}</p>
                </div>
                <div className="flex items-end">
                    <button className="link link-hover text-blue-700 font-medium transition-colors w-min h-min">Update</button>
                </div>
            </div>
            <div className="border-t-[1px] mt-3 mb-3 sm:mb-12"></div>
            <h3 className="text-lg font-medium  pt-3">Address</h3>
            <p className="text-gray-700 pb-3 text-sm">Saved addresses</p>
            <AddressData/>
            <AddressModal/>

            <div className="mt-3 mb-12"></div>

            <h3 className="text-lg font-medium  pt-3">Bank Accounts</h3>
            <p className="text-gray-700 pb-3 text-sm">Bank accounts linked to your account</p>
            <BankAccountModal/>

            <div className="mt-3 mb-12"></div>
            <DeleteAccount/>
        </div>
    );
}