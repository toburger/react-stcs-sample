import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { combineReducers, install } from 'redux-loop'
import createLogger from 'redux-logger'

export const log = x => {
    console.log(x)
    return x
}

export const connectView = (f, C) =>
    connect(state => ({ model: f(state) }))(C)

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
