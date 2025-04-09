import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cknarcnpwneuuknllqpu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbmFyY25wd25ldXVrbmxscXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MjA1MjQsImV4cCI6MjA1Mzk5NjUyNH0.nMmh2v-Za0OdFKVpKpsofqPA_ea73AvkSy7WFd8u6iE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
