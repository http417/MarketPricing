import React, {useContext} from 'react';
import {useExchangeData} from './ExchangeFeed.helpers';

export const DataContext = React.createContext()
export const useExchangeDataContext = useContext(DataContext);

// Hooks Advantage: now the component is simple, it just provides the context provider, 
// it doesn't have to worry about how the data is updated; leave that to exchange module where it should be

export default props => <DataContext.Provider value={useExchangeData()} {...props} />;