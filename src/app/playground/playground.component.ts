import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
type G6 = any;
declare var G6: any;

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

    private data = {
        // 'nodes': [{
        //     'shape': 'rect',
        //     'id': 'd62d1569',
        //     'x': 200,
        //     'y': 300,
        //     'size': [
        //         100,
        //         100
        //     ]
        // }, {
        //     'shape': 'rect',
        //     'id': 'aac28914',
        //     'x': 500,
        //     'y': 200,
        //     'size': [
        //         100,
        //         100
        //     ]
        // }, {
        //     'shape': 'rect',
        //     'id': 'aac29914',
        //     'x': 500,
        //     'y': 400,
        //     'size': [
        //         100,
        //         100
        //     ]
        // }],
        // 'edges': [{
        //     'shape': 'smoothArrow',
        //     'source': 'd62d1569',
        //     'target': 'aac28914',
        //     'id': '6b2b3874'
        // }]
    };
    private net;
    private cnodes;

    constructor() {}

    ngOnInit() {
        // this.initBase();
        this.initLeftbarDrag();
        this.initCanvasNet();
        this.globalInit();
        this.registerCustomRect();
    }

    initBase() {
        const circles = [
            {cx: 200, cy: 100, r: 10 },
            {cx: 600, cy: 400, r: 10 }
        ];

        const rects = [
            {x: 100, y: 100, width: 100, height: 100}
        ]
        const drag = d3.drag()
                       .on('drag', function(circle) {
                           d3.select(this)
                             .attr('cx', d3.event.x)
                             .attr('cy', d3.event.y);
                       });
        const dragRect = d3.drag()
                            .on('drag', function(rect){
                                d3.select(this)
                                .attr('x', d3.event.x)
                                .attr('y', d3.event.y);
                            });

        const baseSvg = d3.select('#play').select('svg');
        baseSvg.selectAll('circle')
               .data(circles)
               .enter()
               .append('circle')
               .attr('cx', function(d){ return d.cx; })
               .attr('cy', function(d){ return d.cy; })
               .attr('r', function(d){ return d.r; })
               .attr('fill', 'black')
               .call(drag);

        baseSvg.selectAll('rect')
               .data(rects)
               .enter()
               .append('rect')
               .attr('x', function(d){ return d.x; })
               .attr('y', function(d){ return d.y; })
               .attr('width', function(d){ return d.width; })
               .attr('height', function(d){ return d.height; })
               .attr('fill', 'black')
               .call(dragRect);

        const lineData = [
            {'x': 100, 'y': 100},
            {'x': 600, 'y': 400}
        ];

        // baseSvg.append('path')
        //     .attr('d', d3.shape().bezierLine([[0, 40], [25, 70], [50, 100], [100, 50], [150, 20], [200, 130], [300, 100]]))
        //     .attr('stroke', 'red')
        //     .attr('stroke-width', 1)
        //     .attr('fill', 'none');

        const lineFunction = d3.line()
                            .x(function (d) {
                                return d.cx;
                            })
                            .y(function (d) {
                                return d.cy;
                            })
                            // .interpolate('linear');

        baseSvg.append('path')
               .attr('d', lineFunction(circles))
               .style('stroke-width', 1)
               .style('stroke', 'rgb(0,0,0)')
               .style('fill', 'none');
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

        document.querySelector('.dropzone').addEventListener('dragenter', (event) => {
            if ( (<any>event.target).classList[0] === 'dropzone' ) {
                (<any>event.target).style.borderColor = 'blue';
            }
        }, false);

        document.querySelector('.dropzone').addEventListener('dragleave', (event) => {
            if ( (<any>event.target).className === 'dropzone' ) {
                (<any>event.target).style.borderColor = '';
            }
        }, false);

        document.querySelector('.dropzone').addEventListener('dragover', function( event ) {
            // prevent default to allow drop
            event.preventDefault();
        }, false);


        document.querySelector('.dropzone').addEventListener('drop', (event) => {
            event.preventDefault();
            console.log('drop');
            console.log(event);
            if ( (<any>event.target).classList[0] === 'dropzone' ) {
                (<any>event.target).style.borderColor = '';
            }

            // this.createRect((<any>event).x, (<any>event).y, 100, 100);
            this.createCanvasReactor((<any>event).x, (<any>event).y, 100, 100);
            // this.createDivRect((<any>event).x, (<any>event).y, 180, 180);
        });
    }

    createRect(x, y, width, height) {
        const self = this;
        let minusRectX;
        let minusRectY;
        const minusCircleX = [];
        const minusCircleY = [];
        let dragable = false;
        // const dragRect = d3.drag().on('start', function () {
        //     console.log('start');
        //     const pressX = d3.event.x;
        //     const originX = d3.select(this).attr('x');
        //     const pressY = d3.event.y;
        //     const originY = d3.select(this).attr('y');
        //     minusRectX = pressX - originX;
        //     minusRectY = pressY - originY;
        // })
        // .on('drag', function (rect) {
        //     d3.select(this)
        //         .attr('x', d3.event.x - minusRectX)
        //         .attr('y', d3.event.y - minusRectY);
        // });

        const dragGroup = d3.drag()
            .on('start', function() {
                const pressX = d3.event.x;
                const pressY = d3.event.y;
                minusRectX = pressX - d3.select(this).select('rect').attr('x');
                minusRectY = pressY - d3.select(this).select('rect').attr('y');
                d3.select(this).selectAll('circle').each(function(d, index){
                    minusCircleX[index] = pressX - d3.select(this).attr('cx');
                    minusCircleY[index] = pressY - d3.select(this).attr('cy');

                    dragable = dragable || self.withinCircle(d3.event.x, d3.event.y,
                                                d3.select(this).attr('cx'),
                                                d3.select(this).attr('cy'),
                                                d3.select(this).attr('r'));
                });
            })
            .on('drag', function(event) {
                // d3.select(this)
                //     .attr('transform', `translate(${d3.event.x - minusX}, ${d3.event.y - minusY})`);

                if (!dragable) {
                    d3.select(this).select('rect')
                        .attr('x', d3.event.x - minusRectX)
                        .attr('y', d3.event.y - minusRectY);
                    d3.select(this).selectAll('circle').each(function(d, idx){
                        d3.select(this)
                        .attr('cx', d3.event.x - minusCircleX[idx])
                        .attr('cy', d3.event.y - minusCircleY[idx]);
                    });
                };
            })
            .on('end', function(){
                dragable = false;
            })
        const baseG = d3.select('svg.dropzone').append('g');

        baseG.append('rect')
            .attr('x', x - 265 - width / 2)
            .attr('y', y - 50 - height / 2)
            .attr('width', width)
            .attr('height', height)
            .style('stroke-width', 1)
            .style('stroke', '#999')
            .style('fill', '#fff');
        baseG.append('circle')
            .attr('class', 'dot')
            .attr('cx', x - 265 - width / 2)
            .attr('cy', y - 50)
            .attr('r', 5)
            .style('stroke-width', 1)
            .style('stroke', '#999')
            .attr('fill', '#fff');
        baseG.append('circle')
            .attr('class', 'dot')
            .attr('cx', x - 265 + width / 2)
            .attr('cy', y - 50)
            .attr('r', 5)
            .style('stroke-width', 1)
            .style('stroke', '#999')
            .attr('fill', '#fff');
        const rec = d3.select('svg.dropzone').selectAll('rect');
        const circles = d3.select('svg.dropzone').selectAll('circle');
        baseG.call(dragGroup);
        const circleElements = Array.from(document.querySelectorAll('svg .dot'));

        let newLine;
        let newGraph;
        let svgMouseupListener = null;
    
        circleElements.forEach(function(ele){
            function mousemove(event) {
                console.log('mousemove');
                newLine.attr('x2', (<any>event).offsetX)
                       .attr('y2', (<any>event).offsetY);
            }
            ele.addEventListener('mousedown', function(event){
                console.log('mouseDown');
                newGraph = d3.select('svg').append('g')
                newLine = newGraph.append('line')
                    .attr('x1', (<any>event).offsetX)
                    .attr('y1', (<any>event).offsetY)
                    .attr('x2', (<any>event).offsetX)
                    .attr('y2', (<any>event).offsetY)
                    .style('stroke-width', 1)
                    .style('stroke', 'rgb(0,0,0)')
                    .style('fill', 'none');

                // document.querySelector('svg').addEventListener('mousemove', mousemove);
            }, false);
            if (!svgMouseupListener) {
                svgMouseupListener = document.querySelector('svg').addEventListener('mouseup', function(event){
                    console.log('mouseup');
                    document.querySelector('svg').addEventListener('mousemove', null);
                }, true)
            }
        })
    }

    initSvgMouseupListener() {
        document.querySelector('svg').addEventListener('mouseup', function(event){
                console.log('mouseup');
                document.querySelector('svg').addEventListener('mousemove', null);
            }, true)
    }

    createDivRect(x, y, width, height) {
        const newDiv = document.createElement('div');
        newDiv.className = 'newReactor';
        newDiv.style.height = height + 'px';
        newDiv.style.width = width + 'px';
        newDiv.style.border = '1px solid #bbb';
        newDiv.style.position = 'absolute';
        newDiv.style.left = x - 265 - width / 2 + 'px';
        newDiv.style.top =  y - 50 - height / 2 + 'px';
        const circle = document.createElement('span');
        circle.className = 'dot';
        newDiv.appendChild(circle);
        document.querySelector('.dropzone').appendChild(newDiv);

        newDiv.addEventListener('mousedown', function(event) {
            console.log(event);
            (<any>event.target).style.left = event.x;
        }, false);

        newDiv.addEventListener('mousemove', function(event) {
            console.log(event);
        })

        newDiv.addEventListener('mouseup', function(event) {
            console.log(event);
            (<any>event.target).style.left = event.x;
        }, false);
    }

    withinCircle(x, y, cr, cy, r) {
        r = parseInt(r);
        cr = parseInt(cr);
        cy = parseInt(cy);
        if ((cr - r) < x && x < (cr + r) && (cy - r) < y && y < (cy + r)) {
            return true;
        }
        return false;
    }

    drawLine(x1, y1, x2, y2) {
        const baseG = d3.select('svg.dropzone').append('g')
        baseG.append('line')
               .attr('x1', 100)
               .attr('y1', 100)
               .attr('x2', 500)
               .attr('y2', 100)
               .style('stroke-width', 1)
               .style('stroke', 'rgb(0,0,0)')
               .style('fill', 'none');
    }

    initCanvasNet() {
        this.net = new G6.Net({
            id: 'dropzone',           // 容器ID
            width: 800,   // 画布宽
            height: 800, // 画布高
            mode: 'edit',
            grid: {
                forceAlign: true, // 是否支持网格对齐复制代码
                cell: 10          // 网格大小
            }
        });
        // this.net.removeBehaviour(['hoverNodeShowAnchor', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor']);
        this.net.source(this.data);
        this.net.render();

        this.net.on('dragstart', function (ev) {
            console.log(ev);
        });
        this.net.on('dragend', function (ev) {
            console.log(ev);
        });

        this.net.on('mouseenter', (ev) => {
            const shape = ev.shape;
            if (shape && shape.hasClass('anchor-point')) {
                this.net.beginAdd('edge', {
                    shape: 'smoothArrow',
                    lineWidth: 2
                });
            }
        });

        this.net.on('mouseleave', (ev) => {
            const shape = ev.shape;
            const item = ev.item;
            const nodes = this.net.getNodes();
            const self = this;
            if (shape && shape.hasClass('anchor-point')) {
                if (true) {
                    if (!this.cnodes && this.net.get('behaviourSignal').draggingEdge) {
                        this.cnodes = [];
                        G6.Util.each(nodes, function (node) {
                            if (item !== node) {
                                self.cnodes.push(node);
                            }
                        });
                        G6.Util.each(this.cnodes, function (node) {
                            const anchorPoints = node.getAnchorPoints();
                            G6.Util.each(anchorPoints, function (point, index) {
                                console.log(point);
                                if (rdb()) {
                                    self.net.updateAnchor(node, index, {
                                        linkable: false,
                                        style: {
                                            fill: '#D0D0D0'
                                        },
                                        hoverStyle: {
                                            stroke: null
                                        }
                                    });
                                } else {
                                    self.net.updateAnchor(node, index, {
                                        linkable: true,
                                        style: {
                                            fill: '#14B47E'
                                        },
                                        hoverStyle: {
                                            stroke: '#14B47E'
                                        }
                                    });
                                }
                            });
                        });
                    }
                } else {

                }
            }
        });

        // 拖拽边结束后重置锚点
        this.net.on('dragedgeend', (ev) => {
            const shape = ev.shape;
            const item = ev.item;
            const edge = ev.edge;
            const self = this;
            // 如果没连接到锚点则删除该连接线
            if (shape && !shape.hasClass('anchor-point')) {
                console.log('删除该连接线');
                this.net.remove(edge);
            }
            if (this.cnodes) {
                G6.Util.each(this.cnodes, function (node) {
                    const anchorPoints = node.getAnchorPoints();
                    G6.Util.each(anchorPoints, function (anchorPoint, index) {
                        self.net.updateAnchor(node, index, {
                            linkable: true,
                            style: G6.Global.anchorPointStyle,
                            hoverStyle: G6.Global.anchorPointHoverStyle
                        });
                    });
                });
                this.cnodes = undefined;
            }
        });

        function rdb (){
            const r = Math.random();
            return r > 0.5;
        }

        this.net.on('afteritemrender', (ev) => {
            const item = ev.item;
            if (G6.Util.isNode(item)) {
                this.net.showAnchor(item);
            }
        });

        this.net.removeBehaviour(['hoverNodeShowAnchor', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor']);
    }

    globalInit() {
        G6.Global.anchorPointStyle = {
            fill: '#108899',
            lineWidth: 0.1,
            r: 6
        };

        G6.Global.anchorPointHoverStyle = {
            lineWidth: 6,
            stroke: '#108EE9',
            strokeOpacity: 0.2
        };
    }

    registerCustomRect() {
        G6.registNode('customRect', {
            draw: function (cfg, group) {
                const shape = group.addShape('rect', {
                    attrs: {
                        x: cfg.x - 50,
                        y: cfg.y - 50,
                        width: 100,
                        height: 100,
                        fill: '#fff',
                        stroke: 'green',
                        radius: 5
                    }
                });
                return shape;
            },
            getAnchorPoints: function(cfg, group) {
                console.log(cfg);
                return [
                    [0, 0.5],
                    [1, 0.25],
                    [1, 0.5],
                    [1, 0.75],
                ];
            }
        });
    }

    createCanvasReactor(x, y, width, height) {
        // 增加新的节点
        const newNode = this.net.add('node', {
            'shape': 'customRect',
            'x': x - 280,
            'y': y - 50,
            'size': [
                width,
                height
            ]
        });
        console.log(newNode);
        this.net.updateAnchor(newNode, 3, {
            linkable: false,
            style: {
                fill: '#D0D0D0'
            },
            hoverStyle: {
                stroke: null
            }
        });
        this.net.refresh();

        // this.net.beginAdd('node', {
        //   shape: 'rect'
        // });
        // this.net.render();
        // this.net.source(this.data.nodes, this.data.edges);
        // this.net.render();
        // this.net.read(this.data);
    }
}
