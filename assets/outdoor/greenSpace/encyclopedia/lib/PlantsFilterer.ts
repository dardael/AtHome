import {Plant} from '../entity/Plant';

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
}

export default PlantsFilterer;
