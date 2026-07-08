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

const { data: buckets, error: listErr } = await sb.storage.listBuckets();
if (listErr) { console.error("List error:", listErr.message); process.exit(1); }

console.log("Existing buckets:", buckets.map(b => b.name).join(", "));

if (buckets.some(b => b.name === "awn-archive")) {
  console.log('Bucket "awn-archive" already exists.');
} else {
  const { data, error } = await sb.storage.createBucket("awn-archive", { public: true });
  if (error) {
    console.error("Create error:", error.message);
  } else {
    console.log('Bucket "awn-archive" created successfully.');
  }
}
