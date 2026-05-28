/** Stub for Claude Design export — page uses <img>, not <image-slot>. */
if (!customElements.get("image-slot")) {
  customElements.define("image-slot", class extends HTMLElement {
    connectedCallback() {
      if (!this.querySelector("img") && this.dataset.src) {
        const img = document.createElement("img");
        img.src = this.dataset.src;
        img.alt = this.dataset.alt || "";
        this.appendChild(img);
      }
    }
  });
}
