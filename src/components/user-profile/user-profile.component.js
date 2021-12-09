import Block from '../../modules/block';
import {compile} from '../../utils/templator';
import {template} from './user-profile.template';

export default class UserProfileComponent extends Block {
    constructor() {
        super('div', {
            name: 'Login 1',
        });
    }

    render() {
        return compile(template, {
            userName: this.props.name,
        });
    }
}
