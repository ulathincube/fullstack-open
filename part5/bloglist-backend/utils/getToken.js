function getToken(request) {
  const token = request.get('authorization')
  if (!token) return null

  if (token.startsWith('Bearer')) {
    const authToken = token.replace('Bearer ', '')
    return authToken
  }

  return null
}

module.exports = getToken
