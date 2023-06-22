import { TopsisDataTableDto } from './topsis-data-table-dto';

export class RegularTopsisInfoDto {
    table1InitialData: TopsisDataTableDto;

    constructor(obj: {
        table1InitialData: TopsisDataTableDto,
    }) {
        this.table1InitialData = obj.table1InitialData;
    }

    static fromObj(obj: any): RegularTopsisInfoDto {
        if (obj == null) {
            throw new Error('obj cannot be null')
        }
        return new RegularTopsisInfoDto({
            table1InitialData: TopsisDataTableDto.fromObj(obj.table1InitialData),
        });
    }

    static fromObjNullable(obj: any): RegularTopsisInfoDto | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }
}