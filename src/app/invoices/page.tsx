import Search from "./search";
import Table from "./table";
import Pagination from "./pagination";
import { fetchInvoicesPages } from "../lib/data";
import { createClient } from "@/utils/supabase/server";
import { deleteInvoice, updateInvoice } from "../lib/actions";
import Link from "next/link";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  const supabase = await createClient();
  const { data: invoices, error } = await supabase.from("invoices").select("*");

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h1>Invoices</h1>
        <Search placeholder="Search invoices..." />
        <Table query={query} currentPage={currentPage} />
        <Pagination totalPages={totalPages} />

        {invoices?.map((invoice) => (
          <div key={invoice.id}>
            <p>
              {invoice.customer} - {invoice.amount} - {invoice.status}
            </p>
            {/* Delete button */}
            <form action={deleteInvoice}>
              <input type="hidden" name="id" value={invoice.id} />
              <button type="submit">Delete</button>
            </form>
         
            <Link href={`/invoices/${invoice.id}/edit`}>
              <button type="button">Update</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );

}
