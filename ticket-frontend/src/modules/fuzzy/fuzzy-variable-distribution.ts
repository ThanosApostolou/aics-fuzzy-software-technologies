export interface FuzzyVariableI {
    getFuzzyVariableMap: () => Record<string, FuzzyVariableDistributionPart>;
    getFuzzyVariableColorsMap: () => Record<string, string>;

}

export class FuzzyVariableDistributionPart {
    fuzzyVariableDistributionPartTriangular: FuzzyVariableDistributionPartTriangular | null;
    fuzzyVariableDistributionPartTrapezoidal: FuzzyVariableDistributionPartTrapezoidal | null;

    constructor(obj: {
        fuzzyVariableDistributionPartTriangular?: FuzzyVariableDistributionPartTriangular | null,
        fuzzyVariableDistributionPartTrapezoidal?: FuzzyVariableDistributionPartTrapezoidal | null,
    }) {
        if ((!obj.fuzzyVariableDistributionPartTriangular && !obj.fuzzyVariableDistributionPartTrapezoidal)
            || (obj.fuzzyVariableDistributionPartTriangular && obj.fuzzyVariableDistributionPartTrapezoidal)
        ) {
            throw new Error('FuzzyVariableDistributionPart should only have either fuzzyVariableDistributionPartTriangular or fuzzyVariableDistributionPartTrapezoidal')
        }
        this.fuzzyVariableDistributionPartTriangular = obj.fuzzyVariableDistributionPartTriangular ? obj.fuzzyVariableDistributionPartTriangular : null;
        this.fuzzyVariableDistributionPartTrapezoidal = obj.fuzzyVariableDistributionPartTrapezoidal ? obj.fuzzyVariableDistributionPartTrapezoidal : null;
    }

    static fromObj(obj: any): FuzzyVariableDistributionPart {
        return new FuzzyVariableDistributionPart({
            fuzzyVariableDistributionPartTriangular: FuzzyVariableDistributionPartTriangular.fromObjNullable(obj.fuzzyVariableDistributionPartTriangular),
            fuzzyVariableDistributionPartTrapezoidal: FuzzyVariableDistributionPartTrapezoidal.fromObjNullable(obj.fuzzyVariableDistributionPartTrapezoidal),
        })
    }
}

export class FuzzyVariableDistributionPartTriangular {
    a: number | null;
    b: number;
    c: number | null;

    constructor(obj: {
        a: number | null,
        b: number,
        c: number | null,
    }) {
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
    }

    static fromObjNullable(obj: any): FuzzyVariableDistributionPartTriangular | null {
        if (obj == null) {
            return null;
        }
        return new FuzzyVariableDistributionPartTriangular({
            a: obj.a,
            b: obj.b,
            c: obj.c
        })
    }
}


export class FuzzyVariableDistributionPartTrapezoidal {
    a: number | null;
    b: number;
    c: number;
    d: number | null;

    constructor(obj: {
        a: number | null;
        b: number;
        c: number;
        d: number | null;
    }) {
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
        this.d = obj.d;
    }

    static fromObjNullable(obj: any): FuzzyVariableDistributionPartTrapezoidal | null {
        if (obj == null) {
            return null;
        }
        return new FuzzyVariableDistributionPartTrapezoidal({
            a: obj.a,
            b: obj.b,
            c: obj.c,
            d: obj.d
        })
    }
}