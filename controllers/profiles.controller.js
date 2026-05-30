import AuthService from "../services/auth.service.js";
import ProfileService from "../services/profiles.service.js";

const profileService = new ProfileService();
const authService = new AuthService();

export const getAllProfilesController = async (req, res) => {
  try {
    const profiles = await profileService.findAll();
    const data = {
      message: "Profiles retrieved successfully",
      profiles,
    };
    res.json(data);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const UpdateProfileController = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  const { name } = req.body;
  const modifiedDate = new Date().toISOString();
  const profileData = { name, updated_at: modifiedDate };

  try {
    const updatedProfile = await profileService.update(userId, profileData);

    const data = {
      message: "Profile updated successfully",
      profile: updatedProfile,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  deleteProfileController = async (req, res) => {
    // profile will be deleted when the user is deleted, so this method can be used to perform any additional cleanup if necessary
    return;
  };
};

export const findUserProfileController = async (req, res) => {
  const userId = req.user.id;
  console.log("id del usuario", userId);

  try {
    const response = await authService.findUserById(userId);
    const profile = await profileService.findOne(response.user.id);

    const data = {
      message: "user and profile data retrieved successfull!",
      user: {
        id: response.user.id,
        name: profile.name,
        authenticated: response.user.aud == "authenticated",
        email: response.user.email,
      },
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
