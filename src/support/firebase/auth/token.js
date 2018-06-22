// import firebase admin.
import * as admin from 'firebase-admin'

/**
 * Issue authentication token.
 *
 * @param account
 * @return {Promise<string>}
 */
export const issueToken = (account) => {
  // generate a steem prefixed uuid.
  const uid = 'steem:' + account.id
  // create a custom token and return.
  return admin.auth().createCustomToken(uid)
}