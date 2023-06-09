package aics.domain.fuzzy.etities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import jakarta.persistence.*;

@Entity(name = "FUZZY_CONFIGURATION")
@Getter
@Setter
@Accessors(chain = true)
public class FuzzyConfiguration {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FUZZY_CONFIGURATION_ID")
    private Long fuzzyConfigurationId;

    // ASSOCIATIONS
    @OneToOne
    @JoinColumn(name = "ACTIVE_FUZZY_PROFILE", nullable = false, updatable = true)
    private FuzzyProfile activeFuzzyProfile;

}
