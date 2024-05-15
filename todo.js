import fs from 'fs/promises';
import http from 'http';
import url from 'url';

const port = 8080;

const server = http.createServer(async (req, res) => {
  try {
    let tasks = await fs.readFile('todos.json');
    tasks = JSON.parse(tasks);

    res.setHeader('content-type', 'application/json');

    if (req.method == 'POST') {
      let body = '';

      req.on('data', (chunk) => body += chunk);
      req.on('end', async () => {
        tasks.push(JSON.parse(body));
        await fs.writeFile('todos.json', JSON.stringify(tasks));

        res.statusCode = 200;
        res.end(JSON.stringify({ "message": "Task saved successfully" }));
      });
    } else if (req.method == 'GET') {
      let parsedUrl = url.parse(req.url, true);

      if (parsedUrl.query.id) {
        let reqTask = tasks.find(obj => obj._id == parsedUrl.query.id);

        if (reqTask) {
          res.statusCode = 200;
          res.end(JSON.stringify(reqTask));          
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ "message": "Not found" }));
        }
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(tasks));               
      }
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ "message": "Something went wrong" }));
  }
});

server.listen(port, () =>
  console.log('Server running at', port)
);