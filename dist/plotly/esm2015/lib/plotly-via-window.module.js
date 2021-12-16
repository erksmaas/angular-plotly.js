import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';
export class PlotlyViaWindowModule {
    constructor() {
        const plotly = window.Plotly;
        if (typeof plotly === 'undefined') {
            throw new Error(`Plotly object not found on window.`);
        }
        PlotlyService.setPlotly(plotly);
    }
}
PlotlyViaWindowModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule, PlotlySharedModule],
                providers: [PlotlyService],
                exports: [PlotlySharedModule],
            },] }
];
PlotlyViaWindowModule.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXZpYS13aW5kb3cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGxvdGx5L3NyYy9saWIvcGxvdGx5LXZpYS13aW5kb3cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVM1RCxNQUFNLE9BQU8scUJBQXFCO0lBQzlCO1FBQ0ksTUFBTSxNQUFNLEdBQUksTUFBYyxDQUFDLE1BQU0sQ0FBQztRQUV0QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQWZKLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDO2dCQUMzQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBsb3RseVNlcnZpY2UgfSBmcm9tICcuL3Bsb3RseS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGxvdGx5U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9wbG90bHktc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW10sXHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQbG90bHlTaGFyZWRNb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbUGxvdGx5U2VydmljZV0sXHJcbiAgICBleHBvcnRzOiBbUGxvdGx5U2hhcmVkTW9kdWxlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseVZpYVdpbmRvd01vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBwbG90bHkgPSAod2luZG93IGFzIGFueSkuUGxvdGx5O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHBsb3RseSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbG90bHkgb2JqZWN0IG5vdCBmb3VuZCBvbiB3aW5kb3cuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbG90bHlTZXJ2aWNlLnNldFBsb3RseShwbG90bHkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==