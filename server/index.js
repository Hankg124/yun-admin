import http from 'http';

const port=7777;

const server = http.createServer((req, res) => {
    res.end(
        JSON.stringify([
            {
                name: 'John',
            },
            {
                name: 'John',
            }
        ])
    )
})

server.listen(port);