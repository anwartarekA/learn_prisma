📘 Learning Prisma

A simple learning project to explore Prisma, a modern TypeScript ORM for working with databases in a clean, type-safe, and developer-friendly way.
here i used supabase.

run this
```npx prisma init --datasource-provider postgresql```

🎖schema.prisma file
```generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}
```
📦run for migrate:
```
npx prisma migrate dev --name init --create-only
```
📦run for generate:
```
npx prisma generate
```
📦for deploying:
```
npx prisma migrate deploy
```
📦 Prisma Client Setup (with PostgreSQL Adapter)
```
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({ adapter })
```
⚒ i used for testing my requests REST client extension (REST client) at VScode instead postman
