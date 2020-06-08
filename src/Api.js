import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect as reduxConnect } from 'react-redux'
import { combineReducers, install, loop, Cmd, isLoop, getCmd, getModel } from 'redux-loop'
import * as R from 'ramda'
import { createLogger } from 'redux-logger'

console.log(Cmd)

export const log = x => {
    console.log(x)
    return x
}

export const init = (inits = []) => {
  const models = R.map(x => isLoop(x) ? getModel(x) : x, inits)
  const effects = R.map(getCmd, R.filter(isLoop, inits))
  return loop(models, Cmd.list(Object.values(effects)))
}

export const connect = (f, C) =>
    reduxConnect(state => ({ model: f(state) }))(C)

const createAppStore = (reducer, initialState) =>
  createStore(combineReducers(reducer), initialState, compose(
    install(),
    applyMiddleware(createLogger({ collapsed: true }))
  ))

const createView = (Component, store) => () =>
  <Provider store={store}>
    <Component />
  </Provider>

export const simpleApp = (init, reducer, view) => {
    const store = createAppStore(reducer, init)
    return createView(view, store)
}
