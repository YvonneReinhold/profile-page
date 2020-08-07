package profilepage.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import profilepage.backend.controller.ProfileDataNotFoundException;
import profilepage.backend.model.ProfileData;
import profilepage.backend.model.ProfileDataRepository;
import profilepage.backend.service.ProfileDataService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProfileDataServiceTests {

	@Autowired
	private ProfileDataService profileDataService;
	@MockBean
	private ProfileDataRepository profileDataRepository;

	@Before
	public void setUp() {
		ProfileData maxMuster = new ProfileData();
		maxMuster.setId(1L);
		maxMuster.setName("Max Muster");
		maxMuster.setDescription("Bin ein toller Kerl.");
		maxMuster.setImage("http://localhost:3000/bild001.jpg");
		maxMuster.setLink("http://google.de");

		Optional<ProfileData> maxMusterOptional = Optional.of(maxMuster);

		Mockito.when(profileDataRepository.findById(maxMuster.getId())).thenReturn(maxMusterOptional);
	}

	@Test
	public void whenValidId_thenProfileDataShouldBeFound() throws ProfileDataNotFoundException {
		ProfileData profileDataFound = profileDataService.getProfileData();

		assertThat(profileDataFound.getId()).isEqualTo(1L);
		assertThat(profileDataFound.getName()).isEqualTo("Max Muster");
		assertThat(profileDataFound.getDescription()).isEqualTo("Bin ein toller Kerl.");
		assertThat(profileDataFound.getImage()).isEqualTo("http://localhost:3000/bild001.jpg");
		assertThat(profileDataFound.getLink()).isEqualTo("http://google.de");
	}
}
