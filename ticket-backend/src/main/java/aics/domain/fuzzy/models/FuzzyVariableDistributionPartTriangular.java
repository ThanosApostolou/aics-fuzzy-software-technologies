package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDistributionType;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Objects;

@Data
@Accessors(chain = true)
public class FuzzyVariableDistributionPartTriangular extends FuzzyVariableDistributionPart implements Serializable {
    private String partName;
    private final Integer a;
    private final int b;
    private final Integer c;

    public FuzzyVariableDistributionPartTriangular(String partName, Integer a, int b, Integer c) {
        this.setType(FuzzyVariableDistributionType.TRIANGULAR);
        this.partName = partName;
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public int getFirstValue() {
        return Objects.requireNonNullElse(this.a, this.b);
    }

    @Override
    public int getLastValue() {
        return Objects.requireNonNullElse(this.c, this.b);
    }
}
