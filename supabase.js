const SUPABASE_URL = "https://ppzroycwtalmplfcuifx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwenJveWN3dGFsbXBsZmN1aWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjY0NTUsImV4cCI6MjA4NzU0MjQ1NX0.3mBeo_CWa4umRydTc4ToduqWzd0jYJVc6e5g67YxMIg";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);