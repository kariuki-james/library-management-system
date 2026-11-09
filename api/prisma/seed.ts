import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: 'Kenyan Classics' },
      update: {},
      create: { name: 'Kenyan Classics' },
    }),
    prisma.genre.upsert({
      where: { name: 'African Literature' },
      update: {},
      create: { name: 'African Literature' },
    }),
    prisma.genre.upsert({
      where: { name: 'Kenyan Set Books' },
      update: {},
      create: { name: 'Kenyan Set Books' },
    }),
    prisma.genre.upsert({
      where: { name: 'Popular Fiction' },
      update: {},
      create: { name: 'Popular Fiction' },
    }),
    prisma.genre.upsert({
      where: { name: 'Non-Fiction' },
      update: {},
      create: { name: 'Non-Fiction' },
    }),
  ]);

  const genreId = (name: string) =>
    genres.find((genre) => genre.name === name)!.id;

  const books = [
    {
      title: 'The River and the Source',
      author: 'Margaret Ogola',
      genreId: genreId('Kenyan Classics'),
    },
    {
      title: 'Coming to Birth',
      author: 'Marjorie Oludhe Macgoye',
      genreId: genreId('Kenyan Classics'),
    },
    {
      title: 'The River Between',
      author: "Ngũgĩ wa Thiong'o",
      genreId: genreId('Kenyan Classics'),
    },
    {
      title: 'Weep Not, Child',
      author: "Ngũgĩ wa Thiong'o",
      genreId: genreId('Kenyan Classics'),
    },
    {
      title: 'Petals of Blood',
      author: "Ngũgĩ wa Thiong'o",
      genreId: genreId('Kenyan Classics'),
    },

    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      genreId: genreId('African Literature'),
    },
    {
      title: 'The Concubine',
      author: 'Elechi Amadi',
      genreId: genreId('African Literature'),
    },
    {
      title: 'Half of a Yellow Sun',
      author: 'Chimamanda Ngozi Adichie',
      genreId: genreId('African Literature'),
    },
    {
      title: 'Purple Hibiscus',
      author: 'Chimamanda Ngozi Adichie',
      genreId: genreId('African Literature'),
    },
    {
      title: 'Americanah',
      author: 'Chimamanda Ngozi Adichie',
      genreId: genreId('African Literature'),
    },

    {
      title: 'Betrayal in the City',
      author: 'Francis Imbuga',
      genreId: genreId('Kenyan Set Books'),
    },
    {
      title: 'The Caucasian Chalk Circle',
      author: 'Bertolt Brecht',
      genreId: genreId('Kenyan Set Books'),
    },
    {
      title: 'Kigogo',
      author: 'Pauline Kea',
      genreId: genreId('Kenyan Set Books'),
    },
    {
      title: 'Chozi la Heri',
      author: 'Assumpta Matei',
      genreId: genreId('Kenyan Set Books'),
    },

    {
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      genreId: genreId('Popular Fiction'),
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: 'J.K. Rowling',
      genreId: genreId('Popular Fiction'),
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genreId: genreId('Popular Fiction'),
    },

    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genreId: genreId('Non-Fiction'),
    },
    {
      title: 'Dreams from My Father',
      author: 'Barack Obama',
      genreId: genreId('Non-Fiction'),
    },
    {
      title: 'Unbowed',
      author: 'Wangari Maathai',
      genreId: genreId('Non-Fiction'),
    },
  ];

  for (const book of books) {
    await prisma.book.create({ data: book });
  }

  console.log('Seed completed: 5 genres and 20 books inserted.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
