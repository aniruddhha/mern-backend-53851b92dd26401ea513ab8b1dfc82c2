const http = require('http')
// console.log(http)

const host = '0.0.0.0'
const port = 9000

const onRequest = (req, res) => {
    console.log('Got Incoming Request')

    console.log(req.method)

    if(req.method == 'POST') {
        let body = ''
        req.on('data', mxzbcvxzmnvbmx => {
            body += mxzbcvxzmnvbmx.toString()
        })
        req.on('end', () => {
            console.log(body)
            res.end('success')
        })
    }else {
        res.writeHead(200)
        res.end('Well I got your request, now processing it')
    }
}  // arrow function

const server = http.createServer(onRequest) 

const onServerRunning = () => console.log('Server Running Successfully')

server.listen(port, host, onServerRunning)
