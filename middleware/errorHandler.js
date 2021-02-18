
export default function errorHandler(err, req, res, next) {

  if (err.name === 'ValidationError') {

    res.status(422).send(err)
  } else if (err.name === 'CastError') {

    res.status(404).send(err)
  } else {
    res.status(500).send(err)
  }
  next()
}