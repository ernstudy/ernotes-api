import { createClient } from "@supabase/supabase-js";
import config from "./config.js";

const supabase = createClient(
  config.supabaseUrl,
  config.supabaseServiceRoleKey,
);

export default supabase;
