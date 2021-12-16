import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class PlotlyService {
    static setModuleName(moduleName) {
        PlotlyService.moduleName = moduleName;
    }
    static getModuleName() {
        return PlotlyService.moduleName;
    }
    static setPlotly(plotly) {
        if (typeof plotly === 'object' && typeof plotly.react !== 'function') {
            throw new Error('Invalid plotly.js version. Please, use any version above 1.40.0');
        }
        PlotlyService.plotly = plotly;
    }
    static insert(instance) {
        const index = PlotlyService.instances.indexOf(instance);
        if (index === -1) {
            PlotlyService.instances.push(instance);
        }
        return instance;
    }
    static remove(div) {
        const index = PlotlyService.instances.indexOf(div);
        if (index >= 0) {
            PlotlyService.instances.splice(index, 1);
            PlotlyService.plotly.purge(div);
        }
    }
    getInstanceByDivId(id) {
        for (const instance of PlotlyService.instances) {
            if (instance && instance.id === id) {
                return instance;
            }
        }
        return undefined;
    }
    getPlotly() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor(() => this._getPlotly() !== 'waiting');
            return this._getPlotly();
        });
    }
    _getPlotly() {
        if (typeof PlotlyService.plotly === 'undefined') {
            const msg = PlotlyService.moduleName === 'ViaCDN'
                ? `Error loading Peer dependency plotly.js from CDN url`
                : `Peer dependency plotly.js isn't installed`;
            throw new Error(msg);
        }
        return PlotlyService.plotly;
    }
    waitFor(fn) {
        return new Promise((resolve) => {
            const localFn = () => {
                fn() ? resolve() : setTimeout(localFn, 10);
            };
            localFn();
        });
    }
    // tslint:disable max-line-length
    newPlot(div, data, layout, config, frames) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor(() => this._getPlotly() !== 'waiting');
            if (frames) {
                const obj = { data, layout, config, frames };
                return this._getPlotly().newPlot(div, obj).then(() => PlotlyService.insert(div));
            }
            return this._getPlotly().newPlot(div, data, layout, config).then(() => PlotlyService.insert(div));
        });
    }
    plot(div, data, layout, config, frames) {
        if (frames) {
            const obj = { data, layout, config, frames };
            if (typeof (this._getPlotly().plot) === 'function') {
                return this._getPlotly().plot(div, obj);
            }
            else {
                // Adds support for Plotly 2.0.0 release candidates
                return this._getPlotly().newPlot(div, obj);
            }
        }
        if (typeof (this._getPlotly().plot) === 'function') {
            return this._getPlotly().plot(div, data, layout, config);
        }
        else {
            // Adds support for Plotly 2.0.0 release candidates
            return this._getPlotly().newPlot(div, data, layout, config);
        }
    }
    update(div, data, layout, config, frames) {
        if (frames) {
            const obj = { data, layout, config, frames };
            return this._getPlotly().react(div, obj);
        }
        return this._getPlotly().react(div, data, layout, config);
    }
    // tslint:enable max-line-length
    resize(div) {
        return this._getPlotly().Plots.resize(div);
    }
}
PlotlyService.instances = [];
PlotlyService.plotly = undefined;
PlotlyService.moduleName = undefined;
PlotlyService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PlotlyService_Factory() { return new PlotlyService(); }, token: PlotlyService, providedIn: "root" });
PlotlyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9wbG90bHkvc3JjL2xpYi9wbG90bHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTM0MsTUFBTSxPQUFPLGFBQWE7SUFLZixNQUFNLENBQUMsYUFBYSxDQUFDLFVBQXNCO1FBQzlDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUFFTSxNQUFNLENBQUMsYUFBYTtRQUN2QixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBVztRQUMvQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztTQUN0RjtRQUVELGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQWtDO1FBQ25ELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUE2QjtRQUM5QyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDWixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsRUFBVTtRQUNoQyxLQUFLLE1BQU0sUUFBUSxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDNUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sUUFBUSxDQUFDO2FBQ25CO1NBQ0o7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRVksU0FBUzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUMxRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFUyxVQUFVO1FBQ2hCLElBQUksT0FBTyxhQUFhLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUM3QyxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQzdDLENBQUMsQ0FBQyxzREFBc0Q7Z0JBQ3hELENBQUMsQ0FBQywyQ0FBMkMsQ0FBQztZQUVsRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFUyxPQUFPLENBQUMsRUFBaUI7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDakIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQztZQUVGLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaUNBQWlDO0lBQ3BCLE9BQU8sQ0FBQyxHQUFtQixFQUFFLElBQW1CLEVBQUUsTUFBK0IsRUFBRSxNQUErQixFQUFFLE1BQWlDOztZQUM5SixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1lBRTFELElBQUksTUFBTSxFQUFFO2dCQUNSLE1BQU0sR0FBRyxHQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0JBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBVSxDQUFDLENBQWlCLENBQUM7YUFDM0c7WUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBVSxDQUFDLENBQWlCLENBQUM7UUFDN0gsQ0FBQztLQUFBO0lBRU0sSUFBSSxDQUFDLEdBQTZCLEVBQUUsSUFBbUIsRUFBRSxNQUErQixFQUFFLE1BQStCLEVBQUUsTUFBaUM7UUFDL0osSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsR0FBRyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzNDLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFpQixDQUFDO2FBQzNEO2lCQUFNO2dCQUNILG1EQUFtRDtnQkFDbkQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQWlCLENBQUM7YUFDOUQ7U0FDSjtRQUVELElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBaUIsQ0FBQztTQUM1RTthQUFNO1lBQ0gsbURBQW1EO1lBQ25ELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQWlCLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQTZCLEVBQUUsSUFBbUIsRUFBRSxNQUErQixFQUFFLE1BQStCLEVBQUUsTUFBaUM7UUFDakssSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsR0FBRyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFpQixDQUFDO1NBQzVEO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBaUIsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsZ0NBQWdDO0lBRXpCLE1BQU0sQ0FBQyxHQUE2QjtRQUN2QyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7O0FBbkhnQix1QkFBUyxHQUErQixFQUFFLENBQUM7QUFDM0Msb0JBQU0sR0FBUyxTQUFTLENBQUM7QUFDekIsd0JBQVUsR0FBZ0IsU0FBUyxDQUFDOzs7WUFOeEQsVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQbG90bHkgfSBmcm9tICcuL3Bsb3RseS5pbnRlcmZhY2UnO1xyXG5cclxudHlwZSBQbG90bHlOYW1lID0gJ1Bsb3RseScgfCAnVmlhQ0ROJyB8ICdWaWFXaW5kb3cnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUGxvdGx5U2VydmljZSB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlczogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50W10gPSBbXTtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcGxvdGx5PzogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBtb2R1bGVOYW1lPzogUGxvdGx5TmFtZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldE1vZHVsZU5hbWUobW9kdWxlTmFtZTogUGxvdGx5TmFtZSk6IHZvaWQge1xyXG4gICAgICAgIFBsb3RseVNlcnZpY2UubW9kdWxlTmFtZSA9IG1vZHVsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNb2R1bGVOYW1lKCk6IFBsb3RseU5hbWUge1xyXG4gICAgICAgIHJldHVybiBQbG90bHlTZXJ2aWNlLm1vZHVsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRQbG90bHkocGxvdGx5OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBsb3RseSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHBsb3RseS5yZWFjdCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGxvdGx5LmpzIHZlcnNpb24uIFBsZWFzZSwgdXNlIGFueSB2ZXJzaW9uIGFib3ZlIDEuNDAuMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUGxvdGx5U2VydmljZS5wbG90bHkgPSBwbG90bHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbnNlcnQoaW5zdGFuY2U6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCk6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBQbG90bHlTZXJ2aWNlLmluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmUoZGl2OiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLmluZGV4T2YoZGl2KTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBQbG90bHlTZXJ2aWNlLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBQbG90bHlTZXJ2aWNlLnBsb3RseS5wdXJnZShkaXYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2VCeURpdklkKGlkOiBzdHJpbmcpOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2YgUGxvdGx5U2VydmljZS5pbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFBsb3RseSgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMud2FpdEZvcigoKSA9PiB0aGlzLl9nZXRQbG90bHkoKSAhPT0gJ3dhaXRpbmcnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9nZXRQbG90bHkoKTogYW55IHtcclxuICAgICAgICBpZiAodHlwZW9mIFBsb3RseVNlcnZpY2UucGxvdGx5ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSBQbG90bHlTZXJ2aWNlLm1vZHVsZU5hbWUgPT09ICdWaWFDRE4nXHJcbiAgICAgICAgICAgICAgICA/IGBFcnJvciBsb2FkaW5nIFBlZXIgZGVwZW5kZW5jeSBwbG90bHkuanMgZnJvbSBDRE4gdXJsYFxyXG4gICAgICAgICAgICAgICAgOiBgUGVlciBkZXBlbmRlbmN5IHBsb3RseS5qcyBpc24ndCBpbnN0YWxsZWRgO1xyXG5cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUGxvdGx5U2VydmljZS5wbG90bHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHdhaXRGb3IoZm46ICgpID0+IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxGbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZuKCkgPyByZXNvbHZlKCkgOiBzZXRUaW1lb3V0KGxvY2FsRm4sIDEwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsRm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtbGluZS1sZW5ndGhcclxuICAgIHB1YmxpYyBhc3luYyBuZXdQbG90KGRpdjogSFRNTERpdkVsZW1lbnQsIGRhdGE6IFBsb3RseS5EYXRhW10sIGxheW91dD86IFBhcnRpYWw8UGxvdGx5LkxheW91dD4sIGNvbmZpZz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz4sIGZyYW1lcz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz5bXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy53YWl0Rm9yKCgpID0+IHRoaXMuX2dldFBsb3RseSgpICE9PSAnd2FpdGluZycpO1xyXG5cclxuICAgICAgICBpZiAoZnJhbWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtkYXRhLCBsYXlvdXQsIGNvbmZpZywgZnJhbWVzfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBsb3RseSgpLm5ld1Bsb3QoZGl2LCBvYmopLnRoZW4oKCkgPT4gUGxvdGx5U2VydmljZS5pbnNlcnQoZGl2IGFzIGFueSkpIGFzIFByb21pc2U8YW55PjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKS5uZXdQbG90KGRpdiwgZGF0YSwgbGF5b3V0LCBjb25maWcpLnRoZW4oKCkgPT4gUGxvdGx5U2VydmljZS5pbnNlcnQoZGl2IGFzIGFueSkpIGFzIFByb21pc2U8YW55PjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxvdChkaXY6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCwgZGF0YTogUGxvdGx5LkRhdGFbXSwgbGF5b3V0PzogUGFydGlhbDxQbG90bHkuTGF5b3V0PiwgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPiwgZnJhbWVzPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPltdKTogUHJvbWlzZTxhbnk+ICB7XHJcbiAgICAgICAgaWYgKGZyYW1lcykge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7ZGF0YSwgbGF5b3V0LCBjb25maWcsIGZyYW1lc307XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5fZ2V0UGxvdGx5KCkucGxvdCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKS5wbG90KGRpdiwgb2JqKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGRzIHN1cHBvcnQgZm9yIFBsb3RseSAyLjAuMCByZWxlYXNlIGNhbmRpZGF0ZXNcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKS5uZXdQbG90KGRpdiwgb2JqKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YodGhpcy5fZ2V0UGxvdGx5KCkucGxvdCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBsb3RseSgpLnBsb3QoZGl2LCBkYXRhLCBsYXlvdXQsIGNvbmZpZykgYXMgUHJvbWlzZTxhbnk+O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEFkZHMgc3VwcG9ydCBmb3IgUGxvdGx5IDIuMC4wIHJlbGVhc2UgY2FuZGlkYXRlc1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCkubmV3UGxvdChkaXYsIGRhdGEsIGxheW91dCwgY29uZmlnKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGl2OiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQsIGRhdGE6IFBsb3RseS5EYXRhW10sIGxheW91dD86IFBhcnRpYWw8UGxvdGx5LkxheW91dD4sIGNvbmZpZz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz4sIGZyYW1lcz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz5bXSk6IFByb21pc2U8YW55PiAge1xyXG4gICAgICAgIGlmIChmcmFtZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0ge2RhdGEsIGxheW91dCwgY29uZmlnLCBmcmFtZXN9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCkucmVhY3QoZGl2LCBvYmopIGFzIFByb21pc2U8YW55PjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKS5yZWFjdChkaXYsIGRhdGEsIGxheW91dCwgY29uZmlnKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICB9XHJcbiAgICAvLyB0c2xpbnQ6ZW5hYmxlIG1heC1saW5lLWxlbmd0aFxyXG5cclxuICAgIHB1YmxpYyByZXNpemUoZGl2OiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCkuUGxvdHMucmVzaXplKGRpdik7XHJcbiAgICB9XHJcbn1cclxuIl19