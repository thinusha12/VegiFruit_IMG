import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY, EMPTY_CART } from './actiontypes';

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: {
            product,
        },
    };
};

export const removeFromCart = (productId) => {
    return {

        type: REMOVE_FROM_CART,
        payload: {
            productId,
        },
    };
};

export const changeQuantity = (productId, quantity) => {
    return {
        type: CHANGE_QUANTITY,
        payload: {
            productId,
            quantity
        },
    }
}

export const emptyCart = () => {
    return {
        type: EMPTY_CART,
        payload: {},
    }
}

