// import github client.
import { GithubClient } from 'src/support/github/client'
// lodash helpers.
import { get } from 'lodash'

/**
 * Handle Github token validation.
 *
 * @param {{token: String}} data
 * @param context
 * @return {Promise<Object>}
 */
export const handler = (data, context) => {
  // extract token from request body.
  const token = get(data, 'token', null)

  // reject if no token present.
  if (!token) {
    return Promise.reject(new Error('Invalid token provided.'))
  }

  // start a github client instance.
  const client = new GithubClient(token)

  // return the github account data.
  return client.getAccount()
}
