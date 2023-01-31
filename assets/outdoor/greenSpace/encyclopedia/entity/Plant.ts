import {Size} from "./Size";
import {Type} from "./Type";
import {Foliage} from "./Foliage";
import {Sunshine} from "./Sunshine";
import {Watering} from "./Watering";
import {Month} from "./Month";

export interface Plant {
    name: string,
    type: Type,
    foliage: Foliage,
    sunshine: Sunshine,
    watering: Watering,
    rusticity: number,
    pruningPeriods: Month[],
    size: Size,
    description: string,
};
