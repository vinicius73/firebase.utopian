// import helpers.
import { get } from 'lodash'
// import base model to extend.
import { Model } from 'src/support/domains/model'

/**
 * Model class definition.
 */
export class Contribution extends Model {
  /**
   * Model constructor.
   *
   * @param data
   */
  constructor (data = {}) {
    // call parent constructor.
    super(data)
  }

  /**
   * Primary key / document reference value.
   *
   * @return {string|number|null}
   */
  getPrimary () {
    return get(this, 'id', null)
  }

  /**
   * Collection name.
   *
   * @return {string}
   */
  getCollectionName () {
    return 'contributions'
  }

  /**
   * Model fields.
   *
   * @return {Object}
   */
  getFields () {
    return {
      id: null, // auto generated id.
      title: null, // human title for the contribution.
      author: null, // steem author id.
      permlink: null, // steem permlink / slug.
      account: null, // internal account id reference.
      markdown: null, // markdown body.
      beneficiaryPercent: 0.15, // value of the beneficiary reward percent for utopian.
      tags: [], // list of tags on the contribution.
      createdAt: null, // create date.
      updatedAt: null, // update date.
      deletedAt: null // delete date (soft deletes, keep the record but hidden).
    }
  }
}

// default export for the model class.
export default Contribution
