import {useState} from 'react';
import * as hooks from "./OrderBook.hooks";

export function useExchangeData() {
  const [data, setData] = useState(getNewData());
  const setAutoClearTimeout = hooks.useAutoClearTimeout();

  (function autoUpdateEvery(interval=getDefaultUpdateInterval()) {
    const randomChosenId = Object.keys(data)[Math.floor(Math.random()*10)];
    setAutoClearTimeout(() => setData(getUpdatedDataFor(data, randomChosenId)), interval);
  })();

  return data; 
}

function getDefaultUpdateInterval() {
  //return 2000;
  return Math.random()*2000;
}

function getNewData() {
  return createRandomIds(10).reduce((data, id) => getUpdatedDataFor(data,id), {});

  function createRandomIds(count) {
    return Array.from({length:count}, id => Math.random().toString(36).substring(7));
  }
}

function getUpdatedDataFor(data, id) {
  return {
    ...data,
    [id]: updateItemPrice(data[id])
  };

  function updateItemPrice(itemData) {
    const newPrice = itemData ? makeNewPriceFromOld(itemData.price) : makeNewPriceFromScratch();
    return {
      id,
      price: newPrice,
      yield: newPrice > 0 ? (5 / newPrice * 100) : 0
    };

    function makeNewPriceFromScratch() {
      return  83 + Math.random() * 18;
    }
    
    function makeNewPriceFromOld(price) {
      let multiplier = Math.min(1.25, Math.pow(72/price, 4));
      return Math.max(0,
        price +
        multiplier*(
          Math.random() -
          (price-49)/100 +
          (price > 95
            ? 0.01
            : -Math.pow(multiplier, 3)
          ) +
          (price > 0 && Math.random() > price/101 ? (Math.random()-0.5) * 10 : 0)
        )
      )
    }
  }
}
