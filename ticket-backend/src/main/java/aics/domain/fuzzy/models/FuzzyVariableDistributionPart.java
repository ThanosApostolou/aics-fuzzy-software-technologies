package aics.domain.fuzzy.models;

import aics.domain.fuzzy.constants.FuzzyVariableDistributionType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = FuzzyVariableDistributionPartTriangular.class, name = "TRIANGULAR"),
        @JsonSubTypes.Type(value = FuzzyVariableDistributionPartTriangular.class, name = "TRAPEZOIDAL"),
})
public abstract class FuzzyVariableDistributionPart {
    private FuzzyVariableDistributionType type;
}
