import {Plant} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/Plant';
import {Type} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Type';
import {Foliage} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Foliage';
import {Sunshine} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Sunshine';
import {Watering} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Watering';
import {Unit} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Unit';
import PlantsFilterer from '../../../../../assets/outdoor/greenSpace/encyclopedia/lib/PlantsFilterer';
import {Size} from '../../../../../assets/outdoor/greenSpace/encyclopedia/entity/plant/Size';

describe('PlantsFilterer', () => {
    const getPlant = (
        name: string,
        scientificName: string,
        rusticity?: number,
        foliage?: Foliage,
        type?: Type,
        sunshine?: Sunshine,
        watering?: Watering,
        size?: Size
    ): Plant => {
        return {
            name: name,
            type: type ? type : Type.ORNAMENTAL_PLANT,
            foliage: foliage ? foliage : Foliage.PERSISTENT,
            id: '1',
            description: '',
            pruningPeriods: [],
            rusticity: rusticity ? rusticity : -1,
            scientificName: scientificName,
            sunshine: sunshine ? sunshine : Sunshine.SHADOW,
            watering: watering ? watering : Watering.NO,
            size: size ? size : {min: 0, max: 0, unit: Unit.CENTIMETER},
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
    describe('filterByRusticitySuperiorTo', () => {
        test('works with no plants', () => {
            expect(
                new PlantsFilterer([]).filterByRusticitySuperiorTo(0)
            ).toStrictEqual([]);
        });
        test('filters by rusticity', () => {
            const albizia = getPlant('albizia', '', -10);
            const rose = getPlant('rose', '', -5.5);
            const grass = getPlant('grass', '', 0);
            expect(
                new PlantsFilterer([
                    albizia,
                    rose,
                    grass,
                ]).filterByRusticitySuperiorTo(-5.5)
            ).toStrictEqual([rose, grass]);
        });
    });
    describe('filterByFoliage', () => {
        test('works with no plants', () => {
            expect(
                new PlantsFilterer([]).filterByFoliage(Foliage.PERSISTENT)
            ).toStrictEqual([]);
        });
        test('filters by foliage', () => {
            const albizia = getPlant('albizia', '', -10, Foliage.PERSISTENT);
            const rose = getPlant('rose', '', -5.5, Foliage.DECIDUOUS);
            const grass = getPlant('grass', '', 0, Foliage.PERSISTENT);
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterByFoliage(
                    Foliage.DECIDUOUS
                )
            ).toStrictEqual([rose]);
        });
    });
    describe('filterByTypes', () => {
        test('works with no plants', () => {
            expect(
                new PlantsFilterer([]).filterByTypes([Type.AROMATIC, Type.TREE])
            ).toStrictEqual([]);
        });
        test('filters by types', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterByTypes([
                    Type.AROMATIC,
                    Type.ORNAMENTAL_PLANT,
                ])
            ).toStrictEqual([albizia, grass]);
        });
    });
    describe('filterBySunshine', () => {
        test('works with no plants', () => {
            expect(
                new PlantsFilterer([]).filterBySunshine([
                    Sunshine.SUN,
                    Sunshine.SHADOW,
                ])
            ).toStrictEqual([]);
        });
        test('filters by sunshine', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC,
                Sunshine.SUN
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE,
                Sunshine.PARTIAL_SHADE
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT,
                Sunshine.SHADOW
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterBySunshine([
                    Sunshine.SUN,
                    Sunshine.SHADOW,
                ])
            ).toStrictEqual([albizia, grass]);
        });
    });
    describe('filterByWatering', () => {
        test('works with no plants', () => {
            expect(
                new PlantsFilterer([]).filterByWatering([
                    Watering.A_LOT,
                    Watering.A_LITTLE,
                ])
            ).toStrictEqual([]);
        });
        test('filters by watering', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC,
                Sunshine.SUN,
                Watering.A_LITTLE
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE,
                Sunshine.PARTIAL_SHADE,
                Watering.A_LOT
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT,
                Sunshine.SHADOW,
                Watering.NORMAL
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterByWatering([
                    Watering.A_LITTLE,
                    Watering.NORMAL,
                ])
            ).toStrictEqual([albizia, grass]);
        });
    });
    describe('filterBySize', () => {
        test('works with no plants', () => {
            expect(
                new PlantsFilterer([]).filterBySize({
                    min: 12,
                    max: 15.5,
                    unit: Unit.METER,
                })
            ).toStrictEqual([]);
        });
        test('filters by min size in centimeter', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC,
                Sunshine.SUN,
                Watering.A_LITTLE,
                {min: 15.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE,
                Sunshine.PARTIAL_SHADE,
                Watering.A_LOT,
                {min: 17.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT,
                Sunshine.SHADOW,
                Watering.NORMAL,
                {min: 19.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterBySize({
                    min: 17.5,
                    max: null,
                    unit: Unit.CENTIMETER,
                })
            ).toStrictEqual([rose, grass]);
        });
        test('filters by min size in meter', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC,
                Sunshine.SUN,
                Watering.A_LITTLE,
                {min: 15.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE,
                Sunshine.PARTIAL_SHADE,
                Watering.A_LOT,
                {min: 17.5, max: 27.5, unit: Unit.METER}
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT,
                Sunshine.SHADOW,
                Watering.NORMAL,
                {min: 19.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterBySize({
                    min: 17.5,
                    max: null,
                    unit: Unit.METER,
                })
            ).toStrictEqual([rose]);
        });
        test('filters by max size in centimeter', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC,
                Sunshine.SUN,
                Watering.A_LITTLE,
                {min: 15.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE,
                Sunshine.PARTIAL_SHADE,
                Watering.A_LOT,
                {min: 17.5, max: 29.5, unit: Unit.CENTIMETER}
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT,
                Sunshine.SHADOW,
                Watering.NORMAL,
                {min: 19.5, max: 30.5, unit: Unit.CENTIMETER}
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterBySize({
                    min: null,
                    max: 29.5,
                    unit: Unit.CENTIMETER,
                })
            ).toStrictEqual([albizia, rose]);
        });
        test('filters by max size in meter', () => {
            const albizia = getPlant(
                'albizia',
                '',
                -10,
                Foliage.PERSISTENT,
                Type.AROMATIC,
                Sunshine.SUN,
                Watering.A_LITTLE,
                {min: 15.5, max: 27.5, unit: Unit.CENTIMETER}
            );
            const rose = getPlant(
                'rose',
                '',
                -5.5,
                Foliage.DECIDUOUS,
                Type.TREE,
                Sunshine.PARTIAL_SHADE,
                Watering.A_LOT,
                {min: 17.5, max: 29.5, unit: Unit.METER}
            );
            const grass = getPlant(
                'grass',
                '',
                0,
                Foliage.PERSISTENT,
                Type.ORNAMENTAL_PLANT,
                Sunshine.SHADOW,
                Watering.NORMAL,
                {min: 19.5, max: 30.5, unit: Unit.CENTIMETER}
            );
            expect(
                new PlantsFilterer([albizia, rose, grass]).filterBySize({
                    min: null,
                    max: 28.5,
                    unit: Unit.METER,
                })
            ).toStrictEqual([albizia, grass]);
        });
    });
    test('filters by min and max size', () => {
        const albizia = getPlant(
            'albizia',
            '',
            -10,
            Foliage.PERSISTENT,
            Type.AROMATIC,
            Sunshine.SUN,
            Watering.A_LITTLE,
            {min: 15.5, max: 27.5, unit: Unit.CENTIMETER}
        );
        const rose = getPlant(
            'rose',
            '',
            -5.5,
            Foliage.DECIDUOUS,
            Type.TREE,
            Sunshine.PARTIAL_SHADE,
            Watering.A_LOT,
            {min: 17.5, max: 29.5, unit: Unit.METER}
        );
        const grass = getPlant(
            'grass',
            '',
            0,
            Foliage.PERSISTENT,
            Type.ORNAMENTAL_PLANT,
            Sunshine.SHADOW,
            Watering.NORMAL,
            {min: 19.5, max: 20.5, unit: Unit.CENTIMETER}
        );
        expect(
            new PlantsFilterer([albizia, rose, grass]).filterBySize({
                min: 18.5,
                max: 28.5,
                unit: Unit.CENTIMETER,
            })
        ).toStrictEqual([grass]);
    });
});
