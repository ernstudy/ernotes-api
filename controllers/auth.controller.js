import { json } from "express";
import AuthService from "../services/auth.service.js";
import ProfileService from "../services/profiles.service.js";
import supabase from "../config/supabaseAdmin.config.js";
const authService = new AuthService();
const profileService = new ProfileService();

const createUser = async (email, password) => {
  try {
    const data = await authService.registerUser(email, password);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProfile = async (userId, name) => {
  try {
    const profileData = {
      id: userId,
      name,
    };
    const newProfile = await profileService.create(profileData);

    const newProfileData = {
      message: "User registered successfully",
      profile: {
        id: newProfile.id,
        user_id: newProfile.user_id,
        name: newProfile.name,
        avatar_url: newProfile.avatar_url,
        created_at: newProfile.created_at,
        updated_at: newProfile.updated_at,
      },
    };

    return newProfileData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUserAfterRegister = async (email, password) => {
  try {
    const loggedUserData = await authService.loginUser(email, password);

    const accessToken = loggedUserData.session.access_token;
    const user = loggedUserData.user;

    // Retrieve the user's profile using the user ID
    const profile = await profileService.findOne(user.id);

    const data = {
      message: "You have logged succefull!",
      user: {
        id: user.id,
        name: profile[0].name,
        email: user.email,
        isAuthenticated: user.aud == "authenticated",
        accessToken,
      },
    };

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUserWithProfileController = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // First, create the user in Supabase Auth
    const data = await createUser(email, password);
    const userID = await data.user.id;

    // Then, create the user's profile in the "profiles" table using the user ID
    await createProfile(userID, name);

    // Log the user in immediately after registration
    const loginData = await loginUserAfterRegister(email, password);

    res.status(201).json(loginData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedUserData = await authService.loginUser(email, password);

    const accessToken = loggedUserData.session.access_token;
    const user = loggedUserData.user;

    // Retrieve the user's profile using the user ID
    const profile = await profileService.findOne(user.id);

    const data = {
      message: "You have logged succefull!",
      user: {
        id: user.id,
        name: profile[0].name,
        email: user.email,
        isAuthenticated: user.aud == "authenticated",
        accessToken,
      },
    };

    res.status(201).json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logoutUserWithProfileController = async (req, res) => {
  const userId = req.user.id;

  try {
    await authService.logoutUser(userId);
    const data = {
      message: "User logged out successfully",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedUser = await authService.deleteUser(userId);

    // user profile will be automatically deleted by supabase auth trigger, so we don't need to delete it manually
    // await profileService.delete

    const data = {
      message: "User and profile deleted successfully",
      user: deletedUser,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
