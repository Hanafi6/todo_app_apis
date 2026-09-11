import type { Request, Response } from 'express';
import { pool } from '@/data/db.js';
import { sendError, sendSuccess } from '@/utils/apiHelpers.js';

// 1️⃣ جلب كافة المنتجات مع Pagination + Search
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(Math.max(1, parseInt(req.query.limit as string) || 10), 10);
        const search = (req.query.search as string || "").trim();
        const offset = (page - 1) * limit;

        let whereClause = '';
        const queryParams: any[] = [];

        if (search) {
            whereClause = 'WHERE name ILIKE $1 OR description ILIKE $1';
            queryParams.push(`%${search}%`);
        }

        // استعلام لعد إجمالي البيانات المطابقة (عشان نحسب TotalPages)
        const countQuery = `SELECT COUNT(*) FROM products ${whereClause};`;
        const countResult = await pool.query(countQuery, queryParams);
        const totalProducts = parseInt(countResult.rows[0].count);

        // استعلام لجلب الصفحات المحددة (Pagination Query)
        const dataQuery = `
            SELECT * FROM products 
            ${whereClause} 
            ORDER BY created_at DESC 
            LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2};
        `;

        const dataParams = [...queryParams, limit, offset];
        const dataResult = await pool.query(dataQuery, dataParams);

        const totalPages = Math.ceil(totalProducts / limit) || 1;

        const paginatedData = {
            products: dataResult.rows,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };

        return sendSuccess(res, paginatedData, "Data retrieved successfully", 200);
    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

// 2️⃣ جلب منتج محدد بـ ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return sendError(res, "Product not found", 404);
        }

        return sendSuccess(res, result.rows[0], "Product retrieved successfully", 200);
    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

// 3️⃣ إضافة منتج جديد (POST)
export const postProduct = async (req: Request, res: Response) => {
    try {
        const { id, name, description, price, stock } = req.body;

        const query = `
            INSERT INTO products (id, name, description, price, stock)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [id, name, description, price, stock];
        const result = await pool.query(query, values);

        return sendSuccess(res, result.rows[0], "Product created successfully", 201);
    } catch (error: any) {
        return sendError(res, "Failed to create product", 500, error?.message || error);
    }
};

// 4️⃣ حذف منتج (DELETE)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *;', [id]);

        if (result.rowCount === 0) {
            return sendError(res, "Product not found", 404);
        }

        return sendSuccess(res, result.rows[0], "Deleted product successfully", 200);
    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};

// 5️⃣ إحصائيات عامة عن المنتجات (Analytics/Stats Overview)
export const getProductsStats = async (req: Request, res: Response) => {
    try {
        const statsQuery = `
            SELECT 
                COUNT(*) AS total_products,
                SUM(stock) AS total_stock,
                ROUND(AVG(price), 2) AS avg_price,
                MAX(price) AS max_price,
                MIN(price) AS min_price
            FROM products;
        `;
        const result = await pool.query(statsQuery);

        return sendSuccess(res, result.rows[0], "Analytics retrieved successfully", 200);
    } catch (error: any) {
        return sendError(res, "Internal server error", 500, error?.message || error);
    }
};