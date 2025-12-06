import { HelmetOptions } from "helmet";

export const getHelmetConfig = (): HelmetOptions => {
    const isDevelopment: boolean = process.env.NODE_ENV === "development";

    const baseConfig: HelmetOptions = {
        // disable for API
        contentSecurityPolicy: false,
        // // always hide the server info
        // hidePoweredyBy: true,
        // always prevent MIME sniffing
        noSniff: true,
    };

    if (isDevelopment) {
        return {
            ...baseConfig,
            // No HTTPS enforcement in development
            hsts: false,
        } as HelmetOptions;
    }

    // Production gets full security
    return {
        ...baseConfig,
        hsts: {
            // one year in seconds
            maxAge: 3153600,
            // this allows
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    } as HelmetOptions;
};