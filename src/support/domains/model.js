// imports.
import { get, isObject, assign, mapValues } from 'lodash'
import * as admin from 'firebase-admin'

/**
 * Account class definition.
 */
export class Model {
  /**
   * Abstract Model constructor.
   *
   * @param {Object} data Model data to initialize.
   */
  constructor (data = {}) {
    // assign on the model instance, the values mapper from the model properties.
    assign(this, this.valueMapper(this.getFields(), data))
  }

  /**
   * Firebase collection name.
   * @return {string}
   */
  getCollectionName () {
    return 'generic'
  }

  /**
   * Return firestore collection reference.
   *
   * @return {FirebaseFirestore.CollectionReference}
   */
  getCollection () {
    return admin.firestore().collection(this.getCollectionName())
  }

  /**
   * Primary key / doc reference field.
   *
   * @return {string|number|null}
   */
  getPrimary () {
    return get(this, 'id', null)
  }

  /**
   * Save the current model.
   * @param options
   * @return {Promise<FirebaseFirestore.WriteResult>}
   */
  save (options = { merge: true }) {
    return this.getCollection()
      .doc(this.getPrimary())
      .set(JSON.parse(JSON.stringify(this)), options)
  }

  /**
   * Data fields for the model.
   * @return {Object}
   */
  getFields () {
    return {}
  }

  /**
   * Map a given data model and assign the values recursively.
   *
   * @param {Object} fields    Values on the final model, strange fields will be ignored.
   * @param {Object} data    Values on the final model, strange fields will be ignored.
   *
   * @return {Object}
   */
  valueMapper (fields, data) {
    // map the model values to factory data.
    return mapValues(fields, (defaultValue, fieldName) => {
      // for objects, recurse.
      if (isObject(defaultValue)) {
        // call the value mapper itself using the inner model structure and data.
        return this.valueMapper(defaultValue, get(data, fieldName, defaultValue))
      }
      // case not object, just retrieve the value, defaulting to the model default.
      return get(data, fieldName, defaultValue)
    })
  }
}

// export account class.
export default Model
