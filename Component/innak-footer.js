class innakFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let html = `
        <style>
        .footer {
            background-color: #fff;
            padding: .495rem 1.5rem;
        }

        *,
        *::before,
        *::after {
            box-sizing: inherit;
        }

        footer {
            display: block;
            unicode-bidi: isolate;
        }

        @media screen and (min-width: 769px) {
            .print .level {
                display: flex;
            }
        }

        .level {
            align-items: center;
            justify-content: space-between;
        }

        .level-left {
            align-items: center;
            justify-content: flex-start;
        }

        .level-left,
        .level-right {
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
        }

        @media screen and (min-width: 769px) {
            .print .level-left {
                display: flex;
            }
        }

        .level-item {
            align-items: center;
            display: flex;
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
            justify-content: center;
        }

        @media screen and (min-width: 769px) {
            print .level-right {
                display: flex;
            }
        }

        .level-right {
            align-items: center;
            justify-content: flex-end;
        }

        .level-left,
        .level-right {
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
        }


        a {
            color: #485fc7;
            cursor: pointer;
            text-decoration: none;
        }

        footer.footer .logo img {
            width: auto;
            height: 2rem;
        }

        .level img {
            display: inline-block;
            vertical-align: top;
        }

        img {
            max-width: 100%;
        }
        </style>
        <footer class="footer" id="custom-footer">
        <div class="container-fluid">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        Design & Developed by<p><b class="ml-1"><a
                                    href="https://innak-crew.github.io/links?redirect=linkedin" target="_blank"
                                    rel="noopener noreferrer">innak</a></b></p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="logo">
                            <a href="https://innak-crew.github.io/links?redirect=linkedin" target="_blank"
                                rel="noopener noreferrer"><img
                                    src="https://innak-crew.github.io/innak-logo/rec/Innak-Transprent.png"
                                    alt="innak"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>`;
        this.innerHTML = html;
    }
}

customElements.define('innak-footer', innakFooter);