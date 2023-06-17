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
}
