import React from "react";
import { getUpdatedFeedData, getNewFeedData } from "./exchangeFeedHelpers";
import { AutoClearingTimeoutComponent } from "./OrderBook.helpers";

export const DataContext = React.createContext();

// Non-Hooks cons: class has additional responsibility of updating the feed rather than just getting feed data

export default class ExchangeDataProvider extends AutoClearingTimeoutComponent {

  state = {
    data: getNewFeedData()
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {  
    this.setTimeout(() => {
      this.setState({
        data: getUpdatedFeedData(this.state.data)
      });
      this.updateData();
  }, this.getDefaultUpdateInterval());
  }

  getDefaultUpdateInterval() {
    //return 2000;
    return Math.random()*2000;
  }

  render() {
    return  (
        <DataContext.Provider value={this.state.data}>
          {this.props.children}
        </DataContext.Provider>
        )
  }
}
