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
        this._transactions = this.plnCalculation();
        this.addedTransaction.notify();
        console.log(this._transactions);
    }

    updateCurrencyFactor(factor) {
        this._currencyFactor = factor;
        this._transactions = this.plnCalculation();
        this.updatedFactor.notify();
        
    }

    getItems() {
        return this._transactions;
    }

    getFactor() {
        return this._currencyFactor;
    }

    plnCalculation() {
         return this._transactions.map(elem => {
            return  Object.assign({},elem,{ pln: elem.value * this._currencyFactor });
        });
    }

}

