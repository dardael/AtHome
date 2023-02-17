export enum Watering {
    NO = 0,
    A_LITTLE = 1,
    NORMAL = 2,
    A_LOT = 3,
}
export namespace Watering {
    export function getLabels(): {key: Watering; label: string}[] {
        return [
            {key: Watering.NO, label: "Pas d'arrosage"},
            {key: Watering.A_LITTLE, label: 'Faible arrosage'},
            {key: Watering.NORMAL, label: 'Arrosage normal'},
            {key: Watering.A_LOT, label: 'Arrosage abondant'},
        ];
    }
}
