import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import charactersRoute from './src/routes/characters.js';
import swaggerConfig from './src/config/swagger.js';
import { client } from './src/helper/redis-client.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

/**
 * Routes
 */
app.use('/characters', charactersRoute);

/**
 * Error Handler
 */

app.use((err, _req, res, _next) => {
	if (err.message === '404') {
		res.status(404);
		res.send('Not Found.');
	} else {
		res.status(500);
		res.send('Internal server error.');
	}
});

/**
 * Redis event listener
 */

client.on('connect', () => {
	console.log('Redis - Connection status: connected');
});

client.on('reconnecting', () => {
	console.log('Redis - Connection status: reconnecting');
});

client.on('error', function (err) {
	console.log('Redis - Connection status: error  ' + err);
});

/**
 * Swagger Setup
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

/**
 * App Listener
 */
app.listen(port, () => {
	console.log(`App start on port ${port}...`);
});

export default app; // Exported for Testing
