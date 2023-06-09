import { ChartData, ChartDataset } from "chart.js";
import { FuzzyVariableDistributionPart, FuzzyVariableI } from "./fuzzy-variable-distribution";

export class FuzzyService {
    static convertFuzzyVariableToChartData(fuzzyVariableI: FuzzyVariableI): ChartData<"line", { x: number, y: number }[], number> {
        const fuzzyVariableMap = fuzzyVariableI.getFuzzyVariableMap();
        const datasets: ChartDataset<"line", {
            x: number;
            y: number;
        }[]>[] = [];

        const colorsMap = fuzzyVariableI.getFuzzyVariableColorsMap();

        for (const [key, part] of Object.entries(fuzzyVariableMap)) {
            datasets.push(this.createChartDatasetFromFuzzyVariableDistributionPart(part, key, colorsMap[key]))
        }
        return {
            datasets
        }

    }

    // private static createChartDataLabelsFromFuzzyVariableDistributionParts(parts: FuzzyVariableDistributionPart[]): number[] {
    //     const labels: number[] = [];
    //     for (const part of parts) {
    //         if (part.fuzzyVariableDistributionPartTriangular != null) {
    //             const partTriangular = part.fuzzyVariableDistributionPartTriangular;
    //             if (partTriangular.a != null && !labels.includes(partTriangular.a)) {
    //                 labels.push(partTriangular.a);
    //             }
    //             if (!labels.includes(partTriangular.b)) {
    //                 labels.push(partTriangular.b);
    //             }
    //             if (partTriangular.c != null && !labels.includes(partTriangular.c)) {
    //                 labels.push(partTriangular.c);
    //             }
    //         } else if (part.fuzzyVariableDistributionPartTrapezoidal != null) {
    //             const partTrapezoidal = part.fuzzyVariableDistributionPartTrapezoidal;
    //             if (partTrapezoidal.a != null && !labels.includes(partTrapezoidal.a)) {
    //                 labels.push(partTrapezoidal.a);
    //             }
    //             if (!labels.includes(partTrapezoidal.b)) {
    //                 labels.push(partTrapezoidal.b);
    //             }
    //             if (!labels.includes(partTrapezoidal.c)) {
    //                 labels.push(partTrapezoidal.c);
    //             }
    //             if (partTrapezoidal.d != null && !labels.includes(partTrapezoidal.d)) {
    //                 labels.push(partTrapezoidal.d);
    //             }
    //         }
    //     }

    //     return labels.sort();
    // }

    private static createChartDatasetFromFuzzyVariableDistributionPart(part: FuzzyVariableDistributionPart, label: string, borderColor: string): ChartDataset<"line", {
        x: number;
        y: number;
    }[]> {

        const data: {
            x: number;
            y: number;
        }[] = [];

         if (part.isTypeTrapezoidal()) {
            const partTrapezoidal = part;
            if (partTrapezoidal.a != null) {
                data.push({ x: partTrapezoidal.a, y: 0 });
            }
            data.push({ x: partTrapezoidal.b, y: 1 });
            data.push({ x: partTrapezoidal.c, y: 1 });
            if (partTrapezoidal.d != null) {
                data.push({ x: partTrapezoidal.d, y: 0 });
            }
        } else if (part.isTypeTriangular()) {
            const partTriangular = part;
            if (partTriangular.a != null) {
                data.push({ x: partTriangular.a, y: 0 });
            }
            data.push({ x: partTriangular.b, y: 1 });
            if (partTriangular.c != null) {
                data.push({ x: partTriangular.c, y: 0 });
            }

        }

        return {
            // id: 1,
            label,
            data,
            borderColor
        }
    }
}
