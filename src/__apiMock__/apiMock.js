import axios from "axios";
import * as faker from "faker";
import { DateTime } from "luxon";

const AxiosMockAdapter = require("axios-mock-adapter");

const mock = new AxiosMockAdapter(axios);

function getDates(startDate, endDate) {
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = currentDate.plus({day: 1});
    }
    return dateArray;
}

/***
 * Получить произвольную задержку ответа api
 */
function getRandomDelay() {
    return faker.random.number({min: 100, max: 200});
}

function getRandomPrice() {
    return faker.random.number({min: 2, max: 200});
}

function getBondInfo(startDate, endDate) {
    return new Promise(function(resolve, reject) {
        const dates = getDates(startDate, endDate);
        const data = dates.map(date => ({date: date.toISO(), price: getRandomPrice()}));

        setTimeout(function () {
            const response = {
                name: "NII CAPITAL",
                fullName: "NII CAPITAL CORP",
                currency: "USD",
                rate: "7.625",
                lastTradingDay: "01.04.2021",
                isin: "US67021BAE92",
                industry: "Telecommunications",
                rating: "NR",
                data
            };
            resolve([200, response]);
        }, getRandomDelay());
    });
}

const periodFunctions = {
    quarter: () => {
        const endDate = DateTime.local();
        const startDate = endDate.minus({month: 3});

        return {startDate, endDate};
    },

    month: () => {
        const endDate = DateTime.local();
        const startDate = endDate.minus({month: 1});

        return {startDate, endDate};
    },

    week: () => {
        const endDate = DateTime.local();
        const startDate = endDate.minus({week: 1});

        return {startDate, endDate};
    },

    year: () => {
        const endDate = DateTime.local();
        const startDate = endDate.minus({year: 1});

        return {startDate, endDate};
    },

    max: () => {
        const endDate = DateTime.local();
        const startDate = endDate.minus({year: 3});

        return {startDate, endDate};
    }
};

mock.onGet(/\/bonds\/\w+/).reply(function(config) {
    const {startDate, endDate} = periodFunctions[config.params.period]();
    return getBondInfo(startDate, endDate);
});