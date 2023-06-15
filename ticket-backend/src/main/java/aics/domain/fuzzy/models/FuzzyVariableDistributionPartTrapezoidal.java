package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDistributionType;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FuzzyVariableDistributionPartTrapezoidal extends FuzzyVariableDistributionPart implements Serializable {
    private final Integer a;
    private final int b;
    private final int c;
    private final Integer d;

    public FuzzyVariableDistributionPartTrapezoidal(Integer a, int b, int c, Integer d) {
        this.setType(FuzzyVariableDistributionType.TRAPEZOIDAL);
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}
