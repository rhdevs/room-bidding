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
}

const rooms = [
  {
    block: "B2",
    unit: 101,
    gender: "Male",
    index: 1,
  },
  {
    block: "B2",
    unit: 101,
    gender: "Male",
    index: 2,
  },
  {
    block: "B2",
    unit: 102,
    gender: "Male",
    index: 1,
  },
  {
    block: "B2",
    unit: 103,
    gender: "Male",
    index: 1,
  },
  {
    block: "B2",
    unit: 104,
    gender: "Male",
    index: 1,
  },
  {
    block: "B2",
    unit: 105,
    gender: "Male",
    index: 1,
  },
] as const;

const processedRooms = rooms.map((x) => {
  return {
    id: generateUUID(x.block, x.unit, x.index),
    block: x.block,
    unit: x.unit,
    gender: x.gender,
    index: x.index,
  };
});

console.log(processedRooms);

async function seedRooms() {
  await prisma.user.deleteMany();
  await prisma.room.deleteMany();
  await prisma.room.createMany({
    data: processedRooms,
  });
}

async function main() {
  // await seedGenders();
  // await seedRooms();
  await seedUsers();
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
