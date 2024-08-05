const bcrypt = require("bcrypt");
const ethers = require("ethers");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const saltRounds = 10;

async function createUser({ name, email, password, country }) {
  const wallet = ethers.Wallet.createRandom();

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error("User is already exist");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      wallet_address: wallet.address,
      wallet_private: wallet.privateKey,
      country,
    },
  });

  return newUser;
}

// Add more methods as per your requirements

module.exports = {
  createUser,
  // Other methods
};
