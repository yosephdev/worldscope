const requiredEnvVars = {
    VITE_APP_NAME: 'WorldScope',
    VITE_APP_URL: 'https://worldscope.app',
} as const;

const optionalEnvVars = {
    VITE_GA_ID: '',
    VITE_SENTRY_DSN: '',
    VITE_API_BASE_URL: 'https://restcountries.com/v3.1',
} as const;

type RequiredEnv = typeof requiredEnvVars;
type OptionalEnv = typeof optionalEnvVars;
type Env = RequiredEnv & OptionalEnv;

function validateEnv(): Env {
    const env = { ...requiredEnvVars, ...optionalEnvVars };

    // Override with actual env vars
    Object.keys(env).forEach((key) => {
        const envValue = import.meta.env[key];
        if (envValue !== undefined) {
            (env as any)[key] = envValue;
        }
    });

    // Validate required vars in production
    if (import.meta.env.PROD) {
        Object.entries(requiredEnvVars).forEach(([key, defaultValue]) => {
            if (!env[key as keyof Env] && !defaultValue) {
                throw new Error(`Missing required environment variable: ${key}`);
            }
        });
    }

    return env;
}

export const env = validateEnv();