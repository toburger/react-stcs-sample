import React from 'react'
import * as Counter from './Counter'
import * as Api from './Api'
import uuid from 'uuid'

const ADD = 'ADD_LIST'
const REMOVE = 'REMOVE_LIST'
const MODIFY = 'MODIFY_LIST'

export const add = () => ({
    type: ADD
})

export const remove = (id) => ({
    type: REMOVE,
    id
})

export const modify = (id, action) => ({
    type: MODIFY,
    id,
    action
})

export const init = (amounts = []) =>
    amounts.map(a => [uuid(), a])

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return [...state, [uuid(), 0]]
        case REMOVE:
            return state.filter(([id, _]) => id !== action.id)
        case MODIFY:
            return state.map(([id, value]) =>
                id === action.id ?
                    [id, Counter.reducer(value, action.action)] :
                    [id, value])
        default:
            return state
    }
}

export const view = ({ model, dispatch }) =>
    <div>
        {model.map(([id, model]) =>
            <div key={id}>
                <button
                    style={{float: 'right'}}
                    onClick={() => dispatch(remove(id))}>
                    Remove
                </button>
                <Counter.view
                    model={model}
                    dispatch={action => dispatch(modify(id, action))} />
            </div>)
        }
        <hr />
        <button onClick={() => dispatch(add())}>Add</button>
    </div>

export const connectedView =
    Api.connectView(state => state.counterList, view)