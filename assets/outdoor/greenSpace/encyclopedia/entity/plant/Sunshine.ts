export enum Sunshine {
    SHADOW = 0,
    PARTIAL_SHADE = 0.5,
    SUN = 1,
}
export namespace Sunshine {
    export function getLabels(): {key: Sunshine; label: string}[] {
        return [
            {key: Sunshine.SHADOW, label: 'Ombre'},
            {key: Sunshine.PARTIAL_SHADE, label: 'Mi-ombre'},
            {key: Sunshine.SUN, label: 'Plein soleil'},
        ];
    }
}
