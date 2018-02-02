import style from '../css/style.css'
import CurrencyModel from './CurrencyModel';
import CurrencyController from './CurrencyController';
import CurrencyView from './CurrencyView';

document.addEventListener('DOMContentLoaded', ()=> {
    const model = new CurrencyModel(),
            view = new CurrencyView(model),
            contoller = new CurrencyController(model,view);
});