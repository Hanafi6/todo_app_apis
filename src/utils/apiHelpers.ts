import type { Response } from 'express';
import type { ApiResponse } from '../types/apiResponse.js';

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200
) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};

export const sendError = (
    res: Response,
    message = 'Something went wrong',
    statusCode = 400,
    error?: any
) => {
    const response: ApiResponse = {
        success: false,
        message,
        ...(error && { error }),
    };
    return res.status(statusCode).json(response);
};