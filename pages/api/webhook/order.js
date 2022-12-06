// import { verifySignature } from "../../../lib/api";

export default async function handler(req, res) {
  // commented this out because it was used to test the simple JSON.stringify before the middleware approach

  // const verified = verifySignature(req);
  // if (!verified) {
  //   return res.status(403).json({ error: "Invalid signature" });
  // }

  res.status(200).json({
    data: {
      id: 1,
      customer: "John Doe",
    },
  });
}
