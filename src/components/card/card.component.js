import Block from '../../modules/block';


export default class Card extends Block {
    constructor(src,text) {
        super('div', {
            name: 'Login 1',
            imgName: src,
            textName: text,
        });
    }


    render() {
        let div = document.createElement('div');
        div.classList.add('card');
        let img = document.createElement('img');
        img.src = this.props.imgName;
        let span = document.createElement('span');
        span.textContent = this.props.textName;
        img.classList.add('card__icon');
        span.classList.add('card__text');
        //let showtext = document.createElement('div');
        div.append(img,span);
        return div;
    }
}