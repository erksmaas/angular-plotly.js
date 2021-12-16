import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';
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
PlotlyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule, PlotlySharedModule],
                providers: [PlotlyService],
                exports: [PlotlySharedModule],
            },] }
];
PlotlyModule.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3Bsb3RseS9zcmMvbGliL3Bsb3RseS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBVTVELE1BQU0sT0FBTyxZQUFZO0lBR3JCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNqQixNQUFNLEdBQUcsR0FBRywrRkFBK0Y7a0JBQ3JHLDhDQUE4QyxDQUFDO1lBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFFRCxhQUFhLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sT0FBTztRQUNYLE9BQU8sWUFBWSxDQUFDLFFBQVEsS0FBSyxTQUFTO2VBQ25DLENBQUMsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVO21CQUM3QyxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O0FBaEJhLHFCQUFRLEdBQVEsRUFBRSxDQUFDOztZQVBwQyxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztnQkFDM0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi9wbG90bHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFBsb3RseVNoYXJlZE1vZHVsZSB9IGZyb20gJy4vcGxvdGx5LXNoYXJlZC5tb2R1bGUnO1xyXG5cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFBsb3RseVNoYXJlZE1vZHVsZV0sXHJcbiAgICBwcm92aWRlcnM6IFtQbG90bHlTZXJ2aWNlXSxcclxuICAgIGV4cG9ydHM6IFtQbG90bHlTaGFyZWRNb2R1bGVdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGxvdGx5TW9kdWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcGxvdGx5anM6IGFueSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0ludmFsaWQgUGxvdGx5SlMgb2JqZWN0LiBQbGVhc2UgY2hlY2sgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9hbmd1bGFyLXBsb3RseS5qcyNxdWljay1zdGFydCdcclxuICAgICAgICAgICAgICAgICsgJyB0byBzZWUgaG93IHRvIGFkZCBQbG90bHlKUyB0byB5b3VyIHByb2plY3QuJztcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbG90bHlTZXJ2aWNlLnNldFBsb3RseShQbG90bHlNb2R1bGUucGxvdGx5anMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gUGxvdGx5TW9kdWxlLnBsb3RseWpzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgJiYgKHR5cGVvZiBQbG90bHlNb2R1bGUucGxvdGx5anMucGxvdCA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwZW9mIFBsb3RseU1vZHVsZS5wbG90bHlqcy5uZXdQbG90ID09PSAnZnVuY3Rpb24nKTtcclxuICAgIH1cclxufVxyXG4iXX0=