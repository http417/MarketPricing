import React from 'react';
import {useExchangeDataContext} from './ExchangeContextProvider';
import * as S from "./OrderBook.styled";
import * as helpers from "./OrderBook.helpers";
import { ItemRow } from "./ItemRow";

function OrderBook() {

  const data = useExchangeDataContext();
  return (
    <S.OrderTable >
      {makeHeaderRow(["Id", "Price", "Yield"])}
      {makeDataRows()}
    </S.OrderTable>
  );

  function makeHeaderRow(columnNames) {
    return (
      <S.HeaderRow>
          {columnNames.map(name => (<span key={name}>{name}</span>))}
      </S.HeaderRow>
    );
  }

  
  function makeDataRows() {
    const enhanceItemWithPriceData = (id) =>
    ({
      id,
      price: helpers.rounded(data[id].price),
      yield: helpers.rounded(data[id].yield)
    });

    const mapItemToItemRow = item => <ItemRow itemData={item} key={item.id} />;

    return Object.keys(data)
      .map(enhanceItemWithPriceData)
      .map(mapItemToItemRow);
  }
}

export default OrderBook;