package profilepage.backend.service;

import profilepage.backend.controller.ProfileDataNotFoundException;
import profilepage.backend.model.ProfileData;

public interface ProfileDataService {
    public ProfileData getProfileData() throws ProfileDataNotFoundException;
    public ProfileData updateProfileData(ProfileData newProfileData);
}