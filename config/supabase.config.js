import { createClient } from "@supabase/supabase-js";
import envConfig from "./env.config.js";

const supabase = createClient(
  envConfig.supabaseUrl,
  envConfig.supabaseServiceRoleKey,
);

export default supabase;
