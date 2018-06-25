// import firebase admin.
import * as admin from 'firebase-admin'

/**
 * Update firebase user account.
 * @param {Account} account
 * @return {Promise<admin.auth.UserRecord>}
 */
export const updateFirebaseUser = (account) => {
  // user data.
  const userData = {
    displayName: account.name,
    photoURL: 'https://img.blocker.press/a/' + account.name
  }

  // update the user, suppressing errors.
  return admin.auth()
    .updateUser(account.getUID(), userData)
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
  // create firebase user data.
  const userData = {
    uid: account.getUID(),
    displayName: account.name,
    photoURL: 'https://img.blocker.press/a/' + account.name
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