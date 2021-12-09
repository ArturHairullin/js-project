const initialState = {
    items: []
}

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SAVE = 'SAVE';
const GET = 'GET';

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
            localStorage.clear();
            state.items.forEach((item,index) => {localStorage.setItem(index,item)});
            return state;
        }
        case GET: {
            for (let i=0;i<localStorage.length;i++) {
                let key = localStorage.key(i);
                state.items.push(localStorage.getItem(key));
            }
            return state;
        }
        default: {
            return state
        }
    }
}

const createStore = (reducer) => {
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

const store = createStore((reducer));

//store.subscribe((state) => console.log(state));

store.dispatch({
    type: ADD_ITEM,
    payload: {img:'src',text:'first'}
})
