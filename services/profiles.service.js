import supabase from "../config/supabase.config.js";

class ProfileService {
  async findAll() {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) throw error;
    return data;
  }

  async findOne(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (error) throw error;

    return data;
  }

  async create(profileData) {
    const { data, error } = await supabase
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(userId, profileData) {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(userId) {
    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) throw error;

    return true;
  }
}

export default ProfileService;
