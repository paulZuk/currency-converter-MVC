export default class Event {
    constructor(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    attach(listener) {
        this._listeners = [...this._listeners, listener];
    }

    notify(args) {
        for (let i = 0; i < this._listeners.length; i++) {
            this._listeners[i](this.sender, args);
            
        }
    }
}