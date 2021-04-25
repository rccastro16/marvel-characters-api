import express from 'express';
import {
	findCharacter,
	findAllCharacter,
} from '../services/characterService.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
	await findAllCharacter()
		.then((result) => {
			res.send(result);
		})
		.catch(next);
});

router.get('/:characterId', async (req, res, next) => {
	await findCharacter(req.params.characterId)
		.then((result) => {
			res.send(result);
		})
		.catch(next);
});

export default router;
