import BreadCrumb from "./BreadCrumb";
import { useState } from "react";
import breadCrumb from "../assets/BreadCrumbs/bankBreadcrumb.png"
import "./chat/Admindashboard.css"
const Accounts: React.FC = () => {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({ bankName: '', accNumber: '', accComment: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };
    const handleAddAccount = () => {
        
        setAccounts([...accounts, newAccount]);
        setNewAccount({ bankName: '', accNumber: '', accComment: '' });
    };
    return (
        <>
            <BreadCrumb parentPageLink='/' ParentPage="Home" pageName="Local Accounts" ChildPage="Accounts" imageUrl={breadCrumb} />
            <div className="container mt-5">
                <h2 className="font-semibold tracking-wider ">
                    Add Accounts
                </h2>
            </div>
            <div className="max-w-md mx-auto   my-8 p-4 accountsCard rounded-xl">
                <h1 className="text-xl font-bold mb-4">Add Account</h1>
                <div className="mb-4">
                    <label className="block mb-2">Bank Name:</label>
                    <input
                    
                        type="text"
                        name="bankName"
                        value={newAccount.bankName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Account Number:</label>
                    <input
                    required
                        type="text"
                        name="accNumber"
                        value={newAccount.accNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Account Comment:</label>
                    <input
                        type="text"
                        name="accComment"
                        placeholder="Eg: Acc Title: XYZ or any other information"
                        value={newAccount.accComment}
                        onChange={handleInputChange}
                        className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleAddAccount}
                    className="standarButton-1">
                    Add Account
                </button>
            </div>
            <div className="container my-5">
                <div>
                    <h2 className="font-semibold tracking-wider ">
                        Existing Accounts
                    </h2>

                    {accounts.length === 0 &&  <p className="mt-3 mb-10 text-danger">*No Account </p>}
                </div>
                {/* Dynamic Card */}
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
    {accounts.map((account, index) => (
        <div key={index} className="my-4 flex bg-stone-300 accountsCard rounded-md hover:shadow-md">
            <div className="flex-grow p-3">
                <div>
                    <h5 className="font-semibold tracking-widest my-2">Bank Name</h5>
                    <p>{account.bankName}</p>
                </div>
                <div>
                    <h5 className="font-semibold tracking-widest my-2">Account Number</h5>
                    <p>{account.accNumber}</p>
                </div>
                <div>
                    <h5 className="font-semibold first-letter:tracking-widest my-2">Additional Comments</h5>
                    <p>{account.accComment}</p>
                </div>
            </div>
        </div>
    ))}
</div>



            </div>
        </>
    );
};
export default Accounts;
