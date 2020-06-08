import React from 'react'
import { loop, Cmd } from 'redux-loop'
import * as R from 'ramda'
import * as Http from './Http'

const REQUEST_MORE = 'REQUEST_MORE'
const REQUEST_ERROR = 'REQUEST_ERROR'
const NEW_GIF = 'NEW_GIF'

export const requestMore = () => ({
    type: REQUEST_MORE
})

export const requestError = error => ({
    type: REQUEST_ERROR,
    error
})

export const newGif = url => ({
    type: NEW_GIF,
    url
})

const fetchRandomGif = topic =>
    Http.request.get('http://api.giphy.com/v1/gifs/random')
        .query({
            api_key: 'dc6zaTOxFJmzC',
            tag: topic
        })
        .endAsync()
        .then(res => {
            const url = R.path(['body', 'data', 'image_url'], res)
            return newGif(url)
        })
        .catch(requestError)

export const init = topic =>
    loop({
            topic,
            gifUrl: ''
        },
        Cmd.run(fetchRandomGif, { args: [topic] }))
        //Cmd.none())

export const reducer = (state, action) => {
    switch (action.type) {
        case REQUEST_MORE:
            return loop(state, Cmd.run(fetchRandomGif, { args: [state.topic] }))
        case REQUEST_ERROR:
            return loop(state, Cmd.none)
        case NEW_GIF:
            return loop({
                ...state,
                gifUrl: action.url
            }, Cmd.none)
        default:
            return loop(state, Cmd.none)
    }
}

export const view = ({ model, dispatch }) =>
    <div>
        <img
            alt=""
            src={R.prop('gifUrl', model)}
            style={{width: '200px'}} />
        <button
            onClick={() => dispatch(requestMore())}>More</button>
    </div>
