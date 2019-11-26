import React from "react";
import * as hooks from "./OrderBook.hooks";
import * as S from "./OrderBook.styled";
import * as helpers from "./OrderBook.helpers";


export function ItemRow({itemData}) {
  const [delta, setTimedDeltaFn] = hooks.useTimedResetState(0, 1000);
  const onPriceChange = (prevValue, newValue) => {
    const delta = newValue - prevValue;
    if (delta!==0) setTimedDeltaFn(delta);
  }
  hooks.useOnValueChange(itemData.price, onPriceChange);

  const DeltaSpan= ({amount}) => amount 
? (
    <S.DeltaSpan>
      {(delta > 0) ? "\u2191" : "\u2193"} 
      ({helpers.rounded(amount)})
    </S.DeltaSpan>
  ) 
: null;

  return (
    <S.DataRow delta={delta}>
      <span>
        {itemData.id} 
      </span>
      <span>
        {itemData.price} 
        {delta!==0 && <DeltaSpan amount={delta}/>}
      </span> 
      <span>
        {itemData.yield}
      </span>
    </S.DataRow>
  );
}