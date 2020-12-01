var liczba = 10;

const template = document.createElement('template');

template.innerHTML = `
<span class="sp">
0
</span>
`


class Input extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.querySelector('.sp').innerText = liczba;
        this.moja_liczba = liczba;
        
    }
    connectedCallback() {
        setInterval(this.odliczaj.bind(this), 1000);
    }
    
    updateWartosc() {
       this.moja_liczba = liczba;
    }

    odliczaj() {
        console.log("Obecna wartosc: ", this.moja_liczba);
        if(this.moja_liczba < 0) return;
        this._shadowRoot.querySelector('.sp').innerText = this.moja_liczba;
        this.moja_liczba--;
    }

}

window.customElements.define('number-counter', Input);


function klik() {
    var zmienna = document.getElementById('liczba').value;
    if(zmienna <= 0) return;
    liczba = zmienna;   
    
    liczniki = document.querySelectorAll("number-counter");
    for(var i=0; i<liczniki.length; i++) {
        liczniki[i].updateWartosc();
    }


}