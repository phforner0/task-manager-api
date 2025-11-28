const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// "Banco de dados" em memória (array)
let tasks = [];
let nextId = 1;

// ============================================
// ROTAS DA API (CRUD)
// ============================================

// GET /tasks - Listar todas as tarefas
app.get('/tasks', (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /tasks/:id - Buscar tarefa por ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Tarefa não encontrada'
    });
  }
  
  res.json({
    success: true,
    data: task
  });
});

// POST /tasks - Criar nova tarefa
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  
  // Validação
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Título é obrigatório'
    });
  }
  
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    message: 'Tarefa criada com sucesso',
    data: newTask
  });
});

// PUT /tasks/:id - Atualizar tarefa
app.put('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Tarefa não encontrada'
    });
  }
  
  const { title, description, completed } = req.body;
  
  // Atualizar apenas campos fornecidos
  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Título não pode ser vazio'
      });
    }
    tasks[taskIndex].title = title.trim();
  }
  
  if (description !== undefined) {
    tasks[taskIndex].description = description.trim();
  }
  
  if (completed !== undefined) {
    tasks[taskIndex].completed = completed;
  }
  
  tasks[taskIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Tarefa atualizada com sucesso',
    data: tasks[taskIndex]
  });
});

// DELETE /tasks/:id - Deletar tarefa
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Tarefa não encontrada'
    });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Tarefa deletada com sucesso',
    data: deletedTask
  });
});

// Rota de saúde (health check)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Rota 404 para endpoints não encontrados
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado'
  });
});

// Iniciar servidor (apenas se não estiver em modo de teste)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📝 Acesse: http://localhost:${PORT}/tasks`);
  });
}

// Exportar para testes
module.exports = app;