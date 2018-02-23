import axios from "axios";

const FETCH_BOND_DATA = "FETCH_BOND_DATA";
const SET_PARAMS = "SET_PARAMS";

export const actionTypes = {
    FETCH_BOND_DATA, SET_PARAMS
};

const setParams = (period, graphType) => {
    return {
        type: SET_PARAMS,
        period,
        graphType
    };
};

/***
 * Загрузить данные по облигации
 * @param {string} isin - Идентификатор облигации
 * @param {"week", "month", "quarter", "year", "max"}period - период за который нужны данные
 * @param {"yield" | "spread" | "price"} graphType
 */
export const fetchBondData = (isin, period, graphType) => {
    return async dispatch => {
        dispatch(setParams(period, graphType));

        try {
            const response = await axios.get(`/bonds/${isin}/`, {
                params: {period, graphType}
            });

            dispatch({
                type: FETCH_BOND_DATA,
                data: response.data
            });
        } catch (e) {
            if (e.response) {
                console.error({data: e.response.data, status: e.response.status, headers: e.response.headers});
            } else if (e.request) {
                console.error(e.request);
            } else {
                console.error(e);
            }
        }
    };
};