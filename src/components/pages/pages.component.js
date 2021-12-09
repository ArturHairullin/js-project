import Block from '../../modules/block';
import Card from '../../components/card/card.component';


export default class PagesComponent extends Block {
    constructor() {
        super('div', {
            items: [new Card('url',1).render(), new Card('url',2).render(), new Card('url',3).render()],
            //class: 'default',
        });
    }
    setCards(state) {
        this.props.items = state.items.map((item) => { new Card(item.img,item.text)})

    }

    render() {
        store.subscribe((state) => this.setCards(state));
        store.dispatch({type:GET});
        let block = document.createElement('div');
        this.props.items.forEach((item) => block.appendChild(item));
        return block;
    }
}