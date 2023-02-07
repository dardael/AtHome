import {Size} from "./plant/Size";
import {Type} from "./plant/Type";
import {Foliage} from "./plant/Foliage";
import {Sunshine} from "./plant/Sunshine";
import {Watering} from "./plant/Watering";
import {Month} from "./plant/Month";

export interface Plant {

    id?: string,
    name: string,
    scientificName?: string,
    type: Type,
    foliage: Foliage,
    sunshine: Sunshine,
    watering: Watering,
    rusticity: number,
    pruningPeriods: Month[],
    size: Size,
    description: string,
};
