import { Component, OnInit } from '@angular/core';
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
type mxCellOverlay = any;
declare var mxCellOverlay: any;
type mxImage = any;
declare var mxImage: any;
type mxCellTracker = any;
declare var mxCellTracker: any;
type mxPerimeter = any;
declare var mxPerimeter: any;
type mxEdgeStyle = any;
declare var mxEdgeStyle: any;

@Component({
    selector: 'app-playground3',
    templateUrl: './playground3.component.html',
    styleUrls: ['./playground3.component.scss']
})
export class Playground3Component implements OnInit {
    private container;
    private graph;
    private selectedCells;
    private selectedReactor;
    private allEdges;

    constructor() {
    }

    customerShape() {
    }
    ngOnInit() {
        this.initLeftbarDrag();
        this.initContainer();
        this.initStyle();
    }

    initContainer() {
        this.container = document.querySelector('.graphContainer');

        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(this.container);

            // Creates the graph inside the given container
            this.graph = new mxGraph(this.container);

            this.allEdges = [];

            // Enables rubberband selection
            new mxRubberband(this.graph);

            this.graph.setConnectable(true);

            this.graph.setCellsEditable(false);

            this.graph.setCellsResizable(false);

            this.graph.setAllowDanglingEdges(false);

            this.graph.setMultigraph(false);

            this.graph.setAllowLoops(false);

            // highLight
            // var highlight = new mxCellTracker(this.graph, '#00FF00');


            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).

            // 创建edge时候的回掉函数
            const self = this;
            this.graph.createEdgeHandler = function(state) {
                self.graph.getModel().beginUpdate();
                self.deleteOverlay(state.visibleTargetState.cell.parent.id, 'xx');
                self.addOverlay(state.visibleTargetState.cell.parent.id, 'xx', '/assets/images/check.png');

                if (self.allEdges.indexOf(state.cell) !== -1 ) {

                } else if (self.sameReactorValidate(state)) {
                    self.graph.getModel().remove(state.cell);

                } else if (self.portOrderValidate(state)) {
                    self.graph.getModel().remove(state.cell);

                } else if (self.inPortInUseValidate(state) || self.outPortInUseValidate(state)) {
                    const inEdge = self.inPortInUseValidate(state);
                    if (inEdge) {
                        self.graph.getModel().remove(inEdge);
                        self.allEdges.splice(self.allEdges.indexOf(inEdge), 1);
                    }

                    const outEdge = self.outPortInUseValidate(state);
                    if (outEdge) {
                        self.graph.getModel().remove(outEdge);
                        self.allEdges.splice(self.allEdges.indexOf(outEdge), 1);
                    }
                    self.allEdges.push(state.cell);

                } else {
                    self.allEdges.push(state.cell);
                }

                self.graph.getModel().endUpdate();

            };


            // selected cell
            this.graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
                // console.log(sender.cells);
                // this.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, "#FF0000", sender.cells);
                this.selectedCells = sender.cells;

            });


            // set delete event(only node and edge)
            const keyHandler = new mxKeyHandler(this.graph);
            keyHandler.bindKey(46, (evt) => {
                console.log(evt);
                if (this.graph.isEnabled()) {
                    // this.graph.removeCells();
                    if (this.selectedCells && this.selectedCells[0] &&
                        this.selectedCells[0].value !== 'out' && this.selectedCells[0].value !== 'in') {
                        this.graph.getModel().remove(this.selectedCells[0]);
                        this.graph.validateGraph();
                    }
                }
            });

            // this.graph.convertValueToString = function(cell) {
            //     if (mxUtils.isNode(cell.value) && cell.value.nodeName === 'Reactor') {
            //         var div = document.createElement('div');
            //         // div.innerHTML = cell.getAttribute('label');
            //         div.className = cell.getAttribute('class');
            //         div.style.height = '50px';
            //         div.style.width = '50px';
            //         div.innerHTML = 'xxxxxx';
            //         div.style.background = "url(../../assets/images/add.png);"
            //         console.log(div);
            //         return div;
            //     }
            // }

            this.configureStylesheet(this.graph);

            // this.graph.getAllConnectionConstraints = function(terminal) {
            //     console.log(terminal);
            //     var geo = (terminal != null) ? this.getCellGeometry(terminal.cell) : null;

            //     if ((geo != null ? !geo.relative : false) &&
            //         this.getModel().isVertex(terminal.cell) &&
            //         this.getModel().getChildCount(terminal.cell) === 0)
            //     {
            //             return [new mxConnectionConstraint(new mxPoint(0, 0.5), false),
            //                 new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
            //         }

            //         return null;
            // };

            this.graph.getConnectionConstraint = function(edge, terminal, source) {
                // console.log(edge);
                // console.log(terminal);
                // console.log(source);
            }

        }
    }

    initStyle() {
        const style = this.graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        style[mxConstants.STYLE_STROKECOLOR] = '#888';
        style[mxConstants.STYLE_STROKEWIDTH] = '1';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_FONTSTYLE] = 1;
        style[mxConstants.STYLE_FILLCOLOR] = '#d5e2f5';
        style[mxConstants.STYLE_GRADIENTCOLOR] = '#fff';
        this.graph.getStylesheet().putDefaultVertexStyle(style);


        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '';
        mxConstants.VERTEX_SELECTION_DASHED = false;

        // edge style
        const edgeStyle = this.graph.getStylesheet().getDefaultEdgeStyle();
        edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        edgeStyle[mxConstants.STYLE_ELBOW] = mxConstants.ELBOW_HORIZONTAL;
        edgeStyle[mxConstants.STYLE_ROUNDED] = true;
    }

    addOverlay = function(id, state, imageUrl){
        const cell = this.graph.getModel().getCell(id);
        // this.graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, "#FF0000", [cell]);
        // this.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, "#FFFFFF", [cell]);
        const overlay = new mxCellOverlay(new mxImage(imageUrl, 20, 20),
                                          state, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, new mxPoint(15, -15));

        overlay.addListener(mxEvent.CLICK, (sender, evt) => {
            mxUtils.alert(state);
        });
        this.graph.addCellOverlay(cell, overlay);
    };

    deleteOverlay = function(id, state){
        const cell = this.graph.getModel().getCell(id);
        this.graph.removeCellOverlays(cell);
    }

    sameReactorValidate(state) {
        const source = state.visibleSourceState.cell.parent;
        const target = state.visibleTargetState.cell.parent;
        if (source === target) {
            return true;
        }
        return false;
    }

    inPortInUseValidate(state) {
        const targetPort = state.cell.target;
        let returnEdge = null;
        if (this.allEdges && this.allEdges.length > 0) {
            this.allEdges.forEach((edgeItem) => {
                if (targetPort === edgeItem.target) {
                    returnEdge = edgeItem;
                }
            });
        }
        return returnEdge;
    }

    outPortInUseValidate(state) {
        const sourcePort = state.cell.source;
        let returnEdge = null;

        if (this.allEdges && this.allEdges.length > 0) {
            this.allEdges.forEach((edgeItem) => {
                if (sourcePort === edgeItem.source) {
                    returnEdge = edgeItem;
                }
            });
        }
        return returnEdge;
    }

    portOrderValidate(state) {
        const sourcePort = state.cell.source;
        const targetPort = state.cell.target;

        if (sourcePort.value === 'in' || targetPort.value === 'out') {
            return true;
        } else {
            return false;
        }
    }

    configureStylesheet(graph) {
        var style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_IMAGE] = 'images/icons48/keys.png';
        style[mxConstants.STYLE_FONTCOLOR] = '#111';
        graph.getStylesheet().putCellStyle('image', style);

        style = mxUtils.clone(style);
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
        style[mxConstants.STYLE_STROKECOLOR] = '#999';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_IMAGE] = 'https://www.jgraph.com/assets/img/drawlogo32.png';
        style[mxConstants.STYLE_IMAGE_WIDTH] = '32';
        style[mxConstants.STYLE_IMAGE_HEIGHT] = '32';
        style[mxConstants.STYLE_SPACING_TOP] = '56';
        style[mxConstants.STYLE_SPACING] = '8';
        graph.getStylesheet().putCellStyle('bottom', style);

        style = mxUtils.clone(style);
        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_IMAGE] = 'https://www.jgraph.com/assets/img/drawlogo32.png';
        delete style[mxConstants.STYLE_SPACING_TOP];
        graph.getStylesheet().putCellStyle('top', style);

        style = mxUtils.clone(style);
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_LEFT;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_IMAGE] = 'images/icons48/earth.png';
        style[mxConstants.STYLE_SPACING_LEFT] = '55';
        style[mxConstants.STYLE_SPACING] = '4';
        graph.getStylesheet().putCellStyle('right', style);

        style = mxUtils.clone(style);
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_RIGHT;
        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_RIGHT;
        delete style[mxConstants.STYLE_SPACING_LEFT];
        style[mxConstants.STYLE_SPACING_RIGHT] = '55';
        graph.getStylesheet().putCellStyle('left', style);

       
    };


    creatReactor(x, y, outNodes) {
        const parent = this.graph.getDefaultParent();
        this.graph.getModel().beginUpdate();
        const outLength = outNodes;
        try {
            const v1 = this.graph.insertVertex(parent, null, `Reactor${outNodes}` , x, y, 100, 30*(outNodes+1), 'top');
            v1.setConnectable(false);
            console.log(v1);
            // this.graph.setCellWarning(v1, 'xx');
            this.addOverlay(v1.id, 'warning', '/assets/images/warning.gif');

            const v2 = this.graph.insertVertex(v1, null, 'in', 0, 0.5, 16, 16, 'fontSize=9;shape=ellipse;resizable=0;');
            v2.geometry.offset = new mxPoint(-8, -8);
            v2.geometry.relative = true;

            while(outNodes > 0) {
                let out = this.graph.insertVertex(v1, null, 'out', 1, (outLength-outNodes+1)/(outLength+1), 16, 16,
                                                    'fontSize=9;shape=ellipse;resizable=0;');
                out.geometry.offset = new mxPoint(-8, -8);
                out.geometry.relative = true;
                outNodes--;
            }

        } finally {
            // Updates the display
            this.graph.getModel().endUpdate();
        }
    }

    userObject() {
        const doc = mxUtils.createXmlDocument();
        const obj = doc.createElement('Reactor');
        obj.setAttribute('class', 'filter');
        obj.setAttribute('label', 'Hello, World!');
        obj.setAttribute('checked', 'true');
        return obj;
    }

    initLeftbarDrag() {
        let dragged;
        const reactors = document.querySelectorAll('.reactor');
        Array.from(reactors).forEach((reactor, index) => {
            reactor.addEventListener('dragstart', (event) => {
                dragged = event.target;
                // (<any>event).dataTransfer.setData('text/plain', null)
                // 使其半透明
                (<any>event.target).style.opacity = '';
                (<any>event.target).style.borderStyle = 'dashed';
                this.selectedReactor = index;
            }, false);

            reactor.addEventListener('dragend', (event) => {
                // 重置透明度
                (<any>event.target).style.opacity = '';
                (<any>event.target).style.borderStyle = 'solid';
            }, false);
        });

        document.querySelector('.graphContainer').addEventListener('dragenter', (event) => {
            if ( (<any>event.target).classList[0] === 'graphContainer' ) {
                (<any>event.target).style.borderColor = '#999';
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
            if ( (<any>event.target).classList[0] === 'graphContainer' ) {
                (<any>event.target).style.borderColor = '';
            }
            this.creatReactor((<any>event).x - 260, (<any>event).y - 100, this.selectedReactor + 1);
            // this.createCanvasReactor((<any>event).x, (<any>event).y, 100, 100);
            // this.createDivRect((<any>event).x, (<any>event).y, 180, 180);
        });
    }
}
