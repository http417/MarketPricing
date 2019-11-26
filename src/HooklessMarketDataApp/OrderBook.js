import React from 'react';
import { DataContext } from "./ExchangeContext";
import * as S from "./OrderBook.styled";
import * as helpers from "./OrderBook.helpers";
import { DeltaInjector, withDelta } from "./ItemRowHOC";
import { HighlightedItemRow } from "./HighlightedItemRow";
import { StaticItemRow } from "./StaticItemRow";

class OrderBook extends React.Component {

  static contextType = DataContext;
  render() {
    return (
      <S.OrderTable >
        {this.makeHeaderRow(["Id", "Price", "Yield"])}
        {this.makeDataRows()}
      </S.OrderTable>
    );
  }

   makeHeaderRow = (columnNames) => {
    return (
      <S.HeaderRow>
          {columnNames.map(name => (<span key={name}>{name}</span>))}
      </S.HeaderRow>
    );
  }

  static EnhancedDeltaRow = withDelta(HighlightedItemRow);
  static mapItemToDeltaInfusedRow = item => <OrderBook.EnhancedDeltaRow key={item.id} itemData={item}/>;

  makeDataRows = () => {
    const data = this.context;
    const enhanceItemWithPriceData = (id) =>
    ({
      id,
      price: helpers.rounded(data[id].price),
      yield: helpers.rounded(data[id].yield)
    });
    return Object.keys(data)
      .map(enhanceItemWithPriceData)
      .map(OrderBook.mapItemToDeltaInfusedRow);      
    /*
    const mapToSimpleRow = item => (<StaticItemRow itemData={item} key={item.id}/>);
    const mapToEnhancedRow = item =>  (
      <DeltaInjector itemData={item} key={item.id}>
        {
          (delta, itemData) => <HighlightedItemRow delta={delta} itemData={itemData} />
        }
      </DeltaInjector>
    );*/

  }
}


export default OrderBook;