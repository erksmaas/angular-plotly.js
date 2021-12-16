/* tslint:disable component-selector no-output-native no-conflicting-lifecycle */
import { Component, EventEmitter, Input, Output, ViewChild, IterableDiffers, KeyValueDiffers, } from '@angular/core';
import { PlotlyService } from './plotly.service';
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
PlotlyComponent.decorators = [
    { type: Component, args: [{
                selector: 'plotly-plot',
                template: `<div #plot [attr.id]="divId" [ngClass]="getClassName()" [ngStyle]="style">
      <ng-content></ng-content>
    </div>`,
                providers: [PlotlyService]
            },] }
];
PlotlyComponent.ctorParameters = () => [
    { type: PlotlyService },
    { type: IterableDiffers },
    { type: KeyValueDiffers }
];
PlotlyComponent.propDecorators = {
    plotEl: [{ type: ViewChild, args: ['plot', { static: true },] }],
    data: [{ type: Input }],
    layout: [{ type: Input }],
    config: [{ type: Input }],
    frames: [{ type: Input }],
    style: [{ type: Input }],
    divId: [{ type: Input }],
    revision: [{ type: Input }],
    className: [{ type: Input }],
    debug: [{ type: Input }],
    useResizeHandler: [{ type: Input }],
    updateOnLayoutChange: [{ type: Input }],
    updateOnDataChange: [{ type: Input }],
    updateOnlyWithRevision: [{ type: Input }],
    initialized: [{ type: Output }],
    update: [{ type: Output }],
    purge: [{ type: Output }],
    error: [{ type: Output }],
    afterExport: [{ type: Output }],
    afterPlot: [{ type: Output }],
    animated: [{ type: Output }],
    animatingFrame: [{ type: Output }],
    animationInterrupted: [{ type: Output }],
    autoSize: [{ type: Output }],
    beforeExport: [{ type: Output }],
    buttonClicked: [{ type: Output }],
    click: [{ type: Output }],
    plotlyClick: [{ type: Output }],
    clickAnnotation: [{ type: Output }],
    deselect: [{ type: Output }],
    doubleClick: [{ type: Output }],
    framework: [{ type: Output }],
    hover: [{ type: Output }],
    legendClick: [{ type: Output }],
    legendDoubleClick: [{ type: Output }],
    react: [{ type: Output }],
    relayout: [{ type: Output }],
    restyle: [{ type: Output }],
    redraw: [{ type: Output }],
    selected: [{ type: Output }],
    selecting: [{ type: Output }],
    sliderChange: [{ type: Output }],
    sliderEnd: [{ type: Output }],
    sliderStart: [{ type: Output }],
    transitioning: [{ type: Output }],
    transitionInterrupted: [{ type: Output }],
    unhover: [{ type: Output }],
    relayouting: [{ type: Output }],
    treemapclick: [{ type: Output }],
    sunburstclick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3Bsb3RseS9zcmMvbGliL3Bsb3RseS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUZBQWlGO0FBRWpGLE9BQU8sRUFDSCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04sU0FBUyxFQUdULGVBQWUsRUFFZixlQUFlLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxXQUFXO0FBUVgsTUFBTSxPQUFPLGVBQWU7SUFzRXhCLFlBQ1csTUFBcUIsRUFDckIsZUFBZ0MsRUFDaEMsZUFBZ0M7UUFGaEMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBeEVqQyxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQWdCckMsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUViLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFekIseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFFOUIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDM0MsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQzFDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO1FBRWxDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQUcsSUFBSSxZ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b3Igbm8tb3V0cHV0LW5hdGl2ZSBuby1jb25mbGljdGluZy1saWZlY3ljbGUgKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2UsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgRG9DaGVjayxcclxuICAgIEl0ZXJhYmxlRGlmZmVyLFxyXG4gICAgSXRlcmFibGVEaWZmZXJzLFxyXG4gICAgS2V5VmFsdWVEaWZmZXIsXHJcbiAgICBLZXlWYWx1ZURpZmZlcnMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi9wbG90bHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFBsb3RseSB9IGZyb20gJy4vcGxvdGx5LmludGVyZmFjZSc7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncGxvdGx5LXBsb3QnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNwbG90IFthdHRyLmlkXT1cImRpdklkXCIgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxyXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5gLFxyXG4gICAgcHJvdmlkZXJzOiBbUGxvdGx5U2VydmljZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBEb0NoZWNrIHtcclxuICAgIHByb3RlY3RlZCBkZWZhdWx0Q2xhc3NOYW1lID0gJ2pzLXBsb3RseS1wbG90JztcclxuXHJcbiAgICBwdWJsaWMgcGxvdGx5SW5zdGFuY2U6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyByZXNpemVIYW5kbGVyPzogKGluc3RhbmNlOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgbGF5b3V0RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XHJcbiAgICBwdWJsaWMgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8UGxvdGx5LkRhdGE+O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Bsb3QnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwbG90RWw6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQElucHV0KCkgZGF0YT86IFBsb3RseS5EYXRhW107XHJcbiAgICBASW5wdXQoKSBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+O1xyXG4gICAgQElucHV0KCkgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPjtcclxuICAgIEBJbnB1dCgpIGZyYW1lcz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz5bXTtcclxuICAgIEBJbnB1dCgpIHN0eWxlPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXZJZD86IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHJldmlzaW9uID0gMDtcclxuICAgIEBJbnB1dCgpIGNsYXNzTmFtZT86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gICAgQElucHV0KCkgZGVidWcgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHVzZVJlc2l6ZUhhbmRsZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSB1cGRhdGVPbkxheW91dENoYW5nZSA9IHRydWU7XHJcbiAgICBASW5wdXQoKSB1cGRhdGVPbkRhdGFDaGFuZ2UgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgdXBkYXRlT25seVdpdGhSZXZpc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgIEBPdXRwdXQoKSBpbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8UGxvdGx5LkZpZ3VyZT4oKTtcclxuICAgIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVyZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XHJcbiAgICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yPigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBhZnRlckV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBhZnRlclBsb3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYW5pbWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYW5pbWF0aW5nRnJhbWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYW5pbWF0aW9uSW50ZXJydXB0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYXV0b1NpemUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgYmVmb3JlRXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGJ1dHRvbkNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGxvdGx5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgY2xpY2tBbm5vdGF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGRlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGRvdWJsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGZyYW1ld29yayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBsZWdlbmRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBsZWdlbmREb3VibGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSByZWFjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSByZWxheW91dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSByZXN0eWxlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHJlZHJhdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RpbmcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgc2xpZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHNsaWRlckVuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzbGlkZXJTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB0cmFuc2l0aW9uaW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25JbnRlcnJ1cHRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB1bmhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHJlbGF5b3V0aW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHRyZWVtYXBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzdW5idXJzdGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHB1YmxpYyBldmVudE5hbWVzID0gWydhZnRlckV4cG9ydCcsICdhZnRlclBsb3QnLCAnYW5pbWF0ZWQnLCAnYW5pbWF0aW5nRnJhbWUnLCAnYW5pbWF0aW9uSW50ZXJydXB0ZWQnLCAnYXV0b1NpemUnLFxyXG4gICAgICAgICdiZWZvcmVFeHBvcnQnLCAnYnV0dG9uQ2xpY2tlZCcsICdjbGlja0Fubm90YXRpb24nLCAnZGVzZWxlY3QnLCAnZG91YmxlQ2xpY2snLCAnZnJhbWV3b3JrJywgJ2hvdmVyJyxcclxuICAgICAgICAnbGVnZW5kQ2xpY2snLCAnbGVnZW5kRG91YmxlQ2xpY2snLCAncmVhY3QnLCAncmVsYXlvdXQnLCAncmVzdHlsZScsICdyZWRyYXcnLCAnc2VsZWN0ZWQnLCAnc2VsZWN0aW5nJywgJ3NsaWRlckNoYW5nZScsXHJcbiAgICAgICAgJ3NsaWRlckVuZCcsICdzbGlkZXJTdGFydCcsICd0cmFuc2l0aW9uaW5nJywgJ3RyYW5zaXRpb25JbnRlcnJ1cHRlZCcsICd1bmhvdmVyJywgJ3JlbGF5b3V0aW5nJywgJ3RyZWVtYXBjbGljaycsXHJcbiAgICAgICAgJ3N1bmJ1cnN0Y2xpY2snXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcGxvdGx5OiBQbG90bHlTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgICAgICBwdWJsaWMga2V5VmFsdWVEaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxvdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWd1cmUgPSB0aGlzLmNyZWF0ZUZpZ3VyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQoZmlndXJlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0RFUFJFQ0FURUQ6IFJlY29uc2lkZXIgdXNpbmcgYChwbG90bHlDbGljaylgIGluc3RlYWQgb2YgYChjbGljaylgIHRvIGF2b2lkIGV2ZW50IGNvbmZsaWN0LiAnXHJcbiAgICAgICAgICAgICAgICArICdQbGVhc2UgY2hlY2sgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9hbmd1bGFyLXBsb3RseS5qcyNGQVEnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNpemVIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V2luZG93KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyIGFzIGFueSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsb3RseUluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZ3VyZSA9IHRoaXMuY3JlYXRlRmlndXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHVyZ2UuZW1pdChmaWd1cmUpO1xyXG4gICAgICAgICAgICBQbG90bHlTZXJ2aWNlLnJlbW92ZSh0aGlzLnBsb3RseUluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aXNpb246IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucmV2aXNpb247XHJcbiAgICAgICAgaWYgKHJldmlzaW9uICYmICFyZXZpc2lvbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlYnVnOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmRlYnVnO1xyXG4gICAgICAgIGlmIChkZWJ1ZyAmJiAhZGVidWcuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxvdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dSZXNpemVIYW5kbGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdEb0NoZWNrKCk6IGJvb2xlYW4gfCB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVPbmx5V2l0aFJldmlzaW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlT25MYXlvdXRDaGFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0RGlmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXlvdXRIYXNEaWZmID0gdGhpcy5sYXlvdXREaWZmZXIuZGlmZih0aGlzLmxheW91dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0SGFzRGlmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXlvdXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0RGlmZmVyID0gdGhpcy5rZXlWYWx1ZURpZmZlcnMuZmluZCh0aGlzLmxheW91dCkuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dERpZmZlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlT25EYXRhQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFEaWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFIYXNEaWZmID0gdGhpcy5kYXRhRGlmZmVyLmRpZmYodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSGFzRGlmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKHRoaXMuZGF0YSkuY3JlYXRlKHRoaXMuZGF0YURpZmZlclRyYWNrQnkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhRGlmZmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlICYmIHRoaXMucGxvdGx5SW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbG90KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdpbmRvdygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBbdGhpcy5kZWZhdWx0Q2xhc3NOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdCh0aGlzLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5jbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBsb3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kYXRhLCB0aGlzLmxheW91dCwgdGhpcy5jb25maWcsIHRoaXMuZnJhbWVzKS50aGVuKHBsb3RseUluc3RhbmNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbG90bHlJbnN0YW5jZSA9IHBsb3RseUluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLmdkID0gdGhpcy5kZWJ1ZyA/IHBsb3RseUluc3RhbmNlIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBgcGxvdGx5XyR7bmFtZS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICAgICAgICAgICAgICBwbG90bHlJbnN0YW5jZS5vbihldmVudE5hbWUsIChkYXRhOiBhbnkpID0+ICh0aGlzW25hbWVdIGFzIEV2ZW50RW1pdHRlcjx2b2lkPikuZW1pdChkYXRhKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGxvdGx5SW5zdGFuY2Uub24oJ3Bsb3RseV9jbGljaycsIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2suZW1pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxvdGx5Q2xpY2suZW1pdChkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpbmRvd1Jlc2l6ZUhhbmRsZXIoKTtcclxuICAgICAgICB9LCBlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSBwbG90dGluZzonLCBlcnIpO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGaWd1cmUoKTogUGxvdGx5LkZpZ3VyZSB7XHJcbiAgICAgICAgY29uc3QgcDogYW55ID0gdGhpcy5wbG90bHlJbnN0YW5jZTtcclxuICAgICAgICBjb25zdCBmaWd1cmU6IFBsb3RseS5GaWd1cmUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IHAuZGF0YSxcclxuICAgICAgICAgICAgbGF5b3V0OiBwLmxheW91dCxcclxuICAgICAgICAgICAgZnJhbWVzOiBwLl90cmFuc2l0aW9uRGF0YSA/IHAuX3RyYW5zaXRpb25EYXRhLl9mcmFtZXMgOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZpZ3VyZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbG90KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsb3RseUluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBQbG90bHkgY29tcG9uZW50IHdhc24ndCBpbml0aWFsaXplZGApO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxheW91dCA9IHsgLi4udGhpcy5sYXlvdXQgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxvdGx5LnVwZGF0ZSh0aGlzLnBsb3RseUluc3RhbmNlLCB0aGlzLmRhdGEsIGxheW91dCwgdGhpcy5jb25maWcsIHRoaXMuZnJhbWVzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlndXJlID0gdGhpcy5jcmVhdGVGaWd1cmUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChmaWd1cmUpO1xyXG4gICAgICAgIH0sIGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHVwZGF0aW5nIHBsb3Q6JywgZXJyKTtcclxuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV2luZG93UmVzaXplSGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy51c2VSZXNpemVIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCkgPT4gdGhpcy5wbG90bHkucmVzaXplKHRoaXMucGxvdGx5SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXaW5kb3coKS5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIgYXMgYW55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNpemVIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGFEaWZmZXJUcmFja0J5KF86IG51bWJlciwgaXRlbTogYW55KTogdW5rbm93biB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSwgeyB1aWQ6ICcnIH0pO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==