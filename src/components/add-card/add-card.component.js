import Block from '../../modules/block';

export default class AddCardComponent extends Block {
    constructor() {
        super('div', {
        });
    }

    render() {

        function handleEvent() {
            event.preventDefault();
            let input = event.currentTarget.closest('input').value;
            store.dispatch({
                type: ADD_ITEM,
                payload: {img:'img',text: input}
            })
            store.dispatch({type:SAVE})

        }
        let block = document.createElement('form');
        let input = document.createElement('input');
        input.name = 'text';
        let submit = document.createElement('button');
        submit.type = 'submit';
        block.addEventListener('submit',handleEvent);
        block.append(input,submit);

        return block;
    }
}