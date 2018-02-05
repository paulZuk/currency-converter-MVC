import Event from './EventDispatcher';

export default class CurrencyController {
    constructor(model,view) {
        this._model = model;
        this._view = view;

        this._view.addButtonClicked.attach((sender, args) => {
            const {name, value} = args;
            let transaction = {
                name,
                value
            }
            this.addItem(transaction)
        });

        this._view.currencyFactorChanged.attach((sender, args ) => {
            this.updateFactor(args.factor);
        });

        this._view.deleteButtonClicked.attach((sender, args) => {
            this.deleteTransaction(args.toDelete);
        });
    }

    deleteTransaction(transactionName) {
        this._model.deleteTransaction(transactionName);
    }

    addItem(transaction) {
        this._model.addTransaction(transaction);
    }

    updateFactor(factor) {
        this._model.updateCurrencyFactor(factor);
    }
}