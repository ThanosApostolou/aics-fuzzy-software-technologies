import { FuzzyVariablePopularity } from "../../../../modules/fuzzy/fuzzy-variable-popularity";
import { FuzzyVariableRating } from "../../../../modules/fuzzy/fuzzy-variable-rating";
import { FuzzyVariableYear } from "../../../../modules/fuzzy/fuzzy-variable-year";

export class FetchFuzzyProfileResponseDto {
    year: FuzzyVariableYear;
    rating: FuzzyVariableRating;
    popularity: FuzzyVariablePopularity;

    constructor(obj: {
        year: FuzzyVariableYear,
        rating: FuzzyVariableRating,
        popularity: FuzzyVariablePopularity,
    }) {
        this.year = obj.year;
        this.rating = obj.rating;
        this.popularity = obj.popularity;
    }

    static fromObj(obj: any): FetchFuzzyProfileResponseDto {
        if (!obj) {
            throw new Error('obj is null');
        }
        return new FetchFuzzyProfileResponseDto({
            year: FuzzyVariableYear.fromObj(obj.year),
            rating: FuzzyVariableRating.fromObj(obj.rating),
            popularity: FuzzyVariablePopularity.fromObj(obj.popularity)
        })
    }
}