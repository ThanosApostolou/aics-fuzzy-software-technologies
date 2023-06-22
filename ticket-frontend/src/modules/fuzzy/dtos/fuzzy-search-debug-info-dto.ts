import { FuzzyProfileDto } from './fuzzy-profile-dto';
import { FuzzySearchFiltersDto } from './fuzzy-search-filters-dto';
import { RegularTopsisInfoDto } from './regular-topsis-info-dto';

export class FuzzySearchDebugInfoDto {
    fuzzyProfileDto: FuzzyProfileDto;
    fuzzySearchFiltersDto: FuzzySearchFiltersDto;
    regularTopsisInfoDto: RegularTopsisInfoDto;

    constructor(obj: {
        fuzzyProfileDto: FuzzyProfileDto,
        fuzzySearchFiltersDto: FuzzySearchFiltersDto,
        regularTopsisInfoDto: RegularTopsisInfoDto,
    }) {
        this.fuzzyProfileDto = obj.fuzzyProfileDto;
        this.fuzzySearchFiltersDto = obj.fuzzySearchFiltersDto;
        this.regularTopsisInfoDto = obj.regularTopsisInfoDto;
    }

    static fromObj(obj: any): FuzzySearchDebugInfoDto {
        if (obj == null) {
            throw new Error('obj cannot be null')
        }
        return new FuzzySearchDebugInfoDto({
            fuzzyProfileDto: FuzzyProfileDto.fromObj(obj.fuzzyProfileDto),
            fuzzySearchFiltersDto: FuzzySearchFiltersDto.fromObj(obj.fuzzySearchFiltersDto),
            regularTopsisInfoDto: RegularTopsisInfoDto.fromObj(obj.regularTopsisInfoDto)
        });
    }

    static fromObjNullable(obj: any): FuzzySearchDebugInfoDto | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }
}