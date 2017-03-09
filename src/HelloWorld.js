import React from 'react'
import * as Api from './Api'

export const init = () => []

export const reducer = (state, action) => state

export const view = () =>
    <div>hello world</div>

export const connectedView =
    Api.connectView(state => state.helloWorld, view)