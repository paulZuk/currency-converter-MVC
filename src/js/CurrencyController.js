import Event from './EventDispatcher';

export default class CurrencyController {
    constructor(model,view) {
        this._model = model;
        this._view = view;

        this._view.addButtonClicked.attach((sender, args) => {
            this.addItem(args.name)
        });

        this._view.currencyFactorChanged.attach((sender, args ) => {
            this.updateFactor(args.factor);
        });
    }

    addItem(transaction) {
        this._model.addTransaction(transaction);
    }

    updateFactor(factor) {
        this._model.updateCurrencyFactor(factor);
    }
}