// 10-May-24

import fs from 'fs/promises';
import http from 'http';
import url from 'url';

const port = 8080;

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    if (req.method == 'GET') {
      const data = await fs.readFile('data.json');
      res.statusCode = 200;
      res.end(data);
    } else if (req.method == 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Data received successfully" }));
      })
    } else {
      res.statusCode = 405;
      res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});