import http from 'node:http';
import app from './app.ts';

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env['PORT'] || '4000');
app.set('port', port);

const errorHandler = (error: NodeJS.ErrnoException) => {
  switch (error.code) {
    case 'EACCES':
      console.error('system requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('port is already in use.');
      process.exit(1);
      break;
    default:
      console.error(error);
      process.exit(1);
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
