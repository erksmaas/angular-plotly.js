import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';
import * as i0 from "@angular/core";
import * as i1 from "./plotly.service";
export class PlotlyViaCDNModule {
    constructor(plotlyService) {
        this.plotlyService = plotlyService;
        PlotlyService.setModuleName('ViaCDN');
    }
    static setPlotlyVersion(version) {
        const isOk = version === 'latest' || /^\d\.\d{1,2}\.\d{1,2}$/.test(version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3)`);
        }
        PlotlyViaCDNModule.loadViaCDN();
        PlotlyViaCDNModule.plotlyVersion = version;
    }
    static setPlotlyBundle(bundle) {
        const isOk = bundle === null || PlotlyViaCDNModule.plotlyBundleNames.indexOf(bundle) >= 0;
        if (!isOk) {
            const names = PlotlyViaCDNModule.plotlyBundleNames.map(n => `"${n}"`).join(', ');
            throw new Error(`Invalid plotly bundle. Please set to null for full or ${names} for a partial bundle.`);
        }
        PlotlyViaCDNModule.plotlyBundle = bundle;
    }
    static loadViaCDN() {
        PlotlyService.setPlotly('waiting');
        const init = () => {
            const src = PlotlyViaCDNModule.plotlyBundle == null
                ? `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyVersion}.min.js`
                : `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyBundle}-${PlotlyViaCDNModule.plotlyVersion}.min.js`;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onerror = () => console.error(`Error loading plotly.js library from ${src}`);
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
            let counter = 200; // equivalent of 10 seconds...
            const fn = () => {
                const plotly = window.Plotly;
                if (plotly) {
                    PlotlyService.setPlotly(plotly);
                }
                else if (counter > 0) {
                    counter--;
                    setTimeout(fn, 50);
                }
                else {
                    throw new Error(`Error loading plotly.js library from ${src}. Timeout.`);
                }
            };
            fn();
        };
        setTimeout(init);
    }
}
PlotlyViaCDNModule.plotlyBundle = null;
PlotlyViaCDNModule.plotlyVersion = 'latest';
PlotlyViaCDNModule.plotlyBundleNames = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance'];
PlotlyViaCDNModule.ɵfac = function PlotlyViaCDNModule_Factory(t) { return new (t || PlotlyViaCDNModule)(i0.ɵɵinject(i1.PlotlyService)); };
PlotlyViaCDNModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PlotlyViaCDNModule });
PlotlyViaCDNModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [PlotlyService], imports: [[CommonModule, PlotlySharedModule], PlotlySharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlotlyViaCDNModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [CommonModule, PlotlySharedModule],
                providers: [PlotlyService],
                exports: [PlotlySharedModule],
            }]
    }], function () { return [{ type: i1.PlotlyService }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PlotlyViaCDNModule, { imports: [CommonModule, PlotlySharedModule], exports: [PlotlySharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXZpYS1jZG4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGxvdGx5L3NyYy9saWIvcGxvdGx5LXZpYS1jZG4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBWTVELE1BQU0sT0FBTyxrQkFBa0I7SUFLM0IsWUFBbUIsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDM0MsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQWU7UUFDMUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxLQUFLLFFBQVEsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsNkVBQTZFLENBQUMsQ0FBQztTQUNsRztRQUVELGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7SUFDL0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBK0I7UUFDekQsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLElBQUksSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pGLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELEtBQUssd0JBQXdCLENBQUMsQ0FBQztTQUMzRztRQUVELGtCQUFrQixDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDN0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVO1FBQ3BCLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxJQUFJLElBQUk7Z0JBQy9DLENBQUMsQ0FBQyw4QkFBOEIsa0JBQWtCLENBQUMsYUFBYSxTQUFTO2dCQUN6RSxDQUFDLENBQUMsOEJBQThCLGtCQUFrQixDQUFDLFlBQVksSUFBSSxrQkFBa0IsQ0FBQyxhQUFhLFNBQVMsQ0FBQztZQUVqSCxNQUFNLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUVwRixNQUFNLElBQUksR0FBb0IsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsOEJBQThCO1lBRWpELE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRTtnQkFDWixNQUFNLE1BQU0sR0FBSSxNQUFjLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxJQUFJLE1BQU0sRUFBRTtvQkFDUixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNuQztxQkFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7b0JBQ3BCLE9BQU8sRUFBRyxDQUFDO29CQUNYLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLEdBQUcsWUFBWSxDQUFDLENBQUM7aUJBQzVFO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsRUFBRSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUM7UUFFRixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQzs7QUE5RGMsK0JBQVksR0FBWSxJQUFJLENBQUM7QUFDN0IsZ0NBQWEsR0FBRyxRQUFRLENBQUM7QUFDMUIsb0NBQWlCLEdBQXVCLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7b0ZBSGhILGtCQUFrQjtvRUFBbEIsa0JBQWtCO3lFQUhoQixDQUFDLGFBQWEsQ0FBQyxZQURqQixDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxFQUVqQyxrQkFBa0I7dUZBRW5CLGtCQUFrQjtjQU45QixRQUFRO2VBQUM7Z0JBQ04sWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztnQkFDM0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUNoQzs7d0ZBQ1ksa0JBQWtCLGNBSmpCLFlBQVksRUFBRSxrQkFBa0IsYUFFaEMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBsb3RseVNlcnZpY2UgfSBmcm9tICcuL3Bsb3RseS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGxvdGx5U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9wbG90bHktc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgUGxvdGx5QnVuZGxlTmFtZSA9ICdiYXNpYycgfCAnY2FydGVzaWFuJyB8ICdnZW8nIHwgJ2dsM2QnIHwgJ2dsMmQnIHwgJ21hcGJveCcgfCAnZmluYW5jZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW10sXHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQbG90bHlTaGFyZWRNb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbUGxvdGx5U2VydmljZV0sXHJcbiAgICBleHBvcnRzOiBbUGxvdGx5U2hhcmVkTW9kdWxlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseVZpYUNETk1vZHVsZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwbG90bHlCdW5kbGU/OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGxvdGx5VmVyc2lvbiA9ICdsYXRlc3QnO1xyXG4gICAgcHVibGljIHN0YXRpYyBwbG90bHlCdW5kbGVOYW1lczogUGxvdGx5QnVuZGxlTmFtZVtdID0gWydiYXNpYycsICdjYXJ0ZXNpYW4nLCAnZ2VvJywgJ2dsM2QnLCAnZ2wyZCcsICdtYXBib3gnLCAnZmluYW5jZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwbG90bHlTZXJ2aWNlOiBQbG90bHlTZXJ2aWNlKSB7XHJcbiAgICAgICAgUGxvdGx5U2VydmljZS5zZXRNb2R1bGVOYW1lKCdWaWFDRE4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFBsb3RseVZlcnNpb24odmVyc2lvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNPayA9IHZlcnNpb24gPT09ICdsYXRlc3QnIHx8IC9eXFxkXFwuXFxkezEsMn1cXC5cXGR7MSwyfSQvLnRlc3QodmVyc2lvbik7XHJcbiAgICAgICAgaWYgKCFpc09rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbG90bHkgdmVyc2lvbi4gUGxlYXNlIHNldCAnbGF0ZXN0JyBvciB2ZXJzaW9uIG51bWJlciAoaS5lLjogMS40LjMpYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbG90bHlWaWFDRE5Nb2R1bGUubG9hZFZpYUNETigpO1xyXG4gICAgICAgIFBsb3RseVZpYUNETk1vZHVsZS5wbG90bHlWZXJzaW9uID0gdmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFBsb3RseUJ1bmRsZShidW5kbGU6IFBsb3RseUJ1bmRsZU5hbWUgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNPayA9IGJ1bmRsZSA9PT0gbnVsbCB8fCBQbG90bHlWaWFDRE5Nb2R1bGUucGxvdGx5QnVuZGxlTmFtZXMuaW5kZXhPZihidW5kbGUpID49IDA7XHJcbiAgICAgICAgaWYgKCFpc09rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVzID0gUGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseUJ1bmRsZU5hbWVzLm1hcChuID0+IGBcIiR7bn1cImApLmpvaW4oJywgJyk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbG90bHkgYnVuZGxlLiBQbGVhc2Ugc2V0IHRvIG51bGwgZm9yIGZ1bGwgb3IgJHtuYW1lc30gZm9yIGEgcGFydGlhbCBidW5kbGUuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbG90bHlWaWFDRE5Nb2R1bGUucGxvdGx5QnVuZGxlID0gYnVuZGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFZpYUNETigpOiB2b2lkIHtcclxuICAgICAgICBQbG90bHlTZXJ2aWNlLnNldFBsb3RseSgnd2FpdGluZycpO1xyXG5cclxuICAgICAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzcmMgPSBQbG90bHlWaWFDRE5Nb2R1bGUucGxvdGx5QnVuZGxlID09IG51bGxcclxuICAgICAgICAgICAgICAgID8gYGh0dHBzOi8vY2RuLnBsb3QubHkvcGxvdGx5LSR7UGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseVZlcnNpb259Lm1pbi5qc2BcclxuICAgICAgICAgICAgICAgIDogYGh0dHBzOi8vY2RuLnBsb3QubHkvcGxvdGx5LSR7UGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseUJ1bmRsZX0tJHtQbG90bHlWaWFDRE5Nb2R1bGUucGxvdGx5VmVyc2lvbn0ubWluLmpzYDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHNyYztcclxuICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiBjb25zb2xlLmVycm9yKGBFcnJvciBsb2FkaW5nIHBsb3RseS5qcyBsaWJyYXJ5IGZyb20gJHtzcmN9YCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoZWFkOiBIVE1MSGVhZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY291bnRlciA9IDIwMDsgLy8gZXF1aXZhbGVudCBvZiAxMCBzZWNvbmRzLi4uXHJcblxyXG4gICAgICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBsb3RseSA9ICh3aW5kb3cgYXMgYW55KS5QbG90bHk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxvdGx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxvdGx5U2VydmljZS5zZXRQbG90bHkocGxvdGx5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyIC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDUwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBsb2FkaW5nIHBsb3RseS5qcyBsaWJyYXJ5IGZyb20gJHtzcmN9LiBUaW1lb3V0LmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGluaXQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==