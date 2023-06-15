package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDistributionType;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FuzzyVariableDistributionPartTriangular extends FuzzyVariableDistributionPart implements Serializable {
    private final Integer a;
    private final int b;
    private final Integer c;

    public FuzzyVariableDistributionPartTriangular(Integer a, int b, Integer c) {
        this.setType(FuzzyVariableDistributionType.TRIANGULAR);
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
