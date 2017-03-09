import React from 'react'
import { simpleApp } from './Api'
import * as Counter from './Counter'
import * as CounterPair from './CounterPair'
import * as HelloWorld from './HelloWorld'

const reducer = {
  counter: Counter.reducer,
  counterPair: CounterPair.reducer,
  helloWorld: HelloWorld.reducer
}

const init = {
  counter: Counter.init(0),
  counterPair: CounterPair.init(0, 0),
  helloWorld: HelloWorld.init([])
}

const view = () =>
  <div>
    <Counter.connectedView />
    <hr />
    <CounterPair.connectedView />
    <hr />
    <HelloWorld.connectedView />
  </div>

const App = simpleApp(init, reducer, view)

export default App
