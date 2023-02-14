import {Plant} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/Plant';
import {Type} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Type';
import {Foliage} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Foliage';
import {Sunshine} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Sunshine';
import {Watering} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Watering';
import {Unit} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Unit';
import PlantsFilterer from '../../../../../assets/outdoor/greenSpace/encyclopedia/lib/PlantsFilterer';

describe('PlantsFilterer', () => {
    const getPlant = (name: string, scientificName: string): Plant => {
        return {
            name: name,
            type: Type.ORNAMENTAL_PLANT,
            foliage: Foliage.PERSISTENT,
            id: '1',
            description: '',
            pruningPeriods: [],
            rusticity: -1,
            scientificName: scientificName,
            sunshine: Sunshine.SHADOW,
            watering: Watering.NO,
            size: {min: 0, max: 0, unit: Unit.CENTIMETER},
        };
    };
    describe('filterByName', () => {
        test('works with no plants', () => {
            expect(new PlantsFilterer([]).filterByName('a name')).toStrictEqual(
                []
            );
        });
        test('filters by name', () => {
            const albizia = getPlant('albizia', '');
            const rose = getPlant('rose', '');
            const grass = getPlant('grass', '');
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterByName('r')
            ).toStrictEqual([rose, grass]);
        });
        test('filters by name and scientific name', () => {
            const albizia = getPlant('albizia', 'albizia');
            const rose = getPlant('rose', '');
            const grass = getPlant('grass', 'etRo');
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterByName('ro')
            ).toStrictEqual([rose, grass]);
        });
    });
});
