package profilepage.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Size;

import lombok.Data;

@Entity
@Data
public class ProfileData {

    @Id @GeneratedValue
    private Long id;

    @Column(length = 16)
    @Size(max = 16, message = "Maximum length of name is 16 characters.")
    private String name;
 
    private String image;
    private String description;
    private String link;

    public ProfileData() {}
}