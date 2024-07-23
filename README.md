# Motors

O motors é uma aplicação de **gestão de motores em um ambiente industrial**.

A ferramenta permite que o usuário cadastre um motor e abra uma página pública de consulta.

Os usuários logados podem realizar transações para movimentação interna ou enviar e receber motores de serviços externos.

O sistema fará um scan da tag do motor para permitir a entrada e saída da planta.

## Requisitos

### Requisitos funcionais

- [x] O usuário deve poder cadastrar um novo motor;
- [x] O usuário deve poder visualizar dados de um motor;
- [x] O usuário deve poder visualizar a lista de motores;
- [x] O usuário deve poder visualizar a lista de motores filtrada por cada atributo;
- [x] O usuário deve poder mudar a localização interna do motor;
- [x] O usuário deve poder enviar ou receber motores de serviço externo;
- [x] O usuário deve poder visualizar histórico de movimentações de cada motor;
- [x] O usuário deve poder visualizar motores que estão em serviço externo;

### Regras de negócio

- [x] O usuário só pode cadastrar motores com o mesmo código uma única vez;
- [x] O usuário não autenticado só pode visualizar os motores;
- [x] O usuário só pode realizar movimentações se estiver autenticado;
- [x] O usuário só pode dar entrada em motores que estiverem com o status 'serviço externo';

### Requisitos não-funcionais

- [x] O scan do motor será realizado através de um QRCode;

## Documentação da API (Swagger)

Para documentação da API, acesse o link:

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD

<img src="github\gmc-white.svg" width="600" alt="Diagrama ERD do banco de dados" style="display: block; margin: 0 auto"/>

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "motors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "manufacturer" TEXT,
    "power" REAL NOT NULL DEFAULT 0,
    "voltage" INTEGER NOT NULL,
    "current" REAL NOT NULL,
    "rpm" INTEGER NOT NULL,
    "frame" TEXT,
    "type" TEXT,
    "model" TEXT,
    "status_id" INTEGER NOT NULL DEFAULT 0,
    "location_id" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "motors_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "motors_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "personal_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "area_id" INTEGER NOT NULL,
    CONSTRAINT "users_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "areas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "center" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "area_id" INTEGER NOT NULL,
    CONSTRAINT "sectors_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "partners" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "locations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "sector_id" INTEGER NOT NULL,
    CONSTRAINT "locations_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_tag" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motor_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "service_status_id" INTEGER NOT NULL,
    CONSTRAINT "services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_motor_id_fkey" FOREIGN KEY ("motor_id") REFERENCES "motors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_service_status_id_fkey" FOREIGN KEY ("service_status_id") REFERENCES "service-status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "service-status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "movements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "motor_id" TEXT NOT NULL,
    CONSTRAINT "movements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "movements_motor_id_fkey" FOREIGN KEY ("motor_id") REFERENCES "motors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "motors_code_key" ON "motors"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "partners_email_key" ON "partners"("email");

```

### Instruções para rodar o projeto
