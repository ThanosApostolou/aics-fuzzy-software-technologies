import { FuzzyVariableDistributionPart } from './fuzzy-variable-distribution';

export class FuzzyVariableYear {
    min: number;
    max: number;
    varOld: FuzzyVariableDistributionPart;
    varRecent: FuzzyVariableDistributionPart;
    varNew: FuzzyVariableDistributionPart;

    constructor(obj: {
        min: number,
        max: number,
        varOld: FuzzyVariableDistributionPart,
        varRecent: FuzzyVariableDistributionPart,
        varNew: FuzzyVariableDistributionPart,
    }) {
        this.min = obj.min;
        this.max = obj.max;
        this.varOld = obj.varOld;
        this.varRecent = obj.varRecent;
        this.varNew = obj.varNew;
    }

}