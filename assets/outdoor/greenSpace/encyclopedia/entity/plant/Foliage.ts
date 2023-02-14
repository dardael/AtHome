export enum Foliage {
    DECIDUOUS = 'deciduous',
    PERSISTENT = 'persistent',
}

export namespace Foliage {
    export function getLabels(): {key: Foliage; label: string}[] {
        return [
            {key: Foliage.DECIDUOUS, label: 'Caduc'},
            {key: Foliage.PERSISTENT, label: 'Persistant'},
        ];
    }
}
