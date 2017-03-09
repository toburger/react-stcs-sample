import React from 'react'
import { simpleApp } from './Api'
import * as Counter from './Counter'
import * as CounterPair from './CounterPair'
import * as CounterList from './CounterList'
import * as RandomGif from './RandomGif'
import { loop, Effects } from 'redux-loop'

const [randomGifModel, randomGifEffect] = RandomGif.init('cat')

const init = loop({
  counter: Counter.init(0),
  counterPair: CounterPair.init(0, 0),
  counterList: CounterList.init([0, 0, 0]),
  randomGif: randomGifModel
}, Effects.batch([randomGifEffect]))

const reducer = {
  counter: Counter.reducer,
  counterPair: CounterPair.reducer,
  counterList: CounterList.reducer,
  randomGif: RandomGif.reducer
}

const view = () =>
  <div>
    <Counter.connectedView />
    <hr />
    <CounterPair.connectedView />
    <hr />
    <CounterList.connectedView />
    <hr />
    <RandomGif.connectedView />
  </div>

const App = simpleApp(init, reducer, view)

export default App
