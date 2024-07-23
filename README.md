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

<img src="github\gmc-transparent.svg" width="600" alt="Diagrama ERD do banco de dados" style="display: block; margin: 0 auto"/>

### Estrutura do banco (SQL)

```sql
-- CreateTable


-- CreateTable


-- CreateTable


-- CreateIndex


-- CreateIndex


-- CreateIndex

```

### Instruções para rodar o projeto
