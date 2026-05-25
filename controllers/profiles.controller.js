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
