import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTableV1 {
  constructor(headersConfig, { data = [], sorted = {
    id: 'title',
    order: 'desc'
  } } = {}) {
    super(headersConfig, data);

    this.sorted = sorted;
    this.sort(this.sorted.id, this.sorted.order);

    this.arrowElement = this.createElement(this.createArrowTemplate());
    this.setupArrowPosition();
    this.handlerClick = this.handlerClick.bind(this);

    this.createEventListeners();
  }

  setupArrowPosition() {
    const columnElement = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);
    if (!columnElement) {
      return;
    }
    columnElement.appendChild(this.arrowElement);
  }
  handlerClick(event) {
    const columnElement = event.target.closest(".sortable-table__cell");
    if (!columnElement) {
      return;
    }
    const field = columnElement.dataset.id;
    const order = columnElement.dataset.order === "desc" ? "asc" : "desc";
    columnElement.appendChild(this.arrowElement);
    this.sort(field, order);
  }

  createEventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.handlerClick.bind(this));
  }

  destroyEventListeners() {
    this.subElements.header.removeEventListener("pointerdown", this.handlerClick.bind(this));
  }

  createArrowTemplate() {
    return `
      <span class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}
