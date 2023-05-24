const jwt = require('jsonwebtoken');

export function generateAccessToken(payload: {
  id: number;
  email: String;
}) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}
