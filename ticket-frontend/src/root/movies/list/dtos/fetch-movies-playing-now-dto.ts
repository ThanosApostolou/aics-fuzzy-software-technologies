import { FuzzySearchDebugInfoDto } from '../../../../modules/fuzzy/dtos/fuzzy-search-debug-info-dto';
import { MovieListItemDto } from '../../../../modules/movie/dtos/movie-list-item-dto';

export class FetchMoviesPlayingNowResponseDto {
    movies: MovieListItemDto[] = [];
    fuzzySearchDebugInfoDto: FuzzySearchDebugInfoDto | null = null;
    fuzzySearch: boolean = false;
    error: string | null = null;

    static fromObj(obj: any): FetchMoviesPlayingNowResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchMoviesPlayingNowResponseDto: FetchMoviesPlayingNowResponseDto = new FetchMoviesPlayingNowResponseDto();
        fetchMoviesPlayingNowResponseDto.movies = MovieListItemDto.listFromObjList(obj.movies);
        fetchMoviesPlayingNowResponseDto.fuzzySearchDebugInfoDto = FuzzySearchDebugInfoDto.fromObjNullable(obj.fuzzySearchDebugInfoDto);
        fetchMoviesPlayingNowResponseDto.fuzzySearch = obj.fuzzySearch;
        fetchMoviesPlayingNowResponseDto.error = obj.error;
        return fetchMoviesPlayingNowResponseDto;
    }
}
