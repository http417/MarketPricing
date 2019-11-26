import React from "react";
import { HighlightedItemRow } from "./HighlightedItemRow";
import { AutoClearingTimeoutComponent } from "./OrderBook.helpers";

export class DeltaInjector extends AutoClearingTimeoutComponent { 
  state = {
      delta: 0
    };

  shouldComponentUpdate(nextProps, nextState) {
    return ((this.props.itemData.price !== nextProps.itemData.price) ||
    (nextState !== this.state))
  }

  setTemporaryDelta = (amount) => {
    this.setState({delta: amount});
    this.setTimeout(() => this.setState({ delta: 0 }), 300);
  }

  componentDidUpdate(prevProps, prevState) {
    const newPrice = this.props.itemData.price;
    const oldPrice = prevProps.itemData.price;
    const newDelta = newPrice - oldPrice;
    if (newDelta !== 0) this.setTemporaryDelta(newDelta);
  }

  render() {
    const { delta } = this.state;
    const {itemData} = this.props;
    return this.props.children(delta, itemData);
  }
}

export const withDelta = (Component) => ({itemData, ...restProps}) => 
  (
    <DeltaInjector itemData={itemData}>
      {(delta, itemData) => <Component delta={delta} itemData={itemData} {...restProps} />}
    </DeltaInjector>
  );