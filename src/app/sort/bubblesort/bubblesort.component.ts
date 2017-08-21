import { Component, OnInit } from '@angular/core';
import { d3 } from 'd3';

@Component({
  selector: 'bubblesort',
  templateUrl: './bubblesort.component.html',
  styleUrls: ['./bubblesort.component.css']
})

export class BubbleSortComponent {
  constructor() {

  }
  ngOnInit() {
    const width = '100%',
        height = 300;

    const circles = [{
        cx: 150,
        cy: 200,
        r: 40
    }, {
        cx: 250,
        cy: 200,
        r: 40
    }];
    // 添加画布并设置画布大小
    const svg = d3.selector.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
  }
}