# 📝 Task Manager API

> API REST para gerenciamento de tarefas desenvolvida com metodologia ágil (Lean + Kanban)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![Tests](https://img.shields.io/badge/Tests-Passing-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido como parte da disciplina de **Gestão Ágil de Projetos**, aplicando princípios de:

- ✅ **Lean**: Eliminação de desperdícios e foco no MVP
- ✅ **Kanban**: Fluxo de trabalho visual com GitHub Projects
- ✅ **CI/CD**: Integração e entrega contínua com GitHub Actions
- ✅ **Metodologia Ágil**: Desenvolvimento iterativo e incremental

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP
- **GitHub Actions** - CI/CD automatizado

## 📋 Funcionalidades (MVP)

### CRUD Completo de Tarefas

- ✅ **CREATE**: Adicionar nova tarefa
- ✅ **READ**: Listar todas as tarefas
- ✅ **UPDATE**: Atualizar tarefa existente
- ✅ **DELETE**: Remover tarefa

## 🔧 Instalação e Uso

### Pré-requisitos

- Node.js >= 16.0.0
- npm ou yarn

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/task-manager-api.git
cd task-manager-api
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Rodar o Servidor

```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

## 🧪 Executar Testes

### Rodar todos os testes

```bash
npm test
```

### Rodar testes em modo watch

```bash
npm run test:watch
```

### Cobertura de testes

Os testes cobrem:
- ✅ Criação de tarefas (POST)
- ✅ Listagem de tarefas (GET)
- ✅ Busca por ID (GET)
- ✅ Atualização (PUT)
- ✅ Deleção (DELETE)
- ✅ Validações e erros
- ✅ Health check

## 📡 Endpoints da API

### Base URL

```
http://localhost:3000
```

### 1. Listar Todas as Tarefas

```http
GET /tasks
```

**Resposta:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Estudar Node.js",
      "description": "Aprender Express e APIs REST",
      "completed": false,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Buscar Tarefa por ID

```http
GET /tasks/:id
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Estudar Node.js",
    "description": "Aprender Express e APIs REST",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Criar Nova Tarefa

```http
POST /tasks
Content-Type: application/json

{
  "title": "Título da tarefa",
  "description": "Descrição opcional"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "data": {
    "id": 1,
    "title": "Título da tarefa",
    "description": "Descrição opcional",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Atualizar Tarefa

```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Novo título",
  "description": "Nova descrição",
  "completed": true
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Tarefa atualizada com sucesso",
  "data": {
    "id": 1,
    "title": "Novo título",
    "description": "Nova descrição",
    "completed": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 5. Deletar Tarefa

```http
DELETE /tasks/:id
```

**Resposta:**
```json
{
  "success": true,
  "message": "Tarefa deletada com sucesso",
  "data": {
    "id": 1,
    "title": "Título da tarefa"
  }
}
```

### 6. Health Check

```http
GET /health
```

**Resposta:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Gestão Ágil Aplicada

### Princípios Lean

- **Eliminar desperdícios**: Focamos apenas no CRUD essencial
- **Entregar valor rápido**: MVP funcional em poucos dias
- **Melhoria contínua**: Refatorações baseadas em feedback

### Kanban (GitHub Projects)

Nossa board possui 4 colunas:

1. **📝 Backlog**: Funcionalidades planejadas
2. **⚙️ Em Progresso**: Desenvolvimento ativo
3. **👁️ Em Revisão**: Code review / testes
4. **✅ Concluído**: Tarefas finalizadas

### Workflow de Desenvolvimento

1. Criar Issue descrevendo a tarefa
2. Mover para "Em Progresso"
3. Desenvolver em branch (opcional)
4. Fazer commits frequentes
5. Criar Pull Request
6. Revisar código
7. Merge e mover para "Concluído"

## 🔄 CI/CD Pipeline

### Testes Automatizados

Executado em **todo push** e **pull request** para `main`:

- ✅ Roda suite completa de testes
- ✅ Testa em múltiplas versões do Node.js (18.x, 20.x)
- ✅ Gera relatório de cobertura
- ✅ Bloqueia merge se testes falharem

### Deploy Automático

Executado apenas em push para `main`:

- ✅ Roda testes antes do deploy
- ✅ Deploy automático no Render
- ✅ Webhook configurável
- ✅ Notificação de sucesso/falha

## 📊 Estrutura do Projeto

```
task-manager-api/
├── src/
│   └── server.js          # Servidor Express e rotas
├── test/
│   └── server.test.js     # Testes automatizados
├── .github/
│   └── workflows/
│       ├── tests.yml      # Workflow de testes
│       └── deploy.yml     # Workflow de deploy
├── package.json           # Dependências e scripts
├── .gitignore            # Arquivos ignorados
└── README.md             # Documentação
```

## 🔗 Links Úteis

- [Documentação do Express](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [GitHub Actions](https://docs.github.com/pt/actions)
- [Render Deploy Guide](https://render.com/docs)

---

⭐ **Desenvolvido com metodologia ágil e boas práticas de DevOps**
