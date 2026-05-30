import supabaseAdmin from "../config/supabaseAdmin.config.js";
class AuthService {
  async registerUser(email, password) {
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async loginUser(email, password) {
    const loginData = {
      email,
      password,
    };
    const { data, error } =
      await supabaseAdmin.auth.signInWithPassword(loginData);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async logoutUser(userId) {
    const { error } = await supabaseAdmin.auth.signOut(userId);

    if (error) {
      throw new Error(error.message);
    }

    return {};
  }

  async deleteUser(userId) {
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findUserById(userId) {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export default AuthService;
