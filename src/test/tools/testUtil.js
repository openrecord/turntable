const assert = require('assert')
const _ = require('lodash')
const td = require('testdouble')

const db = require('../../app/services/database')
const util = require('../../app/util/util')

async function closeDb() {
  await db.close()
}

/**
 * Deeply compare two objects or arrays of objects. The objects may be VOs or normal objects. The "expected" object may have functions as values,
 * which will be evaluated during the deep comparison. When strict mode is enabled (defaults to true), the expected object(s) must have all keys found in the actual object(s).
 * @param actual
 * @param expected
 * @param {boolean} [strict=true] - Require that the expected object has all paths the actual object has.
 */
function deepCompare(actual, expected, strict = true) {
  actual = _.cloneDeep(actual)
  expected = _.cloneDeep(expected)

  try {
    util.deepWalk(expected, (expectedVal, path) => {
      const actualVal = _.get(actual, path)
      if (_.isFunction(expectedVal)) {
        assert.ok(
          expectedVal(actualVal),
          `Comparing ${path} [${actualVal}] using function${expectedVal.name ? ' ' + expectedVal.name : ''}`
        )
      } else if (_.isRegExp(expectedVal)) {
        assert.ok(expectedVal.test(actualVal || ''), `RegExp ${expectedVal} not satisfied: ${actualVal}`)
      } else if (_.isObject(expectedVal) && !_.isDate(expectedVal)) {
        deepCompare(actualVal, expectedVal, strict)
      } else {
        assert.deepEqual(actualVal, expectedVal, `Comparing ${path}, expected [${expectedVal}] but received [${actualVal}].`)
      }
    })

    if (strict) {
      util.deepWalk(actual, (val, path) => {
        assert.ok(_.hasIn(expected, path), `Actual value has extra path: ${path}`)
      })
    }
  } catch (assertionErr) {
    // Optional: Do some error manipulation here.
    throw assertionErr
  }

  return true
}

/**
 * testdouble matcher for deepCompare(). For use in testdouble verify().
 */
const deepMatch = td.matchers.create({
  name: 'deepMatch',
  matches: (matcherArgs, actual) => {
    const expected = matcherArgs[0]
    return deepCompare(actual, expected)
  }
})

/**
 * Generates a simple request for end-to-end tests.
 */
const req = (method, url, payload = undefined, headers = undefined) => ({
  method,
  url,
  payload,
  headers
})

const expectResponse = (actualResponse, expectedCode, expectedPayload, expectedHeaders) => {
  expect(actualResponse).toBeInstanceOf(Object)
  expect(actualResponse.statusCode).toBe(expectedCode)
  deepCompare(JSON.parse(actualResponse.payload), expectedPayload, false)
  if (expectedHeaders) {
    deepCompare(actualResponse.headers, expectedHeaders, false)
  }
}

module.exports = {
  closeDb,
  deepCompare,
  deepMatch,
  req,
  expectResponse
}
