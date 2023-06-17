package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDistributionType;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Objects;

@Data
@Accessors(chain = true)
public class FuzzyVariableDistributionPartTrapezoidal extends FuzzyVariableDistributionPart implements Serializable {
    private String partName;
    private final Integer a;
    private final int b;
    private final int c;
    private final Integer d;

    public FuzzyVariableDistributionPartTrapezoidal(String partName, Integer a, int b, int c, Integer d) {
        this.setType(FuzzyVariableDistributionType.TRAPEZOIDAL);
        this.partName = partName;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    @Override
    public int getFirstValue() {
        return Objects.requireNonNullElse(this.a, this.b);
    }

    @Override
    public int getLastValue() {
        return Objects.requireNonNullElse(this.d, this.c);
    }
}
