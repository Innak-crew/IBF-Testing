class DNA extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let html = `<div class="dna-container">
        <div class="dna">
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="item">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="dna-shadow"></div>
    </div>`;
        this.innerHTML = html;
    }
}

customElements.define('dna-element', DNA);
