const reqUtils = (req, templatePath) => {
    const pathTemplateSubStrings = templatePath.split('/');
    const realPathSubStrings = req.url.split('/');
    const paramToValueMap = new Map();
    req.params = {}
    pathTemplateSubStrings.forEach((portion, index) => {
        if (portion.startsWith(':')) {
            req.params[portion.substring(1)] = realPathSubStrings[index]
        }
    })

    return req
}


module.exports  = reqUtils

