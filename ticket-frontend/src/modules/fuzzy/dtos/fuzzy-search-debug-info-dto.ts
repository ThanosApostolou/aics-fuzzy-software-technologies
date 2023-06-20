import { FuzzyProfileDto } from './fuzzy-profile-dto';

export class FuzzySearchDebugInfoDto {
    fuzzyProfileDto: FuzzyProfileDto;

    constructor(obj: {
        fuzzyProfileDto: FuzzyProfileDto,
    }) {
        this.fuzzyProfileDto = obj.fuzzyProfileDto;
    }

    static fromObj(obj: any): FuzzySearchDebugInfoDto | null {
        if (obj == null) {
            throw new Error('obj cannot be null')
        }
        return new FuzzySearchDebugInfoDto({
            fuzzyProfileDto: FuzzyProfileDto.fromObj(obj.fuzzyProfileDto)
        });
    }

    static fromObjNullable(obj: any): FuzzySearchDebugInfoDto | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }
}