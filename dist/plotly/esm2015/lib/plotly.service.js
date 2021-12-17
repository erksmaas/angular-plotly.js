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
        var _a;
        if (div) {
            // console.log(div);
            // console.log('display: ', window.getComputedStyle(div).display);
            const display = (_a = window.getComputedStyle(div)) === null || _a === void 0 ? void 0 : _a.display;
            if (display && display !== 'none') {
                console.log('visible so resizing');
                return this._getPlotly().Plots.resize(div);
            }
            else {
                console.log('not visible so not resizing');
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9wbG90bHkvc3JjL2xpYi9wbG90bHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTM0MsTUFBTSxPQUFPLGFBQWE7SUFLZixNQUFNLENBQUMsYUFBYSxDQUFDLFVBQXNCO1FBQzlDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUFFTSxNQUFNLENBQUMsYUFBYTtRQUN2QixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBVztRQUMvQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztTQUN0RjtRQUVELGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQWtDO1FBQ25ELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUE2QjtRQUM5QyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDWixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsRUFBVTtRQUNoQyxLQUFLLE1BQU0sUUFBUSxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDNUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sUUFBUSxDQUFDO2FBQ25CO1NBQ0o7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRVksU0FBUzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUMxRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFUyxVQUFVO1FBQ2hCLElBQUksT0FBTyxhQUFhLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUM3QyxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQzdDLENBQUMsQ0FBQyxzREFBc0Q7Z0JBQ3hELENBQUMsQ0FBQywyQ0FBMkMsQ0FBQztZQUVsRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFUyxPQUFPLENBQUMsRUFBaUI7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDakIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQztZQUVGLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaUNBQWlDO0lBQ3BCLE9BQU8sQ0FBQyxHQUFtQixFQUFFLElBQW1CLEVBQUUsTUFBK0IsRUFBRSxNQUErQixFQUFFLE1BQWlDOztZQUM5SixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1lBRTFELElBQUksTUFBTSxFQUFFO2dCQUNSLE1BQU0sR0FBRyxHQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0JBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBVSxDQUFDLENBQWlCLENBQUM7YUFDM0c7WUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBVSxDQUFDLENBQWlCLENBQUM7UUFDN0gsQ0FBQztLQUFBO0lBRU0sSUFBSSxDQUFDLEdBQTZCLEVBQUUsSUFBbUIsRUFBRSxNQUErQixFQUFFLE1BQStCLEVBQUUsTUFBaUM7UUFDL0osSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsR0FBRyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzNDLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFpQixDQUFDO2FBQzNEO2lCQUFNO2dCQUNILG1EQUFtRDtnQkFDbkQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQWlCLENBQUM7YUFDOUQ7U0FDSjtRQUVELElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBaUIsQ0FBQztTQUM1RTthQUFNO1lBQ0gsbURBQW1EO1lBQ25ELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQWlCLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQTZCLEVBQUUsSUFBbUIsRUFBRSxNQUErQixFQUFFLE1BQStCLEVBQUUsTUFBaUM7UUFDakssSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsR0FBRyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFpQixDQUFDO1NBQzVEO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBaUIsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsZ0NBQWdDO0lBRXpCLE1BQU0sQ0FBQyxHQUE2Qjs7UUFDdkMsSUFBSSxHQUFHLEVBQUU7WUFDTCxvQkFBb0I7WUFDcEIsa0VBQWtFO1lBQ2xFLE1BQU0sT0FBTyxHQUFHLE1BQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQywwQ0FBRSxPQUFPLENBQUM7WUFDdEQsSUFBSSxPQUFPLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzlDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUM5QztTQUNKO0lBQ0wsQ0FBQzs7QUE3SGdCLHVCQUFTLEdBQStCLEVBQUUsQ0FBQztBQUMzQyxvQkFBTSxHQUFTLFNBQVMsQ0FBQztBQUN6Qix3QkFBVSxHQUFnQixTQUFTLENBQUM7OztZQU54RCxVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBsb3RseSB9IGZyb20gJy4vcGxvdGx5LmludGVyZmFjZSc7XHJcblxyXG50eXBlIFBsb3RseU5hbWUgPSAnUGxvdGx5JyB8ICdWaWFDRE4nIHwgJ1ZpYVdpbmRvdyc7XHJcblxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlTZXJ2aWNlIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2VzOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBwbG90bHk/OiBhbnkgPSB1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIG1vZHVsZU5hbWU/OiBQbG90bHlOYW1lID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0TW9kdWxlTmFtZShtb2R1bGVOYW1lOiBQbG90bHlOYW1lKTogdm9pZCB7XHJcbiAgICAgICAgUGxvdGx5U2VydmljZS5tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1vZHVsZU5hbWUoKTogUGxvdGx5TmFtZSB7XHJcbiAgICAgICAgcmV0dXJuIFBsb3RseVNlcnZpY2UubW9kdWxlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFBsb3RseShwbG90bHk6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGxvdGx5ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGxvdGx5LnJlYWN0ICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwbG90bHkuanMgdmVyc2lvbi4gUGxlYXNlLCB1c2UgYW55IHZlcnNpb24gYWJvdmUgMS40MC4wJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbG90bHlTZXJ2aWNlLnBsb3RseSA9IHBsb3RseTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc2VydChpbnN0YW5jZTogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50KTogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLmluZGV4T2YoaW5zdGFuY2UpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgUGxvdGx5U2VydmljZS5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShkaXY6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gUGxvdGx5U2VydmljZS5pbnN0YW5jZXMuaW5kZXhPZihkaXYpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIFBsb3RseVNlcnZpY2UucGxvdGx5LnB1cmdlKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZUJ5RGl2SWQoaWQ6IHN0cmluZyk6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBQbG90bHlTZXJ2aWNlLmluc3RhbmNlcykge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UuaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0UGxvdGx5KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy53YWl0Rm9yKCgpID0+IHRoaXMuX2dldFBsb3RseSgpICE9PSAnd2FpdGluZycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2dldFBsb3RseSgpOiBhbnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgUGxvdGx5U2VydmljZS5wbG90bHkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IFBsb3RseVNlcnZpY2UubW9kdWxlTmFtZSA9PT0gJ1ZpYUNETidcclxuICAgICAgICAgICAgICAgID8gYEVycm9yIGxvYWRpbmcgUGVlciBkZXBlbmRlbmN5IHBsb3RseS5qcyBmcm9tIENETiB1cmxgXHJcbiAgICAgICAgICAgICAgICA6IGBQZWVyIGRlcGVuZGVuY3kgcGxvdGx5LmpzIGlzbid0IGluc3RhbGxlZGA7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQbG90bHlTZXJ2aWNlLnBsb3RseTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgd2FpdEZvcihmbjogKCkgPT4gYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhbEZuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm4oKSA/IHJlc29sdmUoKSA6IHNldFRpbWVvdXQobG9jYWxGbiwgMTApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbG9jYWxGbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlIG1heC1saW5lLWxlbmd0aFxyXG4gICAgcHVibGljIGFzeW5jIG5ld1Bsb3QoZGl2OiBIVE1MRGl2RWxlbWVudCwgZGF0YTogUGxvdGx5LkRhdGFbXSwgbGF5b3V0PzogUGFydGlhbDxQbG90bHkuTGF5b3V0PiwgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPiwgZnJhbWVzPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLndhaXRGb3IoKCkgPT4gdGhpcy5fZ2V0UGxvdGx5KCkgIT09ICd3YWl0aW5nJyk7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0ge2RhdGEsIGxheW91dCwgY29uZmlnLCBmcmFtZXN9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCkubmV3UGxvdChkaXYsIG9iaikudGhlbigoKSA9PiBQbG90bHlTZXJ2aWNlLmluc2VydChkaXYgYXMgYW55KSkgYXMgUHJvbWlzZTxhbnk+O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBsb3RseSgpLm5ld1Bsb3QoZGl2LCBkYXRhLCBsYXlvdXQsIGNvbmZpZykudGhlbigoKSA9PiBQbG90bHlTZXJ2aWNlLmluc2VydChkaXYgYXMgYW55KSkgYXMgUHJvbWlzZTxhbnk+O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbG90KGRpdjogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50LCBkYXRhOiBQbG90bHkuRGF0YVtdLCBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+LCBjb25maWc/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+LCBmcmFtZXM/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+W10pOiBQcm9taXNlPGFueT4gIHtcclxuICAgICAgICBpZiAoZnJhbWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtkYXRhLCBsYXlvdXQsIGNvbmZpZywgZnJhbWVzfTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLl9nZXRQbG90bHkoKS5wbG90KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBsb3RseSgpLnBsb3QoZGl2LCBvYmopIGFzIFByb21pc2U8YW55PjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZHMgc3VwcG9ydCBmb3IgUGxvdGx5IDIuMC4wIHJlbGVhc2UgY2FuZGlkYXRlc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBsb3RseSgpLm5ld1Bsb3QoZGl2LCBvYmopIGFzIFByb21pc2U8YW55PjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLl9nZXRQbG90bHkoKS5wbG90KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCkucGxvdChkaXYsIGRhdGEsIGxheW91dCwgY29uZmlnKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQWRkcyBzdXBwb3J0IGZvciBQbG90bHkgMi4wLjAgcmVsZWFzZSBjYW5kaWRhdGVzXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKS5uZXdQbG90KGRpdiwgZGF0YSwgbGF5b3V0LCBjb25maWcpIGFzIFByb21pc2U8YW55PjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkaXY6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCwgZGF0YTogUGxvdGx5LkRhdGFbXSwgbGF5b3V0PzogUGFydGlhbDxQbG90bHkuTGF5b3V0PiwgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPiwgZnJhbWVzPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPltdKTogUHJvbWlzZTxhbnk+ICB7XHJcbiAgICAgICAgaWYgKGZyYW1lcykge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7ZGF0YSwgbGF5b3V0LCBjb25maWcsIGZyYW1lc307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQbG90bHkoKS5yZWFjdChkaXYsIG9iaikgYXMgUHJvbWlzZTxhbnk+O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBsb3RseSgpLnJlYWN0KGRpdiwgZGF0YSwgbGF5b3V0LCBjb25maWcpIGFzIFByb21pc2U8YW55PjtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDplbmFibGUgbWF4LWxpbmUtbGVuZ3RoXHJcblxyXG4gICAgcHVibGljIHJlc2l6ZShkaXY6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChkaXYpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGl2KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Rpc3BsYXk6ICcsIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdikuZGlzcGxheSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkaXYpPy5kaXNwbGF5O1xyXG4gICAgICAgICAgICBpZiAoZGlzcGxheSAmJiBkaXNwbGF5ICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2aXNpYmxlIHNvIHJlc2l6aW5nJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UGxvdGx5KCkuUGxvdHMucmVzaXplKGRpdik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IHZpc2libGUgc28gbm90IHJlc2l6aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19