#### Paso 1: Creando nuestra base de datos en Prisma y Suapase

### npx nest g res vouchers : para CRUD

### npm i --save @nestjs/config : para .env

### npm i prisma -D

### npx prisma init --datasource-provider postgresql

### npx prisma migrate dev --name init : convierte el código esquema a tabla SQL o base de datos en SUpabse y Prisma

### npx prisma studio

#### Paso 2: Conectando nuestra base de datos de Prisma y Suapase con NestJS

## npx nest g service prisma --no-spec

## npm install @prisma/client

## npm install --save-dev @types/node-fetch

## npx prisma migrate dev --name update_imagevoucher_schema
