import React from 'react'
import { simpleApp } from './Api'
import * as Counter from './Counter'
import * as CounterPair from './CounterPair'

const reducer = {
  counter: Counter.reducer,
  counterPair: CounterPair.reducer
}

const init = {
  counter: Counter.init(0),
  counterPair: CounterPair.init(0, 0)
}

const view = () =>
    <div>
        <Counter.connectedView />
        <hr />
        <CounterPair.connectedView />
    </div>

const App = simpleApp(init, reducer, view)

export default App
