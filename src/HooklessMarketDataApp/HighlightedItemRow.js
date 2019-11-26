import React from "react";
import * as S from "./OrderBook.styled";
import * as helpers from "./OrderBook.helpers";


const DeltaSpan = ({amount}) => amount 
? (
    <S.DeltaSpan>
      {(amount > 0) ? "\u2191" : "\u2193"} 
      ({helpers.rounded(amount)})
    </S.DeltaSpan>
  ) 
: null;

export function HighlightedItemRow({delta, itemData}) {
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