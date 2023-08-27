import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY, EMPTY_CART } from './actiontypes';

const initialState = {
    cart: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload.product],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload.productId),
            };
        case CHANGE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item) => {
                    if (item._id === action.payload.productId) {
                        return {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                        };
                    }
                    return item;
                }),
            };
        case EMPTY_CART:
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

export default rootReducer;
