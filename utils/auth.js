const jwt = require("jsonwebtoken");
const secret = "TameImpala";

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
