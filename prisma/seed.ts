import { PrismaClient } from "@prisma/client";
import { generateUUID } from "~/utils/uuid";
const prisma = new PrismaClient();
async function seedUsers() {}

const rooms = [
  {
    block: "B2",
    unit: 101,
    gender: "Male",
  },
  {
    block: "B2",
    unit: 102,
    gender: "Male",
  },
] as const;

const processedRooms = rooms.map((x) => {
  return {
    id: generateUUID(x.block, x.unit),
    block: x.block,
    unit: x.unit,
    gender: x.gender,
  };
});

console.log(processedRooms);

async function seedRooms() {
  await prisma.room.createMany({
    data: processedRooms,
  });
}

async function main() {
  // await seedGenders();
  await seedRooms();
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
