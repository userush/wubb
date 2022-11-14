import { User } from "@prisma/client";

const hasConnectsHistory = (
  connectsHistory: Array<User>,
  currAccount: string
) => {
  return connectsHistory.filter((item) => item?.addr === currAccount).length > 0
    ? true
    : false;
};

export { hasConnectsHistory };
