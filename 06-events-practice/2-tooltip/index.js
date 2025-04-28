class Tooltip {
  static #toolTipInstance = null;
  element = null;

  constructor() {
    this.render();
    if (!Tooltip.#toolTipInstance) {
      Tooltip.#toolTipInstance = this;
    }

    return Tooltip.#toolTipInstance;
  }

  initialize() {
    document.addEventListener('pointerover', this.tooltipOver.bind(this));
    document.addEventListener('pointerout', this.tooltipOut.bind(this));
  }

  tooltipOut() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  tooltipOver(event) {
    if (event.target.dataset.tooltip !== undefined) {
      this.render(event.target);
    }
  }

  destroy() {
    this.element.remove();
  }

  render(container = '') {
    if (!container) {
      const imgDefault = document.createElement("img");
      imgDefault.setAttribute("src", "public/tooltip.gif");
      document.body.append(imgDefault);
      return;
    }

    this.element = document.createElement("div");
    this.element.classList.add("tooltip");
    this.element.innerText = container.dataset.tooltip;
    container.append(this.element);
  }

}

export default Tooltip;
