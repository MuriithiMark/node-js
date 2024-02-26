import { checkSchema} from "express-validator";

export const userSchema = checkSchema({
    username: {
        isString: {
            errorMessage: "should be a string"
        },
        notEmpty: {
            errorMessage: "username cannot be empty"
        },
        isLength: {
            options: {
                min: {
                    length: 5,
                    errorMessage: "must be more than 5 characters"
                },
                max: {
                    length: 14,
                    errorMessage: "must be more than 14 characters"
                }
            }
        },
    },
    password: {
        isString: {
            errorMessage: "should be a string",
        },
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isLength: {
            options: {
                min: {
                    length: 8,
                    errorMessage: "password must be more than 8 characters"
                },
                max: {
                    length: 20,
                    errorMessage: "password cannot exceed 20 characters"
                }
            }
        }
    }
})