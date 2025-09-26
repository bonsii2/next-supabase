import { createClient } from "@/utils/supabase/server";
import { updateInvoice } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import InvoiceSearch from "../../invoicesearch/page";
type props = {
    params: {id: string}
}
export default async function EditInvoicePage({params}: props) {
    const invoiceId = params.id;
    

    const supabase = await createClient();
    const {data: invoice, error} = await supabase.from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .single();
    
    if (!invoiceId) {
      notFound();
    }
    
    if(error) throw new Error(error.message);
    return (
      <>
        <form action={updateInvoice}>
          <input type="hidden" name="id" value={invoice.id} />
          <input
            type="text"
            name="customer_name"
            defaultValue={invoice.customer_name}
            required
          />
          <input
            type="number"
            name="amount"
            defaultValue={invoice.amount}
            required
          />

          <select name="status" defaultValue={invoice.status}>
            <option value="pending">pending</option>
            <option value="paid">paid</option>
          </select>
          <button type="submit"> update Invoice</button>
        </form>
        <InvoiceSearch />
        
      </>
    );
}