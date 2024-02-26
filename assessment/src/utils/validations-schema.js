import { checkSchema} from "express-validator"
/**
 * 
 */
export const addProductSchema = {
    price: {
        notEmpty: {
            errorMessage: "price cannot be empty"
        },
        isDecimal: {
            errorMessage: "price must be a number"
        }
    },
    name: {
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        isString: {
            errorMessage: "name must be a string"
        },
        isLength: {
            options: {
                min: 3,
            },
            errorMessage: "name must exceed 3 characters"
        }
    },
    description: {
        optional: true,
        notEmpty: {
            errorMessage: "description cannot be empty"
        },
        isString: {
            errorMessage: "description must be a string"
        },
        isLength: {
            options: {
                min: 3,
                max: 50
            },
            errorMessage: "description must be between 3 and 50 characters"
        }
    }
}