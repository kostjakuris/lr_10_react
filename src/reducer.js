import cartItem from "./CartItem";

const reducer = (state, action) => {
    if (action.type === "CLEAR CART") {
        return {...state, cart: []};
    }

    if (action.type === "REMOVE") {
        return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload)
        };
    }

    if (action.type === "INCREASE") {
        let tempCart = state.cart.map((item) => {
            if (item.id === action.payload) {
                return {...item, amount: item.amount + 1};
            }
            return item;
        });
        return {...state, cart: tempCart};
    }

    if (action.type === "DECREASE") {
        let tempCart = state.cart.map((item) => {
            if (item.id === action.payload) {
                return {...item, amount: item.amount - 1};
            }

            if (item.amount === 0) {
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.payload)
                };
            }
            return item;
        });
        return {...state, cart: tempCart};
    }

    if (action.type === "GET_TOTALS") {
        const {
            total,
            amount
        } = state.cart.reduce((cartTotal, cartItem) => {
                cartTotal.total += cartItem.amount * cartItem.price;
                cartTotal.amount += cartItem.amount;
                return cartTotal;
            },
            {total: 0, amount: 0}
        );

        return {...state, total, amount};
    }

    if (action.type === "LOADING") {
        return {...state, loading: true};
    }

    if (action.type === "DISPLAYING_ITEMS") {
        return {...state, cart: action.payload, loading: false};
    }
    return state;
};

export default reducer;