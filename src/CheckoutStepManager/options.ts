export interface IOptions {
    /**
     * Used to log info during runtime which can be helpful during
     * development or debugging. But should be turned off in production.
     */
    useLogging: boolean;
}

export const defaultOptions: IOptions = {
    useLogging: false,
};
