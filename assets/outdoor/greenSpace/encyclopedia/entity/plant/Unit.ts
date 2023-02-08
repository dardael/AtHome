export enum Unit {
    METER = 'm',
    CENTIMETER = 'cm',
}

export namespace Unit {
    export function getLabels(): {key: Unit, label: string}[] {
        return [
            {key: Unit.METER, label: 'm'},
            {key: Unit.CENTIMETER, label: 'cm'}
        ]
    }
}
