import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';
import * as i0 from "@angular/core";
export class PlotlyModule {
    constructor() {
        if (!this.isValid()) {
            const msg = 'Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start'
                + ' to see how to add PlotlyJS to your project.';
            throw new Error(msg);
        }
        PlotlyService.setPlotly(PlotlyModule.plotlyjs);
    }
    isValid() {
        return PlotlyModule.plotlyjs !== undefined
            && (typeof PlotlyModule.plotlyjs.plot === 'function'
                || typeof PlotlyModule.plotlyjs.newPlot === 'function');
    }
}
PlotlyModule.plotlyjs = {};
PlotlyModule.ɵfac = function PlotlyModule_Factory(t) { return new (t || PlotlyModule)(); };
PlotlyModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PlotlyModule });
PlotlyModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [PlotlyService], imports: [[CommonModule, PlotlySharedModule], PlotlySharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlotlyModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [CommonModule, PlotlySharedModule],
                providers: [PlotlyService],
                exports: [PlotlySharedModule],
            }]
    }], function () { return []; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PlotlyModule, { imports: [CommonModule, PlotlySharedModule], exports: [PlotlySharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3Bsb3RseS9zcmMvbGliL3Bsb3RseS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQVU1RCxNQUFNLE9BQU8sWUFBWTtJQUdyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakIsTUFBTSxHQUFHLEdBQUcsK0ZBQStGO2tCQUNyRyw4Q0FBOEMsQ0FBQztZQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLE9BQU87UUFDWCxPQUFPLFlBQVksQ0FBQyxRQUFRLEtBQUssU0FBUztlQUNuQyxDQUFDLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVTttQkFDN0MsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQztJQUNwRSxDQUFDOztBQWhCYSxxQkFBUSxHQUFRLEVBQUUsQ0FBQzt3RUFEeEIsWUFBWTs4REFBWixZQUFZO21FQUhWLENBQUMsYUFBYSxDQUFDLFlBRGpCLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLEVBRWpDLGtCQUFrQjt1RkFFbkIsWUFBWTtjQU54QixRQUFRO2VBQUM7Z0JBQ04sWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztnQkFDM0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUNoQzs7d0ZBQ1ksWUFBWSxjQUpYLFlBQVksRUFBRSxrQkFBa0IsYUFFaEMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBsb3RseVNlcnZpY2UgfSBmcm9tICcuL3Bsb3RseS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGxvdGx5U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9wbG90bHktc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGxvdGx5U2hhcmVkTW9kdWxlXSxcclxuICAgIHByb3ZpZGVyczogW1Bsb3RseVNlcnZpY2VdLFxyXG4gICAgZXhwb3J0czogW1Bsb3RseVNoYXJlZE1vZHVsZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlNb2R1bGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBwbG90bHlqczogYW55ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSAnSW52YWxpZCBQbG90bHlKUyBvYmplY3QuIFBsZWFzZSBjaGVjayBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L2FuZ3VsYXItcGxvdGx5LmpzI3F1aWNrLXN0YXJ0J1xyXG4gICAgICAgICAgICAgICAgKyAnIHRvIHNlZSBob3cgdG8gYWRkIFBsb3RseUpTIHRvIHlvdXIgcHJvamVjdC4nO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFBsb3RseVNlcnZpY2Uuc2V0UGxvdGx5KFBsb3RseU1vZHVsZS5wbG90bHlqcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBQbG90bHlNb2R1bGUucGxvdGx5anMgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAmJiAodHlwZW9mIFBsb3RseU1vZHVsZS5wbG90bHlqcy5wbG90ID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBlb2YgUGxvdGx5TW9kdWxlLnBsb3RseWpzLm5ld1Bsb3QgPT09ICdmdW5jdGlvbicpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==