import Block from '../../modules/block';
import Card from '../../components/card/card.component';
import * as s from '../../modules/store/store';
import {ADD_ITEM, store} from "../../modules/store/store";

export default class PagesComponent extends Block {
    constructor() {
        super('div', {
            items: [new Card('url',1).render(), new Card('url',2).render(), new Card('url',3).render()],
            //class: 'default',
        });
        let f = this.setCards.bind(this);
        s.store.subscribe(f);
    }
    setCards(state) {
        console.log('setCardsLog');
        this.props.items = [];
        for (let k of state.items) {
            this.props.items.push(new Card(k.img,k.text).render());
        }

    }

    render() {
        s.store.dispatch({
            type: s.GET,
            payload: {img:'src',text:'first'}
        })
        this.props.items.splice(0);
        for (let k of s.store.state.items) {
            this.props.items.push(new Card(k.img,k.text).render());
        }
        let block = document.createElement('div');
        block.classList.add('block');
        let link = document.createElement('link')
        link.onclick =() => {
            event.preventDefault();
            window.router.go('/add');
        }
        link.classList.add('link');
        let span = document.createElement('span');
        span.classList.add('text');
        span.textContent = 'добавить новую карточку';
        link.append(span);
        let cont = document.createElement('div');
        cont.classList.add('container');
        console.log(this);
        this.props.items.forEach((item) => cont.append(item));
        block.append(link,cont);
        return block;
    }
}