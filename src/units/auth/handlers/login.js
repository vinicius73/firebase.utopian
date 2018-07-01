// imports get helper from lodash.
import { get } from 'lodash'
// import account model class.
import { Account } from 'src/domains/users/account'
// import token verification from steem connect
import { verifyToken as verifySteemConnectToken } from 'src/support/steem/connect/token'
// import user create and update from firebase user helpers.
import { createOrUpdateUser } from 'src/support/firebase/auth/user'
// import the custom token issuer.
import { issueToken } from 'src/support/firebase/auth/token'
// custom http errors.
import { HttpsError } from 'src/support/firebase/functions/handler/errors'

/**
 * Handle steem connect token exchange.
 *
 * @param {{token: String}} data
 * @param context
 * @return {Promise<Object>}
 */
export const handler = (data, context) => {
  // get token from request data.
  const token = get(data, 'token', get(data, 'data.token', ''))

  // when the token is not present or invalid length.
  if (!token || (token.length < 40)) {
    // reject the promise with a custom error.
    return Promise.reject(new Error('invalid_token'))
  }

  // call token verification on steem connect.
  return verifySteemConnectToken(token)
    // factory a user model from the steem connect response data.
    .then((accountData) => new Account(accountData))
    // create or update the user on firebase auth.
    .then(createOrUpdateUser)
    // save the user profile data on firebase.
    .then((account) => account.save().then(() => account))
    // issue a custom authentication token for the frontend.
    .then(issueToken)
    // resolve the issued token on a custom object format.
    .then((customToken) => Promise.resolve({ message: 'SUCCESS', token: customToken }))
    // catch errors, rejecting with a clear message hiding details.
    .catch((e) => { console.log(e); return Promise.reject(new HttpsError('internal', 'Error authenticating with SteemConnect.')) })
}
