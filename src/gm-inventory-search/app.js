import all from  "babel-polyfill";
import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import SearchCriteria,{externalSearch} from './components/search-criteria';
import SearchResult from './components/search-results';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import {initialize} from '../services/authentication';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
  
class App extends Component
{
    render(){
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <div>
                    <SearchCriteria />
                    <SearchResult />
                </div>
            </Provider>
        )
    }
}

window.gmInventorySearch = App;
window.React = React;
window.ReactDOM = ReactDOM;
window.searchGM = externalSearch;
window.authenticateGM = initialize;

export default App;
