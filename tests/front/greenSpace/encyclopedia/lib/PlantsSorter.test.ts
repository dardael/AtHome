import PlantsSorter from '../../../../../assets/outdoor/greenSpace/encyclopedia/lib/PlantsSorter';
import {Plant} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/Plant';
import {Type} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Type';
import {Foliage} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Foliage';
import {Sunshine} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Sunshine';
import {Watering} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Watering';
import {Unit} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Unit';

describe('PlantsSorter', () => {
    const getPlant = (name: string): Plant => {
        return {
            name: name,
            type: Type.ORNAMENTAL_PLANT,
            foliage: Foliage.PERSISTENT,
            id: '1',
            description: '',
            pruningPeriods: [],
            rusticity: -1,
            scientificName: name,
            sunshine: Sunshine.SHADOW,
            watering: Watering.NO,
            size: {min: 0, max: 0, unit: Unit.CENTIMETER},
        };
    };
    describe('sortByNameAsc', () => {
        test('works with no plants', () => {
            expect(new PlantsSorter([]).sortByNameAsc()).toStrictEqual([]);
        });
        test('works with plants', () => {
            const albizia = getPlant('albizia');
            const rose = getPlant('rose');
            const grass = getPlant('grass');
            expect(
                new PlantsSorter([albizia, rose, grass]).sortByNameAsc()
            ).toStrictEqual([albizia, grass, rose]);
        });
    });
    describe('sortByNameDesc', () => {
        test('works with no plants', () => {
            expect(new PlantsSorter([]).sortByNameDesc()).toStrictEqual([]);
        });
        test('works with plants', () => {
            const albizia = getPlant('albizia');
            const rose = getPlant('rose');
            const grass = getPlant('grass');
            expect(
                new PlantsSorter([albizia, rose, grass]).sortByNameDesc()
            ).toStrictEqual([rose, grass, albizia]);
        });
    });
});
