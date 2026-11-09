# Library Management System – Data Layer

## Schema Decisions

### Why Book references Genre instead of embedding it

In this project **Book** and **Genre** are modelled as separate Prisma models, and **Book** stores a foreign key `genreId` that points to a `Genre` record. This is a deliberate **normalised** design:

- **Single source of truth** – A genre name (e.g. “Fantasy”) exists once in the `Genre` table. If you rename a genre, you update one row instead of every book that used an embedded genre string.
- **Data integrity** – The `@relation` and foreign‑key constraint prevent a book from being assigned to a genre that does not exist.
- **Scalability** – Many books share the same genre. Duplicating the genre inside every book would waste storage and make queries like “list all books in the Fantasy genre” slower and harder to maintain.
- **Referential queries** – With a relation you can easily fetch a genre and all its books (`genre.books`) or a book and its genre (`book.genre`), which is exactly what a library catalogue needs.

Embedding a genre object inside each book (as you might do in a document database) would duplicate data, make updates error‑prone, and lose the ability to enforce consistency at the database level. The relational design fits PostgreSQL and Prisma’s strengths.

---

## How to run

```bash
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm start:dev

