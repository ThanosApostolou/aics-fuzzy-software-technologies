import { TopsisDataRowDto } from './topsis-data-row-dto';

export class TopsisDataTableDto {
    rows: TopsisDataRowDto[];
    showDminus: boolean;
    showDplus: boolean;
    showS: boolean;

    constructor(obj: {
        rows: TopsisDataRowDto[],
        showDminus: boolean,
        showDplus: boolean,
        showS: boolean,
    }) {
        this.rows = obj.rows;
        this.showDminus = obj.showDminus;
        this.showDplus = obj.showDplus;
        this.showS = obj.showS;
    }

    static fromObj(obj: any): TopsisDataTableDto {
        return new TopsisDataTableDto({
            rows: obj.rows ? (obj.rows as any[]).map(row => TopsisDataRowDto.fromObj(row)) : [],
            showDminus: obj.showDminus,
            showDplus: obj.showDplus,
            showS: obj.showS,
        })
    }

}
