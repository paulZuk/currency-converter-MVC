import Event from './EventDispatcher';

export default class CurrencyView {
    constructor(model) {
        this._model = model;

        this.transactionName = $('.transaction-name');
        this.transactionValue = $('.transaction-value');
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
                name: this.transactionName.val(),
                value: this.transactionValue.val()
            });
            this.clearInputs();
        });
        this.currencyFactor.on('change', ()=> {
            this.currencyFactorChanged.notify({
                factor: this.currencyFactor.val()
            })
        });
    }
    clearInputs() {
        this.transactionName.val('');
        this.transactionValue.val('');
    }

    attachModelListeners() {
        this._model.addedTransaction.attach(()=> {
            this.buildListTransactions();
        });
        this._model.updatedFactor.attach(() => {
            this.buildListTransactions();
        });
    }

    buildListTransactions() {
        let transactions = this._model.getItems();
        
        this.list.html('');

        transactions.forEach(elem => {
            const element = $('<li>', {class: "list-group-item d-flex justify-content-between"});
            const del = $('<div>', {style: 'width:20px;height:20px;float:right', class:'fas fa-trash'});
            const name = $('<div>',{ text: elem.name } );
            const amount = $('<div>', { text: elem.value + ' EURO'});
            const amountPln =$('<div>', { text: elem.pln + ' PLN' });
           
            element
                .append(name)
                .append(amount)
                .append(amountPln)
                .append(del);

            this.list.append(element);
        });
        
    }
}