import { isSupabaseConfigured, supabase } from "./supabase";

export async function submitContactLead(payload) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const { error } = await supabase.from("contact_leads").insert([payload]);

  if (error) {
    throw error;
  }
}
