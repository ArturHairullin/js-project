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
        let img = document.createElement('img');
        img.src = this.props.imgName;
        let span = document.createElement('span');
        span.textContent = this.props.textName;
        div.append(img,span);
        return div;
    }
}