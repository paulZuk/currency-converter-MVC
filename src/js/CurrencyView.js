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
        this.deleteButtonClicked = new Event(this);
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
        this.list.on('click', '.delBtn', (e)=> {
            this.deleteButtonClicked.notify({
                toDelete: $(e.target).parent().parent().find('.name').text()
            });
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
        this._model.deletedTransaction.attach(()=> {
            this.buildListTransactions();
        })
    }

    buildListTransactions() {
        let transactions = this._model.getItems();
        
        this.list.html('');

        transactions.forEach(elem => {
            const element = $('<li>', {class: "list-group-item d-flex justify-content-between"});
            const del = $('<div>', {style: 'width:20px;height:20px;float:right', class:'fas fa-trash delBtn'});
            const name = $('<div>',{style: 'width:20%',text: elem.name, class: 'name' } );
            const amount = $('<div>', {style: 'width:20%', text: elem.value + ' EURO'});
            const amountPln =$('<div>', {style: 'width:20%',text: parseFloat(elem.pln).toFixed(2) + ' PLN' });
           
            element
                .append(name)
                .append(amount)
                .append(amountPln)
                .append(del);

            this.list.append(element);
        });
        
    }
}