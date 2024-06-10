import { PrismaClient } from "@prisma/client";
import { generateUUID } from "~/utils/uuid";
const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.create({
    data: {
      gender: "Male",
      name: "Chuah Zi Yang",
      points: 100,
      matricNumber: "e1123255",
      nusNetId: "A0273852X",
      phoneNumber: "91262529",
    },
  });

  await prisma.user.create({
    data: {
      gender: "Male",
      name: "John Person 1",
      points: 119,
      matricNumber: "e1123256",
      nusNetId: "A0273853X",
      phoneNumber: "91262530",
    },
  });

  await prisma.user.create({
    data: {
      gender: "Male",
      name: "John Person 2",
      points: 123,
      matricNumber: "e1123257",
      nusNetId: "A0273854X",
      phoneNumber: "91262531",
    },
  });

  await prisma.user.create({
    data: {
      gender: "Male",
      name: "John Person 3",
      points: 112,
      matricNumber: "e1123258",
      nusNetId: "A0273855X",
      phoneNumber: "91262532",
    },
  });
}
const rooms = [
  {
    block: "B2",
    unit: 101,
    gender: "Male",
    index: 1,
    type: "Double",
  },
  {
    block: "B2",
    unit: 101,
    gender: "Male",
    index: 2,
    type: "Double",
  },
  {
    block: "B2",
    unit: 102,
    gender: "Male",
    index: 1,
    type: "Single",
  },
  {
    block: "B2",
    unit: 103,
    gender: "Male",
    index: 1,
    type: "Single",
  },
  {
    block: "B2",
    unit: 104,
    gender: "Male",
    index: 1,
    type: "Single",
  },
  {
    block: "B2",
    unit: 105,
    gender: "Male",
    index: 1,
    type: "Single",
  },
] as const;

const processedRooms = rooms.map((x) => {
  return {
    id: generateUUID(x.block, x.unit, x.index),
    block: x.block,
    unit: x.unit,
    gender: x.gender,
    index: x.index,
    roomType: x.type,
  };
});

async function seedRooms() {
  await prisma.room.createMany({
    data: processedRooms,
  });
}

async function seedBids() {
  const users = await prisma.user.findMany();
  const room = await prisma.room.findFirstOrThrow({
    where: {
      unit: 101,
      block: "B2",
      index: 1,
    },
  });

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const bid = await prisma.bid.create({
      data: {
        rank: 1,
        //@ts-ignore
        userId: user.id,
        roomId: room.id,
      },
    });
  }
}

async function main() {
  await seedUsers();
  await seedRooms();
  await seedBids();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
