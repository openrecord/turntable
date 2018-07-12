const assert = require('assert')
const util = require('../../../app/util/util')

describe('util', () => {
  test('uuidv4', () => {
    const uuid = util.uuidv4()
    assert.ok(uuid.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/))
  })

  test('deepWalk', async function() {
    const objectToTraverse = {
      a: {
        aa: {
          aaa: 1,
          aab: 2
        }
      },
      b: [
        {
          b1: {
            b1a: 3,
            b1b: [4, 5]
          }
        },
        [6, 7]
      ],
      c: null,
      d: undefined,
      e: []
    }

    const clonedOriginalObject = Object.assign({}, objectToTraverse)

    const visitedValues = []
    const visitedPaths = []

    util.deepWalk(objectToTraverse, (val, keyPath) => {
      if (!Array.isArray(val) && !(val instanceof Object)) {
        visitedPaths.push(keyPath)
        visitedValues.push(val)
      }
    })

    assert.deepEqual(visitedValues, [1, 2, 3, 4, 5, 6, 7, null, undefined])
    assert.deepEqual(visitedPaths, [
      'a.aa.aaa',
      'a.aa.aab',
      'b[0].b1.b1a',
      'b[0].b1.b1b[0]',
      'b[0].b1.b1b[1]',
      'b[1][0]',
      'b[1][1]',
      'c',
      'd'
    ])
    assert.deepEqual(objectToTraverse, clonedOriginalObject)
  })
})
