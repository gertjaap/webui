/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core//Grid'
import BalanceCard from './BalanceCard';
import PaymentHistoryCard from './PaymentHistoryCard';
import {pathAddress} from './PaymentHistoryCard';
import BalanceReceiveDialog from './BalanceReceiveDialog';
import BalanceSendDialog from './BalanceSendDialog';
import ExchangeDialog from './ExchangeDialog';

const styles = theme => ({
  root: {},
  balances: {},
  payments: {
    marginTop: theme.spacing.unit,
    paddingBottom: 80,
  },
  buttons: {
    position: 'fixed',
    width: '100vw',
    bottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-around',
  },
});



class Balances extends React.Component {

  render() {
    const {classes} = this.props;
    let balances = this.props.balances.map((balance, index) => {
      return (
        <Grid item xs={12} key={index} className={classes.cardBox}>
          <BalanceCard
            balance={balance}
            handleSendSubmit={this.props.handleSendSubmit}
          />
        </Grid>
      );
    });

    let payments = [];
    this.props.payments.forEach((payment) => {

      if (!payment.Succeeded ||
        (payment.Amt === 0 && pathAddress(payment.Path[0]) === this.props.receiveAddress)) {
        return;
      }

      payments.push(
        <Grid item xs={12} key={JSON.stringify(payment)}>
          <PaymentHistoryCard
            payment = {payment}
            divider={payments.length > 0}
          />
        </Grid>
      );
    });

    return (
      <div className={classes.root}>
        <Grid container className={classes.balances}>
          {balances}
        </Grid>
        <Grid container className={classes.payments}>
          {payments}
        </Grid>
        <div className={classes.buttons}>
          <BalanceSendDialog
            balances={this.props.balances}
            handleSendSubmit={this.props.handleSendSubmit}
          />
          <BalanceReceiveDialog
            address={this.props.receiveAddress}
          />
          <ExchangeDialog
            address={this.props.receiveAddress}
            balances={this.props.balances}
            handleSendSubmit={this.props.handleSendSubmit}
          />
        </div>
      </div>
    );
  }
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
  receiveAddress: PropTypes.string.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
};


export default withStyles(styles)(Balances);
