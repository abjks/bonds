import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton , DropdownButton, MenuItem } from 'react-bootstrap';
import './App.css';
import { BondGraph } from "./BondGraph/BondGraph";
import {fetchBondData} from "./actions";

const _capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

class AppComponent extends PureComponent {
    componentDidMount() {
        const {fetchBondDataDispatch, isin, period, graphType} = this.props;
        fetchBondDataDispatch(isin, period, graphType);
    }

    _setPeriod = (period) => {
        const {fetchBondDataDispatch, isin, graphType} = this.props;
        fetchBondDataDispatch(isin, period, graphType);
    };

    _setGraphType = (type) => {
        const {fetchBondDataDispatch, isin, period} = this.props;
        fetchBondDataDispatch(isin, period, type);
    };

    render() {
        const {coupon, period, graphType} = this.props;

        if (coupon == null) {
            return null;
        }

        const lastTradingYear = new Date(coupon.lastTradingDay).getFullYear();
        const till = new Date(coupon.data[coupon.data.length - 1].date).toLocaleDateString();
        return (
            <div className="App">
                <h2>{coupon.name} {coupon.rate}% {lastTradingYear} {coupon.currency}</h2>
                <p>{coupon.isin}</p>
                <p>{coupon.fullName}, {coupon.industry}, {coupon.rating}, till {till}</p>

                <hr />

                <div>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="period" bsSize="small" value={period} onChange={this._setPeriod}>
                            <ToggleButton value="week">Week</ToggleButton >
                            <ToggleButton value="month">Month</ToggleButton >
                            <ToggleButton value="quarter">Quarter</ToggleButton >
                            <ToggleButton value="year">Year</ToggleButton>
                            <ToggleButton value="max">Max</ToggleButton >
                        </ToggleButtonGroup >

                        <DropdownButton id="type" title={_capitalizeFirstLetter(graphType)} bsSize="small" onSelect={this._setGraphType}>
                            <MenuItem eventKey="yield" active={graphType === "yield"}>Yield</MenuItem>
                            <MenuItem eventKey="spread" active={graphType === "spread"}>Spread</MenuItem>
                            <MenuItem eventKey="price" active={graphType === "price"}>Price</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>

                    <BondGraph data={coupon.data} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => store;
const mapDispatchToProps = dispatch => ({fetchBondDataDispatch: (...args) => dispatch(fetchBondData(...args))});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);