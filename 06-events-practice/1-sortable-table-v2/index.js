export default class SortableTable {
  typesNumber = ['price', 'quantity', 'sales'];
  subElements = {};

  constructor(headersConfig, {
    data = [], sorted = {}
  } = {}) {
    this.config = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.element = this.createElement(this.template());
    this.sort(this.sorted.id, this.sorted.order);
    this.selectSubElements();
    this.eventHandler();
  }

  eventHandler() {
    const header = this.element.querySelector('[data-element="header"]');
    if (header) {
      header.addEventListener('pointerdown', this.handlerClick.bind(this),
        {bubbles: true}
      );
    }
  }

  handlerClick(event) {
    const parent = event.target.closest('.sortable-table__cell');
    const arrow = parent.querySelector('.sortable-table__sort-arrow');

    parent.dataset.order = parent.dataset.order === 'asc' ? 'desc' : 'asc';
    this.sort(parent.dataset.id, parent.dataset.order);
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTableHeaderTemplate() {
    return this.config.map(columnConfig => (`<div class="sortable-table__cell" data-id="${columnConfig['id']}"
            data-sortable="${columnConfig['sortable']}"
            data-order=${this.getOrderType(columnConfig['id'])}>
                <span>${columnConfig['title']}</span>
                ${this.createArrowSort(columnConfig['id'])}
            </div>`)).join('');
  }

  getOrderType(id) {
    if (id === this.sorted.id) {
      return this.sorted.order;
    }

    return '';
  }

  createArrowSort() {
    return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`;
  }

  createTableBodyCellTemplate(product, columnConfig) {
    if (columnConfig.template) {
      return columnConfig.template(product);
    }
    const fieldId = columnConfig['id'];

    if (fieldId === 'title') {
      return `<div class="sortable-table__cell">${product[fieldId].replace(/\r?\n|\r/g, '')}</div>`;
    }
    return `<div class="sortable-table__cell">${product[fieldId]}</div>`;
  }

  createTableBodyRowTemplate(product) {
    return `
            <a href="/products/3d-ochki-optoma-zf2300" class="sortable-table__row">
                ${this.config.map(columnConfig => this.createTableBodyCellTemplate(product, columnConfig)).join('')}
            </a>
        `;
  }

  createTableBodyTemplate() {
    return this.data.map(product => (this.createTableBodyRowTemplate(product))).join('');
  }

  template() {
    return `
            <div class="sortable-table">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createTableHeaderTemplate()}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${this.createTableBodyTemplate()}
                </div>
                <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                    <div>
                        <p>No products satisfies your filter criteria</p>
                        <button type="button" class="button-primary-outline">Reset all filters</button>
                    </div>
                </div>
            </div>
        `;
  }

  sort(field, sortType) {
    const cellIndex = this.config.findIndex(obj => obj.id === field);
    const sortable = this.config[cellIndex].sortable;

    if (field === 'images' || !sortable) {
      return;
    }

    if (field === 'title' && sortable) {
      this.data.sort((a, b) => a[field].localeCompare(b[field], ['ru', 'en'], {caseFirst: "upper"}));
    }

    if (field === 'date' && sortable) {
      this.data.sort((a, b) => new Date(a[field]) - new Date(b[field]));
    }

    if (this.typesNumber.includes(field)) {
      this.data.sort((a, b) => Number(a[field]) - Number(b[field]));
    }

    if (sortType === 'desc') {
      this.data.reverse();
    }

    this.element.querySelector('.sortable-table__body').innerHTML = this.createTableBodyTemplate();
    this.selectSubElements();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
