package aics.domain.fuzzy;

import aics.domain.fuzzy.constants.FuzzySearchChoices;
import aics.domain.fuzzy.dtos.*;
import aics.domain.fuzzy.etities.FuzzyProfile;
import aics.domain.fuzzy.models.ConcreteWeights;
import aics.domain.fuzzy.models.FuzzySearchResult;
import aics.domain.fuzzy.models.TopsisDataRow;
import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.movie.entities.Movie;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class FuzzySearchService {
    @Inject
    FuzzyProfileService fuzzyProfileService;
    @Inject
    FuzzySearchValidator fuzzySearchValidator;

    public FuzzySearchResult fuzzySearch(List<Movie> movies, FuzzySearchFiltersDto fuzzySearchFiltersDto) {
        FuzzyProfile activeProfile = this.fuzzyProfileService.findActiveProfileOrDefault();

        List<TopsisDataRow> table1InitialData = this.calculateTable1InitialDate(movies);

        List<TopsisDataRow> table2NormalizedData = this.calculateTable2NormalizedData(table1InitialData);

        List<MovieListItemDto> movieDtos = CollectionUtils.isNotEmpty(movies)
                ? movies.stream().map(MovieListItemDto::fromMovie).toList()
                : new ArrayList<>();

        FuzzySearchDebugInfoDto createFuzzySearchDebugInfoDto = this.createFuzzySearchDebugInfoDto(activeProfile, fuzzySearchFiltersDto, table1InitialData, table2NormalizedData);
        return new FuzzySearchResult(
                movieDtos,
                createFuzzySearchDebugInfoDto
        );
    }

    private List<TopsisDataRow> calculateTable1InitialDate(List<Movie> movies) {
        return movies.stream().map(movie -> new TopsisDataRow(
                movie.getMovieId(),
                movie.getName(),
                movie.getRating(),
                movie.getPopularity(),
                movie.getYear(),
                movie.getDuration(),
                0, 0, 0)).collect(Collectors.toList()
        );
    }

    private List<TopsisDataRow> calculateTable2NormalizedData(final List<TopsisDataRow> table1InitialData) {
        List<TopsisDataRow> table2NormalizedData = new ArrayList<>();

        for (int i = 0; i < table1InitialData.size(); i++) {
            final TopsisDataRow currentDataRow = table1InitialData.get(i);
            double otherRatingSquaredSum = 0;
            double otherPopularitySquaredSum = 0;
            double otherYearSquaredSum = 0;
            double otherDurationSquaredSum = 0;
            for (int j = 0; j < table1InitialData.size(); j++) {
                if (i != j) {
                    otherRatingSquaredSum += Math.pow(table1InitialData.get(j).getRating(), 2);
                    otherPopularitySquaredSum += Math.pow(table1InitialData.get(j).getPopularity(), 2);
                    otherYearSquaredSum += Math.pow(table1InitialData.get(j).getYear(), 2);
                    otherDurationSquaredSum += Math.pow(table1InitialData.get(j).getDuration(), 2);
                }
            }
            final double rating = currentDataRow.getRating();
            final double popularity = currentDataRow.getPopularity();
            final double year = currentDataRow.getYear();
            final double duration = currentDataRow.getDuration();
            TopsisDataRow normalizedDataRow = new TopsisDataRow(
                    currentDataRow.getMovieId(),
                    currentDataRow.getName(),
                    rating / Math.sqrt(otherRatingSquaredSum),
                    popularity / Math.sqrt(otherPopularitySquaredSum),
                    year / Math.sqrt(otherYearSquaredSum),
                    duration / Math.sqrt(otherDurationSquaredSum),
                    0, 0, 0
            );
            table2NormalizedData.add(normalizedDataRow);
        }

        return table2NormalizedData;
    }


    private FuzzySearchDebugInfoDto createFuzzySearchDebugInfoDto(FuzzyProfile activeProfile,
                                                                  FuzzySearchFiltersDto fuzzySearchFiltersDto,
                                                                  List<TopsisDataRow> table1InitialData,
                                                                  List<TopsisDataRow> table2NormalizedData) {
        ConcreteWeights concreteWeights = activeProfile.getFuzzyProfileData().getConcreteWeights();
        EnumMap<FuzzySearchChoices, Double> choiceToWeightMap = this.getChoiceToWeightMap(fuzzySearchFiltersDto, concreteWeights);
        final double roundFactor = 1000.0;
        String weightRating = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.RATING) * roundFactor) / roundFactor);
        String weightPopularity = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.POPULARITY) * roundFactor) / roundFactor);
        String weightYear = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.YEAR) * roundFactor) / roundFactor);
        String weightDuration = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.DURATION) * roundFactor) / roundFactor);

        TopsisDataRowDto weightsRow = new TopsisDataRowDto(0L, "WEIGHTS", weightRating, weightPopularity, weightYear, weightDuration, "", "", "");
        // table1
        List<TopsisDataRowDto> table1InitialDataDtos = table1InitialData.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, false, false, false)).collect(Collectors.toList());
        table1InitialDataDtos.add(weightsRow);
        TopsisDataTableDto table1InitialDataDto = new TopsisDataTableDto(table1InitialDataDtos, false, false, false);

        // table2
        List<TopsisDataRowDto> table2NormalizedDataDtos = table2NormalizedData.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, false, false, false)).collect(Collectors.toList());
        table2NormalizedDataDtos.add(weightsRow);
        TopsisDataTableDto table2NormalizedDataDto = new TopsisDataTableDto(table2NormalizedDataDtos, false, false, false);

        RegularTopsisInfoDto regularTopsisInfoDto = new RegularTopsisInfoDto(table1InitialDataDto, table2NormalizedDataDto);

        return new FuzzySearchDebugInfoDto(FuzzyProfileDto.fromFuzzyProfile(activeProfile),
                fuzzySearchFiltersDto,
                regularTopsisInfoDto);
    }

    private EnumMap<FuzzySearchChoices, Double> getChoiceToWeightMap(FuzzySearchFiltersDto fuzzySearchFiltersDto, ConcreteWeights concreteWeights) {
        EnumMap<FuzzySearchChoices, Double> choiceToWeightMap = new EnumMap<>(FuzzySearchChoices.class);
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice1(), concreteWeights.getChoice1());
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice2(), concreteWeights.getChoice2());
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice3(), concreteWeights.getChoice3());
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice4(), concreteWeights.getChoice4());
        return choiceToWeightMap;

    }
}