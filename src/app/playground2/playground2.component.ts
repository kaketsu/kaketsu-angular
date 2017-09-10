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

@Component({
    selector: 'app-playground2',
    templateUrl: './playground2.component.html',
    styleUrls: ['./playground2.component.scss']
})
export class Playground2Component implements OnInit {
    private container;

    constructor() {

        mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
            if (terminal != null && terminal.shape != null)
            {
            if (terminal.shape.stencil != null)
            {
                if (terminal.shape.stencil != null)
                {
                return terminal.shape.stencil.constraints;
                }
            }
            else if (terminal.shape.constraints != null)
            {
                return terminal.shape.constraints;
            }
            }

            return null;
        };
        mxShape.prototype.constraints = [
            new mxConnectionConstraint(new mxPoint(0.25, 0), true)];

        // Edges have no connection points
        mxPolyline.prototype.constraints = null;
    }

    initContainer(container) {
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(container);

            // Creates the graph inside the given container
            var graph = new mxGraph(container);

            // Enables rubberband selection
            new mxRubberband(graph);

            graph.setConnectable(true);
            graph.setCellsEditable(false);

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();
            try {
                var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 120, 80);
                var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 120, 80);
                // var e1 = graph.insertEdge(parent, null, '', v1, v2);
            } finally {
                // Updates the display
                graph.getModel().endUpdate();
            }
        }
    }

    ngOnInit() {
        // this.initBase();
        this.initLeftbarDrag();
        // this.initCanvasNet();
        // this.globalInit();
        // this.registerCustomRect();
        this.container = document.querySelector('.graphContainer');
        this.initContainer(this.container);
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
