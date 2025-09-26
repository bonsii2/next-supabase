"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";


export default function InvoiceSearch() {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoice, setInvoice] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();

    if (error) {
      setError(error.message);
      setInvoice(null);
      
    } else {
      setInvoice(data);
      setError("");
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter invoice ID"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

     
      
      {invoice && (
        <div className="bg-amber-50 text-black mt-4 p-2">
          <p>Customer: {invoice.customer_name}</p>
          <p>Amount: {invoice.amount}</p>
          <p>Status: {invoice.status}</p>
        </div>
      )}
    </div>
  );
}
