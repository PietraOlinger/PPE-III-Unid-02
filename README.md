# Backend Hamburgueria - PPE III

API RESTful para cadastro de usuários e gerenciamento de tarefas. O projeto usa arquitetura em camadas: routes, controllers, services, models e middlewares.

## Tecnologias

- Node.js e Express
- MongoDB com Mongoose
- JWT para autenticação
- bcrypt para hash de senhas
- dotenv para variáveis de ambiente

## Pré-requisitos

- Node.js 18 ou superior
- MongoDB em execução localmente ou uma URI de um MongoDB remoto

## Instalação e execução

```bash
npm install
copy .env.example .env
```

Edite `.env` e defina um valor forte para `JWT_SECRET`. Depois execute:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`. O banco e as coleções são criados pelo Mongoose na primeira utilização.

## Endpoints

### Verificação

`GET /health` retorna `200`:

```json
{ "status": "ok" }
```

### Usuários

`POST /users/register` cria um usuário e retorna `201`:

```json
{
	"name": "Maria Silva",
	"email": "maria@example.com",
	"password": "senha123"
}
```

`POST /users/login` valida as credenciais e retorna `200` com um token:

```json
{
	"email": "maria@example.com",
	"password": "senha123"
}
```

Resposta:

```json
{ "token": "<jwt>", "tokenType": "Bearer" }
```

### Tarefas protegidas

Todas as rotas abaixo exigem o cabeçalho:

```text
Authorization: Bearer <jwt>
```

| Método | Endpoint | Resultado |
| --- | --- | --- |
| GET | `/tasks` | Lista as tarefas do usuário (`200`) |
| POST | `/tasks` | Cria uma tarefa (`201`) |
| PUT | `/tasks/:id` | Atualiza título ou situação (`200`) |
| DELETE | `/tasks/:id` | Remove uma tarefa (`204`) |

Exemplo de criação:

```json
{ "title": "Preparar hambúrguer", "done": false }
```

Erros de validação retornam `400`, credenciais/token inválidos retornam `401`, recursos inexistentes retornam `404`, duplicidades retornam `409` e falhas inesperadas retornam `500`, sempre em JSON.

## Estrutura

```text
src/
	controllers/
	middlewares/
	models/
	routes/
	services/
	config/
	utils/
	app.js
	server.js
