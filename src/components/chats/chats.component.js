import Block from '../../modules/block';
import {compile} from '../../utils/templator';
import {chatsTemplate} from './chats.template';

export default class ChatsComponent extends Block {
    constructor() {
        super('div', {
            items: [1, 2, 3],
            chat: {
                id: 1,
            },
            class: 'default',
            handleClick: () => {
                console.log(`click`);
            }
        });
    }

    componentDidMount() {
        setTimeout(() => {
            console.log(`change props`);
            this.props.items = [4,5,6];
        }, 5000);
    }

    render() {
        return compile(chatsTemplate, this.props);
    }
}
