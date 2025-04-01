export default class SortableTable {
  element = document.createElement('div');

  constructor(headerConfig = [], data = []) {
    this.config = headerConfig;
    this.data = data;
    console.log(this.data);
    this.element.innerHTML = this.createTamplate();
  }

  createTamplate() {
    return `
      <div class="sortable-table">

        <div data-element="header" class="sortable-table__header sortable-table__row">
        <!-- header start -->
           ${this.config.map(configTitle => {
              if (configTitle.template) {
                return configTitle.template();
              }

              return `
                <div className="sortable-table__cell" data-id="${configTitle.id}" data-sortable="${configTitle.sortable}" data-order="asc">
                   <span>${configTitle.title}</span>
                </div>`;
              }).join('')}

            <!-- header end -->
        </div>

        <div data-element="body" class="sortable-table__body">

          ${this.data.map(product => {
            return `
              <a href="/products/${product.id}" class="sortable-table__row">
                <div class="sortable-table__cell">
                  ${product.images.length > 0 ?
                    `<img className="sortable-table-image" alt="Image" src="${product.images[0].url}">` : ''
                  }
              </div>
              <div class="sortable-table__cell">${product.title}</div>

            <div class="sortable-table__cell">${product.quantity}</div>
            <div class="sortable-table__cell">${product.price}</div>
            <div class="sortable-table__cell">${product.sales}</div>
            </a>
            `
    })}

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

}

