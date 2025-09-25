import { createClient } from "@/utils/supabase/server";
import { createInvoice, deleteInvoice } from "../../lib/actions";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: invoices, error } = await supabase.from("invoices").select("*");

  if (error) throw new Error(error.message);

  return (
    <div>
      <h1>Invoices</h1>

      {/* Create form */}
      <form action={createInvoice}>
        <input type="text" name="customer" placeholder="Customer name" required />
        <input type="number" name="amount" placeholder="Amount" required />
        <select name="status">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit">Create Invoice</button>
      </form>

      {/* List invoices */}
      {invoices?.map((invoice) => (
        <div key={invoice.id}>
          <p>
            {invoice.customer} - {invoice.amount} - {invoice.status}
          </p>

          {/* Delete button */}
          <form action={async () => deleteInvoice(invoice.id)}>
            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
}
