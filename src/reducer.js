import {actionTypes} from './actions';

const initialState = {
    period: "month",
    graphType: "price",
    coupon: null
};

export const bondReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PARAMS:
            return {...state, period: action.period, graphType: action.graphType};
        case actionTypes.FETCH_BOND_DATA:
            return {...state, coupon: action.data};
        default:
            return state;
    }
};