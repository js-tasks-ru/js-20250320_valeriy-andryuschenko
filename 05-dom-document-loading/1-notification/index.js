export default class NotificationMessage {
  element = document.createElement("div");
  constructor(message = '', timer = {}) {
    this.duration = timer.duration || 2000;
    this.type = timer.type || 'error';
    this.message = message;
    this.element.innerHTML = this.createTemplate();
    this.element.classList.add(this.type);
  }

  show(div = null) {
    if(div) {
      div.append(this.element);
      document.body.append(div);
    } else {
      document.body.append(this.element);
    }

    setTimeout(() => {
      this.remove();
    }, this.duration);

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element.remove();
  }

  createTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }
}
