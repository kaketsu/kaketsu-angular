import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
type mxClient = any;
declare var mxClient: any;
type mxGraph = any;
declare var mxGraph: any;
type mxRubberband = any;
declare var mxRubberband: any;
type mxUtils = any;
declare var mxUtils: any;
type mxEvent = any;
declare var mxEvent: any;
type mxShape = any;
declare var mxShape: any;
type mxConnectionConstraint = any;
declare var mxConnectionConstraint: any;
type mxPoint = any;
declare var mxPoint: any;
type mxPolyline = any;
declare var mxPolyline: any;
type mxConstants = any;
declare var mxConstants: any;


@Component({
    selector: 'app-playground2',
    templateUrl: './playground2.component.html',
    styleUrls: ['./playground2.component.scss']
})
export class Playground2Component implements OnInit {
    private container;
    private graph;

    constructor() {
        // mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
        //     console.log(terminal);
        //     console.log(source);
        //     if (terminal != null && terminal.shape != null) {
        //         if (terminal.shape.stencil != null) {
        //             if (terminal.shape.stencil != null) {
        //                 return terminal.shape.stencil.constraints;
        //             }
        //         } else if (terminal.shape.constraints != null) {
        //             return terminal.shape.constraints;
        //         }
        //     }

        //     return null;
        // };
        // mxShape.prototype.constraints = [
        //     new mxConnectionConstraint(new mxPoint(0.25, 0), true, 'aaa'),
        //     new mxConnectionConstraint(new mxPoint(0.75, 1), false, 'bbb')
        // ];

        // // Edges have no connection points
        // mxPolyline.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true)];
    }

    customerShape() {

    }

    init

    initContainer(container) {
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(container);

            // Creates the graph inside the given container
            this.graph = new mxGraph(container);

            // Enables rubberband selection
            new mxRubberband(this.graph);

            this.graph.setConnectable(function() {
                console.log(this.getModel())
                return this.getModel()
            });
            this.graph.setConnectableEdges(false);

            this.graph.setCellsEditable(false);

            // this.graph.isCellEditable = function(cell) {
            //     console.log(cell);
            //     return this.getModel().isEdge(cell);
            // };

            // this.graph.isCellDeletable = function(cell) {
            //     return true;
            // }
            // console.log(this.graph.isCellDeletable);

            this.graph.setCellsResizable(false);

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).

            this.graph.createEdgeHandler = function(state, edgeStyle) {
                console.log(state);
                if (!state.visibleTargetState) {
                    return null;
                }
                console.log(edgeStyle);
            }

        }
    }

    initStyle() {
        var style = this.graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        style[mxConstants.STYLE_STROKECOLOR] = '#000000';
        style[mxConstants.STYLE_STROKEWIDTH] = '1';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_FONTSTYLE] = 1;
        this.graph.getStylesheet().putDefaultVertexStyle(style);
    }

    draw() {
         // Adds cells to the model in a single step
        const parent = this.graph.getDefaultParent();
        this.graph.getModel().beginUpdate();
        try {
            const v1 = this.graph.insertVertex(parent, null, 'Process', 60, 60, 120, 120);
            const v2 = this.graph.insertVertex(v1, null, 'in', 0, 0.5, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            const v3 = this.graph.insertVertex(v1, null, 'out', 1, 0.25, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            const v4 = this.graph.insertVertex(v1, null, 'out', 1, 0.5, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            const v5 = this.graph.insertVertex(v1, null, '', 1, 0.75, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            v2.geometry.offset = new mxPoint(-8, -8);
            v2.geometry.relative = true;

            v3.geometry.offset = new mxPoint(-8, -8);
            v3.geometry.relative = true;

            v4.geometry.offset = new mxPoint(-8, -8);
            v4.geometry.relative = true;

            v5.geometry.offset = new mxPoint(-8, -8);
            v5.geometry.relative = true;

            // var e1 = graph.insertEdge(parent, null, '', v1, v2);
        } finally {
            // Updates the display
            this.graph.getModel().endUpdate();
        }
    }

    initReactor() {

    }


    ngOnInit() {
        // this.initBase();
        this.initLeftbarDrag();
        // this.initCanvasNet();
        // this.globalInit();
        // this.registerCustomRect();
        this.container = document.querySelector('.graphContainer');
        this.initContainer(this.container);
        this.initStyle();
        this.draw();
        this.draw();
        // this.initContainer();
    }


    initLeftbarDrag() {
        let dragged;
        document.querySelectorAll('.reactor')[0].addEventListener('drag', (event) => {

        }, false);

        document.querySelectorAll('.reactor')[0].addEventListener('dragstart', (event) => {
            dragged = event.target;
            // (<any>event).dataTransfer.setData('text/plain', null)
            // 使其半透明
            (<any>event.target).style.opacity = '';
            (<any>event.target).style.borderStyle = 'dashed';
        }, false);

        document.querySelectorAll('.reactor')[0].addEventListener('dragend', (event) => {
            // 重置透明度
            (<any>event.target).style.opacity = '';
            (<any>event.target).style.borderStyle = 'solid';
        }, false);

        document.querySelector('.graphContainer').addEventListener('dragenter', (event) => {
            if ( (<any>event.target).classList[0] === 'graphContainer' ) {
                (<any>event.target).style.borderColor = 'blue';
            }
        }, false);

        document.querySelector('.graphContainer').addEventListener('dragleave', (event) => {
            if ( (<any>event.target).className === 'graphContainer' ) {
                (<any>event.target).style.borderColor = '';
            }
        }, false);

        document.querySelector('.graphContainer').addEventListener('dragover', function( event ) {
            // prevent default to allow drop
            event.preventDefault();
        }, false);


        document.querySelector('.graphContainer').addEventListener('drop', (event) => {
            event.preventDefault();
            console.log('drop');
            console.log(event);
            if ( (<any>event.target).classList[0] === 'graphContainer' ) {
                (<any>event.target).style.borderColor = '';
            }

            // this.createRect((<any>event).x, (<any>event).y, 100, 100);
            // this.createCanvasReactor((<any>event).x, (<any>event).y, 100, 100);
            // this.createDivRect((<any>event).x, (<any>event).y, 180, 180);
        });
    }
}
