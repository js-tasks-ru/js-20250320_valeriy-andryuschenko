export default class SortableTable {
  element = document.createElement('div');
  subElements = document.createElement('div');
  typesNumber = ['price', 'quantity', 'sales'];
  constructor(headerConfig = [], data = []) {
    this.config = headerConfig;
    this.data = data;
    this.subElements.classList.add('sortable-table__body');
    this.subElements.dataset.element = 'body';
    this.createTemplateProducts();
    this.element.innerHTML = this.createTamplate();
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

    this.createTemplateProducts();
    this.element.innerHTML = this.createTamplate();
  }


  destroy() {
    this.element.remove();
  }

  createTemplateProducts() {
    this.subElements.innerHTML = `
              ${this.data.map(product => {
                return `
                  <a href="/products/${product.id}" class="sortable-table__row">
                    <div class="sortable-table__cell">
                      ${product.hasOwnProperty('images') && product.images.length > 0 ?
            `<img className="sortable-table-image" alt="Image" src="${product.images[0].url}">` : ''
          }
                  </div>
                  <div class="sortable-table__cell">${product.title}</div>

                <div class="sortable-table__cell">${product.quantity}</div>
                <div class="sortable-table__cell">${product.price}</div>
                <div class="sortable-table__cell">${product.sales}</div>
                </a>
                `;
        })}
    `;
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
        <!--    products begin    -->

        ${this.subElements.outerHTML}

        <!--    products end    -->

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

