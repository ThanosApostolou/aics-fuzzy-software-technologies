import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartUtils, FuzzyVariableI } from './fuzzy-variable-distribution';

export class FuzzyVariableDuration implements FuzzyVariableI {
    varSmall: FuzzyVariableDistributionPart;
    varAverage: FuzzyVariableDistributionPart;
    varBig: FuzzyVariableDistributionPart;
    varHuge: FuzzyVariableDistributionPart;

    constructor(obj: {
        varSmall: FuzzyVariableDistributionPart,
        varAverage: FuzzyVariableDistributionPart,
        varBig: FuzzyVariableDistributionPart,
        varHuge: FuzzyVariableDistributionPart
    }) {
        this.varSmall = obj.varSmall;
        this.varAverage = obj.varAverage;
        this.varBig = obj.varBig;
        this.varHuge = obj.varHuge;
    }

    static fromObj(obj: any): FuzzyVariableDuration {
        return new FuzzyVariableDuration({
            varSmall: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varSmall),
            varAverage: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varAverage),
            varBig: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varBig),
            varHuge: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varHuge)
        })
    }

    getFuzzyVariableMap(): Record<string, FuzzyVariableDistributionPart> {
        return {
            [FuzzyVariableDurationFields.SMALL]: this.varSmall,
            [FuzzyVariableDurationFields.AVERAGE]: this.varAverage,
            [FuzzyVariableDurationFields.BIG]: this.varBig,
            [FuzzyVariableDurationFields.HUGE]: this.varHuge,
        }
    }

    getFuzzyVariableColorsMap(): Record<string, string> {
        return {
            [FuzzyVariableDurationFields.SMALL]: 'red',
            [FuzzyVariableDurationFields.AVERAGE]: 'orange',
            [FuzzyVariableDurationFields.BIG]: 'yellow',
            [FuzzyVariableDurationFields.HUGE]: 'green',
        }
    }

}

export enum FuzzyVariableDurationFields {
    SMALL = 'SMALL',
    AVERAGE = 'AVERAGE',
    BIG = 'BIG',
    HUGE = 'HUGE',
}