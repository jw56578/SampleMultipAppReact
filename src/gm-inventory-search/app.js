import React, {Component,PropTypes} from 'react';
import SearchCriteria from './components/search-criteria';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
  
export default class App extends Component
{
    render(){
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <SearchCriteria />
            </Provider>
        )
    }
}

