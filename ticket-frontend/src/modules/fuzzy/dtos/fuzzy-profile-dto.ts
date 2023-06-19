import { FuzzyProfileData } from "../models/fuzzy-profile-data";

export class FuzzyProfileDto {
    fuzzyProfileId: number | null;
    name: string;
    fuzzyProfileData: FuzzyProfileData;
    enableDebug: boolean;
    active: boolean;
    useFuzzyTopsis: boolean;

    constructor(obj: {
        fuzzyProfileId: number | null,
        name: string,
        fuzzyProfileData: FuzzyProfileData,
        enableDebug: boolean,
        active: boolean,
        useFuzzyTopsis: boolean,
    }) {
        this.fuzzyProfileId = obj.fuzzyProfileId;
        this.name = obj.name;
        this.fuzzyProfileData = obj.fuzzyProfileData;
        this.enableDebug = obj.enableDebug;
        this.active = obj.active;
        this.useFuzzyTopsis = obj.useFuzzyTopsis;
    }

    static fromObj(obj: any): FuzzyProfileDto {
        if (!obj) {
            throw new Error('obj cannot be null');
        }
        return new FuzzyProfileDto({
            fuzzyProfileId: obj.fuzzyProfileId,
            name: obj.name,
            fuzzyProfileData: FuzzyProfileData.fromObj(obj.fuzzyProfileData),
            enableDebug: obj.enableDebug,
            active: obj.active,
            useFuzzyTopsis: obj.useFuzzyTopsis,
        });
    }

    deepClone(): FuzzyProfileDto {
        return new FuzzyProfileDto({
            fuzzyProfileId: this.fuzzyProfileId,
            name: this.name,
            fuzzyProfileData: this.fuzzyProfileData.deepClone(),
            enableDebug: this.enableDebug,
            active: this.active,
            useFuzzyTopsis: this.useFuzzyTopsis,
        })
    }
}