import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Home'
    },
    {
        routeLink: 'produtos',
        icon: 'fal fa-box-open',
        label: 'Produtos'
    },
    {
        routeLink: 'material',
        icon: 'fal fa-ruler',
        label: 'Material'
    },
    {
        routeLink: 'orcamento',
        icon: 'fal fa-clipboard',
        label: 'Orçamento'
    },
    {
        routeLink: 'cliente',
        icon: 'fal fa-user',
        label: 'Cliente'
    },
    {
        routeLink: 'fornecedores',
        icon: 'fal fa-truck',
        label: 'Fornecedores'



    },
    {
        routeLink: 'configuracoes',
        icon: 'fal fa-cog',
        label: 'Configurações',
        expanded: true,
        items: [
            {
                routeLink: 'configuracoes/perfil',
                label: 'Perfil'
            },
        ]
    },
];
