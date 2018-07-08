import test from 'ava'
import MockAdapter from 'axios-mock-adapter'
import { factory as httpFactory } from '../../src/support/http/client'

test('http/client success', t => {
  const http = httpFactory()
  const mock = new MockAdapter(http)
  mock.onGet('/').reply(200, {
    x: true
  })

  return http.get('/')
    .then(data => {
      t.deepEqual(data, { x: true })
    })
})

test('http/client fail', t => {
  const http = httpFactory()
  const mock = new MockAdapter(http)

  mock.onGet('/').reply(400, {
    x: false
  })

  return http.get('/')
    .then(e => {
      t.fail()
    })
    .catch(({ response }) => {
      t.deepEqual(response.data, { x: false })
    })
})
