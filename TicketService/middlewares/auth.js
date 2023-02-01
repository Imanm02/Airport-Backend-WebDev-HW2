// use grpc to call the checkToken services

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/protos/auth.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const checkTokenProto = grpc.loadPackageDefinition(packageDefinition).AuthService;
const client = new checkTokenProto(
    'localhost:50051',
    grpc.credentials.createInsecure()
)

// checkToken middlewares
function isAuth(req, res, next) {
    const token = req.headers.authorization;
    // call checkToken services
    client.CheckToken({token: token}, function (err, response) {
        if (err) {
            res.status(401).send({message: 'Unauthorized'});
        } else {
            req.user = response; // add user info to request
            next();
        }
    });
}

module.exports = {
    isAuth
};