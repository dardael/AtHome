import {Plant} from '../entity/Plant';

class PlantsSorter {
    plants: Plant[];
    constructor(plants: Plant[]) {
        this.plants = plants;
    }

    sortByNameAsc(): Plant[] {
        return this.plants.sort((aPlant, anotherPlant) =>
            aPlant.name > anotherPlant.name ? 1 : -1
        );
    }

    sortByNameDesc(): Plant[] {
        return this.plants.sort((aPlant, anotherPlant) =>
            aPlant.name > anotherPlant.name ? -1 : 1
        );
    }
}

export default PlantsSorter;
