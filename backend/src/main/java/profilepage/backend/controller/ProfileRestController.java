package profilepage.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import profilepage.backend.service.ProfileDataService;

@RestController
public class ProfileRestController {

	@Autowired
	private ProfileDataService profileDataService;

	@GetMapping("/profile")
	public ProfileData getProfileData() throws ProfileDataNotFoundException {
		return profileDataService.getProfileData();
	}
	
	@PutMapping("/profile")
	public ResponseEntity<Void> updateProfileData(@Valid @RequestBody ProfileData newProfileData) {
		if ( profileDataService.updateProfileData(newProfileData) == null ) {
			return ResponseEntity.notFound().build();
		}
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