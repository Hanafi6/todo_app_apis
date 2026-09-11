import express from 'express';
// import productsRouter from './routes/courses.routes.js';

import todosRouter from '@/routes/todos.routes.js';
import tabsRout from '@/routes/tabs.routes.js';
import { env } from '@/lib/env.js';

export const app = express();

const PORT = 3200;

app.use(express.json());

// app.use('/api/products', productsRouter);

app.use('/api/tabs', tabsRout);
app.use('/api/todos', todosRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
export default app;
