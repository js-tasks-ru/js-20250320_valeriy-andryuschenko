export default class ColumnChart {
  static BACKEND_URL = 'https://course-js.javascript.ru';
  subElements = {};
  element;
  chartHeight = 50;
  formatHeading = (value) => value;

  constructor(params = {}) {
    this.value = params.value || '';
    this.url = params.url || 'api/dashboard/orders';
    this.label = params.label || '';
    this.link = params.link || '';
    this.range = params.range || {};
    this.formatHeading = params.formatHeading || this.formatHeading;
    this.element = this.createElement(this.template());
    this.setLoadingDefault();
    this.selectSubElements();

    this.response = this.update(this.range?.from, this.range?.to);
    this.response
      .then((data) => {
        this.subElements.body.innerHTML = this.createCharts(data);
      }).then(() => {
        this.setLoadingDefault(false);
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

  async update(startDate = new Date(), endDate = new Date()) {
    const url = `${ColumnChart.BACKEND_URL}/${this.url}?from=${startDate?.toISOString()}&to=${endDate?.toISOString()}`;
    const response = await fetch(url, {});
    const data = await response.json();
    this.maxValue = Math.max(...Object.values(data));
    this.scale = 50 / this.maxValue;
    this.subElements.body.innerHTML = this.createCharts(data);

    return data;
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

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  template() {
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

        </div>
      </div>
    </div>
    `;
  }

  setLoadingDefault(show = true) {
    if (show) {
      this.element.classList.add('column-chart_loading');
    } else {
      this.element.classList.remove('column-chart_loading');
    }
  }

  createCharts(charts) {
    if (Object.keys(charts).length === 0) {
      return '';
    }

    return Object.values(charts).map(chart => {
      const percent = ((chart / this.maxValue * 100).toFixed(0)) + '%';
      const value = String(Math.floor(chart * this.scale));
      return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
    }).join('');
  }

}
