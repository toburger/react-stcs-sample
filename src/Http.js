import superagent from 'superagent'
import Promise from 'bluebird'

export const request = Promise.promisifyAll(superagent)

