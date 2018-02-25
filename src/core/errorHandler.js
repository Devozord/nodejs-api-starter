export function notFound (req, res, next) {
  const err = new Error('Error, page not found (404)')
  err.status = 404

  next(err)
}

export function unexpected (err, req, res, next) {
  res.status(err.status || 500)

  res.json(err.message || 'Unexpected error (500)')
}
