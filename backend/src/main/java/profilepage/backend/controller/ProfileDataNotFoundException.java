package profilepage.backend.controller;

public class ProfileDataNotFoundException extends Exception {

    private static final long serialVersionUID = 1L;

    public ProfileDataNotFoundException() {
        super("Could not find any profile data.");
    }
}