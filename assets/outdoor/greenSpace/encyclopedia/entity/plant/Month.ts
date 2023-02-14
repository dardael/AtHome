export enum Month {
    JANUARY = 'january',
    FEBRUARY = 'february',
    MARCH = 'march',
    APRIL = 'april',
    MAY = 'may',
    JUNE = 'june',
    JULY = 'july',
    AUGUST = 'august',
    SEPTEMBER = 'september',
    OCTOBER = 'october',
    NOVEMBER = 'november',
    DECEMBER = 'december',
}
export namespace Month {
    export function getLabels(): {key: Month; label: string}[] {
        return [
            {key: Month.JANUARY, label: 'Janvier'},
            {key: Month.FEBRUARY, label: 'Février'},
            {key: Month.MARCH, label: 'Mars'},
            {key: Month.APRIL, label: 'Avril'},
            {key: Month.MAY, label: 'Mai'},
            {key: Month.JUNE, label: 'Juin'},
            {key: Month.JULY, label: 'Juillet'},
            {key: Month.AUGUST, label: 'Aout'},
            {key: Month.SEPTEMBER, label: 'Septembre'},
            {key: Month.OCTOBER, label: 'Octobre'},
            {key: Month.NOVEMBER, label: 'Novembre'},
            {key: Month.DECEMBER, label: 'Décembre'},
        ];
    }
}
