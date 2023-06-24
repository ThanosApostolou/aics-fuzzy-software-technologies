package aics.domain.fuzzy.models;

import java.util.HashMap;

public interface FuzzyVariableI {
    public static FuzzyValue fuzzyValueFromVariableAndValue(FuzzyVariableI fuzzyVariable, double x) {
        final double a = fuzzyVariable.find1stPart().calculateFuzzyValuePart(x);
        final double b = fuzzyVariable.find2ndPart().calculateFuzzyValuePart(x);
        final double c = fuzzyVariable.find3rdPart().calculateFuzzyValuePart(x);
        final double d = fuzzyVariable.find4thPart().calculateFuzzyValuePart(x);
        return new FuzzyValue(a, b, c, d);
    }

    HashMap<String, FuzzyVariableDistributionPart> getFuzzyVariableMap();


    FuzzyVariableDistributionPart find1stPart();

    FuzzyVariableDistributionPart find2ndPart();

    FuzzyVariableDistributionPart find3rdPart();

    FuzzyVariableDistributionPart find4thPart();
}
