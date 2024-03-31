class FORBIDDEN403 extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let html = ` <style>
        body {
            display: grid;
            place-content: center;
            min-height: 100vh;
            background: rgb(255, 255, 255);
        }

        .z {
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: repeat(3, 1fr) 1fr 1fr repeat(9, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 0 0.5em;
            width: 500px;
            height: 100px;
        }

        .z>* {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background-origin: border-box;
        }

        .z> :nth-of-type(28) {
            -webkit-animation: anim 0.10714286s 3s both 8;
            animation: anim 0.10714286s 3s both 8;
        }

        .z> :nth-of-type(27) {
            -webkit-animation: anim 0.10714286s 2.89285714s both 8;
            animation: anim 0.10714286s 2.89285714s both 8;
        }

        .z> :nth-of-type(26) {
            -webkit-animation: anim 0.10714286s 2.78571429s both 8;
            animation: anim 0.10714286s 2.78571429s both 8;
        }

        .z> :nth-of-type(25) {
            -webkit-animation: anim 0.10714286s 2.67857143s both 8;
            animation: anim 0.10714286s 2.67857143s both 8;
        }

        .z> :nth-of-type(24) {
            -webkit-animation: anim 0.10714286s 2.57142857s both 8;
            animation: anim 0.10714286s 2.57142857s both 8;
        }

        .z> :nth-of-type(23) {
            -webkit-animation: anim 0.10714286s 2.46428571s both 8;
            animation: anim 0.10714286s 2.46428571s both 8;
        }

        .z> :nth-of-type(22) {
            -webkit-animation: anim 0.10714286s 2.35714286s both 8;
            animation: anim 0.10714286s 2.35714286s both 8;
        }

        .z> :nth-of-type(21) {
            -webkit-animation: anim 0.10714286s 2.25s both 8;
            animation: anim 0.10714286s 2.25s both 8;
        }

        .z> :nth-of-type(20) {
            -webkit-animation: anim 0.10714286s 2.14285714s both 8;
            animation: anim 0.10714286s 2.14285714s both 8;
        }

        .z> :nth-of-type(19) {
            -webkit-animation: anim 0.10714286s 2.03571429s both 8;
            animation: anim 0.10714286s 2.03571429s both 8;
        }

        .z> :nth-of-type(18) {
            -webkit-animation: anim 0.10714286s 1.92857143s both 8;
            animation: anim 0.10714286s 1.92857143s both 8;
        }

        .z> :nth-of-type(17) {
            -webkit-animation: anim 0.10714286s 1.82142857s both 8;
            animation: anim 0.10714286s 1.82142857s both 8;
        }

        .z> :nth-of-type(16) {
            -webkit-animation: anim 0.10714286s 1.71428571s both 8;
            animation: anim 0.10714286s 1.71428571s both 8;
        }

        .z> :nth-of-type(15) {
            -webkit-animation: anim 0.10714286s 1.60714286s both 8;
            animation: anim 0.10714286s 1.60714286s both 8;
        }

        .z> :nth-of-type(14) {
            -webkit-animation: anim 0.10714286s 1.5s both 8;
            animation: anim 0.10714286s 1.5s both 8;
        }

        .z> :nth-of-type(13) {
            -webkit-animation: anim 0.10714286s 1.39285714s both 8;
            animation: anim 0.10714286s 1.39285714s both 8;
        }

        .z> :nth-of-type(12) {
            -webkit-animation: anim 0.10714286s 1.28571429s both 8;
            animation: anim 0.10714286s 1.28571429s both 8;
        }

        .z> :nth-of-type(11) {
            -webkit-animation: anim 0.10714286s 1.17857143s both 8;
            animation: anim 0.10714286s 1.17857143s both 8;
        }

        .z> :nth-of-type(10) {
            -webkit-animation: anim 0.10714286s 1.07142857s both 8;
            animation: anim 0.10714286s 1.07142857s both 8;
        }

        .z> :nth-of-type(9) {
            -webkit-animation: anim 0.10714286s 0.96428571s both 8;
            animation: anim 0.10714286s 0.96428571s both 8;
        }

        .z> :nth-of-type(8) {
            -webkit-animation: anim 0.10714286s 0.85714286s both 8;
            animation: anim 0.10714286s 0.85714286s both 8;
        }

        .z> :nth-of-type(7) {
            -webkit-animation: anim 0.10714286s 0.75s both 8;
            animation: anim 0.10714286s 0.75s both 8;
        }

        .z> :nth-of-type(6) {
            -webkit-animation: anim 0.10714286s 0.64285714s both 8;
            animation: anim 0.10714286s 0.64285714s both 8;
        }

        .z> :nth-of-type(5) {
            -webkit-animation: anim 0.10714286s 0.53571429s both 8;
            animation: anim 0.10714286s 0.53571429s both 8;
        }

        .z> :nth-of-type(4) {
            -webkit-animation: anim 0.10714286s 0.42857143s both 8;
            animation: anim 0.10714286s 0.42857143s both 8;
        }

        .z> :nth-of-type(3) {
            -webkit-animation: anim 0.10714286s 0.32142857s both 8;
            animation: anim 0.10714286s 0.32142857s both 8;
        }

        .z> :nth-of-type(2) {
            -webkit-animation: anim 0.10714286s 0.21428571s both 8;
            animation: anim 0.10714286s 0.21428571s both 8;
        }

        .z> :nth-of-type(1) {
            -webkit-animation: anim 0.10714286s 0.10714286s both 8;
            animation: anim 0.10714286s 0.10714286s both 8;
        }

        .z .c0a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c0b {
            background-image: linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c1a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c1b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c2a {
            background-image: linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to bottom right, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c2b {
            background-image: linear-gradient(to top, #11AB4E 10px, transparent 0), linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c5a {
            background-image: linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0);
        }

        .z .c5b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0);
        }

        .z .c6a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c6b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c7a {
            background-image: linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c7b {
            background-image: linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0), linear-gradient(to right, #11AB4E 10px, transparent 0);
        }

        .z .c8a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to bottom right, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c8b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0), linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c9a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0);
        }

        .z .c9b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0);
        }

        .z .c10a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c10b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom right, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c11a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c11b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom right, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z .c12a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0);
        }

        .z .c12b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to top, #11AB4E 10px, transparent 0);
        }

        .z .c13a {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z .c13b {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0), linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z #B {
            background-image: linear-gradient(to top, #11AB4E 10px, transparent 0);
        }

        .z #T {
            background-image: linear-gradient(to bottom, #11AB4E 10px, transparent 0);
        }

        .z #L {
            background-image: linear-gradient(to right, #11AB4E 10px, transparent 0);
        }

        .z #R {
            background-image: linear-gradient(to left, #11AB4E 10px, transparent 0);
        }

        .z #SW {
            background-image: linear-gradient(to bottom right, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        .z #NW {
            background-image: linear-gradient(to bottom left, transparent 40%, #11AB4E 0, 60%, transparent 0);
        }

        @-webkit-keyframes anim {
            from {
                transform: rotateX(-90deg);
            }

            to {
                transform: rotateX(0);
            }
        }

        @keyframes anim {
            from {
                transform: rotateX(-90deg);
            }

            to {
                transform: rotateX(0);
            }
        }
    </style>
    <div class="z">
        <div class="c0a"></div>
        <div class="c0b"></div>
        <div class="c1a"></div>
        <div class="c1b"></div>
        <div class="c2a"></div>
        <div class="c2b"></div>
        <div class="c3a"></div>
        <div class="c3b"></div>
        <div class="c4a"></div>
        <div class="c4b"></div>
        <div class="c5a"></div>
        <div class="c5b"></div>
        <div class="c6a"></div>
        <div class="c6b"></div>
        <div class="c7a"></div>
        <div class="c7b"></div>
        <div class="c8a"></div>
        <div class="c8b"></div>
        <div class="c9a"></div>
        <div class="c9b"></div>
        <div class="c10a"></div>
        <div class="c10b"></div>
        <div class="c11a"></div>
        <div class="c11b"></div>
        <div class="c12a"></div>
        <div class="c12b"></div>
        <div class="c13a"></div>
        <div class="c13b"></div>
    </div>`;
        this.innerHTML = html;
    }
}

customElements.define('forbidden-alert', FORBIDDEN403);