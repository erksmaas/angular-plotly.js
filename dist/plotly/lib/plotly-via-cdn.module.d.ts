import { PlotlyService } from './plotly.service';
export declare type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance';
export declare class PlotlyViaCDNModule {
    plotlyService: PlotlyService;
    private static plotlyBundle?;
    private static plotlyVersion;
    static plotlyBundleNames: PlotlyBundleName[];
    constructor(plotlyService: PlotlyService);
    static setPlotlyVersion(version: string): void;
    static setPlotlyBundle(bundle: PlotlyBundleName | null): void;
    static loadViaCDN(): void;
}
