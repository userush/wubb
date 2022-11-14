import type { NextApiRequest, NextApiResponse } from "next";
import { getConnectByAddress } from "services/referrals";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { addr } = req.query;
  try {
    const userData = await getConnectByAddress(addr as string);
    if (userData) res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
}
