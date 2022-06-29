'use strict'

const {strictEqual}  = require('assert')
const {describe, it} = require('@popovmp/mocha-tiny')

const {logError, getLastError, resetLastError} = require('../index')

describe('lastError', () => {
	it('initial lastError is undefined', () => {
		const actual = getLastError()
		strictEqual(actual, undefined)
	})

	it('when logError, gets the correct lastError', () => {
		const expected = 'some last error'
		logError(expected)
		const actual = getLastError()
		strictEqual(actual, expected)
	})

	it('reset lastError to undefined', () => {
		resetLastError()
		const actual = getLastError()
		strictEqual(actual, undefined)
	})

	it('reset lastError to null', () => {
		resetLastError(null)
		const actual = getLastError()
		strictEqual(actual, null)
	})
})

