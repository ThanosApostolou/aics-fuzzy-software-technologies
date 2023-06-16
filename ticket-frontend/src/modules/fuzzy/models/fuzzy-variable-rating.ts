import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartUtils, FuzzyVariableI } from './fuzzy-variable-distribution';

export enum FuzzyVariableRatingFields {
    BAD = 'BAD',
    AVERAGE = 'AVERAGE',
    GOOD = 'GOOD',
    VERY_GOOD = 'VERY_GOOD',
}

export class FuzzyVariableRating implements FuzzyVariableI {
    varBad: FuzzyVariableDistributionPart;
    varAverage: FuzzyVariableDistributionPart;
    varGood: FuzzyVariableDistributionPart;
    varVeryGood: FuzzyVariableDistributionPart;

    constructor(obj: {
        varBad: FuzzyVariableDistributionPart,
        varAverage: FuzzyVariableDistributionPart,
        varGood: FuzzyVariableDistributionPart,
        varVeryGood: FuzzyVariableDistributionPart
    }) {
        this.varBad = obj.varBad;
        this.varAverage = obj.varAverage;
        this.varGood = obj.varGood;
        this.varVeryGood = obj.varVeryGood;
    }

    getName(): string {
        return "RATING";
    }

    get1stPart() {
        return this.varBad;
    }

    get2ndPart() {
        return this.varAverage;
    }

    get3rdPart() {
        return this.varGood;
    }

    get4thPart() {
        return this.varVeryGood;
    }

    static fromObj(obj: any): FuzzyVariableRating {
        return new FuzzyVariableRating({
            varBad: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varBad),
            varAverage: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varAverage),
            varGood: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varGood),
            varVeryGood: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varVeryGood)
        })
    }

    getFuzzyVariableMap(): Record<string, FuzzyVariableDistributionPart> {
        return {
            [FuzzyVariableRatingFields.BAD]: this.varBad,
            [FuzzyVariableRatingFields.AVERAGE]: this.varAverage,
            [FuzzyVariableRatingFields.GOOD]: this.varGood,
            [FuzzyVariableRatingFields.VERY_GOOD]: this.varVeryGood,
        }
    }

    getFuzzyVariableColorsMap(): Record<string, string> {
        return {
            [FuzzyVariableRatingFields.BAD]: 'red',
            [FuzzyVariableRatingFields.AVERAGE]: 'orange',
            [FuzzyVariableRatingFields.GOOD]: 'yellow',
            [FuzzyVariableRatingFields.VERY_GOOD]: 'green',
        }
    }
}
