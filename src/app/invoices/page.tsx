import Search from "./search";
import Table from "./table";
import Pagination from "./pagination";
import { fetchInvoicesPages } from "../lib/data";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Invoices</h1>
      <Search placeholder="Search invoices..." />
      <Table query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
