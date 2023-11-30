"use client";

import { searchProducts } from "./actions";

export default function Searchbox() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        searchProducts(formData);
        window.scrollTo({ top: 0, behavior: "smooth" })
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="hidden md:block">
          <div className="form-control">
            <input name="searchQuery" placeholder="Search" className="input h-10 input-bordered rounded-xl pl-5 p-2 w-56 sm:w-80 text-sm" />
          </div>
        </form>
        </div>
    );
}