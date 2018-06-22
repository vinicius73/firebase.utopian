// import base express setup.
import app from './app'

// import firebase functions.
import * as functions from 'firebase-functions'

// export the api entry point for firebase cloud functions.
exports.api = functions.https.onRequest(app)
