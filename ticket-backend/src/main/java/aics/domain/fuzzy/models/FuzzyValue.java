package aics.domain.fuzzy.models;

import lombok.experimental.Accessors;

import java.io.Serializable;

@Accessors(chain = true)
public record FuzzyValue(double a, double b, double c, double d) implements Serializable {

    public String toFormattedString() {
        final double roundFactor = 1000.0;
        return "(%s, %s, %s, %s)".formatted(
                String.valueOf(Math.round(this.a * roundFactor) / roundFactor),
                String.valueOf(Math.round(this.b * roundFactor) / roundFactor),
                String.valueOf(Math.round(this.c * roundFactor) / roundFactor),
                String.valueOf(Math.round(this.d * roundFactor) / roundFactor)
        );
    }
}
