package aics.domain.fuzzy;

import aics.domain.fuzzy.dtos.FuzzyProfileDto;
import aics.domain.fuzzy.dtos.FuzzySearchDebugInfoDto;
import aics.domain.fuzzy.dtos.FuzzySearchFiltersDto;
import aics.domain.fuzzy.etities.FuzzyProfile;
import aics.domain.fuzzy.models.FuzzySearchResult;
import aics.domain.movie.dtos.MovieListItemDto;
import aics.domain.movie.entities.Movie;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class FuzzySearchService {
    @Inject
    FuzzyProfileService fuzzyProfileService;
    @Inject
    FuzzySearchValidator fuzzySearchValidator;

    public FuzzySearchResult fuzzySearch(List<Movie> movies, FuzzySearchFiltersDto fuzzySearchFiltersDto) {
        FuzzyProfile activeProfile = this.fuzzyProfileService.findActiveProfileOrDefault();

        List<MovieListItemDto> movieDtos = CollectionUtils.isNotEmpty(movies)
                ? movies.stream().map(MovieListItemDto::fromMovie).toList()
                : new ArrayList<>();

        return new FuzzySearchResult(
                movieDtos,
                new FuzzySearchDebugInfoDto(FuzzyProfileDto.fromFuzzyProfile(activeProfile))
        );
    }
}