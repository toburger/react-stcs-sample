import React from 'react'
import { loop, getModel, getEffect, Effects } from 'redux-loop'
import * as Api from './Api'
import * as RandomGif from './RandomGif'

const MODIFY_LEFT = 'MODIFY_LEFT_RANDOMGIFTUPLE'
const MODIFY_RIGHT = 'MODIFY_RIGHT_RANDOMGIFTUPLE'

const modifyLeft = (action) => ({
    type: MODIFY_LEFT,
    action
})

const modifyRight = (action) => ({
    type: MODIFY_RIGHT,
    action
})

export const init = (topic1, topic2) => {
    const leftRandomGif = RandomGif.init(topic1)
    const rightRandomGif = RandomGif.init(topic2)
    return loop({
        leftRandomGif: getModel(leftRandomGif),
        rightRandomGif: getModel(rightRandomGif)
    }, Effects.batch([
        Effects.lift(getEffect(leftRandomGif), modifyLeft),
        Effects.lift(getEffect(rightRandomGif), modifyRight)
    ]))
}

export const reducer = (state, action) => {
    switch (action.type) {
        case MODIFY_LEFT:
            const leftModel = RandomGif.reducer(state.leftRandomGif, action.action)
            return loop({
                ...state,
                leftRandomGif: getModel(leftModel)
            }, Effects.lift(getEffect(leftModel), modifyLeft))
        case MODIFY_RIGHT:
            const rightModel = RandomGif.reducer(state.rightRandomGif, action.action)
            return loop({
                ...state,
                rightRandomGif: getModel(rightModel)
            }, Effects.lift(getEffect(rightModel), modifyRight))
        default:
            return loop(state, Effects.none())
    }
}

export const view = ({ model, dispatch }) =>
    <div>
        <RandomGif.view model={model.leftRandomGif} dispatch={action => dispatch(modifyLeft(action))} />
        <RandomGif.view model={model.rightRandomGif} dispatch={action => dispatch(modifyRight(action))} />
    </div>

export const connectedView =
    Api.connectView(state => state.randomGifPair, view)