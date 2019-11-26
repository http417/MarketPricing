import React from "react";
import * as S from "./OrderBook.styled";

export function StaticItemRow({delta, itemData}) {
  
  return (
    <S.DataRow delta={delta}>
      <span>
        {itemData.id} (static)
      </span>
      <span>
        {itemData.price} 
      </span> 
      <span>
        {itemData.yield}
      </span>
    </S.DataRow>
  );
}