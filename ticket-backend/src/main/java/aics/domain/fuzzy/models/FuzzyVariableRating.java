package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableRatingFields;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.HashMap;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class FuzzyVariableRating implements Serializable, FuzzyVariableI {
    private FuzzyVariableDistributionPart varBad;
    private FuzzyVariableDistributionPart varAverage;
    private FuzzyVariableDistributionPart varGood;
    private FuzzyVariableDistributionPart varVeryGood;

    @Override
    public HashMap<String, FuzzyVariableDistributionPart> getFuzzyVariableMap() {
        HashMap<String, FuzzyVariableDistributionPart> fuzzyVariableMap = new HashMap<>();
        fuzzyVariableMap.put(FuzzyVariableRatingFields.BAD.name(), this.varBad);
        fuzzyVariableMap.put(FuzzyVariableRatingFields.AVERAGE.name(), this.varAverage);
        fuzzyVariableMap.put(FuzzyVariableRatingFields.GOOD.name(), this.varGood);
        fuzzyVariableMap.put(FuzzyVariableRatingFields.VERY_GOOD.name(), this.varVeryGood);
        return fuzzyVariableMap;
    }
}
