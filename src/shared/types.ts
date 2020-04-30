export interface IOptions {
    /**
     * Used to log info during runtime which can be helpful during
     * development or debugging. But should be turned off in production.
     */
    debug?: boolean;
    jQuery: JQueryStatic;
}

export interface IBaseCSM {
    execute: (...callbacks: Function[]) => Function;
}

export interface IBaseSpecificCSM extends IBaseCSM {
    onAnyRepaint: () => this;
}
