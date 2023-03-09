import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mohcxviiclxxhwbvdzog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vaGN4dmlpY2x4eGh3YnZkem9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5MTM5ODgsImV4cCI6MTk5MTQ4OTk4OH0.ahfdv9QG5Pdi2qWh4n4CJ3wMfZiE0bYhWkH_6Fkj2d8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
