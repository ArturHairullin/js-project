import Block from '../../modules/block';
import * as s from '../../modules/store/store';
import {SAVE, store} from "../../modules/store/store";

export default class AddCardComponent extends Block {
    constructor() {
        super('div', {
        });
    }

    render() {

        function handleEvent() {
            event.preventDefault();
            let form = event.currentTarget;
            console.log(form[0].value);
            console.log(localStorage.length);
            s.store.dispatch({
                type: s.GET,
                payload: {img:'src',text:'first'}
            })
            s.store.dispatch({
                type: s.ADD_ITEM,
                payload: {img: form[0].files[0],text: form[1].value}
            })
            console.dir(form[0]);
            s.store.dispatch({
                type: s.SAVE,
                payload: {img:'src',text:'first'}
            })
            //localStorage.setItem(form[0].value,form[0].value);
            console.log(localStorage.length);
            console.log(s.store.state)
           // window.router.go('/');

        }
        let block = document.createElement('form');
        let input = document.createElement('input');
        input.type = 'file';
        let textarea = document.createElement('textarea');
        block.classList.add('form');
        textarea.classList.add('form__text');
        input.classList.add('form__file');
        let submit = document.createElement('button');
        submit.type = 'submit';
        submit.textContent = 'Отправить';
        submit.classList.add('form__submit');
        block.append(input,textarea,submit);
        block.addEventListener('submit',handleEvent);

        return block;
    }
}