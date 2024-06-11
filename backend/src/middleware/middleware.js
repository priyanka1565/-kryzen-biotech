const { check, validationResult } = require('express-validator');

const validateRequestBody = [
    (req, res, next) => {
        const validations = [];
        for (let key in req.body) {
            validations.push(
                check(key)
                    .trim()
                    .isLength({ min: 4, max: 750 })
                    .withMessage(`${key} must be provided and have a length between 5 and 100 characters`)
            );
        }
        Promise.all(validations.map(validation => validation.run(req))).then(() => next());
    },
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRequestBody;
