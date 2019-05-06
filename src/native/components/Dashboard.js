/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';
import {
  View, Segment, Picker, Form, Container, Content, H1, H2, H3,
  Header, List, ListItem, Button, Left, Body, Right, Thumbnail,
  Text, Icon, Switch, Spinner, Separator, Tab, Tabs, ScrollableTab,
} from 'native-base';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// import TabOne from './TabOne';
// import TabTwo from './TabTwo';
// import Head from '../app/Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import Spacer from './Spacer';
import styles from './style.js';

import { getTransactions, getBalance } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';

global.lastDate = 'date';
global.pieDictionaryData = new Object();
global.data2 = [
  {
    name: 'Food/Drink', amount: 7134.37, color: '#393e46', legendFontColor: '#393e46', legendFontSize: 12,
  },
  {
    name: 'Payment', amount: 47721, color: '#085f63', legendFontColor: '#085f63', legendFontSize: 12,
  },
  {
    name: 'Recreation', amount: 471, color: '#ffb677', legendFontColor: '#ffb677', legendFontSize: 12,
  },
  {
    name: 'Shops', amount: 3500, color: '#5e0a0a', legendFontColor: '#5e0a0a', legendFontSize: 12,
  },
  {
    name: 'Transfer', amount: 5974.68, color: '#145374', legendFontColor: '#145374', legendFontSize: 12,
  },
  {
    name: 'Travel', amount: 576.71, color: '#616f39', legendFontColor: '#616f39', legendFontSize: 12,
  },

];
const data = [, , 0.27];

const screenWidth = Dimensions.get('window').width;


class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    member: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    match: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      entryItems: [
        {
          title: 'Item 1',
          balance: 0,
        },
        {
          title: 'Item 2',
        },
        {
          title: 'Item 3',
        },
      ],
      selected: 'key1',
      transactions: {},
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }

  componentWillMount() {
    const { member } = this.props;
    // getUserData(member);
    // console.log('dispatched member');
    // if (!member.bankSet) {
    //   Actions.replace('linkBank');
    // }
    // console.log('Trying to get member');
    // const { member } = this.props;
    // console.log(member);
    // getUserData(member.token);
  }

  componentDidMount = () => {
    const { member } = this.props;
    getUserData(member);
    console.log('dispatched member');
    if (!member.bankSet) {
      Actions.replace('linkBank');
    }

    getTransactions(member.token,
      (res) => {
        this.setState({ transactions: res });
        const { transactions } = this.state;
        console.log("Got transactions");
        console.log(member)
      });

    getBalance(member.token,
      (res) => {
        console.log('reached balance update')
        const entryItems = this.state.entryItems.slice() //copy the array
        entryItems[0].balance = res; //execute the manipulations
        this.setState({ entryItems })
        console.log(this.state.entryItems);
      }
    );
  }

  renderJSXAmount(transactionAmount) {
    if (transactionAmount <= 0) {
      return (
        <Text style={styles.redTransactionText}>
$
          {transactionAmount}
        </Text>
      );
    }
    return (
      <Text style={styles.greenTransactionText}>
$
        {transactionAmount}
      </Text>
    );
  }

  formatDate(transactionDate) {
    const month = new Array();
    month[1] = 'January';
    month[2] = 'February';
    month[3] = 'March';
    month[4] = 'April';
    month[5] = 'May';
    month[6] = 'June';
    month[7] = 'July';
    month[8] = 'August';
    month[9] = 'September';
    month[10] = 'October';
    month[11] = 'November';
    month[12] = 'December';
    const splitDate = String(transactionDate).split('-');
    return `${month[splitDate[1].replace(/^0+/, '')]} ${splitDate[2]}`;
  }

  renderJSXDividers(transactionDate) {
    if (transactionDate != global.lastDate) {
      global.lastDate = transactionDate;
      return (
        <ListItem style={styles.listDividerBackgroundColor} itemDivider>
          <Text style={styles.listDividerText}>{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
  }

  renderJSXPieChartData(transactions) {
    for (x in transactions) {
      if (transactions[x].category[0] in global.pieDictionaryData) {
        global.pieDictionaryData[transactions[x].category[0]] = global.pieDictionaryData[transactions[x].category[0]] + transactions[x].amount;
      } else {
        global.pieDictionaryData[transactions[x].category[0]] = transactions[x].amount;
      }
    }
    console.log(pieDictionaryData);
    // Object.entries(global.pieDictionaryData).forEach(([key, value]) => {
    //   var pieChartObject = new Object();
    //   pieChartObject.amount = value.toFixed(2);
    //   pieChartObject.color = 'rgba(131, 167, 234, 1)';
    //   pieChartObject.legendFontColor = '#7F7F7F';
    //   pieChartObject.legendFontSize = 15;
    //   pieChartObject.name = key;
    //   global.data2.push(pieChartObject);
    // });
  }

  _renderItem = ({ item, index }) => {
    const { member } = this.props;
    let { balance } = this.state;

    // console.log(item);
    if (index == 0) {

      if (!member.active){
        console.log('this is balance');
        console.log(member.active);
          return (
            <View style={styles.slide}>
              <View>
                <Text style={styles.name}>
                  Hello {member.firstname},
                </Text>
                <View style={styles.spacer}>
                </View>
                <Text style={styles.balance}>
                  ${item.balance.toFixed(2)}
                </Text>
                <Text style={styles.balanceTitle}>
                  Current Bank Balance
                </Text>
                <View style={styles.spacer}>
                </View>
                <Text style={styles.nonActiveText}>
                  [Name] helps you stay on top of your bills and keep your account positive. Borrow $250 now and pay us back interest-free automatically next paycheck.
                </Text>
                <View style={{ display: 'flex', height: 1, justifyContent: 'start', alignItems: 'center'}} >
                <Image width={scale(130)} style={{opacity: 0.6}} source={require('../../images/monyCircle.png')} />
                </View>
              </View>
            </View>
          );
      }


    } if (index == 1) {
      // return (
      //   <View style={styles.slide}>
      //     <PieChart
      //       data={global.data2}
      //       width={screenWidth}
      //       height={220}
      //       chartConfig={{
      //         backgroundColor: '#eae9ef',
      //         backgroundGradientFrom: '#eae9ef',
      //         backgroundGradientTo: '#eae9ef',
      //         decimalPlaces: 2, // optional, defaults to 2dp
      //         color: (opacity = 1) => `rgba(46,139,87, ${opacity})`,
      //         style: {
      //           borderRadius: 16,
      //         },
      //       }}
      //       accessor="amount"
      //       backgroundColor="transparent"
      //       paddingLeft="15"
      //       absolute
      //     />
      //   </View>
      // );
      return (
        <View style={styles.slide}>
          <View style={styles.name}>
            <Text>
              Hello {member.firstname}
            </Text>
          </View>
        </View>
      );
    }
    // return (
    //   <View style={styles.slide}>
    //     <LineChart
    //       data={{
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //         datasets: [{
    //           data: [
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //           ],
    //           color: (opacity = 1) => `rgba(255,255,255, ${opacity})`, // optional
    //           // strokeWidth: 5 // optional
    //           // strokeWidth = 2;
    //         }],
    //       }}
    //       width={Dimensions.get('window').width} // from react-native
    //       height={220}
    //       yAxisLabel="$"
    //       chartConfig={{
    //         backgroundColor: '#e20071',
    //         backgroundGradientFrom: '#11267a',
    //         backgroundGradientTo: '#253d93',
    //         decimalPlaces: 2, // optional, defaults to 2dp
    //         color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
    //         style: {
    //           borderRadius: 16,
    //         },
    //       }}
    //       bezier
    //       style={{
    //         marginVertical: 8,
    //         borderRadius: 16,
    //       }}
    //     />
    //   </View>
    // );
    return (
      <View style={styles.slide}>
        <View style={styles.name}>
          <Text>
            Hello {member.firstname}
          </Text>
        </View>
      </View>
    );
  }

  render = () => {
    const transactions = this.state.transactions.transactions;
    let transactionsListItems = [];
    { this.renderJSXPieChartData(transactions); }
    if (transactions) {
      transactionsListItems = // console.log(transaction);
                              transactions.map(transaction => (
                                <View key={JSON.stringify(transaction)}>
                                  { this.renderJSXDividers(transaction.date) }
                                  <ListItem style={styles.ListItemStyling} avatar>
                                    <Left style={styles.ListItemStyling}>
                                      <Thumbnail small square source={{ uri: transaction.uri }} />
                                    </Left>
                                    <Body style={styles.ListItemStyling}>
                                      <Text style={styles.TransactionText}>{transaction.name}</Text>
                                      <Text style={styles.LeftNoteText} note>{transaction.category[0]}</Text>
                                    </Body>
                                    <Right style={styles.RightNoteText}>
                                      { this.renderJSXAmount(transaction.amount) }
                                    </Right>
                                  </ListItem>
                                </View>
                              ));
    } else {
      transactionsListItems = (
        <ListItem>
          <Text>No transactions</Text>
        </ListItem>
      );
    }
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entryItems}
          renderItem={this._renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          height={verticalScale(50)}
          marginTop={20}
        />
        <Content style={{ flex: 1 }}>
          <Text>
            {this.state.balance}
          </Text>
          <List style={{ flex: 1 }}>
            {transactionsListItems}
          </List>
        </Content>
        <FooterBar/>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Dashboard);