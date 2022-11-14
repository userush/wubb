// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import shortId from "shortid";

const prisma = new PrismaClient();

async function _incRefCount(referrerCode: string) {
  try {
    const res = await prisma.user.update({
      where: {
        referral_code: referrerCode,
      },
      data: {
        referred: {
          increment: 1,
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function incFeeCount(addr: string) {
  try {
    const res = await prisma.user.update({
      where: {
        addr: addr,
      },
      data: {
        fee_fixed: {
          increment: 1,
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function postNewConnect(addr: string, referrerCode: string = "") {
  try {
    const newConnect = await prisma.user.create({
      data: {
        addr,
        referrer_code: referrerCode,
        referral_code: shortId.generate(),
        referred: 0,
      },
    });
    if (!referrerCode) return newConnect;
    const referrer = await _incRefCount(referrerCode);
    return { new: newConnect, updated: referrer };
  } catch (err) {
    console.log(err);
  }
}

async function getAllConnects() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log(err);
  }
}

async function getConnectByAddress(addr: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        addr: addr,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}

export { postNewConnect, getAllConnects, getConnectByAddress, incFeeCount };
