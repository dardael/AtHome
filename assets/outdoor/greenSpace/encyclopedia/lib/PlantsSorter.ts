import {Plant} from '../entity/Plant';

class PlantsSorter {
    plants: Plant[];
    constructor(plants: Plant[]) {
        this.plants = plants;
    }

    sortByNameAsc(): Plant[] {
        return this.plants.sort((aPlant, anotherPlant) =>
            aPlant.name.localeCompare(anotherPlant.name)
        );
    }

    sortByNameDesc(): Plant[] {
        return this.plants.sort((aPlant, anotherPlant) =>
            anotherPlant.name.localeCompare(aPlant.name)
        );
    }
}

export default PlantsSorter;
