export default class SortableTable {
  element;
  subElements = {};

  constructor(config = [], data = []) {
    this.config = config;
    this.data = data;
    this.element = this.createElement(this.template());
    this.selectSubElements();
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTableHeaderTemplate() {
    return this.config
      .map(
        (columnConfig) =>
          `<div class="sortable-table__cell" data-id="${columnConfig["id"]}" data-sortable="${columnConfig["sortable"]}" data-order="">
                <span>${columnConfig["title"]}</span>
            </div>`,
      )
      .join("");
  }

  createTableBodyCellTemplate(product, columnConfig) {
    if (columnConfig.template) {
      return columnConfig.template(product);
    }
    const fieldId = columnConfig["id"];
    return `<div class="sortable-table__cell">${product[fieldId]}</div>`;
  }

  createTableBodyRowTemplate(product) {
    return `
            <a href="/products/3d-ochki-optoma-zf2300" class="sortable-table__row">
                ${this.config
      .map((columnConfig) =>
        this.createTableBodyCellTemplate(product, columnConfig),
      )
      .join("")}
            </a>
        `;
  }

  createTableBodyTemplate() {
    return this.data
      .map((product) => this.createTableBodyRowTemplate(product))
      .join("");
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
    const columnConfig = this.config.find((config) => config.id === field);

    if (!columnConfig) {
      return;
    }

    if (!columnConfig.sortable) {
      return;
    }

    const k = sortType === "desc" ? -1 : 1;

    if (columnConfig.sortType === 'string') {
      this.data.sort((a, b) =>
        k * a[field].localeCompare(b[field], ["ru", "en"], { caseFirst: "upper" }),
      );
    }

    if (columnConfig.sortType === 'number') {
      this.data.sort((a, b) => k * (Number(a[field]) - Number(b[field])));
    }

    this.subElements.body.innerHTML = this.createTableBodyTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
