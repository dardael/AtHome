import {Plant} from '../entity/Plant';
import {Foliage} from '../entity/plant/Foliage';
import {Type} from '../entity/plant/Type';
import {Sunshine} from '../entity/plant/Sunshine';
import {Watering} from '../entity/plant/Watering';
import {Size} from '../entity/plant/Size';
import {Unit} from '../entity/plant/Unit';

class PlantsFilterer {
    plants: Plant[];

    constructor(plants: Plant[]) {
        this.plants = plants;
    }

    filterByName(name: string): Plant[] {
        const upperName = name.toUpperCase();
        return this.plants.filter(
            (plant) =>
                plant.name.toUpperCase().includes(upperName) ||
                plant.scientificName.toUpperCase().includes(upperName)
        );
    }

    filterByRusticitySuperiorTo(rusticity: number): Plant[] {
        return this.plants.filter((plant) => plant.rusticity >= rusticity);
    }
    filterByFoliage(foliage: Foliage): Plant[] {
        return this.plants.filter((plant) => plant.foliage === foliage);
    }
    filterByTypes(types: Type[]): Plant[] {
        return this.plants.filter((plant) => types.includes(plant.type));
    }
    filterBySunshine(sunshine: Sunshine[]): Plant[] {
        return this.plants.filter((plant) =>
            sunshine.includes(+plant.sunshine)
        );
    }
    filterByWatering(watering: Watering[]): Plant[] {
        return this.plants.filter((plant) =>
            watering.includes(+plant.watering)
        );
    }
    filterBySize(size: Size): Plant[] {
        if (size.min) {
            this.plants = this.plants.filter(
                (plant) =>
                    this.normalizeSize(size.min, size.unit) <=
                    this.normalizeSize(plant.size.min, plant.size.unit)
            );
        }
        if (size.max) {
            this.plants = this.plants.filter(
                (plant) =>
                    this.normalizeSize(size.max, size.unit) >=
                    this.normalizeSize(plant.size.max, plant.size.unit)
            );
        }
        return this.plants;
    }

    private normalizeSize(value: number, unit: Unit): number {
        return unit === Unit.METER ? value * 1000 : value;
    }
}

export default PlantsFilterer;
