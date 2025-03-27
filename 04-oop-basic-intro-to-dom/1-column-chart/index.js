export default class ColumnChart {
  element = document.createElement("div");
  height = 50
  backgroundDefault = 'background: url(charts-skeleton.svg)'
  constructor(params) {
    this.label = params.label;
    this.value = params.value;
    this.link = params.link;
    this.charts = params.data;
    this.createColumnChart();
  }

  update(data) {
    this.data = data;
  }

  createColumnChart() {
    this.element.classList.add("column-chart");
    this.element.style = `--chart-height: ${this.height};`;
    this.element.insertAdjacentHTML('afterbegin', this.createTitle());
    this.element.append(this.createColumnChartContainer());
  }

  createColumnChartContainer() {
    const container = document.createElement("div");
    container.classList.add("column-chart__container");
    container.append(this.createColumnChartTitle());
    container.append(this.createColumnCharts());
    return container;
  }

  createColumnCharts() {
    const bodyCharts = document.createElement("div");
    bodyCharts.classList.add("column-chart__chart");
    bodyCharts.setAttribute("data-element", 'body');
    //добавить колонки
    if (this.data.length < 0) {

    }

    bodyCharts.insertAdjacentHTML('afterbegin', this.createCharts());
    return bodyCharts;
  }

  createCharts() {
    return this.charts.map(chart => {
      return `<div style="--value: ${(chart / 100) * this.height}" data-tooltip="${chart}%"></div>`;
    }).join('');
  }

  createColumnChartTitle() {
    const chartTitle = document.createElement("div");
    chartTitle.classList.add("column-chart__header");
    chartTitle.setAttribute("data-element", 'header');
    chartTitle.textContent = this.value;
    return chartTitle;
  }

  createTitle() {
    return `
      <div class="column-chart__title">
        Total ${this.label}
        <a href="${this.link}" class="column-chart__link">View all</a>
      </div>
    `;
  }

}
