package aics.domain.fuzzy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class FuzzyProfileData implements Serializable {
    private FuzzyVariableYear fuzzyVariableYear;
    private FuzzyVariableRating fuzzyVariableRating;
    private FuzzyVariablePopularity fuzzyVariablePopularity;
    private FuzzyVariableDuration fuzzyVariableDuration;
}
