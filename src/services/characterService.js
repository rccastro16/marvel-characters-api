import queryString from 'query-string';
import { client, getRedisAsync } from '../helper/redis-client.js';
import { requestAPI, getAPIHash } from '../helper/util.js';

const getCharacters = async (offset) => {
	const date = Date.now();

	const qs = queryString.stringify({
		ts: date,
		apikey: process.env.MARVEL_PUBLIC_API_KEY,
		hash: getAPIHash(date),
		limit: 100,
		offset: offset,
	});

	return await requestAPI(`/characters?${qs}`).then((result) => {
		return result.data;
	});
};

export const findAllCharacter = async () => {
	let marvelCharacters = [];
	let callNextPage = true;
	let offset = 0;

	// While loop to iterate call to the Marvel API with 100 characters limit.

	while (callNextPage) {
		const result = await getCharacters(offset);

		// Checks if redis is available and there is a cached result.
		const cachedResult =
			client.connected && offset === 0
				? await getRedisAsync('characters')
				: false;

		if (cachedResult) {
			const currentTotalCharacters = result.total;
			const parsedCachedResult = JSON.parse(cachedResult);

			// Checks whether the current cached result matches the total count of characters in the API,
			// if so return the cached results and break from the loop.

			if (currentTotalCharacters === parsedCachedResult.total) {
				if (parsedCachedResult.results) {
					for (
						let i = 0;
						i < parsedCachedResult.results.length;
						i++
					) {
						marvelCharacters.push(parsedCachedResult.results[i]);
					}
				}
				break;
			}
		}

		if (result.results) {
			result.results.forEach((character) => {
				marvelCharacters.push(character.id);
			});
		}

		if (offset < result.total) {
			offset += 100;
		} else {
			// On the last iteration, capture the characters and save to Redis. (if redis is available).
			if (client.connected) {
				const charactersData = {
					total: result.total,
					results: marvelCharacters,
				};
				client.set('characters', JSON.stringify(charactersData));
			}
			callNextPage = false;
		}
	}

	return marvelCharacters;
};

export const findCharacter = async (characterId) => {
	const date = Date.now();

	const qs = queryString.stringify({
		ts: date,
		apikey: process.env.MARVEL_PUBLIC_API_KEY,
		hash: getAPIHash(date),
	});

	const result = await requestAPI(`/characters/${characterId}?${qs}`).then(
		(result) => {
			const data = result.data.results[0];

			const characterData = {
				id: data.id,
				name: data.name,
				description: data.description,
			};
			return characterData;
		}
	);

	return result;
};
