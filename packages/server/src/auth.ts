export const isAuthenticated = async (req, res, next) => {
  const token = req.get('token')

  if (!token) {
    return res.status(401).json({ message: 'Invalid Token' })
  }

  if (token !== 'sesame') {
    return res.status(403).json({ message: 'No Access' })
  }

  return next()
}