const envConfig = {
  port: process.env.PORT || 3000,

  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

export default envConfig;
