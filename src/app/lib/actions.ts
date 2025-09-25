'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

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
   
}


export async function updateInvoice(id: string, formData: FormData){
  const  supabase = await createClient()
  const {error} = await supabase.from('invoices')
  .update({
    customer: formData.get('customer_id'),
    amount: Number(formData.get('amount')),
    status: formData.get('status'),
  })
 .eq('id', id)

 if(error) throw new Error(error.message)

    revalidatePath('/invoices')

}

export async function deleteInvoice(id: string){
    const supabase = await createClient();
    const {error} = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)

    if(error) throw new Error(error.message)
        revalidatePath('invoices')
}