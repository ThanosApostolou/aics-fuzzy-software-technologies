package aics.domain.fuzzy.models;

import java.util.HashMap;

public interface FuzzyVariableI {
    HashMap<String, FuzzyVariableDistributionPart> getFuzzyVariableMap();
}
