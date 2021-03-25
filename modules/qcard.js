console.log('module has been included!');

window.customElements.define('q-card', class extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'date']
    }

    constructor() {
        super();

        const template = `
            <span class="q-title">Post #1</span>
            <span class="q-text">
                <slot>
                    
                </slot>
            </span>
            <span class="q-subtext">March 11, 2021</span>
        `;

        this.attachShadow({mode: 'open'});
        
        const qCard = document.createElement('div');
        qCard.className = 'q-card';

        const style = document.createElement('style');
        style.textContent = `
            .q-card {
                display: flex;
                flex-flow: column nowrap;
            
                border-radius: 5px;
                width: 100%;
                height: auto;
            
                padding: 10px;
                margin-bottom: 10px;
            
                background-color: white;
                box-sizing: border-box;
            }
            .q-title {
                font-size: 1.7rem;
                font-weight: bold;
            }
            .q-text {
                font-size: 1rem;
            }
            .q-subtext {
                margin-top: 20px;
                color: rgb(160, 160, 160);
                font-size: 0.8rem;
            }
        `;

        const qTitle = document.createElement('span');
        qTitle.className = 'q-title';
        qTitle.innerText = this.getAttribute('title');

        const qText = document.createElement('slot');
        qText.className = 'q-text';

        const qDate = document.createElement('span');
        qDate.className = 'q-subtext';
        qDate.innerText = this.getAttribute('date');

        qCard.append(qTitle, qText, qDate);

        this.shadowRoot.append(style, qCard);
    }
});

export function create_card(title, post, date) {
    const card = document.createElement('q-card');
    card.setAttribute('title', title);
    card.setAttribute('date', date);
    card.innerText = post;

    return card;
}