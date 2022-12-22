import {validationResult} from 'express-validator'


export const validarAt = (req:any, res:any, next:any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
