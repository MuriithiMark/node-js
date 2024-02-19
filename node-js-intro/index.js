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
 * @type {{path: string, method: (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; })}[]}
 */
const routes = [
    {
        path: '/',
        method: (req, res) => {
            res.write(`Home Page`)
        }
    },
    {
        path: '/products',
        method: (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(products))
        }
    },
    {
        path: '/products/:productId',
        method: (req, res) => {
            req = reqUtils(req, `/products/:productId`)
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
        method: (req, res) => {
            req = reqUtils(req, '/products/:category/:productId')
            console.log(`Params: `, req.params)
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
    // Process path to avoid error
    const currentPath = routes.find((route) => {
        if (req.url === route.path) {
            return true;
        }
        const portions = route.path.split('/');
        const real = req.url.split('/');
        if (real.length !== portions.length) {
            return false
        }
        // by default true, unless match fail
        let truthCheck = true;

        for (let i = 0; i < portions.length; i++) {
            if (portions[i].startsWith(':')) {
                continue;
            }
            if (portions[i] !== real[i]) {
                truthCheck *= false;
                break;
            }
            truthCheck *= true;
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

    currentPath.method(req, res);
    res.end()
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})