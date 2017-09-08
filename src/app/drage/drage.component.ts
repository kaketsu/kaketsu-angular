import { Component, OnInit,ViewChild,
    ViewContainerRef } from '@angular/core';
import * as dagreD3 from 'dagre-d3';
import * as d3 from 'd3';

@Component({
  selector: 'app-drage',
  templateUrl: './drage.component.html',
  styleUrls: ['./drage.component.css']
})
export class DrageComponent implements OnInit {
    @ViewChild('svgGraph', {read: ViewContainerRef}) svgContainer;
    g: dagreD3.graphlib.Graph;
    render = new dagreD3.render();
    svgWidth: number;
    svgHeight: number;
    direction: string;

    constructor() {
    }

    ngOnInit() {
        // const svg = d3.select('svg'),
        // inner = svg.append('g');
        // this.render(inner, this.g);
    }

    downloadFile() {
        console.log('xxxx');
        const content = {
            name: 'huajie',
            age: 25
        }
        var eleLink = document.createElement('a');
        eleLink.download = 'download.json';
        eleLink.style.display = 'none';

        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);

        // var aLink = document.createElement('a');
        // var blob = new Blob([{name: 'huajie'}]);
        // var evt = document.createEvent("HTMLEvents");
        // evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
        // aLink.download = 'download';
        // aLink.href = URL.createObjectURL(blob);
        // aLink.dispatchEvent(evt);
    }
}
