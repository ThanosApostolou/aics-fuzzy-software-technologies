import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartUtils, FuzzyVariableI } from './fuzzy-variable-distribution';

export class FuzzyVariablePopularity implements FuzzyVariableI {
    varVeryPopular: FuzzyVariableDistributionPart;
    varPopular: FuzzyVariableDistributionPart;
    varAverage: FuzzyVariableDistributionPart;
    varUnpopular: FuzzyVariableDistributionPart;

    constructor(obj: {
        varVeryPopular: FuzzyVariableDistributionPart,
        varPopular: FuzzyVariableDistributionPart,
        varAverage: FuzzyVariableDistributionPart,
        varUnpopular: FuzzyVariableDistributionPart
    }) {
        this.varVeryPopular = obj.varVeryPopular;
        this.varPopular = obj.varPopular;
        this.varAverage = obj.varAverage;
        this.varUnpopular = obj.varUnpopular;
    }

    static fromObj(obj: any): FuzzyVariablePopularity {
        return new FuzzyVariablePopularity({
            varVeryPopular: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varVeryPopular),
            varPopular: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varPopular),
            varAverage: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varAverage),
            varUnpopular: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varUnpopular)
        })
    }

    getFuzzyVariableMap(): Record<string, FuzzyVariableDistributionPart> {
        return {
            [FuzzyVariablePopularityFields.VERY_POPULAR]: this.varVeryPopular,
            [FuzzyVariablePopularityFields.POPULAR]: this.varPopular,
            [FuzzyVariablePopularityFields.AVERAGE]: this.varAverage,
            [FuzzyVariablePopularityFields.UNPOPULAR]: this.varUnpopular,
        }
    }


    getFuzzyVariableColorsMap(): Record<string, string> {
        return {
            [FuzzyVariablePopularityFields.VERY_POPULAR]: 'green',
            [FuzzyVariablePopularityFields.POPULAR]: 'yellow',
            [FuzzyVariablePopularityFields.AVERAGE]: 'orange',
            [FuzzyVariablePopularityFields.UNPOPULAR]: 'red',
        }
    }

}

export enum FuzzyVariablePopularityFields {
    VERY_POPULAR = 'VERY_POPULAR',
    POPULAR = 'POPULAR',
    AVERAGE = 'AVERAGE',
    UNPOPULAR = 'UNPOPULAR',
}