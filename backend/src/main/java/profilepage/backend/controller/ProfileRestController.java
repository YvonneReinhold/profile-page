package profilepage.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import profilepage.backend.model.ProfileData;
import profilepage.backend.model.ProfileDataRepository;

@RestController
public class ProfileRestController {

	private ProfileDataRepository profileDataRepository;

	public ProfileRestController(ProfileDataRepository profileDataRepository) {
		this.profileDataRepository = profileDataRepository;
	}
	
	@GetMapping("/profile")
	public ProfileData getProfileData() throws ProfileDataNotFoundException {
		return profileDataRepository.findById(1L).orElseThrow(() -> new ProfileDataNotFoundException());
	}
	
	@PutMapping("/profile")
	public ResponseEntity<Void> updateProfileData(@Valid @RequestBody ProfileData newProfileData) {

		if ( profileDataRepository.findById(newProfileData.getId()).isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		profileDataRepository.save(newProfileData);
		return ResponseEntity.ok().build();		
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(
	  MethodArgumentNotValidException ex) {
	    Map<String, String> errors = new HashMap<>();
	    ex.getBindingResult().getAllErrors().forEach((error) -> {
	        String fieldName = ((FieldError) error).getField();
	        String errorMessage = error.getDefaultMessage();
	        errors.put(fieldName, errorMessage);
	    });
	    return errors;
	}
}