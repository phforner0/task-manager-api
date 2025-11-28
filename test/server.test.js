const request = require('supertest');
const app = require('../src/server');

describe('Task Manager API - Testes', () => {
  
  // ============================================
  // TESTE 1: Criar Tarefa (POST)
  // ============================================
  describe('POST /tasks', () => {
    it('deve criar uma nova tarefa com sucesso', async () => {
      const newTask = {
        title: 'Estudar Node.js',
        description: 'Aprender Express e APIs REST'
      };
      
      const response = await request(app)
        .post('/tasks')
        .send(newTask)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newTask.title);
      expect(response.body.data.description).toBe(newTask.description);
      expect(response.body.data.completed).toBe(false);
    });
    
    it('deve retornar erro quando título estiver vazio', async () => {
      const invalidTask = {
        title: '',
        description: 'Descrição'
      };
      
      const response = await request(app)
        .post('/tasks')
        .send(invalidTask)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('obrigatório');
    });
    
    it('deve criar tarefa sem descrição', async () => {
      const taskWithoutDesc = {
        title: 'Tarefa sem descrição'
      };
      
      const response = await request(app)
        .post('/tasks')
        .send(taskWithoutDesc)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.description).toBe('');
    });
  });
  
  // ============================================
  // TESTE 2: Listar Tarefas (GET)
  // ============================================
  describe('GET /tasks', () => {
    it('deve listar todas as tarefas', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
  
  // ============================================
  // TESTE 3: Buscar Tarefa por ID (GET)
  // ============================================
  describe('GET /tasks/:id', () => {
    it('deve retornar uma tarefa específica', async () => {
      // Primeiro criar uma tarefa
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Tarefa de teste' });
      
      const taskId = createResponse.body.data.id;
      
      // Buscar a tarefa criada
      const response = await request(app)
        .get(`/tasks/${taskId}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(taskId);
    });
    
    it('deve retornar 404 para tarefa inexistente', async () => {
      const response = await request(app)
        .get('/tasks/99999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('não encontrada');
    });
  });
  
  // ============================================
  // TESTE 4: Atualizar Tarefa (PUT)
  // ============================================
  describe('PUT /tasks/:id', () => {
    it('deve atualizar uma tarefa existente', async () => {
      // Criar tarefa
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Tarefa original' });
      
      const taskId = createResponse.body.data.id;
      
      // Atualizar tarefa
      const updateData = {
        title: 'Tarefa atualizada',
        completed: true
      };
      
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .send(updateData)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.completed).toBe(true);
    });
    
    it('deve retornar erro ao atualizar com título vazio', async () => {
      // Criar tarefa
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Tarefa teste' });
      
      const taskId = createResponse.body.data.id;
      
      // Tentar atualizar com título vazio
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .send({ title: '' })
        .expect(400);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  // ============================================
  // TESTE 5: Deletar Tarefa (DELETE)
  // ============================================
  describe('DELETE /tasks/:id', () => {
    it('deve deletar uma tarefa existente', async () => {
      // Criar tarefa
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Tarefa para deletar' });
      
      const taskId = createResponse.body.data.id;
      
      // Deletar tarefa
      const response = await request(app)
        .delete(`/tasks/${taskId}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deletada');
      
      // Verificar se foi realmente deletada
      await request(app)
        .get(`/tasks/${taskId}`)
        .expect(404);
    });
    
    it('deve retornar 404 ao deletar tarefa inexistente', async () => {
      const response = await request(app)
        .delete('/tasks/99999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  // ============================================
  // TESTE 6: Health Check
  // ============================================
  describe('GET /health', () => {
    it('deve retornar status OK', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
  
  // ============================================
  // TESTE 7: Rota 404
  // ============================================
  describe('Rotas inexistentes', () => {
    it('deve retornar 404 para endpoint não encontrado', async () => {
      const response = await request(app)
        .get('/rota-inexistente')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('não encontrado');
    });
  });
});