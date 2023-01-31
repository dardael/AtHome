export enum Type {
    TREE = "tree",
    SHRUB = "shrub",
    ORNAMENTAL_PLANT = "ornamentalPlant",
    AROMATIC = "aromatic",
    POND_PLANT = "pondPlant",
}

export namespace Type {
    export function getLabels(): {key: Type, label: string}[] {
        return [
            {key: Type.TREE, label: 'Arbre'},
            {key: Type.SHRUB, label: 'Arbuste'},
            {key: Type.ORNAMENTAL_PLANT, label: 'Plante ornementale'},
            {key: Type.AROMATIC, label: 'Aromatique'},
            {key: Type.POND_PLANT, label: 'Plante de bassin'}
        ]
    }
}
