import { pool } from '../data/db.js';
import { sendError, sendSuccess } from '../utils/apiHelpers.js';
import type { Request, Response } from 'express';

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT id, text, completed, tab_id AS "tabId", created_at AS "createdAt" 
            FROM todos 
            WHERE id = $1;
        `;
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return sendError(res, "Todo not found", 404);
        }

        return sendSuccess(res, rows[0], "Todo retrieved successfully", 200);
    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        let query = `SELECT id, text, completed, tab_id AS "tabId", created_at AS "createdAt" FROM todos`;

        const result = await pool.query(query);
        return sendSuccess(res, result.rows, "Todos retrieved successfully", 200);
    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);

    }
}

export const postTodo = async (req: Request, res: Response) => {

    try {
        const { text, tabId } = req.body;

        if (!text || !tabId) {
            return sendError(res, "Text and tabId are required", 400);
        }

        const query = `
            INSERT INTO todos (text, tab_id)
            VALUES ($1, $2)
            RETURNING id, text, completed, tab_id AS "tabId", created_at AS "createdAt";
        `;

        const values = [text, tabId];
        const result = await pool.query(query, values);

        console.log(result.rows[0])
        return sendSuccess(res, result.rows[0], "Todo created successfully", 201);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

export const patchTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;

        const query = `
            UPDATE todos 
            SET 
                text = COALESCE($1, text),
                completed = COALESCE($2, completed)
            WHERE id = $3
            RETURNING id, text, completed, tab_id AS "tabId", created_at AS "createdAt";
        `;

        const values = [
            text !== undefined ? text : null,
            completed !== undefined ? completed : null,
            id
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return sendError(res, "Todo not found", 404);
        }

        return sendSuccess(res, result.rows[0], "Todo updated successfully", 200);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = `DELETE FROM todos WHERE id = $1 RETURNING *;`;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return sendError(res, "Todo not found", 404);
        }

        return sendSuccess(res, null, "Todo deleted successfully", 200);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};