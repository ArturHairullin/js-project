import cloneDeep from 'lodash/cloneDeep';

import {Mediator} from '../mediator';

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    _element = null;
    _meta = null;
    
    constructor(tagName = 'div', props = {}) {
        const mediator = new Mediator();
        this._meta = {
            tagName,
            props,
        };

        this.props = this._makePropsProxy(props);

        this.mediator = () => mediator;

        this._registerEvents(mediator);
        mediator.emit(Block.EVENTS.INIT);
    }

    _registerEvents(mediator) {
        mediator.on(Block.EVENTS.INIT, this.init.bind(this));
        mediator.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        mediator.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        mediator.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);

        console.log(`_createResources element:`);
        console.log(this._element);
    }

    init() {
        console.log(`init`);

        this._createResources();
        this.mediator().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        console.log(`_componentDidMount`);
        this.componentDidMount();
        this.mediator().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps) { }

    _componentDidUpdate(oldProps, newProps) {
        console.log(`_componentDidUpdate`, oldProps, newProps);

        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        console.log(`_render`);
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы превращать из возвращать из compile DOM-ноду
        this._element.appendChild(block);
    }

    render() { }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        // Можно и так передать this
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldProps = cloneDeep(target);
                target[prop] = value;
                // Запускаем обновление компоненты
                self.mediator().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            }
        });
    }

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}

export default Block;
