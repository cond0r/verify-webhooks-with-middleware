// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSignature } from "../../lib/api";

export default async function handler(req, res) {
  const payload = JSON.stringify(req.body);
  const signature = getSignature(payload);

  res.status(200).json({ signature });
}
