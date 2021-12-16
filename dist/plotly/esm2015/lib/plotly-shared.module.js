import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';
export class PlotlySharedModule {
    constructor() { }
}
PlotlySharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PlotlyComponent],
                imports: [CommonModule],
                providers: [PlotlyService],
                exports: [PlotlyComponent],
            },] }
];
PlotlySharedModule.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXNoYXJlZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9wbG90bHkvc3JjL2xpYi9wbG90bHktc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBU3JELE1BQU0sT0FBTyxrQkFBa0I7SUFDM0IsZ0JBQWdCLENBQUM7OztZQVBwQixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMvQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBsb3RseVNlcnZpY2UgfSBmcm9tICcuL3Bsb3RseS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGxvdGx5Q29tcG9uZW50IH0gZnJvbSAnLi9wbG90bHkuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbUGxvdGx5Q29tcG9uZW50XSxcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbUGxvdGx5U2VydmljZV0sXHJcbiAgICBleHBvcnRzOiBbUGxvdGx5Q29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseVNoYXJlZE1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcbiJdfQ==