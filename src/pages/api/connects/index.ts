import type { NextApiRequest, NextApiResponse } from "next";
import { getAllConnects } from "services/referrals";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const allConnects = await getAllConnects();
    if (allConnects) res.status(200).json(allConnects);
  } catch (err) {
    res.status(500).json(err);
  }
}
