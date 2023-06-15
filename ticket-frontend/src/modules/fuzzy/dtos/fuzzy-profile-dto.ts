import { FuzzyProfileData } from "../models/fuzzy-profile-data";

export class FuzzyProfileDto {
    fuzzyProfileId: number;
    name: string;
    fuzzyProfileData: FuzzyProfileData;
    enableDebug: boolean;
    active: boolean;

    constructor(obj: {
        fuzzyProfileId: number,
        name: string,
        fuzzyProfileData: FuzzyProfileData,
        enableDebug: boolean,
        active: boolean,
    }) {
        this.fuzzyProfileId = obj.fuzzyProfileId;
        this.name = obj.name;
        this.fuzzyProfileData = obj.fuzzyProfileData;
        this.enableDebug = obj.enableDebug;
        this.active = obj.active;
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
        });

    }
}