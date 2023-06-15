import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartUtils, FuzzyVariableI } from './fuzzy-variable-distribution';

export enum FuzzyWeightsFields {
    LOW_IMPORTANCE = 'LOW_IMPORTANCE',
    AVERAGE_IMPORTANCE = 'AVERAGE_IMPORTANCE',
    HIGH_IMPORTANCE = 'HIGH_IMPORTANCE',
    VERY_HIGH_IMPORTANCE = 'VERY_HIGH_IMPORTANCE',
}

export class FuzzyWeights implements FuzzyVariableI {
    varLowImportance: FuzzyVariableDistributionPart;
    varAverageImportance: FuzzyVariableDistributionPart;
    varHighImportance: FuzzyVariableDistributionPart;
    varVeryHighImportance: FuzzyVariableDistributionPart;

    constructor(obj: {
        varLowImportance: FuzzyVariableDistributionPart,
        varAverageImportance: FuzzyVariableDistributionPart,
        varHighImportance: FuzzyVariableDistributionPart,
        varVeryHighImportance: FuzzyVariableDistributionPart
    }) {
        this.varLowImportance = obj.varLowImportance;
        this.varAverageImportance = obj.varAverageImportance;
        this.varHighImportance = obj.varHighImportance;
        this.varVeryHighImportance = obj.varVeryHighImportance;
    }

    static fromObj(obj: any): FuzzyWeights {
        return new FuzzyWeights({
            varLowImportance: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varLowImportance),
            varAverageImportance: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varAverageImportance),
            varHighImportance: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varHighImportance),
            varVeryHighImportance: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varVeryHighImportance)
        })
    }

    getFuzzyVariableMap(): Record<string, FuzzyVariableDistributionPart> {
        return {
            [FuzzyWeightsFields.LOW_IMPORTANCE]: this.varLowImportance,
            [FuzzyWeightsFields.AVERAGE_IMPORTANCE]: this.varAverageImportance,
            [FuzzyWeightsFields.HIGH_IMPORTANCE]: this.varHighImportance,
            [FuzzyWeightsFields.VERY_HIGH_IMPORTANCE]: this.varVeryHighImportance,
        }
    }

    getFuzzyVariableColorsMap(): Record<string, string> {
        return {
            [FuzzyWeightsFields.LOW_IMPORTANCE]: 'red',
            [FuzzyWeightsFields.AVERAGE_IMPORTANCE]: 'orange',
            [FuzzyWeightsFields.HIGH_IMPORTANCE]: 'yellow',
            [FuzzyWeightsFields.VERY_HIGH_IMPORTANCE]: 'green',
        }
    }

}
