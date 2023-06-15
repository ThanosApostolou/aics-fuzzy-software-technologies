import { FuzzyVariableDuration } from "../fuzzy-variable-duration";
import { FuzzyVariablePopularity } from "../fuzzy-variable-popularity";
import { FuzzyVariableRating } from "../fuzzy-variable-rating";
import { FuzzyVariableYear } from "../fuzzy-variable-year";
import { FuzzyWeights } from "../fuzzy-weights";

export class FuzzyProfileData {
    fuzzyVariableYear: FuzzyVariableYear;
    fuzzyVariableRating: FuzzyVariableRating;
    fuzzyVariablePopularity: FuzzyVariablePopularity;
    fuzzyVariableDuration: FuzzyVariableDuration;
    fuzzyWeights: FuzzyWeights;

    constructor(obj: {
        fuzzyVariableYear: FuzzyVariableYear,
        fuzzyVariableRating: FuzzyVariableRating,
        fuzzyVariablePopularity: FuzzyVariablePopularity,
        fuzzyVariableDuration: FuzzyVariableDuration,
        fuzzyWeights: FuzzyWeights,
    }) {
        this.fuzzyVariableYear = obj.fuzzyVariableYear;
        this.fuzzyVariableRating = obj.fuzzyVariableRating;
        this.fuzzyVariablePopularity = obj.fuzzyVariablePopularity;
        this.fuzzyVariableDuration = obj.fuzzyVariableDuration;
        this.fuzzyWeights = obj.fuzzyWeights;
    }

    static fromObj(obj: any): FuzzyProfileData {
        if (!obj) {
            throw new Error('obj cannot be null');
        }
        return new FuzzyProfileData({
            fuzzyVariableYear: FuzzyVariableYear.fromObj(obj.fuzzyVariableYear),
            fuzzyVariableRating: FuzzyVariableRating.fromObj(obj.fuzzyVariableRating),
            fuzzyVariablePopularity: FuzzyVariablePopularity.fromObj(obj.fuzzyVariablePopularity),
            fuzzyVariableDuration: FuzzyVariableDuration.fromObj(obj.fuzzyVariableDuration),
            fuzzyWeights: FuzzyWeights.fromObj(obj.fuzzyWeights),
        })
    }
}
