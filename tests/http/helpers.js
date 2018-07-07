import { factory as baseFactory } from '../../src/support/http/client'

const makeAdapter = responseData => () => Promise.resolve({ data: responseData })
const makeHttpClient = (httpFactory, responseData) => httpFactory({ adapter: makeAdapter(responseData) })
const getHttpClient = responseData => makeHttpClient(baseFactory, responseData)

export { getHttpClient, makeHttpClient, makeAdapter }
