'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function  createInvoice(formData: FormData): Promise<void>{
    const supabase = await createClient();

    const {data, error} = await supabase.from('invoices')
    .insert([
        {
            customer_name: formData.get('customer'),
            amount: Number(formData.get('amount')),
            status: formData.get('status'),
        }
    ])
    if(error){
        throw new Error(error.message)
    }
    revalidatePath('/invoices')
    redirect('/invoices')
   
}


export async function updateInvoice( formData: FormData){
    const id = formData.get('id') as string;
    console.log(id)
    console.log(formData.get('customer_name'))
    
  const  supabase = await createClient()
  const {error} = await supabase.from('invoices')
  .update({
    customer_name: formData.get('customer_name'),
    amount: Number(formData.get('amount')),
    status: formData.get('status'),
  })
 .eq('id', id)

 if(error) throw new Error(error.message)

    revalidatePath('/invoices')
    redirect('/invoices')
    

}

export async function deleteInvoice(formData: FormData){
      const id = formData.get("id") as string;
    const supabase = await createClient();
    const {error} = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)

    if(error) throw new Error(error.message)
        revalidatePath('invoices')
}
