import http from 'http';
import url from 'url';

const port = 8080;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('content-type', 'application/json');
  res.statusCode = 200;

  if (parsedUrl.query.name) {
    res.end(JSON.stringify({"message": `Hello, ${parsedUrl.query.name}`}));
  } else {
    res.end(JSON.stringify({"message": 'Hello, Guest'}));
  }
});

server.listen(port, () => {
  console.log('Server running at', port);
});