/* tslint:disable component-selector no-output-native no-conflicting-lifecycle */
import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { PlotlyService } from './plotly.service';
import * as i0 from "@angular/core";
import * as i1 from "./plotly.service";
import * as i2 from "@angular/common";
const _c0 = ["plot"];
const _c1 = ["*"];
// @dynamic
export class PlotlyComponent {
    constructor(plotly, iterableDiffers, keyValueDiffers) {
        this.plotly = plotly;
        this.iterableDiffers = iterableDiffers;
        this.keyValueDiffers = keyValueDiffers;
        this.defaultClassName = 'js-plotly-plot';
        this.revision = 0;
        this.debug = false;
        this.useResizeHandler = false;
        this.updateOnLayoutChange = true;
        this.updateOnDataChange = true;
        this.updateOnlyWithRevision = false;
        this.initialized = new EventEmitter();
        this.update = new EventEmitter();
        this.purge = new EventEmitter();
        this.error = new EventEmitter();
        this.afterExport = new EventEmitter();
        this.afterPlot = new EventEmitter();
        this.animated = new EventEmitter();
        this.animatingFrame = new EventEmitter();
        this.animationInterrupted = new EventEmitter();
        this.autoSize = new EventEmitter();
        this.beforeExport = new EventEmitter();
        this.buttonClicked = new EventEmitter();
        this.click = new EventEmitter();
        this.plotlyClick = new EventEmitter();
        this.clickAnnotation = new EventEmitter();
        this.deselect = new EventEmitter();
        this.doubleClick = new EventEmitter();
        this.framework = new EventEmitter();
        this.hover = new EventEmitter();
        this.legendClick = new EventEmitter();
        this.legendDoubleClick = new EventEmitter();
        this.react = new EventEmitter();
        this.relayout = new EventEmitter();
        this.restyle = new EventEmitter();
        this.redraw = new EventEmitter();
        this.selected = new EventEmitter();
        this.selecting = new EventEmitter();
        this.sliderChange = new EventEmitter();
        this.sliderEnd = new EventEmitter();
        this.sliderStart = new EventEmitter();
        this.transitioning = new EventEmitter();
        this.transitionInterrupted = new EventEmitter();
        this.unhover = new EventEmitter();
        this.relayouting = new EventEmitter();
        this.treemapclick = new EventEmitter();
        this.sunburstclick = new EventEmitter();
        this.eventNames = ['afterExport', 'afterPlot', 'animated', 'animatingFrame', 'animationInterrupted', 'autoSize',
            'beforeExport', 'buttonClicked', 'clickAnnotation', 'deselect', 'doubleClick', 'framework', 'hover',
            'legendClick', 'legendDoubleClick', 'react', 'relayout', 'restyle', 'redraw', 'selected', 'selecting', 'sliderChange',
            'sliderEnd', 'sliderStart', 'transitioning', 'transitionInterrupted', 'unhover', 'relayouting', 'treemapclick',
            'sunburstclick'];
    }
    ngOnInit() {
        this.createPlot().then(() => {
            const figure = this.createFigure();
            this.initialized.emit(figure);
        });
        if (this.click.observers.length > 0) {
            const msg = 'DEPRECATED: Reconsider using `(plotlyClick)` instead of `(click)` to avoid event conflict. '
                + 'Please check https://github.com/plotly/angular-plotly.js#FAQ';
            console.error(msg);
        }
    }
    ngOnDestroy() {
        if (typeof this.resizeHandler === 'function') {
            this.getWindow().removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = undefined;
        }
        if (this.plotlyInstance) {
            const figure = this.createFigure();
            this.purge.emit(figure);
            PlotlyService.remove(this.plotlyInstance);
        }
    }
    ngOnChanges(changes) {
        let shouldUpdate = false;
        const revision = changes.revision;
        if (revision && !revision.isFirstChange()) {
            shouldUpdate = true;
        }
        const debug = changes.debug;
        if (debug && !debug.isFirstChange()) {
            shouldUpdate = true;
        }
        if (shouldUpdate) {
            this.updatePlot();
        }
        this.updateWindowResizeHandler();
    }
    ngDoCheck() {
        if (this.updateOnlyWithRevision) {
            return false;
        }
        let shouldUpdate = false;
        if (this.updateOnLayoutChange) {
            if (this.layoutDiffer) {
                const layoutHasDiff = this.layoutDiffer.diff(this.layout);
                if (layoutHasDiff) {
                    shouldUpdate = true;
                }
            }
            else if (this.layout) {
                this.layoutDiffer = this.keyValueDiffers.find(this.layout).create();
            }
            else {
                this.layoutDiffer = undefined;
            }
        }
        if (this.updateOnDataChange) {
            if (this.dataDiffer) {
                const dataHasDiff = this.dataDiffer.diff(this.data);
                if (dataHasDiff) {
                    shouldUpdate = true;
                }
            }
            else if (Array.isArray(this.data)) {
                this.dataDiffer = this.iterableDiffers.find(this.data).create(this.dataDifferTrackBy);
            }
            else {
                this.dataDiffer = undefined;
            }
        }
        if (shouldUpdate && this.plotlyInstance) {
            this.updatePlot();
        }
    }
    getWindow() {
        return window;
    }
    getClassName() {
        let classes = [this.defaultClassName];
        if (Array.isArray(this.className)) {
            classes = classes.concat(this.className);
        }
        else if (this.className) {
            classes.push(this.className);
        }
        return classes.join(' ');
    }
    createPlot() {
        return this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config, this.frames).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
            this.getWindow().gd = this.debug ? plotlyInstance : undefined;
            this.eventNames.forEach(name => {
                const eventName = `plotly_${name.toLowerCase()}`;
                plotlyInstance.on(eventName, (data) => this[name].emit(data));
            });
            plotlyInstance.on('plotly_click', (data) => {
                this.click.emit(data);
                this.plotlyClick.emit(data);
            });
            this.updateWindowResizeHandler();
        }, err => {
            console.error('Error while plotting:', err);
            this.error.emit(err);
        });
    }
    createFigure() {
        const p = this.plotlyInstance;
        const figure = {
            data: p.data,
            layout: p.layout,
            frames: p._transitionData ? p._transitionData._frames : null
        };
        return figure;
    }
    updatePlot() {
        if (!this.plotlyInstance) {
            const error = new Error(`Plotly component wasn't initialized`);
            this.error.emit(error);
            throw error;
        }
        const layout = Object.assign({}, this.layout);
        return this.plotly.update(this.plotlyInstance, this.data, layout, this.config, this.frames).then(() => {
            const figure = this.createFigure();
            this.update.emit(figure);
        }, err => {
            console.error('Error while updating plot:', err);
            this.error.emit(err);
        });
    }
    updateWindowResizeHandler() {
        if (this.useResizeHandler) {
            if (this.resizeHandler === undefined) {
                this.resizeHandler = () => this.plotly.resize(this.plotlyInstance);
                this.getWindow().addEventListener('resize', this.resizeHandler);
            }
        }
        else {
            if (typeof this.resizeHandler === 'function') {
                this.getWindow().removeEventListener('resize', this.resizeHandler);
                this.resizeHandler = undefined;
            }
        }
    }
    dataDifferTrackBy(_, item) {
        const obj = Object.assign({}, item, { uid: '' });
        return JSON.stringify(obj);
    }
}
PlotlyComponent.ɵfac = function PlotlyComponent_Factory(t) { return new (t || PlotlyComponent)(i0.ɵɵdirectiveInject(i1.PlotlyService), i0.ɵɵdirectiveInject(i0.IterableDiffers), i0.ɵɵdirectiveInject(i0.KeyValueDiffers)); };
PlotlyComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlotlyComponent, selectors: [["plotly-plot"]], viewQuery: function PlotlyComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.plotEl = _t.first);
    } }, inputs: { data: "data", layout: "layout", config: "config", frames: "frames", style: "style", divId: "divId", revision: "revision", className: "className", debug: "debug", useResizeHandler: "useResizeHandler", updateOnLayoutChange: "updateOnLayoutChange", updateOnDataChange: "updateOnDataChange", updateOnlyWithRevision: "updateOnlyWithRevision" }, outputs: { initialized: "initialized", update: "update", purge: "purge", error: "error", afterExport: "afterExport", afterPlot: "afterPlot", animated: "animated", animatingFrame: "animatingFrame", animationInterrupted: "animationInterrupted", autoSize: "autoSize", beforeExport: "beforeExport", buttonClicked: "buttonClicked", click: "click", plotlyClick: "plotlyClick", clickAnnotation: "clickAnnotation", deselect: "deselect", doubleClick: "doubleClick", framework: "framework", hover: "hover", legendClick: "legendClick", legendDoubleClick: "legendDoubleClick", react: "react", relayout: "relayout", restyle: "restyle", redraw: "redraw", selected: "selected", selecting: "selecting", sliderChange: "sliderChange", sliderEnd: "sliderEnd", sliderStart: "sliderStart", transitioning: "transitioning", transitionInterrupted: "transitionInterrupted", unhover: "unhover", relayouting: "relayouting", treemapclick: "treemapclick", sunburstclick: "sunburstclick" }, features: [i0.ɵɵProvidersFeature([PlotlyService]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 3, vars: 3, consts: [[3, "ngClass", "ngStyle"], ["plot", ""]], template: function PlotlyComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", ctx.getClassName())("ngStyle", ctx.style);
        i0.ɵɵattribute("id", ctx.divId);
    } }, directives: [i2.NgClass, i2.NgStyle], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlotlyComponent, [{
        type: Component,
        args: [{
                selector: 'plotly-plot',
                template: `<div #plot [attr.id]="divId" [ngClass]="getClassName()" [ngStyle]="style">
      <ng-content></ng-content>
    </div>`,
                providers: [PlotlyService],
            }]
    }], function () { return [{ type: i1.PlotlyService }, { type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }]; }, { plotEl: [{
            type: ViewChild,
            args: ['plot', { static: true }]
        }], data: [{
            type: Input
        }], layout: [{
            type: Input
        }], config: [{
            type: Input
        }], frames: [{
            type: Input
        }], style: [{
            type: Input
        }], divId: [{
            type: Input
        }], revision: [{
            type: Input
        }], className: [{
            type: Input
        }], debug: [{
            type: Input
        }], useResizeHandler: [{
            type: Input
        }], updateOnLayoutChange: [{
            type: Input
        }], updateOnDataChange: [{
            type: Input
        }], updateOnlyWithRevision: [{
            type: Input
        }], initialized: [{
            type: Output
        }], update: [{
            type: Output
        }], purge: [{
            type: Output
        }], error: [{
            type: Output
        }], afterExport: [{
            type: Output
        }], afterPlot: [{
            type: Output
        }], animated: [{
            type: Output
        }], animatingFrame: [{
            type: Output
        }], animationInterrupted: [{
            type: Output
        }], autoSize: [{
            type: Output
        }], beforeExport: [{
            type: Output
        }], buttonClicked: [{
            type: Output
        }], click: [{
            type: Output
        }], plotlyClick: [{
            type: Output
        }], clickAnnotation: [{
            type: Output
        }], deselect: [{
            type: Output
        }], doubleClick: [{
            type: Output
        }], framework: [{
            type: Output
        }], hover: [{
            type: Output
        }], legendClick: [{
            type: Output
        }], legendDoubleClick: [{
            type: Output
        }], react: [{
            type: Output
        }], relayout: [{
            type: Output
        }], restyle: [{
            type: Output
        }], redraw: [{
            type: Output
        }], selected: [{
            type: Output
        }], selecting: [{
            type: Output
        }], sliderChange: [{
            type: Output
        }], sliderEnd: [{
            type: Output
        }], sliderStart: [{
            type: Output
        }], transitioning: [{
            type: Output
        }], transitionInterrupted: [{
            type: Output
        }], unhover: [{
            type: Output
        }], relayouting: [{
            type: Output
        }], treemapclick: [{
            type: Output
        }], sunburstclick: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3Bsb3RseS9zcmMvbGliL3Bsb3RseS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUZBQWlGO0FBRWpGLE9BQU8sRUFDSCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04sU0FBUyxHQU1aLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBR2pELFdBQVc7QUFRWCxNQUFNLE9BQU8sZUFBZTtJQXNFeEIsWUFDVyxNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxlQUFnQztRQUZoQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUF4RWpDLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBZ0JyQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6Qix5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUU5QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMzQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDMUMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFbEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0IsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0IsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0QyxlQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxVQUFVO1lBQzdHLGNBQWMsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsT0FBTztZQUNuRyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsY0FBYztZQUNySCxXQUFXLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGNBQWM7WUFDOUcsZUFBZSxDQUFDLENBQUM7SUFNakIsQ0FBQztJQUVMLFFBQVE7UUFDSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakMsTUFBTSxHQUFHLEdBQUcsNkZBQTZGO2tCQUNuRyw4REFBOEQsQ0FBQztZQUNyRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBb0IsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXpCLE1BQU0sUUFBUSxHQUFpQixPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2hELElBQUksUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3ZDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDdkI7UUFFRCxNQUFNLEtBQUssR0FBaUIsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMxQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNqQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLGFBQWEsRUFBRTtvQkFDZixZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDdkU7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7YUFDakM7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLFdBQVcsRUFBRTtvQkFDYixZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjthQUNKO2lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN6RjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzthQUMvQjtTQUNKO1FBRUQsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV0QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMxSCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQixNQUFNLFNBQVMsR0FBRyxVQUFVLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2dCQUNqRCxjQUFjLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvRixDQUFDLENBQUMsQ0FBQztZQUVILGNBQWMsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ3JDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtRQUNSLE1BQU0sQ0FBQyxHQUFRLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQWtCO1lBQzFCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtZQUNoQixNQUFNLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDL0QsQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixNQUFNLEtBQUssQ0FBQztTQUNmO1FBRUQsTUFBTSxNQUFNLHFCQUFRLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUVsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNsRyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5QkFBeUI7UUFDckIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQW9CLENBQUMsQ0FBQzthQUMxRTtTQUNKO2FBQU07WUFDSCxJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQW9CLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7YUFDbEM7U0FDSjtJQUNMLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxDQUFTLEVBQUUsSUFBUztRQUNsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7OEVBcFBRLGVBQWU7a0VBQWYsZUFBZTs7Ozs7eTBDQUZiLENBQUMsYUFBYSxDQUFDOztRQUhmLGlDQUEwRTtRQUNuRixrQkFBeUI7UUFDM0IsaUJBQU07O1FBRmtDLDRDQUEwQixzQkFBQTtRQUE1QywrQkFBaUI7O3VGQUs5QixlQUFlO2NBUDNCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOztXQUVIO2dCQUNQLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUM3Qjs0SEFTd0MsTUFBTTtrQkFBMUMsU0FBUzttQkFBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBRTFCLElBQUk7a0JBQVosS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUVHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLO1lBRUcsb0JBQW9CO2tCQUE1QixLQUFLO1lBQ0csa0JBQWtCO2tCQUExQixLQUFLO1lBQ0csc0JBQXNCO2tCQUE5QixLQUFLO1lBRUksV0FBVztrQkFBcEIsTUFBTTtZQUNHLE1BQU07a0JBQWYsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUVHLFdBQVc7a0JBQXBCLE1BQU07WUFDRyxTQUFTO2tCQUFsQixNQUFNO1lBQ0csUUFBUTtrQkFBakIsTUFBTTtZQUNHLGNBQWM7a0JBQXZCLE1BQU07WUFDRyxvQkFBb0I7a0JBQTdCLE1BQU07WUFDRyxRQUFRO2tCQUFqQixNQUFNO1lBQ0csWUFBWTtrQkFBckIsTUFBTTtZQUNHLGFBQWE7a0JBQXRCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFDRyxXQUFXO2tCQUFwQixNQUFNO1lBQ0csZUFBZTtrQkFBeEIsTUFBTTtZQUNHLFFBQVE7a0JBQWpCLE1BQU07WUFDRyxXQUFXO2tCQUFwQixNQUFNO1lBQ0csU0FBUztrQkFBbEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUNHLFdBQVc7a0JBQXBCLE1BQU07WUFDRyxpQkFBaUI7a0JBQTFCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFDRyxRQUFRO2tCQUFqQixNQUFNO1lBQ0csT0FBTztrQkFBaEIsTUFBTTtZQUNHLE1BQU07a0JBQWYsTUFBTTtZQUNHLFFBQVE7a0JBQWpCLE1BQU07WUFDRyxTQUFTO2tCQUFsQixNQUFNO1lBQ0csWUFBWTtrQkFBckIsTUFBTTtZQUNHLFNBQVM7a0JBQWxCLE1BQU07WUFDRyxXQUFXO2tCQUFwQixNQUFNO1lBQ0csYUFBYTtrQkFBdEIsTUFBTTtZQUNHLHFCQUFxQjtrQkFBOUIsTUFBTTtZQUNHLE9BQU87a0JBQWhCLE1BQU07WUFDRyxXQUFXO2tCQUFwQixNQUFNO1lBQ0csWUFBWTtrQkFBckIsTUFBTTtZQUNHLGFBQWE7a0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSBjb21wb25lbnQtc2VsZWN0b3Igbm8tb3V0cHV0LW5hdGl2ZSBuby1jb25mbGljdGluZy1saWZlY3ljbGUgKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2UsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgRG9DaGVjayxcclxuICAgIEl0ZXJhYmxlRGlmZmVyLFxyXG4gICAgSXRlcmFibGVEaWZmZXJzLFxyXG4gICAgS2V5VmFsdWVEaWZmZXIsXHJcbiAgICBLZXlWYWx1ZURpZmZlcnMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi9wbG90bHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFBsb3RseSB9IGZyb20gJy4vcGxvdGx5LmludGVyZmFjZSc7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncGxvdGx5LXBsb3QnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNwbG90IFthdHRyLmlkXT1cImRpdklkXCIgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxyXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5gLFxyXG4gICAgcHJvdmlkZXJzOiBbUGxvdGx5U2VydmljZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBEb0NoZWNrIHtcclxuICAgIHByb3RlY3RlZCBkZWZhdWx0Q2xhc3NOYW1lID0gJ2pzLXBsb3RseS1wbG90JztcclxuXHJcbiAgICBwdWJsaWMgcGxvdGx5SW5zdGFuY2U6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyByZXNpemVIYW5kbGVyPzogKGluc3RhbmNlOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgbGF5b3V0RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XHJcbiAgICBwdWJsaWMgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8UGxvdGx5LkRhdGE+O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Bsb3QnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwbG90RWw6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQElucHV0KCkgZGF0YT86IFBsb3RseS5EYXRhW107XHJcbiAgICBASW5wdXQoKSBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+O1xyXG4gICAgQElucHV0KCkgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPjtcclxuICAgIEBJbnB1dCgpIGZyYW1lcz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz5bXTtcclxuICAgIEBJbnB1dCgpIHN0eWxlPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXZJZD86IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHJldmlzaW9uID0gMDtcclxuICAgIEBJbnB1dCgpIGNsYXNzTmFtZT86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gICAgQElucHV0KCkgZGVidWcgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHVzZVJlc2l6ZUhhbmRsZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSB1cGRhdGVPbkxheW91dENoYW5nZSA9IHRydWU7XHJcbiAgICBASW5wdXQoKSB1cGRhdGVPbkRhdGFDaGFuZ2UgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgdXBkYXRlT25seVdpdGhSZXZpc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgIEBPdXRwdXQoKSBpbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8UGxvdGx5LkZpZ3VyZT4oKTtcclxuICAgIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVyZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XHJcbiAgICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yPigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBhZnRlckV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBhZnRlclBsb3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYW5pbWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYW5pbWF0aW5nRnJhbWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYW5pbWF0aW9uSW50ZXJydXB0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYXV0b1NpemUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYmVmb3JlRXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGJ1dHRvbkNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGxvdGx5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgY2xpY2tBbm5vdGF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGRlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGRvdWJsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGZyYW1ld29yayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBsZWdlbmRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBsZWdlbmREb3VibGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSByZWFjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSByZWxheW91dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSByZXN0eWxlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHJlZHJhdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RpbmcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgc2xpZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHNsaWRlckVuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzbGlkZXJTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB0cmFuc2l0aW9uaW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25JbnRlcnJ1cHRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB1bmhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHJlbGF5b3V0aW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHRyZWVtYXBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzdW5idXJzdGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHB1YmxpYyBldmVudE5hbWVzID0gWydhZnRlckV4cG9ydCcsICdhZnRlclBsb3QnLCAnYW5pbWF0ZWQnLCAnYW5pbWF0aW5nRnJhbWUnLCAnYW5pbWF0aW9uSW50ZXJydXB0ZWQnLCAnYXV0b1NpemUnLFxyXG4gICAgICAgICdiZWZvcmVFeHBvcnQnLCAnYnV0dG9uQ2xpY2tlZCcsICdjbGlja0Fubm90YXRpb24nLCAnZGVzZWxlY3QnLCAnZG91YmxlQ2xpY2snLCAnZnJhbWV3b3JrJywgJ2hvdmVyJyxcclxuICAgICAgICAnbGVnZW5kQ2xpY2snLCAnbGVnZW5kRG91YmxlQ2xpY2snLCAncmVhY3QnLCAncmVsYXlvdXQnLCAncmVzdHlsZScsICdyZWRyYXcnLCAnc2VsZWN0ZWQnLCAnc2VsZWN0aW5nJywgJ3NsaWRlckNoYW5nZScsXHJcbiAgICAgICAgJ3NsaWRlckVuZCcsICdzbGlkZXJTdGFydCcsICd0cmFuc2l0aW9uaW5nJywgJ3RyYW5zaXRpb25JbnRlcnJ1cHRlZCcsICd1bmhvdmVyJywgJ3JlbGF5b3V0aW5nJywgJ3RyZWVtYXBjbGljaycsXHJcbiAgICAgICAgJ3N1bmJ1cnN0Y2xpY2snXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcGxvdGx5OiBQbG90bHlTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgICAgICBwdWJsaWMga2V5VmFsdWVEaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxvdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWd1cmUgPSB0aGlzLmNyZWF0ZUZpZ3VyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQoZmlndXJlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0RFUFJFQ0FURUQ6IFJlY29uc2lkZXIgdXNpbmcgYChwbG90bHlDbGljaylgIGluc3RlYWQgb2YgYChjbGljaylgIHRvIGF2b2lkIGV2ZW50IGNvbmZsaWN0LiAnXHJcbiAgICAgICAgICAgICAgICArICdQbGVhc2UgY2hlY2sgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9hbmd1bGFyLXBsb3RseS5qcyNGQVEnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNpemVIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V2luZG93KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyIGFzIGFueSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsb3RseUluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZ3VyZSA9IHRoaXMuY3JlYXRlRmlndXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHVyZ2UuZW1pdChmaWd1cmUpO1xyXG4gICAgICAgICAgICBQbG90bHlTZXJ2aWNlLnJlbW92ZSh0aGlzLnBsb3RseUluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aXNpb246IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucmV2aXNpb247XHJcbiAgICAgICAgaWYgKHJldmlzaW9uICYmICFyZXZpc2lvbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlYnVnOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmRlYnVnO1xyXG4gICAgICAgIGlmIChkZWJ1ZyAmJiAhZGVidWcuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxvdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dSZXNpemVIYW5kbGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdEb0NoZWNrKCk6IGJvb2xlYW4gfCB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVPbmx5V2l0aFJldmlzaW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlT25MYXlvdXRDaGFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0RGlmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXlvdXRIYXNEaWZmID0gdGhpcy5sYXlvdXREaWZmZXIuZGlmZih0aGlzLmxheW91dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0SGFzRGlmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXlvdXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0RGlmZmVyID0gdGhpcy5rZXlWYWx1ZURpZmZlcnMuZmluZCh0aGlzLmxheW91dCkuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dERpZmZlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlT25EYXRhQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFEaWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFIYXNEaWZmID0gdGhpcy5kYXRhRGlmZmVyLmRpZmYodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSGFzRGlmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKHRoaXMuZGF0YSkuY3JlYXRlKHRoaXMuZGF0YURpZmZlclRyYWNrQnkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhRGlmZmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlICYmIHRoaXMucGxvdGx5SW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbG90KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdpbmRvdygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBbdGhpcy5kZWZhdWx0Q2xhc3NOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdCh0aGlzLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5jbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBsb3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kYXRhLCB0aGlzLmxheW91dCwgdGhpcy5jb25maWcsIHRoaXMuZnJhbWVzKS50aGVuKHBsb3RseUluc3RhbmNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbG90bHlJbnN0YW5jZSA9IHBsb3RseUluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLmdkID0gdGhpcy5kZWJ1ZyA/IHBsb3RseUluc3RhbmNlIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBgcGxvdGx5XyR7bmFtZS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICAgICAgICAgICAgICBwbG90bHlJbnN0YW5jZS5vbihldmVudE5hbWUsIChkYXRhOiBhbnkpID0+ICh0aGlzW25hbWVdIGFzIEV2ZW50RW1pdHRlcjx2b2lkPikuZW1pdChkYXRhKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGxvdGx5SW5zdGFuY2Uub24oJ3Bsb3RseV9jbGljaycsIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2suZW1pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxvdGx5Q2xpY2suZW1pdChkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpbmRvd1Jlc2l6ZUhhbmRsZXIoKTtcclxuICAgICAgICB9LCBlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSBwbG90dGluZzonLCBlcnIpO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGaWd1cmUoKTogUGxvdGx5LkZpZ3VyZSB7XHJcbiAgICAgICAgY29uc3QgcDogYW55ID0gdGhpcy5wbG90bHlJbnN0YW5jZTtcclxuICAgICAgICBjb25zdCBmaWd1cmU6IFBsb3RseS5GaWd1cmUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IHAuZGF0YSxcclxuICAgICAgICAgICAgbGF5b3V0OiBwLmxheW91dCxcclxuICAgICAgICAgICAgZnJhbWVzOiBwLl90cmFuc2l0aW9uRGF0YSA/IHAuX3RyYW5zaXRpb25EYXRhLl9mcmFtZXMgOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZpZ3VyZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbG90KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsb3RseUluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBQbG90bHkgY29tcG9uZW50IHdhc24ndCBpbml0aWFsaXplZGApO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxheW91dCA9IHsgLi4udGhpcy5sYXlvdXQgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxvdGx5LnVwZGF0ZSh0aGlzLnBsb3RseUluc3RhbmNlLCB0aGlzLmRhdGEsIGxheW91dCwgdGhpcy5jb25maWcsIHRoaXMuZnJhbWVzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlndXJlID0gdGhpcy5jcmVhdGVGaWd1cmUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChmaWd1cmUpO1xyXG4gICAgICAgIH0sIGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHVwZGF0aW5nIHBsb3Q6JywgZXJyKTtcclxuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV2luZG93UmVzaXplSGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy51c2VSZXNpemVIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCkgPT4gdGhpcy5wbG90bHkucmVzaXplKHRoaXMucGxvdGx5SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXaW5kb3coKS5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIgYXMgYW55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNpemVIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGFEaWZmZXJUcmFja0J5KF86IG51bWJlciwgaXRlbTogYW55KTogdW5rbm93biB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSwgeyB1aWQ6ICcnIH0pO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==