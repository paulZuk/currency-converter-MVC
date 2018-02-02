import Event from './EventDispatcher';

export default class CurrencyModel {
    constructor(){
        this._transactions = [];
        this._currencyFactor = 1;

        this.addedTransaction = new Event(this);
        this.updatedFactor = new Event(this);
        // this.deletedTransaction = new Event(this);
    }

    addTransaction(transaction) {
        
        this._transactions = [...this._transactions, transaction];
        this.addedTransaction.notify({
            transaction
        });
        console.log(this._transactions);
    }

    updateCurrencyFactor(factor) {
        this._currencyFactor = factor;
        console.log(this._currencyFactor);
        
    }

    getItems() {
        return this._transactions;
    }

    getFactor() {
        return this._currencyFactor;
    }

}

