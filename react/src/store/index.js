import { createStore, applyMiddleware, compose } from 'redux'; // 引入createStore方法
import thunk from 'redux-thunk';
import reducer from './reducer'; // 引入store管理员

//  这句话的意思就是看window里有没有这个方法，有则执行这个方法
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer) // 创建数据仓储
   
export default store;