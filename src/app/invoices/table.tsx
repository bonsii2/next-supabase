import { fetchInvoices } from "../lib/data";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchInvoices(query, currentPage);

  if (invoices.length === 0) {
    return <p>No invoices found.</p>;
  }

  return (
    <table border={1} cellPadding={8} style={{ marginTop: "1rem" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.name}</td>
            <td>${invoice.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
