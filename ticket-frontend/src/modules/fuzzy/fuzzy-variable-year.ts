import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartUtils, FuzzyVariableI } from './fuzzy-variable-distribution';

export class FuzzyVariableYear implements FuzzyVariableI {
    varOld: FuzzyVariableDistributionPart;
    varRecent: FuzzyVariableDistributionPart;
    varNew: FuzzyVariableDistributionPart;
    varVeryNew: FuzzyVariableDistributionPart;

    constructor(obj: {
        varOld: FuzzyVariableDistributionPart,
        varRecent: FuzzyVariableDistributionPart,
        varNew: FuzzyVariableDistributionPart,
        varVeryNew: FuzzyVariableDistributionPart
    }) {
        this.varOld = obj.varOld;
        this.varRecent = obj.varRecent;
        this.varNew = obj.varNew;
        this.varVeryNew = obj.varVeryNew;
    }

    static fromObj(obj: any): FuzzyVariableYear {
        return new FuzzyVariableYear({
            varOld: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varOld),
            varRecent: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varRecent),
            varNew: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varNew),
            varVeryNew: FuzzyVariableDistributionPartUtils.fuzzyVariableDistributionPartFromObj(obj.varVeryNew)
        })
    }

    getFuzzyVariableMap(): Record<string, FuzzyVariableDistributionPart> {
        return {
            [FuzzyVariableYearFields.OLD]: this.varOld,
            [FuzzyVariableYearFields.RECENT]: this.varRecent,
            [FuzzyVariableYearFields.NEW]: this.varNew,
            [FuzzyVariableYearFields.VERY_NEW]: this.varVeryNew,
        }
    }

    getFuzzyVariableColorsMap(): Record<string, string> {
        return {
            [FuzzyVariableYearFields.OLD]: 'red',
            [FuzzyVariableYearFields.RECENT]: 'orange',
            [FuzzyVariableYearFields.NEW]: 'yellow',
            [FuzzyVariableYearFields.VERY_NEW]: 'green',
        }
    }

}

export enum FuzzyVariableYearFields {
    OLD = 'OLD',
    RECENT = 'RECENT',
    NEW = 'NEW',
    VERY_NEW = 'VERY_NEW',
}