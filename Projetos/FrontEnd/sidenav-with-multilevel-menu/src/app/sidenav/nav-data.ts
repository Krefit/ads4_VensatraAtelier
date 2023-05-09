import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'produtos',
        icon: 'fal fa-box-open',
        label: 'Produtos Inutilizar',
        items: [
            {
                routeLink: 'produtos/level1.1',
                label: 'Level 1.1',
                items: [
                    {
                        routeLink: 'produtos/level2.1',
                        label: 'Level 2.1',
                    },
                    {
                        routeLink: 'produtos/level2.2',
                        label: 'Level 2.2',
                        items: [
                            {
                                routeLink: 'produtos/level3.1',
                                label: 'Level 3.1'
                            },
                            {
                                routeLink: 'produtos/level3.2',
                                label: 'Level 3.2'
                            }
                        ]
                    }
                ]
            },
            {
                routeLink: 'produtos/level1.2',
                label: 'Level 1.2',
            }
        ]
    },
    {
        routeLink: 'material',
        icon: 'fal fa-chart-bar',
        label: 'Material'
    },
    {
        routeLink: 'orcamento',
        icon: 'fal fa-tags',
        label: 'Orçamento',
        items: [
            {
                routeLink: 'orcamento/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'orcamento/create',
                label: 'Create Coupens'
            }
        ]
    },
    {
        routeLink: 'cliente',
        icon: 'fal fa-file',
        label: 'Cliente'
    },
    {
        routeLink: 'fornecedores',
        icon: 'fal fa-camera',
        label: 'Fornecedores'
    },
    {
        routeLink: 'configuracoes',
        icon: 'fal fa-cog',
        label: 'Configurações',
        expanded: true,
        items: [
            {
                routeLink: 'configuracoes/profile',
                label: 'Profile'
            },
            {
                routeLink: 'configuracoes/customize',
                label: 'Customize'
            }
        ]
    },
    {
        routeLink: 'precificacao',
        icon: 'fal fa-cog',
        label: 'Produtos'
    }
];