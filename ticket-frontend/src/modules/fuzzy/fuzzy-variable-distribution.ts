import { FuzzyVariableDistributionType } from "./fuzzy-constants";

export interface FuzzyVariableI {
    getFuzzyVariableMap: () => Record<string, FuzzyVariableDistributionPart>;
    getFuzzyVariableColorsMap: () => Record<string, string>;

}

export type FuzzyVariableDistributionPart = FuzzyVariableDistributionPartTriangular | FuzzyVariableDistributionPartTrapezoidal;

export class FuzzyVariableDistributionPartUtils {

    static fuzzyVariableDistributionPartFromObjNullable(obj: any): FuzzyVariableDistributionPart | null {
        if (obj == null) {
            return null;
        }
        return this.fuzzyVariableDistributionPartFromObj(obj);
    }

    static fuzzyVariableDistributionPartFromObj(obj: any): FuzzyVariableDistributionPart {
        if (obj == null) {
            throw new Error('obj cannot be null');
        }
        if (FuzzyVariableDistributionType.TRIANGULAR === obj.type) {
            return FuzzyVariableDistributionPartTriangular.fromObj(obj);
        } else if (FuzzyVariableDistributionType.TRAPEZOIDAL === obj.type) {
            return FuzzyVariableDistributionPartTrapezoidal.fromObj(obj);
        } else {
            throw new Error('wrong FuzzyVariableDistributionType')
        }
    }
}

export class FuzzyVariableDistributionPartTriangular {
    type: FuzzyVariableDistributionType;
    a: number | null;
    b: number;
    c: number | null;

    constructor(obj: {
        a: number | null,
        b: number,
        c: number | null,
    }) {
        this.type = FuzzyVariableDistributionType.TRIANGULAR;
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
    }

    isTypeTriangular(): this is FuzzyVariableDistributionPartTriangular {
        return true;
    }

    isTypeTrapezoidal(): this is FuzzyVariableDistributionPartTrapezoidal {
        return false;
    }

    static fromObjNullable(obj: any): FuzzyVariableDistributionPartTriangular | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }

    static fromObj(obj: any): FuzzyVariableDistributionPartTriangular {
        if (obj == null) {
            throw new Error('obj cannot be null');
        }
        return new FuzzyVariableDistributionPartTriangular({
            a: obj.a,
            b: obj.b,
            c: obj.c
        })
    }
}


export class FuzzyVariableDistributionPartTrapezoidal {
    type: FuzzyVariableDistributionType;
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
        this.type = FuzzyVariableDistributionType.TRAPEZOIDAL;
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
        this.d = obj.d;
    }

    isTypeTriangular(): this is FuzzyVariableDistributionPartTriangular {
        return false;
    }

    isTypeTrapezoidal(): this is FuzzyVariableDistributionPartTrapezoidal {
        return true;
    }

    static fromObjNullable(obj: any): FuzzyVariableDistributionPartTrapezoidal | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }

    static fromObj(obj: any): FuzzyVariableDistributionPartTrapezoidal {
        if (obj == null) {
            throw new Error('obj cannot be null');
        }
        return new FuzzyVariableDistributionPartTrapezoidal({
            a: obj.a,
            b: obj.b,
            c: obj.c,
            d: obj.d
        })
    }
}