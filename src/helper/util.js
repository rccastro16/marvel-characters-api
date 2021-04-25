import crypto from 'crypto';
import fetch from 'node-fetch';

const API_URL = 'https://gateway.marvel.com:443/v1/public';

/**
 * This method creates an MD5 hash that will be used to request Marvel API. MD5(timestamp+private-api+public-api).
 *
 * @param String timestamp
 */
export const getAPIHash = (timestamp) => {
	const content = `${timestamp}${process.env.MARVEL_PRIVATE_API_KEY}${process.env.MARVEL_PUBLIC_API_KEY}`;

	return crypto.createHash('md5').update(content).digest('hex');
};

/**
 * This method creates a request to the Marvel API `${API_URL}`.
 *
 * @param String url
 * @link https://developer.marvel.com/docs
 */
export const requestAPI = async (url) => {
	const res = await fetch(`${API_URL}${url}`);
	const statusCode = res.status;
	const jsonResponse = await res.json();

	if (statusCode === 200) {
		return jsonResponse;
	} else {
		throw new Error(jsonResponse.code);
	}
};
