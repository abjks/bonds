import React, {PureComponent} from 'react';
import * as d3 from 'd3';

import './BondGraph.css';

export class BondGraph extends PureComponent {
    /***
     * размер
     * @type {{width: number, height: number}}
     */
    size = {
        width: 300,
        height: 150
    };

    /***
     * Отступы
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    margin = {
        left: 30,
        right: 30,
        top: 10,
        bottom: 30,
    };

    componentDidMount() {
        const {data} = this.props;

        this.svg = d3.select(".graph");

        this.x = d3.scaleTime().range([0, this.size.width]);
        this.y = d3.scaleLinear().range([this.size.height, 0]);

        this.valueLine = d3.line()
            .x((d) => this.x(d.date))
            .y((d) => this.y(d.price));

        this.xAxis = d3.axisBottom(this.x)
            .tickFormat(d3.timeFormat("%d.%m"))
            .ticks(5);

        this.yAxis = d3.axisLeft(this.y)
            .ticks(5);

        const paper = this.svg.attr("width", this.size.width + this.margin.left + this.margin.right)
            .attr("height", this.size.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        const formattedData = data.map((d) => ({
            date: new Date(d.date),
            price: +d.price
        }));

        this.x.domain(d3.extent(formattedData, (d) => d.date));
        this.y.domain([0, d3.max(formattedData, (d) => d.price)]);

        paper.append("path")
            .data([formattedData])
            .attr("class", "bond-graph__line")
            .attr("d", this.valueLine);

        paper.append("g")
            .attr("class", "x bond-graph__axis")
            .attr("transform", `translate(0,${this.size.height})`)
            .call(this.xAxis);

        paper.append("g")
            .attr("class", "y bond-graph__axis")
            .call(this.yAxis);
    }

    componentDidUpdate() {
        this._updateGraph();
    }

    /***
     * Обновление данных
     * @private
     */
    _updateGraph = () => {
        const {data} = this.props;
        const formattedData = data.map(d => ({
            date: new Date(d.date),
            price: +d.price
        }));

        this.x.domain(d3.extent(formattedData, d => d.date));
        this.y.domain([0, d3.max(formattedData, d => d.price)]);

        const svg = this.svg.transition();

        svg.select(".bond-graph__line")
            .duration(750)
            .attr("d", this.valueLine(formattedData));
        svg.select(".x.bond-graph__axis")
            .duration(750)
            .call(this.xAxis);
        svg.select(".y.bond-graph__axis")
            .duration(750)
            .call(this.yAxis);
    };

    render() {
        return (
            <svg className="graph">
            </svg>
        );
    }
}