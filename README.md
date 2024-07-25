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

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente. Para o ambiente de produção será feita a migração para o POSTGRES.

Para o versionamento do banco de dados será usado as migrations do Prisma, onde cada alteração feita no banco o ORM cria uma pasta com o SQL da alteração e caso haja algum problema é possível fazer um rollback.

### Diagrama ERD

<img src="github\gmc-white.svg" width="600" alt="Diagrama ERD do banco de dados" style="display: block; margin: 0 auto"/>

### Descrição de Cada Entidade do Banco

1. **motors**

   - **Descrição**: Armazena informações detalhadas sobre os motores, incluindo especificações técnicas e associações com status e localização.
   - **Campos Principais**:
     - `id`: Identificador único do motor.
     - `code`: Código identificador do motor.
     - `manufacturer`: Nome do fabricante.
     - `power`: Potência do motor.
     - `voltage`: Tensão de operação.
     - `current`: Corrente de operação.
     - `rpm`: Rotação por minuto.
     - `status_id`: Referência ao status do motor.
     - `location_id`: Referência à localização do motor.

2. **users**

   - **Descrição**: Armazena informações dos usuários, incluindo suas credenciais e associação com áreas.
   - **Campos Principais**:
     - `id`: Identificador único do usuário.
     - `name`: Nome do usuário.
     - `personal_number`: Número pessoal do usuário.
     - `email`: Email do usuário.
     - `password`: Senha do usuário.
     - `area_id`: Referência à área do usuário.

3. **areas**

   - **Descrição**: Armazena informações sobre diferentes áreas dentro da organização.
   - **Campos Principais**:
     - `id`: Identificador único da área.
     - `center`: Centro ao qual a área pertence.
     - `name`: Nome da área.

4. **sectors**

   - **Descrição**: Armazena informações sobre setores, que são subcategorias dentro das áreas.
   - **Campos Principais**:
     - `id`: Identificador único do setor.
     - `name`: Nome do setor.
     - `area_id`: Referência à área associada ao setor.

5. **status**

   - **Descrição**: Armazena diferentes estados ou condições que um motor pode ter.
   - **Campos Principais**:
     - `id`: Identificador único do status.
     - `status`: Descrição do status.

6. **partners**

   - **Descrição**: Armazena informações sobre parceiros, que podem ser fornecedores ou prestadores de serviços.
   - **Campos Principais**:
     - `id`: Identificador único do parceiro.
     - `code`: Código do parceiro.
     - `email`: Email do parceiro.
     - `phone_number`: Número de telefone do parceiro.

7. **locations**

   - **Descrição**: Armazena informações sobre as localizações onde os motores estão instalados ou armazenados.
   - **Campos Principais**:
     - `id`: Identificador único da localização.
     - `code`: Código da localização.
     - `sector_id`: Referência ao setor associado à localização.

8. **services**

   - **Descrição**: Armazena informações sobre serviços realizados nos motores, incluindo detalhes do serviço, preço e associações com usuários e parceiros.
   - **Campos Principais**:
     - `id`: Identificador único do serviço.
     - `service_tag`: Identificador do serviço.
     - `price`: Preço do serviço.
     - `created_at`: Data e hora da criação do serviço.
     - `motor_id`: Referência ao motor associado ao serviço.
     - `user_id`: Referência ao usuário que registrou o serviço.
     - `partner_id`: Referência ao parceiro envolvido no serviço.
     - `service_status_id`: Referência ao status do serviço.

9. **service-status**

   - **Descrição**: Armazena diferentes estados que um serviço pode ter.
   - **Campos Principais**:
     - `id`: Identificador único do status do serviço.
     - `status`: Descrição do status do serviço.

10. **movements**
    - **Descrição**: Armazena informações sobre os movimentos de motores, registrando alterações de localização.
    - **Campos Principais**:
      - `id`: Identificador único do movimento.
      - `created_at`: Data e hora do movimento.
      - `user_id`: Referência ao usuário que registrou o movimento.
      - `motor_id`: Referência ao motor envolvido no movimento.

### Descrição dos Relacionamentos de Cada Entidade

#### 1. **motors**

- **Relações**:
  - **status**: Cada motor tem um status (`status_id`) que referencia `status.id`. Esta relação é muitos-para-um (N:1), indicando que muitos motores podem compartilhar o mesmo status.
  - **locations**: Cada motor tem uma localização (`location_id`) que referencia `locations.id`. Esta relação é muitos-para-um (N:1), indicando que muitos motores podem estar na mesma localização.
  - **services**: Um motor pode estar relacionado a muitos serviços, com `services.motor_id` referenciando `motors.id`. Esta relação é um-para-muitos (1:N).
  - **movements**: Um motor pode estar relacionado a muitos movimentos, com `movements.motor_id` referenciando `motors.id`. Esta relação é um-para-muitos (1:N).

#### 2. **users**

- **Relações**:
  - **areas**: Cada usuário pertence a uma área (`area_id`) que referencia `areas.id`. Esta relação é muitos-para-um (N:1).
  - **services**: Um usuário pode estar relacionado a muitos serviços, com `services.user_id` referenciando `users.id`. Esta relação é um-para-muitos (1:N).
  - **movements**: Um usuário pode estar relacionado a muitos movimentos, com `movements.user_id` referenciando `users.id`. Esta relação é um-para-muitos (1:N).

#### 3. **areas**

- **Relações**:
  - **users**: Uma área pode ter muitos usuários, com `users.area_id` referenciando `areas.id`. Esta relação é um-para-muitos (1:N).
  - **sectors**: Uma área pode ter muitos setores, com `sectors.area_id` referenciando `areas.id`. Esta relação é um-para-muitos (1:N).

#### 4. **sectors**

- **Relações**:
  - **areas**: Cada setor pertence a uma área (`area_id`) que referencia `areas.id`. Esta relação é muitos-para-um (N:1).
  - **locations**: Um setor pode ter muitas localizações, com `locations.sector_id` referenciando `sectors.id`. Esta relação é um-para-muitos (1:N).

#### 5. **status**

- **Relações**:
  - **motors**: Um status pode ser associado a muitos motores, com `motors.status_id` referenciando `status.id`. Esta relação é um-para-muitos (1:N).

#### 6. **partners**

- **Relações**:
  - **services**: Um parceiro pode estar relacionado a muitos serviços, com `services.partner_id` referenciando `partners.id`. Esta relação é um-para-muitos (1:N).

#### 7. **locations**

- **Relações**:
  - **sectors**: Cada localização pertence a um setor (`sector_id`) que referencia `sectors.id`. Esta relação é muitos-para-um (N:1).
  - **motors**: Uma localização pode ter muitos motores, com `motors.location_id` referenciando `locations.id`. Esta relação é um-para-muitos (1:N).

#### 8. **services**

- **Relações**:
  - **motors**: Cada serviço está associado a um motor (`motor_id`) que referencia `motors.id`. Esta relação é muitos-para-um (N:1).
  - **users**: Cada serviço está associado a um usuário (`user_id`) que referencia `users.id`. Esta relação é muitos-para-um (N:1).
  - **partners**: Cada serviço está associado a um parceiro (`partner_id`) que referencia `partners.id`. Esta relação é muitos-para-um (N:1).
  - **service-status**: Cada serviço tem um status de serviço (`service_status_id`) que referencia `service-status.id`. Esta relação é muitos-para-um (N:1).

#### 9. **service-status**

- **Relações**:
  - **services**: Um status de serviço pode ser associado a muitos serviços, com `services.service_status_id` referenciando `service-status.id`. Esta relação é um-para-muitos (1:N).

#### 10. **movements**

- **Relações**:
  - **users**: Cada movimento está associado a um usuário (`user_id`) que referencia `users.id`. Esta relação é muitos-para-um (N:1).
  - **motors**: Cada movimento está associado a um motor (`motor_id`) que referencia `motors.id`. Esta relação é muitos-para-um (N:1).

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

npm install - para instalar as dependencias

npx prisma migrate dev - para aplicar as migrations do banco de dados

npx prisma migrate status - para verificar se o schema do banco está atualizado

npx prisma db push --force-reset - reseta o banco de dados

npm run dev - para rodar o servidor http://localhost:3333
