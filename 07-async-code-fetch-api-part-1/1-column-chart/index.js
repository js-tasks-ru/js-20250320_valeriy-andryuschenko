import fetchJson from './utils/fetch-json.js';


export default class ColumnChart {
  static BACKEND_URL = 'https://course-js.javascript.ru';
  subElements = {};
  element = document.createElement("div");
  chartHeight = 50;
  formatHeading = (value) => value;

  constructor(params = {}) {
    this.value = params.value || '';
    this.url = params.url || '';
    this.label = params.label || '';
    this.link = params.link || '';
    this.range = params.range || {};
    this.formatHeading = params.formatHeading || this.formatHeading;

    this.response = this.update(this.range.from, this.range.to);
    this.response
      .then((data) => {
        this.charts = Object.values(data);
        this.maxValue = Math.max(...this.charts);
        this.scale = 50 / this.maxValue;
        return data;
      }).then(() => {
        this.element.innerHTML = this.createTemplate();
    }).then(() => {
      this.setLoadingDefault();
    })
      .catch((err) => {
        console.error(err);
      });
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  async update(startDate, endDate) {
    const url = `${ColumnChart.BACKEND_URL}/${this.url}?from=${startDate.toISOString()}&to=${endDate.toISOString()}`;
    const response = await fetch(url, {});
    this.charts = await response.json();


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
    } else {
      this.element.classList.remove('column-chart_loading');
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
