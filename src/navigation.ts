export type Route = {
    name: string;
    path?: string;
    subRoutes?: Route[];
    defaultExpanded?: boolean;
};

export const DIRECTORY_NAMES: { [key: string]: string } = {
    "": "Documentation",
    "x/": "Core Modules",
};

export const ROUTES: Route[] = [
    {
        name: "Introduction",
    },
    {
        name: "The Developer Hub",
        path: "/",
    },
    {
        name: "Asking for Help",
        path: "/getting-help",
    },
    {
        name: "Smart Contracts",
    },
    {
        name: "Smart Contracts on Kujira",
        path: "/sc-intro",
    },
    {
        name: "Using kujira.rs",
        path: "/kujira-rs",
        defaultExpanded: true,
        subRoutes: [
            {
                name: "kujira-std",
                path: "/kujira-rs/std",
            },
            {
                name: "dApp Interfaces",
                path: "/kujira-rs/dapp-interfaces",
            },
        ],
    },
    {
        name: "Kujira Core"
    },
    {
        name: "Core Modules",
        path: "/x",
        defaultExpanded: true,
        subRoutes: [
            {
                name: "x/oracle",
                path: "/x/oracle",
            },
            {
                name: "x/scheduler",
                path: "/x/scheduler",
            },
            {
                name: "x/tokenfactory",
                path: "/x/tokenfactory",
            },
        ]
    },
];
