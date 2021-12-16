import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';
import * as i0 from "@angular/core";
export class PlotlyViaWindowModule {
    constructor() {
        const plotly = window.Plotly;
        if (typeof plotly === 'undefined') {
            throw new Error(`Plotly object not found on window.`);
        }
        PlotlyService.setPlotly(plotly);
    }
}
PlotlyViaWindowModule.ɵfac = function PlotlyViaWindowModule_Factory(t) { return new (t || PlotlyViaWindowModule)(); };
PlotlyViaWindowModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PlotlyViaWindowModule });
PlotlyViaWindowModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [PlotlyService], imports: [[CommonModule, PlotlySharedModule], PlotlySharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlotlyViaWindowModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [CommonModule, PlotlySharedModule],
                providers: [PlotlyService],
                exports: [PlotlySharedModule],
            }]
    }], function () { return []; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PlotlyViaWindowModule, { imports: [CommonModule, PlotlySharedModule], exports: [PlotlySharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXZpYS13aW5kb3cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGxvdGx5L3NyYy9saWIvcGxvdGx5LXZpYS13aW5kb3cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFTNUQsTUFBTSxPQUFPLHFCQUFxQjtJQUM5QjtRQUNJLE1BQU0sTUFBTSxHQUFJLE1BQWMsQ0FBQyxNQUFNLENBQUM7UUFFdEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzswRkFUUSxxQkFBcUI7dUVBQXJCLHFCQUFxQjs0RUFIbkIsQ0FBQyxhQUFhLENBQUMsWUFEakIsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsRUFFakMsa0JBQWtCO3VGQUVuQixxQkFBcUI7Y0FOakMsUUFBUTtlQUFDO2dCQUNOLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUM7Z0JBQzNDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7YUFDaEM7O3dGQUNZLHFCQUFxQixjQUpwQixZQUFZLEVBQUUsa0JBQWtCLGFBRWhDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi9wbG90bHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFBsb3RseVNoYXJlZE1vZHVsZSB9IGZyb20gJy4vcGxvdGx5LXNoYXJlZC5tb2R1bGUnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGxvdGx5U2hhcmVkTW9kdWxlXSxcclxuICAgIHByb3ZpZGVyczogW1Bsb3RseVNlcnZpY2VdLFxyXG4gICAgZXhwb3J0czogW1Bsb3RseVNoYXJlZE1vZHVsZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlWaWFXaW5kb3dNb2R1bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgcGxvdGx5ID0gKHdpbmRvdyBhcyBhbnkpLlBsb3RseTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwbG90bHkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGxvdGx5IG9iamVjdCBub3QgZm91bmQgb24gd2luZG93LmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUGxvdGx5U2VydmljZS5zZXRQbG90bHkocGxvdGx5KTtcclxuICAgIH1cclxufVxyXG4iXX0=