import React from 'react'
import * as RandomGif from './RandomGif'
import { loop, Cmd } from 'redux-loop'
import { v4 as uuid } from 'uuid'

const MODIFY = 'MODIFY_RANDOMGIFLIST'

export const modify = (id, action) => ({
    type: MODIFY,
    id,
    action
})

export const init = (xs = []) => {
    const inits = xs.map(RandomGif.init).map(([m, e]) => [uuid(), [m, e]])
    const models = inits.map(([id, [x]]) => [id, x])
    const effects = inits.map(([id,[,x]]) => [id, x])
    return loop(
        models,
        Cmd.list(effects.map(([id,e]) =>
            Cmd.map(e, modify, id))))
}

export const reducer = (state, action) => {
    switch (action.type) {
        case MODIFY:
            const gifLoopList = state.map(([id, topic]) => {
                if (id !== action.id) {
                    return loop([id, topic], Cmd.none)
                }
                const [model, effect] = RandomGif.reducer(topic, action.action)
                return loop([id, model], Cmd.map(effect, modify, id))
            })
            return loop(
                gifLoopList.map(([x]) => x),
                Cmd.list(gifLoopList.map(([,x]) => x)))
        default:
            return loop(state, Cmd.none)
    }
}

export const view = ({ model, dispatch }) =>
    <div>
        {model.map(([id, topic]) =>
            <RandomGif.view
                model={topic}
                dispatch={action => dispatch(modify(id, action))}
                key={id} />)}
    </div>
