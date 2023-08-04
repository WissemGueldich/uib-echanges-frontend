export const navbarData = [
    {
        routeLink: 'users',
        icon: 'fa fa-users',
        label: 'Gestion des utilisateurs',
        auth:['ROLE_ADMIN','ROLE_GDHB']
    },
    {
        routeLink: 'profiles',
        icon: 'fa fa-id-card',
        label: 'Gestion des profiles',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'servers',
        icon: 'fa fa-server',
        label: 'Gestion des serveurs',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'system-users',
        icon: 'fa fa-id-badge',
        label: 'Gestion des utilisateurs système',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'configs',
        icon: 'fa fa-cog',
        label: 'Gestion des configurations',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'jobs',
        icon: 'fa fa-calendar',
        label: 'Gestion des jobs',
        auth:['ROLE_ADMIN']
    },
    {
        routeLink: 'transfer',
        icon: 'fa fa-exchange',
        label: 'Effectuer un transfert',
        auth:['ROLE_ADMIN','ROLE_TRANSFER']
    },
    {
        routeLink: 'transfers',
        icon: 'fa fa-history',
        label: 'Historique des transferts',
        auth:['ROLE_ADMIN','ROLE_SUPERVISION']
    }, 
    /*{
        routeLink: 'applications',
        icon: 'fa fa-browser',
        label: 'Gestion des applications',
        auth:['ROLE_ADMIN']
    }*/

];