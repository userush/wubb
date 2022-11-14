import type { NextApiRequest, NextApiResponse } from "next";
import { postNewConnect } from "services/referrals";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { addr, referrer_code } = req.body;
  try {
    const newConnect = await postNewConnect(addr, referrer_code);

    if (newConnect) res.status(200).json(newConnect);
  } catch (err) {
    res.status(500).json(err);
  }
}
