import crypto from "crypto";

export function getSignature(payload) {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(payload)
    .digest("base64");
}

export function verifySignature(req) {
  const payload = JSON.stringify(req.body);
  const signature = getSignature(payload);

  return signature === req.headers["x-test-signature"];
}
