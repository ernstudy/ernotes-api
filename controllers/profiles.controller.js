import ProfileService from "../services/profiles.service.js";

const profileService = new ProfileService();

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
