import { TopsisDataTableDto } from './topsis-data-table-dto';

export class FuzzyTopsisInfoDto {
    table1InitialData: TopsisDataTableDto;
    table2FuzzifiedData: TopsisDataTableDto;

    constructor(obj: {
        table1InitialData: TopsisDataTableDto,
        table2FuzzifiedData: TopsisDataTableDto,
    }) {
        this.table1InitialData = obj.table1InitialData;
        this.table2FuzzifiedData = obj.table2FuzzifiedData;
    }

    static fromObj(obj: any): FuzzyTopsisInfoDto {
        if (obj == null) {
            throw new Error('obj cannot be null')
        }
        return new FuzzyTopsisInfoDto({
            table1InitialData: TopsisDataTableDto.fromObj(obj.table1InitialData),
            table2FuzzifiedData: TopsisDataTableDto.fromObj(obj.table2FuzzifiedData),
        });
    }

    static fromObjNullable(obj: any): FuzzyTopsisInfoDto | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }
}