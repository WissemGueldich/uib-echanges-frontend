export const navbarData = [
    {
        routeLink: 'users',
        icon: 'fal fa-users',
        label: 'Gestion des utilisateurs',
        auth:['ROLE_ADMIN','ROLE_GDHB']
    },
    {
        routeLink: 'profiles',
        icon: 'fal fa-id-card',
        label: 'Gestion des profiles',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'servers',
        icon: 'fal fa-server',
        label: 'Gestion des serveurs',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'system-users',
        icon: 'fal fa-users-cog',
        label: 'Gestion des utilisateurs système',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'configs',
        icon: 'fal fa-cog',
        label: 'Gestion des configurations',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'jobs',
        icon: 'fal fa-calendar',
        label: 'Gestion des jobs',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'applications',
        icon: 'fal fa-browser',
        label: 'Gestion des applications',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'transfers',
        icon: 'fal fa-exchange',
        label: 'Effectuer un transfert',
        auth:['ROLE_ADMIN','ROLE_SUPERVISION','ROLE_TRANSFER']
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-box-open',
        label: 'Paramètres',
        auth:['ROLE_ADMIN']
    },
];