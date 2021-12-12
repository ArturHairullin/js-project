export const initialState = {
    items: []
}

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SAVE = 'SAVE';
export const GET = 'GET';

 const reducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case ADD_ITEM: {
            return {
                ...state,
                items: [...state.items, payload]
            }
        }
        case REMOVE_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item !== payload)
            }
        }
        case SAVE: {
            //localStorage.clear();
            state.items.forEach((item,index) => {localStorage.setItem('' + index,JSON.stringify(item))});
            return state;
        }
        case GET: {
            let tmp = [];
            for (let i = 0;i < localStorage.length;i++) {
                let key = localStorage.key(i);
                tmp.push(JSON.parse(localStorage.getItem(key)));
            }
            return {
                ...state,
                items: tmp
            }
        }
        default: {
            return state
        }
    }
}

export const createStore = (reducer) => {
    return {
        reducer,
        state: undefined,
        subscriptions: [],
        subscribe(subscription) {
            this.subscriptions.push(subscription)
        },
        dispatch(action) {
            this.state = this.reducer(this.state, action);
            this.subscriptions.forEach((subscription) => subscription(this.state))
        }
    }
}
export const store = createStore((reducer));


store.dispatch({
    type: ADD_ITEM,
    payload: {img:'src',text:'first'}
})
store.dispatch({
    type: SAVE,
    payload: {img:'src',text:'first'}
})