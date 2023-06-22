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

        List<TopsisDataRow> table1InitialDate = this.calculateTable1InitialDate(movies);

        List<MovieListItemDto> movieDtos = CollectionUtils.isNotEmpty(movies)
                ? movies.stream().map(MovieListItemDto::fromMovie).toList()
                : new ArrayList<>();

        FuzzySearchDebugInfoDto createFuzzySearchDebugInfoDto = this.createFuzzySearchDebugInfoDto(activeProfile, fuzzySearchFiltersDto, table1InitialDate);
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

    private FuzzySearchDebugInfoDto createFuzzySearchDebugInfoDto(FuzzyProfile activeProfile,
                                                                  FuzzySearchFiltersDto fuzzySearchFiltersDto,
                                                                  List<TopsisDataRow> table1InitialDate
    ) {
        ConcreteWeights concreteWeights = activeProfile.getFuzzyProfileData().getConcreteWeights();
        EnumMap<FuzzySearchChoices, Double> choiceToWeightMap = this.getChoiceToWeightMap(fuzzySearchFiltersDto, concreteWeights);
        final double roundFactor = 1000.0;
        String weightRating = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.RATING) * roundFactor) / roundFactor);
        String weightPopularity = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.POPULARITY) * roundFactor) / roundFactor);
        String weightYear = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.YEAR) * roundFactor) / roundFactor);
        String weightDuration = String.valueOf(Math.round(choiceToWeightMap.get(FuzzySearchChoices.DURATION) * roundFactor) / roundFactor);

        // table1
        List<TopsisDataRowDto> table1InitialDateDtos = table1InitialDate.stream().map(topsisDataRow -> TopsisDataRowDto.fromTopsisDataRow(topsisDataRow, false, false, false)).collect(Collectors.toList());
        table1InitialDateDtos.add(new TopsisDataRowDto(0L, "WEIGHTS", weightRating, weightPopularity, weightYear, weightDuration, "", "", ""));
        TopsisDataTableDto table1InitialData = new TopsisDataTableDto(table1InitialDateDtos, false, false, false);

        RegularTopsisInfoDto regularTopsisInfoDto = new RegularTopsisInfoDto(table1InitialData);

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