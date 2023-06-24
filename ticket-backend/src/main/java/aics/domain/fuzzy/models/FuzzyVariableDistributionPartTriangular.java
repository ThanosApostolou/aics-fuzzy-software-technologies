package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDistributionType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@ToString(callSuper = true)
@Accessors(chain = true)
public class FuzzyVariableDistributionPartTriangular extends FuzzyVariableDistributionPart implements Serializable {
    private String partName;
    private Integer a;
    private int b;
    private Integer c;

    public FuzzyVariableDistributionPartTriangular(String partName, Integer a, int b, Integer c) {
        this.setType(FuzzyVariableDistributionType.TRIANGULAR);
        this.partName = partName;
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public int findFirstValue() {
        return Objects.requireNonNullElse(this.a, this.b);
    }

    @Override
    public int findLastValue() {
        return Objects.requireNonNullElse(this.c, this.b);
    }

    @Override
    public double calculateFuzzyValuePart(double x) {
        double firstValue = this.findFirstValue();
        double lastValue = this.findFirstValue();
        if (x < firstValue || x > lastValue) {
            return 0;
        } else if (x == firstValue) {
            return this.a != null ? 0 : 1;
        } else if (x == lastValue) {
            return this.c != null ? 0 : 1;
        }

        if (x < this.b) {
            return (x - firstValue) / (this.b - firstValue);
        } else {
            return (lastValue - x) / (lastValue - this.c);
        }
    }


}
