import {Plant} from '../entity/Plant';
import rusticityInput from '../components/rusticityInput';
import {Foliage} from '../entity/plant/Foliage';
import {Type} from '../entity/plant/Type';
import {Sunshine} from '../entity/plant/Sunshine';

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
}

export default PlantsFilterer;
