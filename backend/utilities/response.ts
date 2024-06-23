import { Response } from 'express';

export const responseReturn = (res: Response, code: number, data: any): Response => {
    return res.status(code).json(data);
};
