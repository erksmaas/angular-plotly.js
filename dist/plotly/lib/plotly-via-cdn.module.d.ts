import { PlotlyService } from './plotly.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./plotly-shared.module";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<PlotlyViaCDNModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PlotlyViaCDNModule, never, [typeof i1.CommonModule, typeof i2.PlotlySharedModule], [typeof i2.PlotlySharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PlotlyViaCDNModule>;
}
//# sourceMappingURL=plotly-via-cdn.module.d.ts.map