import React from 'react'
import * as Api from './Api'
import * as Counter from './Counter'
import * as CounterPair from './CounterPair'
import * as CounterList from './CounterList'
import * as RandomGif from './RandomGif'
import * as RandomGifPair from './RandomGifPair'
import * as RandomGifList from './RandomGifList'

const init = Api.init({
  counter: Counter.init(0),
  counterPair: CounterPair.init(0, 0),
  counterList: CounterList.init([0, 0, 0]),
  randomGif: RandomGif.init('cat'),
  randomGifPair: RandomGifPair.init('cat', 'dog'),
  randomGifList: RandomGifList.init(['cat', 'dog', 'mouse'])
})

const reducer = {
  counter: Counter.reducer,
  counterPair: CounterPair.reducer,
  counterList: CounterList.reducer,
  randomGif: RandomGif.reducer,
  randomGifPair: RandomGifPair.reducer,
  randomGifList: RandomGifList.reducer
}

const C = {
  counter: Api.connect(state => state.counter, Counter.view),
  counterPair: Api.connect(state => state.counterPair, CounterPair.view),
  counterList: Api.connect(state => state.counterList, CounterList.view),
  randomGif: Api.connect(state => state.randomGif, RandomGif.view),
  randomGifPair: Api.connect(state => state.randomGifPair, RandomGifPair.view),
  randomGifList: Api.connect(state => state.randomGifList, RandomGifList.view)
}

const view = () =>
  <div>
    <C.counter />
    <hr />
    <C.counterPair />
    <hr />
    <C.counterList />
    <hr />
    <C.randomGif />
    <hr />
    <C.randomGifPair />
    <hr />
    <C.randomGifList />
  </div>

const App = Api.simpleApp(init, reducer, view)

export default App
