//package aics.domain.fuzzy.etities;
//
//import aics.domain.fuzzy.models.FuzzyProfileData;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.experimental.Accessors;
//import org.hibernate.annotations.Type;
//
//import javax.persistence.*;
//
//@Entity(name = "FUZZY_PROFILE")
//@Getter
//@Setter
//@Accessors(chain = true)
//public class FuzzyProfile {
//    @Id()
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "FUZZY_PROFILE_ID")
//    private Long fuzzyProfileId;
//    @Column(name = "FUZZY_PROFILE_DATA", columnDefinition = "json", nullable = false)
//    @Type(type = "json")
//    private FuzzyProfileData fuzzyProfileData;
//    @Column(name = "ENABLE_DEBUG", columnDefinition = "json", nullable = false)
//    private boolean enableDebug;
//
//}
