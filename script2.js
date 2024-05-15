import http from 'http';
import url from 'url';

const port = 80;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('content-type', 'application/json');

  if (req.method == 'GET' && parsedUrl.pathname == '/guest') {
    res.statusCode = 200;
    if (parsedUrl.query.name) {
      res.end(JSON.stringify({"message": `Hello, ${parsedUrl.query.name}`}));
    } else {
      res.end(JSON.stringify({"message": `Hello, Guest`}));

    }
  } else if (req.method == 'POST' && parsedUrl.pathname == '/guest') {
    const fname = parsedUrl.query.name;
    const age = parsedUrl.query.age;

    if (fname && age) {
      res.statusCode = 200;
      res.end(JSON.stringify({"message": `Received data from ${fname} who is ${age} years old`}));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({"error": 'Missing name or age in request body'}));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({"message": 'Not found'}));
  }
});

server.listen(port, () => {
  console.log('Server running at', port);
});