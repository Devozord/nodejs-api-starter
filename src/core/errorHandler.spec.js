import * as errorHandler from './errorHandler'

const reqMock = {
  app: {
    get: jest.fn(),
  },
}
const resMock = {
  locals: {
    message: '',
  },
  status: jest.fn(),
  json: jest.fn(),
}

const nextMock = jest.fn()

const errorMock = {
  message: 'mock',
  status: '648',
}

const notFoundMock = new Error('Error, page not found (404)')
notFoundMock.status = 404

describe('Error Handler', () => {
  describe('Not Found', () => {
    test('Next must be called', () => {
      errorHandler.notFound(reqMock, resMock, nextMock)
      expect(nextMock).toBeCalled()
    })

    test('Next must send 404 error', () => {
      errorHandler.notFound(reqMock, resMock, nextMock)
      expect(nextMock).toBeCalledWith(notFoundMock)
    })
  })

  describe('Unexpected', () => {
    describe('No error description', () => {
      test('res.status must be called with 500', () => {
        errorHandler.unexpected({}, reqMock, resMock, nextMock)
        expect(resMock.status).toBeCalledWith(500)
      })
      test('res.json must be called', () => {
        errorHandler.unexpected({}, reqMock, resMock, nextMock)
        expect(resMock.json).toBeCalled()
      })
    })

    describe('Custom error description', () => {
      test('res.status must be called with custom status', () => {
        errorHandler.unexpected(errorMock, reqMock, resMock, nextMock)
        expect(resMock.status).toBeCalledWith(errorMock.status)
      })
      test('res.json must be called with custom message', () => {
        errorHandler.unexpected(errorMock, reqMock, resMock, nextMock)
        expect(resMock.json).toBeCalledWith(errorMock.message)
      })
    })
  })
})
