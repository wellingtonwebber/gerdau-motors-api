# Motors

O motors é uma aplicação de **gestão de motores em um ambiente industrial**.

A ferramenta permite que o organizador cadastre um motor e abra uma página pública de consulta.

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

<img src="github\gmc-transparent.svg" width="600" alt="Diagrama ERD do banco de dados" />


### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```
