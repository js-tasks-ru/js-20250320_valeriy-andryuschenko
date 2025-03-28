export default class ColumnChart {
  element = document.createElement("div");
  chartHeight = 50;

  constructor(params = {}) {
    this.value = params.value || '';
    this.label = params.label || '';
    this.link = params.link || '';
    this.charts = params.data || [];
    this.formatHeading = params.formatHeading || '';
    this.maxValue = Math.max(...this.charts);
    this.scale = 50 / this.maxValue;
    this.createColumnChart();
  }

  update(data) {
    this.data = data;
  }

  destroy() {
    this.element = null;
  }

  remove() {
    this.element.remove();
  }

  createTemplate() {
    return `
        ${this.createTitle()}
        ${this.createColumnChartContainer()}
    `;
  }

  createColumnChart() {
    this.element.classList.add("column-chart");
    this.element.style = `--chart-height: ${this.chartHeight};`;
    this.element.innerHTML = this.createTemplate();

    if (this.charts.length === 0) {
      this.element.classList.add("column-chart_loading");
    }

  }

  createColumnChartContainer() {
    const container = document.createElement("div");
    container.classList.add("column-chart__container");
    container.append(this.createColumnChartTitle());
    container.append(this.createColumnCharts());

    return container.outerHTML;
  }

  createColumnCharts() {
    const bodyCharts = document.createElement("div");
    bodyCharts.classList.add("column-chart__chart");
    bodyCharts.setAttribute("data-element", 'body');
    bodyCharts.insertAdjacentHTML('afterbegin', this.createCharts());

    return bodyCharts;
  }

  createCharts() {
    if (this.charts.length === 0) {
      return;
    }

    return this.charts.map(chart => {
      const percent = (chart / this.maxValue * 100).toFixed(0) + '%';
      const value = String(Math.floor(chart * this.scale));
      return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
    }).join('');
  }

  createColumnChartTitle() {
    const chartTitle = document.createElement("div");
    chartTitle.classList.add("column-chart__header");
    chartTitle.setAttribute("data-element", 'header');
    chartTitle.textContent = this.formatHeading ? this.formatHeading(this.value) : this.value;
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
