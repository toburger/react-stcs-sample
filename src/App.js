import React from 'react'
import { simpleApp } from './Api'
import * as Counter from './Counter'
import * as CounterPair from './CounterPair'
import * as CounterList from './CounterList'
import * as RandomGif from './RandomGif'
import * as RandomGifPair from './RandomGifPair'
import * as RandomGifList from './RandomGifList'
import { loop, Effects } from 'redux-loop'

const [randomGifModel, randomGifEffect] = RandomGif.init('cat')
const [randomGifPairModel, randomGifPairEffect] = RandomGifPair.init('cat', 'dog')
const [randomGifListModel, randomGifListEffect] = RandomGifList.init(['cat', 'dog'])

const init = loop({
  counter: Counter.init(0),
  counterPair: CounterPair.init(0, 0),
  counterList: CounterList.init([0, 0, 0]),
  randomGif: randomGifModel,
  randomGifTuple: randomGifPairModel,
  randomGifList: randomGifListModel
}, Effects.batch([
  randomGifEffect,
  randomGifPairEffect,
  randomGifListEffect
]))

const reducer = {
  counter: Counter.reducer,
  counterPair: CounterPair.reducer,
  counterList: CounterList.reducer,
  randomGif: RandomGif.reducer,
  randomGifTuple: RandomGifPair.reducer,
  randomGifList: RandomGifList.reducer
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
    <hr />
    <RandomGifPair.connectedView />
    <hr />
    <RandomGifList.connectedView />
  </div>

const App = simpleApp(init, reducer, view)

export default App
