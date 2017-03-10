import React from 'react'

export const inc = (amount = 1) => ({
    type: 'INC',
    amount
})

export const dec = (amount = 1) => ({
    type: 'DEC',
    amount
})

export const init = (count = 0) => count

export const reducer = (state, action) => {
    switch (action.type) {
        case 'INC':
            return state + action.amount
        case 'DEC':
            return state - action.amount
        default:
            return state
    }
}

export const view = ({model, dispatch}) =>
    <div>
        <button onClick={() => dispatch(inc())}>+</button>
        <span>{model}</span>
        <button onClick={() => dispatch(dec())}>-</button>
    </div>
