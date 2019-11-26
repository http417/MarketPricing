import React from "react";
export function rounded(number) {
  return Math.floor(number * 100)/100;
};

export class AutoClearingTimeoutComponent extends React.Component { 
  setTimeout = (callback, ms) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(callback, ms);
  }

  setAutoClearingTimeout = setTimeout;

  componentWillUnmount(){
    if (this.timeout) clearTimeout(this.timeout);
  }
};
