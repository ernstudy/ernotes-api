import { json } from "express";
import AuthService from "../services/auth.service.js";
import ProfileService from "../services/profiles.service.js";
import supabase from "../config/supabase.config.js";
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

export const createUserWithProfileController = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const data = await createUser(email, password);
    const userID = data.user.id;

    const newProfileData = await createProfile(userID, name);

    res.status(201).json(newProfileData);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedUserData = await authService.loginUser(email, password);
    const loggedUser = loggedUserData.user;

    const data = {
      message: "user has logged succefull!",
      loggedUser,
    };

    console.log("access token:", loggedUserData.session.access_token);
    console.log("autorization", loggedUser.aud);
    const user = await supabase.auth.getUser(
      loggedUserData.session.access_token,
    );
    console.log("user logged in", user);

    res.status(201).json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
