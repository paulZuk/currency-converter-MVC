import Event from './EventDispatcher';

export default class CurrencyView {
    constructor(model) {
        this._model = model;

        this.transactionName = $('.transaction-name');
        this.currencyFactor = $('#currencyFactor');
        this.addTransactionBtn = $('button');
        this.list = $('ul');

        this.addButtonClicked = new Event(this);
        this.currencyFactorChanged = new Event(this);

        this.attachModelListeners();
        this.attachEventListenersHTML();
    }

    attachEventListenersHTML() {
        this.addTransactionBtn.on('click', () => {            
            this.addButtonClicked.notify({
                name: this.transactionName.val()
            });
        });
        this.currencyFactor.on('change', ()=> {
            this.currencyFactorChanged.notify({
                factor: this.currencyFactor.val()
            })
        });

    }

    attachModelListeners() {
        this._model.addedTransaction.attach(()=> {
            this.buildListTransactions();
        });
    }

    attachModelListeners() {
        this._model.addedTransaction.attach(() => {
            this.buildListTransactions();
        });
    }

    buildListTransactions() {
        let transactions = this._model.getItems();
        
        this.list.html('');

        transactions.forEach(elem => {
            let element = $('<li>', {class: "list-group-item d-flex justify-content-between"});
            let del = $('<div>', {style: 'width:20px;height:20px;float:right', class:'fas fa-trash'});
            let p = $('<div>',{ text: elem } )
           
            element
                .append(p)
                .append(del);

            this.list.append(element);
        });
        
    }
}