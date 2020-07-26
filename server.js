const http = require('http');

const PORT = 5000;

const requestController = (req, res) =>{
    const requestMethod = req.method;
    const requestPath = req.url;

    if(requestMethod === 'GET' && requestPath === '/'){
        res.writeHead(200, { 'Content-Type': "text/plain"});
        res.end('Hello World, Welcome to WeJapa Internships');
        return;
    } 
    else if(requestMethod === 'POST' && requestPath === '/'){

        let dataValue = [];
        let name = '';
        req.on('data', data=> {
            dataValue.push(data);
        });

        req.on('end', () => {
            name = JSON.parse(dataValue).name;
            res.writeHead(200, { 'Content-Type': "text/plain"});
            res.end(`Hello ${name}, Welcome to WeJapa Internships`);
            return;

        });
    }
    
};

const server = http.createServer(requestController);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

