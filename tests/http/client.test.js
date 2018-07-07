import test from 'ava'
import { getHttpClient } from './helpers'

test('http/client ', t => {
  const http = getHttpClient({ x: true })
  return http.get('/')
    .then(data => {
      t.deepEqual(data, { x: true })
    })
})
