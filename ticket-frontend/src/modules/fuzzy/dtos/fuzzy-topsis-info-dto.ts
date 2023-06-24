import { TopsisDataTableDto } from './topsis-data-table-dto';

export class FuzzyTopsisInfoDto {
    table1InitialData: TopsisDataTableDto;
    table2FuzzifiedData: TopsisDataTableDto;
    table3FuzzifiedDistributionDataDto: TopsisDataTableDto;
    table5WeightedDistributionDataDto: TopsisDataTableDto;

    constructor(obj: {
        table1InitialData: TopsisDataTableDto,
        table2FuzzifiedData: TopsisDataTableDto,
        table3FuzzifiedDistributionDataDto: TopsisDataTableDto,
        table5WeightedDistributionDataDto: TopsisDataTableDto,
    }) {
        this.table1InitialData = obj.table1InitialData;
        this.table2FuzzifiedData = obj.table2FuzzifiedData;
        this.table3FuzzifiedDistributionDataDto = obj.table3FuzzifiedDistributionDataDto;
        this.table5WeightedDistributionDataDto = obj.table5WeightedDistributionDataDto;
    }

    static fromObj(obj: any): FuzzyTopsisInfoDto {
        if (obj == null) {
            throw new Error('obj cannot be null')
        }
        return new FuzzyTopsisInfoDto({
            table1InitialData: TopsisDataTableDto.fromObj(obj.table1InitialData),
            table2FuzzifiedData: TopsisDataTableDto.fromObj(obj.table2FuzzifiedData),
            table3FuzzifiedDistributionDataDto: TopsisDataTableDto.fromObj(obj.table3FuzzifiedDistributionDataDto),
            table5WeightedDistributionDataDto: TopsisDataTableDto.fromObj(obj.table5WeightedDistributionDataDto),
        });
    }

    static fromObjNullable(obj: any): FuzzyTopsisInfoDto | null {
        if (obj == null) {
            return null;
        }
        return this.fromObj(obj);
    }
}