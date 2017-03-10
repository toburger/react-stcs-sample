import React from 'react'
import * as Counter from './Counter'

export const init = (first, second) => ({
    first: Counter.init(first),
    second: Counter.init(second)
})

const MODIFY_FIRST = 'MODIFY_FIRST_COUNTER'
const MODIFY_SECOND = 'MODIFY_SECOND_COUNTER'

export const modifyFirst = action => ({
    type: MODIFY_FIRST,
    action
})

export const modifySecond = action => ({
    type: MODIFY_SECOND,
    action
})

export const reducer = (state, action) => {
    switch (action.type) {
        case MODIFY_FIRST:
            return { ...state, first: Counter.reducer(state.first, action.action) }
        case MODIFY_SECOND:
            return { ...state, second: Counter.reducer(state.second, action.action) }
        default:
            return state
    }
}

export const view = ({ model, dispatch }) =>
    <div>
        <Counter.view model={model.first} dispatch={action => dispatch(modifyFirst(action))} />
        <Counter.view model={model.second} dispatch={action => dispatch(modifySecond(action))} />
    </div>
