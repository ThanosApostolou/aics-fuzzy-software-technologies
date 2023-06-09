package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDurationFields;
import aics.domain.fuzzy.constants.FuzzyVariableYearFields;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.HashMap;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class FuzzyVariableDuration implements Serializable, FuzzyVariableI {
    private FuzzyVariableDistributionPart varSmall;
    private FuzzyVariableDistributionPart varAverage;
    private FuzzyVariableDistributionPart varBig;
    private FuzzyVariableDistributionPart varHuge;

    @Override
    public HashMap<String, FuzzyVariableDistributionPart> getFuzzyVariableMap() {
        HashMap<String, FuzzyVariableDistributionPart> fuzzyVariableMap = new HashMap<>();
        fuzzyVariableMap.put(FuzzyVariableDurationFields.SMALL.name(), this.varSmall);
        fuzzyVariableMap.put(FuzzyVariableDurationFields.AVERAGE.name(), this.varAverage);
        fuzzyVariableMap.put(FuzzyVariableDurationFields.BIG.name(), this.varBig);
        fuzzyVariableMap.put(FuzzyVariableDurationFields.HUGE.name(), this.varHuge);
        return fuzzyVariableMap;
    }
}
