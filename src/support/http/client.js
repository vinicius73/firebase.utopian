// imports.
import { get, defaultsDeep } from 'lodash'
// import axios
import axios from 'axios'
// node http and https agents.
import { Agent } from 'https'

// flatten success responses body.
const flattenSuccess = response => get(response, 'data', {})
// flatten error responses body.
const flattenError = error => Promise.reject(error)

/**
 * @method factoryInstance
 * @param  {Object}        [args={}]
 * @return {AxiosInstance}
 */
const factoryInstance = (args = {}) => {
  // create a new http agent instance with keep-alive enabled.
  const httpAgent = new Agent({ keepAlive: true })
  // axios options.
  const options = defaultsDeep({}, args, { httpAgent, httpsAgent: httpAgent })

  // create an axios instance.
  const instance = axios.create(options)

  // enable success and error interceptors.
  instance.interceptors.response.use(flattenSuccess, flattenError)

  // set application/json as the default content-type header.
  instance.defaults.headers.post['Content-Type'] = 'application/json'

  return instance
}

const instance = factoryInstance()

// named export.
/** @type {AxiosInstance} */
export const http = instance

/** @type {Function: AxiosInstance} */
export const factory = factoryInstance

// default export.
/** @type {AxiosInstance} */
export default instance
