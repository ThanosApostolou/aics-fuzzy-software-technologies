package aics.domain.fuzzy.dtos;

import aics.domain.fuzzy.models.TopsisDataRow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
@RequiredArgsConstructor
@AllArgsConstructor
public class TopsisDataRowDto implements Serializable {
    private Long movieId;
    private String name;
    private String rating;
    private String popularity;
    private String year;
    private String duration;
    private String dminus;
    private String dplus;
    private String s;

    public static TopsisDataRowDto fromTopsisDataRow(TopsisDataRow topsisDataRow, boolean showDminus, boolean showDplus, boolean showS) {
        if (topsisDataRow == null) {
            return null;
        }
        final double roundFactor = 1000.0;
        return new TopsisDataRowDto(topsisDataRow.getMovieId(),
                topsisDataRow.getName(),
                String.valueOf(Math.round(topsisDataRow.getRating() * roundFactor) / roundFactor),
                String.valueOf(Math.round(topsisDataRow.getPopularity() * roundFactor) / roundFactor),
                String.valueOf(Math.round(topsisDataRow.getYear() * roundFactor) / roundFactor),
                String.valueOf(Math.round(topsisDataRow.getDuration() * roundFactor) / roundFactor),
                showDminus ? String.valueOf(Math.round(topsisDataRow.getDminus() * roundFactor) / roundFactor) : "",
                showDplus ? String.valueOf(Math.round(topsisDataRow.getDplus() * roundFactor) / roundFactor) : "",
                showS ? String.valueOf(Math.round(topsisDataRow.getS() * roundFactor) / roundFactor) : ""
        );
    }
}
