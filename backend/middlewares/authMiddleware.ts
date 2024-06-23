import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    role: string;
    id: string;
    iat?: number;
    exp?: number;
}

// Étendre l'interface Request pour inclure les propriétés role et id
declare module 'express-serve-static-core' {
    interface Request {
        role?: string;
        id?: string;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(401).json({ error: 'You are not logged yet' });
    } else {
        try {
            const decodeToken = jwt.verify(accessToken, process.env.SECRET_KEY as string) as DecodedToken;
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            next();
        } catch (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
};
