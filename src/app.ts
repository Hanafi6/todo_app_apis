import express from 'express';
import cors from 'cors';

import todosRouter from './routes/todos.routes.js';
import tabsRout from './routes/tabs.routes.js';
import { env } from './lib/env.js';

export const app = express();

app.use(cors());
app.use(express.json());

// تعريف الـ Routes
app.use('/api/tabs', tabsRout);
app.use('/api/todos', todosRouter);

// تشغيل الـ Server محلياً فقط لمنع Crash على Vercel Serverless
if (process.env.NODE_ENV !== 'production') {
    const PORT = env.PORT || 3200;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;