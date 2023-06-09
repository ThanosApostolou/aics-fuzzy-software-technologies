package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariablePopularityFields;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.HashMap;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class FuzzyVariablePopularity implements Serializable, FuzzyVariableI {
    private FuzzyVariableDistributionPart varVeryPopular;
    private FuzzyVariableDistributionPart varPopular;
    private FuzzyVariableDistributionPart varAverage;
    private FuzzyVariableDistributionPart varUnpopular;

    @Override
    public HashMap<String, FuzzyVariableDistributionPart> getFuzzyVariableMap() {
        HashMap<String, FuzzyVariableDistributionPart> fuzzyVariableMap = new HashMap<>();
        fuzzyVariableMap.put(FuzzyVariablePopularityFields.VERY_POPULAR.name(), this.varVeryPopular);
        fuzzyVariableMap.put(FuzzyVariablePopularityFields.POPULAR.name(), this.varVeryPopular);
        fuzzyVariableMap.put(FuzzyVariablePopularityFields.AVERAGE.name(), this.varVeryPopular);
        fuzzyVariableMap.put(FuzzyVariablePopularityFields.UNPOPULAR.name(), this.varVeryPopular);
        return fuzzyVariableMap;
    }
}
