export type Route = {
    name: string;
    path?: string;
    subRoutes?: Route[];
    defaultExpanded?: boolean;
};

export const DIRECTORY_NAMES: { [key: string]: string } = {
    "": "Documentation",
    "x/": "Core Modules",
    "sc/": "Smart Contracts",
    "kujira-rs/": "kujira.rs",
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
        path: "/sc",
        defaultExpanded: true,
        subRoutes: [
            {
                name: "kujira.rs",
                path: "/sc/kujira-rs",
            },
            {
                name: "Oracle Integration Guide",
                path: "/sc/oracles",
            },
            // {
            //     name: "Scheduling Recurring Actions",
            //     path: "/sc/scheduler",
            // },
            {
                name: "Creating & Using Denoms",
                path: "/sc/denom",
            },
            {
                name: "The Callback Pattern",
                path: "/sc/callbacks",
            }
        ],
    },
    // {
    //     name: "Kujira Core"
    // },
    // {
    //     name: "Core Modules",
    //     path: "/x",
    //     defaultExpanded: true,
    //     subRoutes: [
    //         {
    //             name: "x/oracle",
    //             path: "/x/oracle",
    //         },
    //         {
    //             name: "x/scheduler",
    //             path: "/x/scheduler",
    //         },
    //         {
    //             name: "x/denom",
    //             path: "/x/denom",
    //         },
    //     ]
    // },
];
