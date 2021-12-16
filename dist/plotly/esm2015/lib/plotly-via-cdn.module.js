import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';
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
PlotlyViaCDNModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule, PlotlySharedModule],
                providers: [PlotlyService],
                exports: [PlotlySharedModule],
            },] }
];
PlotlyViaCDNModule.ctorParameters = () => [
    { type: PlotlyService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXZpYS1jZG4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGxvdGx5L3NyYy9saWIvcGxvdGx5LXZpYS1jZG4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVk1RCxNQUFNLE9BQU8sa0JBQWtCO0lBSzNCLFlBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFlO1FBQzFDLE1BQU0sSUFBSSxHQUFHLE9BQU8sS0FBSyxRQUFRLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUM7U0FDbEc7UUFFRCxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQStCO1FBQ3pELE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxLQUFLLHdCQUF3QixDQUFDLENBQUM7U0FDM0c7UUFFRCxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVTtRQUNwQixhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtZQUNkLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDLFlBQVksSUFBSSxJQUFJO2dCQUMvQyxDQUFDLENBQUMsOEJBQThCLGtCQUFrQixDQUFDLGFBQWEsU0FBUztnQkFDekUsQ0FBQyxDQUFDLDhCQUE4QixrQkFBa0IsQ0FBQyxZQUFZLElBQUksa0JBQWtCLENBQUMsYUFBYSxTQUFTLENBQUM7WUFFakgsTUFBTSxNQUFNLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztZQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNqQixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFcEYsTUFBTSxJQUFJLEdBQW9CLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXpCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLDhCQUE4QjtZQUVqRCxNQUFNLEVBQUUsR0FBRyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxNQUFNLEdBQUksTUFBYyxDQUFDLE1BQU0sQ0FBQztnQkFDdEMsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbkM7cUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixPQUFPLEVBQUcsQ0FBQztvQkFDWCxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN0QjtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxHQUFHLFlBQVksQ0FBQyxDQUFDO2lCQUM1RTtZQUNMLENBQUMsQ0FBQztZQUVGLEVBQUUsRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDO1FBRUYsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7O0FBOURjLCtCQUFZLEdBQVksSUFBSSxDQUFDO0FBQzdCLGdDQUFhLEdBQUcsUUFBUSxDQUFDO0FBQzFCLG9DQUFpQixHQUF1QixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDOztZQVQ1SCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztnQkFDM0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUNoQzs7O1lBWlEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi9wbG90bHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFBsb3RseVNoYXJlZE1vZHVsZSB9IGZyb20gJy4vcGxvdGx5LXNoYXJlZC5tb2R1bGUnO1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFBsb3RseUJ1bmRsZU5hbWUgPSAnYmFzaWMnIHwgJ2NhcnRlc2lhbicgfCAnZ2VvJyB8ICdnbDNkJyB8ICdnbDJkJyB8ICdtYXBib3gnIHwgJ2ZpbmFuY2UnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGxvdGx5U2hhcmVkTW9kdWxlXSxcclxuICAgIHByb3ZpZGVyczogW1Bsb3RseVNlcnZpY2VdLFxyXG4gICAgZXhwb3J0czogW1Bsb3RseVNoYXJlZE1vZHVsZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlWaWFDRE5Nb2R1bGUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGxvdGx5QnVuZGxlPzogc3RyaW5nID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3RhdGljIHBsb3RseVZlcnNpb24gPSAnbGF0ZXN0JztcclxuICAgIHB1YmxpYyBzdGF0aWMgcGxvdGx5QnVuZGxlTmFtZXM6IFBsb3RseUJ1bmRsZU5hbWVbXSA9IFsnYmFzaWMnLCAnY2FydGVzaWFuJywgJ2dlbycsICdnbDNkJywgJ2dsMmQnLCAnbWFwYm94JywgJ2ZpbmFuY2UnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGxvdGx5U2VydmljZTogUGxvdGx5U2VydmljZSkge1xyXG4gICAgICAgIFBsb3RseVNlcnZpY2Uuc2V0TW9kdWxlTmFtZSgnVmlhQ0ROJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRQbG90bHlWZXJzaW9uKHZlcnNpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzT2sgPSB2ZXJzaW9uID09PSAnbGF0ZXN0JyB8fCAvXlxcZFxcLlxcZHsxLDJ9XFwuXFxkezEsMn0kLy50ZXN0KHZlcnNpb24pO1xyXG4gICAgICAgIGlmICghaXNPaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGxvdGx5IHZlcnNpb24uIFBsZWFzZSBzZXQgJ2xhdGVzdCcgb3IgdmVyc2lvbiBudW1iZXIgKGkuZS46IDEuNC4zKWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUGxvdGx5VmlhQ0ROTW9kdWxlLmxvYWRWaWFDRE4oKTtcclxuICAgICAgICBQbG90bHlWaWFDRE5Nb2R1bGUucGxvdGx5VmVyc2lvbiA9IHZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRQbG90bHlCdW5kbGUoYnVuZGxlOiBQbG90bHlCdW5kbGVOYW1lIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzT2sgPSBidW5kbGUgPT09IG51bGwgfHwgUGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseUJ1bmRsZU5hbWVzLmluZGV4T2YoYnVuZGxlKSA+PSAwO1xyXG4gICAgICAgIGlmICghaXNPaykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lcyA9IFBsb3RseVZpYUNETk1vZHVsZS5wbG90bHlCdW5kbGVOYW1lcy5tYXAobiA9PiBgXCIke259XCJgKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGxvdGx5IGJ1bmRsZS4gUGxlYXNlIHNldCB0byBudWxsIGZvciBmdWxsIG9yICR7bmFtZXN9IGZvciBhIHBhcnRpYWwgYnVuZGxlLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseUJ1bmRsZSA9IGJ1bmRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRWaWFDRE4oKTogdm9pZCB7XHJcbiAgICAgICAgUGxvdGx5U2VydmljZS5zZXRQbG90bHkoJ3dhaXRpbmcnKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3JjID0gUGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseUJ1bmRsZSA9PSBudWxsXHJcbiAgICAgICAgICAgICAgICA/IGBodHRwczovL2Nkbi5wbG90Lmx5L3Bsb3RseS0ke1Bsb3RseVZpYUNETk1vZHVsZS5wbG90bHlWZXJzaW9ufS5taW4uanNgXHJcbiAgICAgICAgICAgICAgICA6IGBodHRwczovL2Nkbi5wbG90Lmx5L3Bsb3RseS0ke1Bsb3RseVZpYUNETk1vZHVsZS5wbG90bHlCdW5kbGV9LSR7UGxvdGx5VmlhQ0ROTW9kdWxlLnBsb3RseVZlcnNpb259Lm1pbi5qc2A7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzY3JpcHQ6IEhUTUxTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4gY29uc29sZS5lcnJvcihgRXJyb3IgbG9hZGluZyBwbG90bHkuanMgbGlicmFyeSBmcm9tICR7c3JjfWApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaGVhZDogSFRNTEhlYWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAyMDA7IC8vIGVxdWl2YWxlbnQgb2YgMTAgc2Vjb25kcy4uLlxyXG5cclxuICAgICAgICAgICAgY29uc3QgZm4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwbG90bHkgPSAod2luZG93IGFzIGFueSkuUGxvdGx5O1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsb3RseSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBsb3RseVNlcnZpY2Uuc2V0UGxvdGx5KHBsb3RseSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlciAtLTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZuLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgbG9hZGluZyBwbG90bHkuanMgbGlicmFyeSBmcm9tICR7c3JjfS4gVGltZW91dC5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChpbml0KTtcclxuICAgIH1cclxufVxyXG4iXX0=