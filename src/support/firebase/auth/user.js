// import firebase admin.
import * as admin from 'firebase-admin'

/**
 * Update firebase user account.
 * @param {Account} account
 * @return {Promise<admin.auth.UserRecord>}
 */
export const updateFirebaseUser = (account) => {
  // make steem prefixed uuid.
  const uid = 'steem:' + account.id

  // user data.
  const userData = {
    displayName: account.name
    // photoURL: account.profile.avatar
  }

  // update the user, suppressing errors.
  return admin.auth()
    .updateUser(uid, userData)
    .then(() => account)
    .catch()
}

/**
 * Create firebase user account.
 *
 * @param {Account} account
 * @return {Promise<admin.auth.UserRecord>}
 */
export const createFirebaseUser = (account) => {
  // make steem prefixed uuid.
  const uid = 'steem:' + account.id

  // create firebase user data.
  const userData = {
    uid: uid,
    displayName: account.name
  }

  // create the user.
  return admin.auth().createUser(userData).then(() => account)
}

/**
 * Create or update the user on Firestore.
 *
 * @returns {Promise<string>} Promise, that when completed, gives the custom authentication token.
 */
export const createOrUpdateUser = (account) => {
  return updateFirebaseUser(account)
    .then(() => account)
    .catch((error) => {
      // create if not.
      if (error.code === 'auth/user-not-found') {
        return createFirebaseUser(account)
      }
      // throw if needed.
      throw error
    })
}