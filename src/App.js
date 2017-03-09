import React from 'react'
import { simpleApp } from './Api'
import * as Counter from './Counter'
import * as CounterPair from './CounterPair'
import * as CounterList from './CounterList'

const init = {
  counter: Counter.init(0),
  counterPair: CounterPair.init(0, 0),
  counterList: CounterList.init([0, 0, 0])
}

const reducer = {
  counter: Counter.reducer,
  counterPair: CounterPair.reducer,
  counterList: CounterList.reducer
}

const view = () =>
  <div>
    <Counter.connectedView />
    <hr />
    <CounterPair.connectedView />
    <hr />
    <CounterList.connectedView />
  </div>

const App = simpleApp(init, reducer, view)

export default App
