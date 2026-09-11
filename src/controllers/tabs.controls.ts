
import { pool } from '../data/db.js';
import { sendError, sendSuccess } from '../utils/apiHelpers.js';
import type { ErrorRequestHandler, Request, Response } from 'express';



export const getAllTabs = async (req: Request, res: Response) => {
    try {
        const dataQuery = `
            SELECT 
                id, 
                title, 
                color, 
                in_nav_bar AS "inNavBar", 
                created_at AS "createdAt"
            FROM tabs 
            ORDER BY created_at DESC;
        `;

        const dataResult = await pool.query(dataQuery);

        return sendSuccess(res, dataResult.rows, "Tabs retrieved successfully", 200);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

export const getTabById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                id, 
                title, 
                color, 
                in_nav_bar AS "inNavBar", 
                created_at AS "createdAt"
            FROM tabs 
            WHERE id = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return sendError(res, "Tab not found", 404);
        }

        return sendSuccess(res, result.rows[0], "Tab retrieved successfully", 200);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};


export const deleteTab = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = `DELETE FROM tabs WHERE id = $1 RETURNING *;`;
        const result = await pool.query(query, [id]);

        const deletedTab = result.rows[0];


        if (result.rows.length === 0) {
            return sendError(res, "Tab not found", 404);
        }

        return sendSuccess(res, deletedTab, "Tab deleted successfully", 200);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

export const postTab = async (req: Request, res: Response) => {
    try {
        const { title, color, inNavBar } = req.body;


        console.log(req.body)

        if (!title) {
            return sendError(res, "Title is required", 400);
        }

        const query = `
            INSERT INTO tabs (title, color, in_nav_bar)
            VALUES ($1, $2, $3)
            RETURNING id, title, color, in_nav_bar AS "inNavBar", created_at AS "createdAt";
        `;

        const values = [title, color || 'hsl(144, 70%, 60%)', inNavBar ?? false];
        const result = await pool.query(query, values);

        return sendSuccess(res, result.rows[0], "Tab created successfully", 201);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};


export const patchTab = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, color, inNavBar } = req.body;

        if (title === undefined && color === undefined && inNavBar === undefined) {
            return sendError(res, "No fields provided to update", 400);
        }

        const fields: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (title !== undefined) {
            fields.push(`title = $${paramIndex++}`);
            values.push(title);
        }
        if (color !== undefined) {
            fields.push(`color = $${paramIndex++}`);
            values.push(color);
        }
        if (inNavBar !== undefined) {
            fields.push(`in_nav_bar = $${paramIndex++}`);
            values.push(inNavBar);
        }

        values.push(id);

        const query = `
            UPDATE tabs 
            SET ${fields.join(", ")}
            WHERE id = $${paramIndex}
            RETURNING id, title, color, in_nav_bar AS "inNavBar", created_at AS "createdAt";
        `;

        const result = await pool.query(query, values);

        console.log(result.rows[0])

        if (result.rows.length === 0) {
            return sendError(res, "Tab not found", 404);
        }

        return sendSuccess(res, result.rows[0], "Tab updated successfully", 200);

    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};