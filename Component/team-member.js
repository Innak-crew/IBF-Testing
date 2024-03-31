class TEAM extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback() {

        this.innerHTML = `
        <div class="columns is-multiline is-centered">
        <div class="column is-12-mobile is-4-tablet is-3-desktop">
        <div class="card-container">
            <div class="card">
                <div class="image">
                    <img src="asserts/img/team/01.jpg">
                </div>
                <div class="content">
                    <h3>BharathKumar R</h3>
                    <p>Founder & CEO</p>
                </div>
            </div>
        </div>
    </div>

    <div class="column is-12-mobile is-4-tablet is-3-desktop">
        <div class="card-container">
            <div class="card">
                <div class="image">
                    <img src="asserts/img/team/02.jpg">
                </div>
                <div class="content">
                    <h3>Jeevitha V</h3>
                    <p>Co-Founder & MD</p>
                </div>
            </div>
        </div>
    </div>

    <div class="column is-12-mobile is-4-tablet is-3-desktop">
        <div class="card-container">
            <div class="card">
                <div class="image">
                    <img src="asserts/img/team/04.jpg">
                </div>
                <div class="content">
                    <h3>Rathimaan R</h3>
                    <p>Chief Operative Officer</p>
                </div>
            </div>
        </div>
    </div>

    <div class="column is-12-mobile is-4-tablet is-3-desktop">
        <div class="card-container">
            <div class="card">
                <div class="image">
                    <img src="asserts/img/team/03.jpg">
                </div>
                <div class="content">
                    <h3>Archith V</h3>
                    <p>Chief Financial Officer</p>
                </div>
            </div>
        </div>
    </div>
    </div>`;
    }

}

customElements.define('team-members', TEAM);