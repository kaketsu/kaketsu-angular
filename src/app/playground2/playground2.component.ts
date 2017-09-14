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
type mxConnectionHandler = any;
declare var mxConnectionHandler: any;
type mxKeyHandler = any;
declare var mxKeyHandler: any;
type mxMultiplicity = any;
declare var mxMultiplicity: any;



@Component({
    selector: 'app-playground2',
    templateUrl: './playground2.component.html',
    styleUrls: ['./playground2.component.scss']
})
export class Playground2Component implements OnInit {
    private container;
    private graph;

    private selectedCells;

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

            this.graph.setAllowDanglingEdges(false);

            this.graph.setMultigraph(false);


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

            // 创建时候的回掉函数
            const self = this;
            this.graph.createEdgeHandler = function(state, edgeStyle) {
                if (!state.visibleTargetState) {
                    // remove not connecting edge
                    // self.graph.getModel().remove(state.cell);
                } else {
                    console.log(state);
                    state.cell.setVertex(false);
                }
            };

            // this.graph.createHandler = function(state) {
            //     console.log(state);
            // }


            // this.graph.mxConnectionHandler = function(state) {
            //     console.log(state);
            // }

            // const connectionHandler = new mxConnectionHandler();
            // connectionHandler.createTarget = function(state) {
            //     console.log(state);
            // }

            const keyHandler = new mxKeyHandler(this.graph);
            keyHandler.bindKey(46, (evt) => {
                console.log(evt);
                if (this.graph.isEnabled()) {
                    // this.graph.removeCells();
                    if (this.selectedCells && this.selectedCells[0] && this.selectedCells[0].value !== 'out' && this.selectedCells[0].value !== 'in') {
                        this.graph.getModel().remove(this.selectedCells[0]);

                        this.graph.validateGraph();
                    }
                }
            });

            this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt){
					// selectionChanged(graph);
                console.log(sender);
                if (sender[0]) {
                }

                self.selectedCells = sender.cells;
            });

            this.graph.multiplicities.push(new mxMultiplicity(
				   false, 'Target', null, null, 1, 1, ['Source'],
				   'Target Must Have 1 Source',
				   'Target Must Connect From Source'));

        }
    }

    initStyle() {
        const style = this.graph.getStylesheet().getDefaultVertexStyle();
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
        var xmlDocument = mxUtils.createXmlDocument();
        var subtargetNode = xmlDocument.createElement('Subtarget');

         // Adds cells to the model in a single step
        const parent = this.graph.getDefaultParent();
        this.graph.getModel().beginUpdate();
        try {
            const v1 = this.graph.insertVertex(parent, null, 'process' , 60, 60, 120, 120, 'shape=label;spacingBottom=10;fillColor=#adc5ff;gradientColor=#7d85df;glass=1;rounded=1;');
            const v2 = this.graph.insertVertex(v1, null, 'in', 0, 0.5, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            const v3 = this.graph.insertVertex(v1, null, 'out', 1, 0.25, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            const v4 = this.graph.insertVertex(v1, null, 'out', 1, 0.5, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            const v5 = this.graph.insertVertex(v1, null, '', 1, 0.75, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');

            v1.setConnectable(false);

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


    initPermission () {
        class Permission {
            private locked;
            private createEdges;
            private editEdges;
            private editVertices;
            private cloneCells;
            constructor(locked, createEdges, editEdges, editVertices, cloneCells) {
                this.locked = (locked != null) ? locked : false;
                this.createEdges = (createEdges != null) ? createEdges : true;
                this.editEdges = (editEdges != null) ? editEdges : true;
                this.editVertices = (editVertices != null) ? editVertices : true;
                this.cloneCells = (cloneCells != null) ? cloneCells : true;
            }

            apply(graph) {
                graph.setConnectable(this.createEdges);
                graph.setCellsLocked(this.locked);
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
