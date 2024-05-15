import fs from 'fs/promises';
import http from 'http';
import url from 'url';

const port = 8080;

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const reqCity = parsedUrl.query.city;

    let data = await fs.readFile('data.json');
    data = JSON.parse(data);

    let result = data.cities.find(obj => obj.name == reqCity);
    res.setHeader('content-type', 'application/json');

    if (result) {
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }    
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log('Server running at', port);
});