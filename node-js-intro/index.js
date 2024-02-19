const http = require("node:http");
const retriveParams = require("./utils/retrieveParams");
const reqUtils = require("./utils/reqUtils");

const port = 8000;

const products = [
    {
        id: 1,
        category: 'Phones',
        name: 'Xiomi',
        price: 600
    },
    {
        id: 2,
        category: 'Fruit',
        name: 'Orange',
        price: 2
    },
    {
        id: 1,
        category: 'Vehicles',
        name: 'Subaru Forester',
        price: 20000
    }
]

/**
 * @type {{path: string, method?: string, action: (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; })}[]}
 */
const routes = [
    {
        path: '/',
        action: (req, res) => {
            res.write(`Home Page`)
        }
    },
    {
        path: '/products',
        action: (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(products))
        }
    },
    {
        path: '/products/:productId',
        action: (req, res) => {
            const productId = Number(req.params.productId);
            const product = products.find((product) => product.id === productId);
            if (!product) {
                res.write(JSON.stringify({
                    status: 'fail',
                    message: 'product not found'
                }))
                return;
            }
            res.write(JSON.stringify(product))
        }
    },
    {
        path: '/products/:category/:productId',
        action: (req, res) => {
            const productId = Number(req.params.productId);
            const category = req.params.category;
            const product = products.find((product) =>
                product.id === productId &&
                product.category.toLowerCase() === category.toLowerCase()
            );
            if (!product) {
                res.write(JSON.stringify({
                    status: 'fail',
                    message: 'product not found'
                }))
                return;
            }
            res.write(JSON.stringify(product))
        }
    }
]

const server = http.createServer((req, res) => {
    console.log(req.url)

    // Path processing and mapping
    const currentPath = routes.find((route) => {
        if (req.url === route.path) {
            return true;
        }
        const templatePath = route.path.split('/');
        const realPath = req.url.split('/');
        if (realPath.length !== templatePath.length) {
            return false
        }
        // by default true, unless match fail
        let truthCheck = false;

        for (let i = 0; i < templatePath.length; i++) {
            if (templatePath[i].startsWith(':')) {
                continue;
            }
            if (templatePath[i] !== realPath[i]) {
                break;
            }
            truthCheck = true;
        }

        if(truthCheck) {
            // Retrieve Params if any
            req = reqUtils(req, route.path)
        }

        return truthCheck;
    });

    if (!currentPath) {
        res.setHeader('status', 404)
        res.write('page not found')
        res.end()
        // guarantee no proceed
        return;
    }

    // TODO handle route methods: GET, POST, PUT, DELETE

    currentPath.action(req, res);
    res.end()
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})