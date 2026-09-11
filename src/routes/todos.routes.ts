import { Router } from 'express';
import { getAllTodos, getTodoById, postTodo, patchTodo, deleteTodo } from '../controllers/todos.controller.js';

const router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', postTodo);
router.patch('/:id', patchTodo);
router.delete('/:id', deleteTodo);

export default router;