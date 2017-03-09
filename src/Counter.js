import React from 'react'
import { connectView } from './Api'
const INC = 'INC'
const DEC = 'DEC'

export const inc = (amount = 1) => ({
    type: INC,
    amount
})

export const dec = (amount = 1) => ({
    type: DEC,
    amount
})

export const init = (count = 0) => count

export const reducer = (state, action) => {
    switch (action.type) {
        case INC:
            return state + action.amount
        case DEC:
            return state - action.amount
        default:
            return state
    }
}

export const view = ({model, dispatch}) =>
    <div>
        <button style={{width: '50px'}} onClick={() => dispatch(inc())}>+</button>
        <span style={{paddingLeft: '50px', paddingRight: '50px'}}>{model}</span>
        <button style={{width: '50px'}} onClick={() => dispatch(dec())}>-</button>
    </div>

export const connectedView = connectView(state => state.counter, view)