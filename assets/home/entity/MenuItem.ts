export enum MenuItem {
    ENCYCLOPEDIA = 'encyclopedia',
    ACCOUNT_ADMIN = 'account-admin',
}

export namespace MenuItem {
    export function getMenuData(menuItem: MenuItem): {parent: string} {
        switch (menuItem) {
            case MenuItem.ENCYCLOPEDIA:
                return {parent: 'greenSpace'};
            case MenuItem.ACCOUNT_ADMIN:
                return {parent: 'settings'};
        }
    }
}
