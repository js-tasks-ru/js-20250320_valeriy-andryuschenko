export default class ColumnChart {
  element = document.createElement("div");
  chartHeight = 50;
  formatHeading = (value) => value;

  constructor(params = {}) {
    this.value = params.value || '';
    this.label = params.label || '';
    this.link = params.link || '';
    this.charts = params.data || [];
    this.formatHeading = params.formatHeading || this.formatHeading;
    this.maxValue = Math.max(...this.charts);
    this.scale = 50 / this.maxValue;
    this.element.innerHTML = this.createTemplate();
    this.setLoadingDefault();
  }

  update(data) {
    this.data = data;
    this.element.innerHTML = this.createTemplate();
    this.setLoadingDefault();
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }

  createLinkTemlate() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';
  }

  createTemplate() {
    return `
    <div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.createLinkTemlate()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
            ${this.formatHeading(this.value)}
        </div>
        <div data-element="body" class="column-chart__chart">
            ${this.createCharts()}
        </div>
      </div>
    </div>
    `;
  }

  setLoadingDefault() {
    if (this.charts.length === 0) {
      this.element.classList.add('column-chart_loading');
    }
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

}
