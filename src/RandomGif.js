import React from 'react'
import {loop, Effects} from 'redux-loop'
import R from 'ramda'
import superagent from 'superagent'
import Promise from 'bluebird'

const REQUEST_MORE = 'REQUEST_MORE'
const REQUEST_ERROR = 'REQUEST_ERROR'
const NEW_GIF = 'NEW_GIF'

const request = Promise.promisifyAll(superagent)

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
    request.get('http://api.giphy.com/v1/gifs/random')
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
        Effects.promise(fetchRandomGif, topic))
        //Effects.none())

export const reducer = (state, action) => {
    switch (action.type) {
        case REQUEST_MORE:
            return loop(state, Effects.promise(fetchRandomGif, state.topic))
        case REQUEST_ERROR:
            return loop(state, Effects.none())
        case NEW_GIF:
            return loop({
                ...state,
                gifUrl: action.url
            }, Effects.none())
        default:
            return loop(state, Effects.none())
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
