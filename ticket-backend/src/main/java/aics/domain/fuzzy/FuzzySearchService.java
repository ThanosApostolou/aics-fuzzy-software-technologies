package aics.domain.fuzzy;

import aics.domain.fuzzy.constants.FuzzySearchChoices;
import aics.domain.fuzzy.dtos.*;
import aics.domain.fuzzy.etities.FuzzyProfile;
import aics.domain.fuzzy.models.*;
import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.movie.entities.Movie;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class FuzzySearchService {
    @Inject
    FuzzyProfileService fuzzyProfileService;
    @Inject
    FuzzySearchValidator fuzzySearchValidator;

    public FuzzySearchResult fuzzySearch(List<Movie> movies, FuzzySearchFiltersDto fuzzySearchFiltersDto) {
        FuzzyProfile activeProfile = this.fuzzyProfileService.findActiveProfileOrDefault();

        Map<Long, Movie> idToMovieMap = new HashMap<>();
        for (Movie movie : movies) {
            idToMovieMap.put(movie.getMovieId(), movie);
        }

        // step1
        List<TopsisDataRow> table1InitialData = this.calculateTable1InitialDate(movies);

        if (activeProfile.isUseFuzzyTopsis()) {
            // FUZZY TOPSIS
            // TODO
            FuzzyWeights fuzzyWeights = activeProfile.getFuzzyProfileData().getFuzzyWeights();
            ConcreteWeights concreteWeights = activeProfile.getFuzzyProfileData().getConcreteWeights();
            EnumMap<FuzzySearchChoices, FuzzyValue> choiceToFuzzyWeightMap = this.getChoiceToFuzzyWeightMap(fuzzySearchFiltersDto, concreteWeights);
            // step2
            List<TopsisDataFuzzyRow> table2FuzzifiedData = this.calculateTable2FuzzifiedData(table1InitialData, activeProfile.getFuzzyProfileData());


            // generate FUZZY TOPSIS analysis
            FuzzySearchTopsisAnalysisDto createFuzzySearchTopsisAnalysisDto = this.createFuzzySearchTopsisAnalysisDtoForFuzzyTopsis(activeProfile, fuzzySearchFiltersDto, choiceToFuzzyWeightMap, table1InitialData, table2FuzzifiedData);

//            final TopsisDataFuzzyRow weightsDataRow = new TopsisDataFuzzyRow(0,
//                    "FUZZY WEIGHTS",
//
//                    );

            List<MovieListItemDto> movieDtos = new ArrayList<>();
            // TODO use table4
            for (TopsisDataRow topsisDataRow : table1InitialData) {
                Movie movie = idToMovieMap.get(topsisDataRow.getMovieId());
                movieDtos.add(MovieListItemDto.fromMovieAndTopsisScore(movie, topsisDataRow.getScore()));
            }

            return new FuzzySearchResult(
                    movieDtos,
                    createFuzzySearchTopsisAnalysisDto
            );
        } else {
            // REGULAR TOPSIS
            ConcreteWeights concreteWeights = activeProfile.getFuzzyProfileData().getConcreteWeights();
            EnumMap<FuzzySearchChoices, Double> choiceToWeightMap = this.getChoiceToWeightMap(fuzzySearchFiltersDto, concreteWeights);
            // step2
            List<TopsisDataRow> table2NormalizedData = this.calculateTable2NormalizedData(table1InitialData);
            // step3
            List<TopsisDataRow> table3WeightedNormalizedData = this.calculateTable3WeightedNormalizedData(table2NormalizedData, choiceToWeightMap);
            // step4
            List<TopsisDataRow> table4TopsisScore = this.calculateTable4TopsisScore(table3WeightedNormalizedData, fuzzySearchFiltersDto.isYearCostCriteria(), fuzzySearchFiltersDto.isDurationCostCriteria());
            // generate TOPSIS analysis
            FuzzySearchTopsisAnalysisDto createFuzzySearchTopsisAnalysisDto = this.createFuzzySearchTopsisAnalysisDtoForRegularTopsis(activeProfile, fuzzySearchFiltersDto, choiceToWeightMap, table1InitialData, table2NormalizedData, table3WeightedNormalizedData, table4TopsisScore);

            List<MovieListItemDto> movieDtos = new ArrayList<>();
            for (TopsisDataRow topsisDataRow : table4TopsisScore) {
                Movie movie = idToMovieMap.get(topsisDataRow.getMovieId());
                movieDtos.add(MovieListItemDto.fromMovieAndTopsisScore(movie, topsisDataRow.getScore()));
            }

            return new FuzzySearchResult(
                    movieDtos,
                    createFuzzySearchTopsisAnalysisDto
            );
        }
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

        double allRatingSquaredSum = 0;
        double allPopularitySquaredSum = 0;
        double allYearSquaredSum = 0;
        double allDurationSquaredSum = 0;
        for (int i = 0; i < table1InitialData.size(); i++) {
            allRatingSquaredSum += Math.pow(table1InitialData.get(i).getRating(), 2);
            allPopularitySquaredSum += Math.pow(table1InitialData.get(i).getPopularity(), 2);
            allYearSquaredSum += Math.pow(table1InitialData.get(i).getYear(), 2);
            allDurationSquaredSum += Math.pow(table1InitialData.get(i).getDuration(), 2);
        }

        for (int i = 0; i < table1InitialData.size(); i++) {
            final TopsisDataRow currentDataRow = table1InitialData.get(i);

            final double rating = currentDataRow.getRating();
            final double popularity = currentDataRow.getPopularity();
            final double year = currentDataRow.getYear();
            final double duration = currentDataRow.getDuration();
            TopsisDataRow normalizedDataRow = new TopsisDataRow(
                    currentDataRow.getMovieId(),
                    currentDataRow.getName(),
                    rating / Math.sqrt(allRatingSquaredSum),
                    popularity / Math.sqrt(allPopularitySquaredSum),
                    year / Math.sqrt(allYearSquaredSum),
                    duration / Math.sqrt(allDurationSquaredSum),
                    0, 0, 0
            );
            table2NormalizedData.add(normalizedDataRow);
        }
        return table2NormalizedData;
    }

    private List<TopsisDataRow> calculateTable3WeightedNormalizedData(final List<TopsisDataRow> table2NormalizedData,
                                                                      final EnumMap<FuzzySearchChoices, Double> choiceToWeightMap) {
        List<TopsisDataRow> table3WeightedNormalizedData = new ArrayList<>();

        for (int i = 0; i < table2NormalizedData.size(); i++) {
            final TopsisDataRow currentDataRow = table2NormalizedData.get(i);
            final double newRating = currentDataRow.getRating() * choiceToWeightMap.get(FuzzySearchChoices.RATING);
            final double newPopularity = currentDataRow.getPopularity() * choiceToWeightMap.get(FuzzySearchChoices.POPULARITY);
            final double newYear = currentDataRow.getYear() * choiceToWeightMap.get(FuzzySearchChoices.YEAR);
            final double newDuration = currentDataRow.getDuration() * choiceToWeightMap.get(FuzzySearchChoices.DURATION);
            TopsisDataRow weightedNormalizedDataRow = new TopsisDataRow(
                    currentDataRow.getMovieId(),
                    currentDataRow.getName(),
                    newRating,
                    newPopularity,
                    newYear,
                    newDuration,
                    0, 0, 0
            );
            table3WeightedNormalizedData.add(weightedNormalizedDataRow);
        }

        return table3WeightedNormalizedData;
    }


    private List<TopsisDataRow> calculateTable4TopsisScore(final List<TopsisDataRow> table3WeightedNormalizedData, boolean yearCostCriteria, boolean durationCostCriteria) {
        List<TopsisDataRow> table4TopsisScore = new ArrayList<>();

        double ratingBest = table3WeightedNormalizedData.stream().map(TopsisDataRow::getRating).max(Double::compare).get();
        double ratingWorst = table3WeightedNormalizedData.stream().map(TopsisDataRow::getRating).min(Double::compare).get();
        double popularityBest = table3WeightedNormalizedData.stream().map(TopsisDataRow::getPopularity).min(Double::compare).get();
        double popularityWorst = table3WeightedNormalizedData.stream().map(TopsisDataRow::getPopularity).max(Double::compare).get();
        double yearBest = yearCostCriteria
                ? table3WeightedNormalizedData.stream().map(TopsisDataRow::getYear).min(Double::compare).get()
                : table3WeightedNormalizedData.stream().map(TopsisDataRow::getYear).max(Double::compare).get();
        double yearWorst = yearCostCriteria
                ? table3WeightedNormalizedData.stream().map(TopsisDataRow::getYear).max(Double::compare).get()
                : table3WeightedNormalizedData.stream().map(TopsisDataRow::getYear).min(Double::compare).get();
        double durationBest = durationCostCriteria
                ? table3WeightedNormalizedData.stream().map(TopsisDataRow::getDuration).min(Double::compare).get()
                : table3WeightedNormalizedData.stream().map(TopsisDataRow::getDuration).max(Double::compare).get();
        double durationWorst = durationCostCriteria
                ? table3WeightedNormalizedData.stream().map(TopsisDataRow::getDuration).max(Double::compare).get()
                : table3WeightedNormalizedData.stream().map(TopsisDataRow::getDuration).min(Double::compare).get();

        for (int i = 0; i < table3WeightedNormalizedData.size(); i++) {
            final TopsisDataRow currentDataRow = table3WeightedNormalizedData.get(i);
            final double dpos = Math.sqrt(
                    Math.pow(currentDataRow.getRating() - ratingBest, 2)
                            + Math.pow(currentDataRow.getPopularity() - popularityBest, 2)
                            + Math.pow(currentDataRow.getYear() - yearBest, 2)
                            + Math.pow(currentDataRow.getDuration() - durationBest, 2)
            );
            final double dneg = Math.sqrt(
                    Math.pow(currentDataRow.getRating() - ratingWorst, 2)
                            + Math.pow(currentDataRow.getPopularity() - popularityWorst, 2)
                            + Math.pow(currentDataRow.getYear() - yearWorst, 2)
                            + Math.pow(currentDataRow.getDuration() - durationWorst, 2)
            );
            final double score = dneg / (dpos + dneg);
            TopsisDataRow normalizedDataRow = new TopsisDataRow(
                    currentDataRow.getMovieId(),
                    currentDataRow.getName(),
                    currentDataRow.getRating(),
                    currentDataRow.getPopularity(),
                    currentDataRow.getYear(),
                    currentDataRow.getDuration(),
                    dpos, dneg, score
            );
            table4TopsisScore.add(normalizedDataRow);
        }
        table4TopsisScore.sort(Comparator.comparing(TopsisDataRow::getScore).reversed());
        return table4TopsisScore;
    }

    private FuzzySearchTopsisAnalysisDto createFuzzySearchTopsisAnalysisDtoForRegularTopsis(FuzzyProfile activeProfile,
                                                                                            FuzzySearchFiltersDto fuzzySearchFiltersDto,
                                                                                            EnumMap<FuzzySearchChoices, Double> choiceToWeightMap,
                                                                                            List<TopsisDataRow> table1InitialData,
                                                                                            List<TopsisDataRow> table2NormalizedData, List<TopsisDataRow> table3WeightedNormalizedData, List<TopsisDataRow> table4TopsisScore) {
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
        // table3
        List<TopsisDataRowDto> table3WeightedNormalizedDataDtos = table3WeightedNormalizedData.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, false, false, false)).collect(Collectors.toList());
        TopsisDataTableDto table3WeightedNormalizedDataDto = new TopsisDataTableDto(table3WeightedNormalizedDataDtos, false, false, false);
        // table4
        List<TopsisDataRowDto> table4TopsisScoreDtos = table4TopsisScore.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, true, true, true)).collect(Collectors.toList());
        TopsisDataTableDto table4TopsisScoreDataDto = new TopsisDataTableDto(table4TopsisScoreDtos, true, true, true);

        RegularTopsisInfoDto regularTopsisInfoDto = new RegularTopsisInfoDto(table1InitialDataDto, table2NormalizedDataDto, table3WeightedNormalizedDataDto, table4TopsisScoreDataDto);

        return new FuzzySearchTopsisAnalysisDto(FuzzyProfileDto.fromFuzzyProfile(activeProfile),
                fuzzySearchFiltersDto,
                regularTopsisInfoDto,
                null);
    }

    private FuzzySearchTopsisAnalysisDto createFuzzySearchTopsisAnalysisDtoForFuzzyTopsis(FuzzyProfile activeProfile,
                                                                                          FuzzySearchFiltersDto fuzzySearchFiltersDto,
                                                                                          EnumMap<FuzzySearchChoices, FuzzyValue> choiceToFuzzyWeightMap,
                                                                                          List<TopsisDataRow> table1InitialData,
                                                                                          List<TopsisDataFuzzyRow> table2FuzzifiedData) {
        final double roundFactor = 1000.0;
        String weightRating = choiceToFuzzyWeightMap.get(FuzzySearchChoices.RATING).toFormattedString();
        String weightPopularity = choiceToFuzzyWeightMap.get(FuzzySearchChoices.POPULARITY).toFormattedString();
        String weightYear = choiceToFuzzyWeightMap.get(FuzzySearchChoices.YEAR).toFormattedString();
        String weightDuration = choiceToFuzzyWeightMap.get(FuzzySearchChoices.DURATION).toFormattedString();

        TopsisDataRowDto weightsRow = new TopsisDataRowDto(0L, "FUZZY WEIGHTS", weightRating, weightPopularity, weightYear, weightDuration, "", "", "");
        // table1
        List<TopsisDataRowDto> table1InitialDataDtos = table1InitialData.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, false, false, false)).collect(Collectors.toList());
        table1InitialDataDtos.add(weightsRow);
        TopsisDataTableDto table1InitialDataDto = new TopsisDataTableDto(table1InitialDataDtos, false, false, false);

        // table2
        List<TopsisDataRowDto> table2FuzzifiedDataDtos = table2FuzzifiedData.stream().map(topsisDataFuzzyRow -> TopsisDataRowDto.fromTopsisDataFuzzyRow(topsisDataFuzzyRow, false, false, false)).collect(Collectors.toList());
        table2FuzzifiedDataDtos.add(weightsRow);
        TopsisDataTableDto table2FuzzifiedDataDto = new TopsisDataTableDto(table2FuzzifiedDataDtos, false, false, false);
//        // table3
//        List<TopsisDataRowDto> table3WeightedNormalizedDataDtos = table3WeightedNormalizedData.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, false, false, false)).collect(Collectors.toList());
//        TopsisDataTableDto table3WeightedNormalizedDataDto = new TopsisDataTableDto(table3WeightedNormalizedDataDtos, false, false, false);
//        // table4
//        List<TopsisDataRowDto> table4TopsisScoreDtos = table4TopsisScore.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, true, true, true)).collect(Collectors.toList());
//        TopsisDataTableDto table4TopsisScoreDataDto = new TopsisDataTableDto(table4TopsisScoreDtos, true, true, true);

        FuzzyTopsisInfoDto fuzzyTopsisInfoDto = new FuzzyTopsisInfoDto(table1InitialDataDto, table2FuzzifiedDataDto);

        return new FuzzySearchTopsisAnalysisDto(FuzzyProfileDto.fromFuzzyProfile(activeProfile),
                fuzzySearchFiltersDto,
                null,
                fuzzyTopsisInfoDto);
    }


    private List<TopsisDataFuzzyRow> calculateTable2FuzzifiedData(List<TopsisDataRow> table1InitialData,
                                                                  FuzzyProfileData fuzzyProfileData
    ) {
        List<TopsisDataFuzzyRow> table2FuzzifiedData = new ArrayList<>();
        for (TopsisDataRow topsisDataRow : table1InitialData) {
            FuzzyValue ratingValue = FuzzyVariableI.fuzzyValueFromVariableAndValue(fuzzyProfileData.getFuzzyVariableRating(), topsisDataRow.getRating());
            FuzzyValue popularityValue = FuzzyVariableI.fuzzyValueFromVariableAndValue(fuzzyProfileData.getFuzzyVariablePopularity(), topsisDataRow.getPopularity());
            FuzzyValue yearValue = FuzzyVariableI.fuzzyValueFromVariableAndValue(fuzzyProfileData.getFuzzyVariableYear(), topsisDataRow.getYear());
            FuzzyValue durationValue = FuzzyVariableI.fuzzyValueFromVariableAndValue(fuzzyProfileData.getFuzzyVariableDuration(), topsisDataRow.getDuration());
            TopsisDataFuzzyRow topsisDataFuzzyRow = new TopsisDataFuzzyRow(
                    topsisDataRow.getMovieId(),
                    topsisDataRow.getName(),
                    ratingValue,
                    popularityValue,
                    yearValue,
                    durationValue,
                    0, 0, 0);
            table2FuzzifiedData.add(topsisDataFuzzyRow);
        }
        return table2FuzzifiedData;
    }

    private EnumMap<FuzzySearchChoices, Double> getChoiceToWeightMap(FuzzySearchFiltersDto fuzzySearchFiltersDto, ConcreteWeights concreteWeights) {
        EnumMap<FuzzySearchChoices, Double> choiceToWeightMap = new EnumMap<>(FuzzySearchChoices.class);
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice1(), concreteWeights.getChoice1());
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice2(), concreteWeights.getChoice2());
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice3(), concreteWeights.getChoice3());
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice4(), concreteWeights.getChoice4());
        return choiceToWeightMap;

    }


    private EnumMap<FuzzySearchChoices, FuzzyValue> getChoiceToFuzzyWeightMap(FuzzySearchFiltersDto fuzzySearchFiltersDto, ConcreteWeights concreteWeights) {
        EnumMap<FuzzySearchChoices, FuzzyValue> choiceToWeightMap = new EnumMap<>(FuzzySearchChoices.class);
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice1(), new FuzzyValue(concreteWeights.getChoice1(), concreteWeights.getChoice1(), concreteWeights.getChoice1(), concreteWeights.getChoice1()));
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice2(), new FuzzyValue(concreteWeights.getChoice2(), concreteWeights.getChoice2(), concreteWeights.getChoice2(), concreteWeights.getChoice2()));
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice3(), new FuzzyValue(concreteWeights.getChoice3(), concreteWeights.getChoice3(), concreteWeights.getChoice3(), concreteWeights.getChoice3()));
        choiceToWeightMap.put(fuzzySearchFiltersDto.getChoice4(), new FuzzyValue(concreteWeights.getChoice4(), concreteWeights.getChoice4(), concreteWeights.getChoice4(), concreteWeights.getChoice4()));
        return choiceToWeightMap;

    }
}