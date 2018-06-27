// import helpers.
import { get } from 'lodash'
// import base model to extend.
import { Model } from 'src/support/domains/model'

/**
 * Custom profile account parsing.
 *
 * @param data
 *
 * @return {any | any | undefined | any | {} | {} | undefined}
 */
const factoryProfile = (data) => {
  // extract meta information.
  const meta = JSON.parse(get(data, 'json_metadata', '{}'))
  // extract profile from meta.
  const profile = get(meta, 'profile', {})
  // assign avatar field on the profile.
  profile.avatar = get(profile, 'profile_image')
  // return the prepared object.
  return profile
}

/**
 * Account class definition.
 */
export class Account extends Model {
  /**
   * Account constructor.
   *
   * @param data
   */
  constructor (data = {}) {
    // prepare profile data.
    data.profile = factoryProfile(data)
    // call parent constructor.
    super(data)
  }

  /**
   * Account name getter.
   *
   * @return {string|null}
   */
  getAccountName () {
    return get(this, 'name')
  }

  /**
   * Account UID getter.
   *
   * @return {string|null}
   */
  getUID () {
    return this.getAccountName() ? `steem:${this.getAccountName()}` : null
  }

  /**
   * Primary key / document reference value.
   *
   * @return {string|number|null}
   */
  getPrimary () {
    return get(this, 'name', null)
  }

  /**
   * Collection name.
   *
   * @return {string}
   */
  getCollectionName () {
    return 'accounts'
  }

  /**
   * Model fields.
   *
   * @return {Object}
   */
  getFields () {
    return {
      id: null,
      name: null,
      profile: {
        avatar: null,
        name: null,
        location: null,
        website: null,
        about: null,
        signature: null
      },
      createdAt: null, // create date.
      updatedAt: null, // update date.
      deletedAt: null // delete date (soft deletes, keep the record but hidden).
    }
  }
}

// export account class.
export default Account
