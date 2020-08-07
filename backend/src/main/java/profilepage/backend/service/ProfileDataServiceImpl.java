package profilepage.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import profilepage.backend.controller.ProfileDataNotFoundException;
import profilepage.backend.model.ProfileData;
import profilepage.backend.model.ProfileDataRepository;

@Service
public class ProfileDataServiceImpl implements ProfileDataService {
    
    @Autowired
    private ProfileDataRepository profileDataRepository;

    public ProfileData getProfileData() throws ProfileDataNotFoundException {
        return profileDataRepository.findById(1L).orElseThrow(() -> new ProfileDataNotFoundException());
    }

    public ProfileData updateProfileData(ProfileData newProfileData) {
        Optional<ProfileData> profileDataOptional = profileDataRepository.findById(newProfileData.getId());

		if ( profileDataOptional.isEmpty() ) {
			return null;
		}
        
        return profileDataRepository.save(newProfileData);
	}

}