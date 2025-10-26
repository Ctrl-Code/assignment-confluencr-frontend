import { supabase } from './supabase';

export const deleteRowForEmail = async(email: string)=> {
    const { data, error } = await supabase
        .from('emails_table')
        .delete()
        .eq('email', email)   // match specific email
        .select();            // optional: return deleted row(s)

    if (error) {
        console.error('Delete failed:', error);
    } else {
        alert(`deleted email ${email} with data ${data}`)
        console.log('Deleted row:', data);
    }
}