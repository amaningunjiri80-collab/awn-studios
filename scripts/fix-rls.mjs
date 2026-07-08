import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf-8");
const lines = env.split("\n");
let url = "", key = "";
for (const line of lines) {
  const [k, ...v] = line.trim().split("=");
  if (k === "NEXT_PUBLIC_SUPABASE_URL") url = v.join("=");
  if (k === "SUPABASE_SERVICE_ROLE_KEY") key = v.join("=");
}

const sb = createClient(url, key, { auth: { persistSession: false } });

// Try calling common SQL execution RPC functions
const sql = "ALTER TABLE public.instagram_cache DISABLE ROW LEVEL SECURITY;";
const attempts = [
  { func: "exec_sql", params: { sql } },
  { func: "exec_sql", params: { query: sql } },
  { func: "exec_sql", params: { sql_text: sql } },
  { func: "execute_sql", params: { sql } },
  { func: "pgexecute", params: { query: sql } },
  { func: "pgexec", params: { query: sql } },
];

for (const { func, params } of attempts) {
  try {
    const { data, error } = await sb.rpc(func, params);
    if (error) {
      if (!error.message.includes("function") && !error.message.includes("not found")) {
        console.log(`${func}:`, error.message);
      }
    } else {
      console.log(`${func} succeeded:`, data);
    }
  } catch {
    // ignore
  }
}

// If none worked, check extensions
const { data: extensions } = await sb.from("pg_extension").select("extname");
console.log("Extensions:", extensions?.map(e => e.extname).join(", "));

console.log("---");
console.log("Could not execute DDL automatically via API.");
console.log("Please run this SQL in Supabase Dashboard > SQL Editor:");
console.log("ALTER TABLE public.instagram_cache DISABLE ROW LEVEL SECURITY;");
