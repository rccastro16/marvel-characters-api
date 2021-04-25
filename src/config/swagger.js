export default {
	swagger: '2.0',
	info: {
		version: '1.0.0',
		title: 'Marvel Character API',
		description:
			'This is an API to fetch character data from the Marvel universe.',
	},
	host: 'localhost:8080',
	basePath: '/',
	tags: [
		{
			name: 'Characters',
			description: 'API for Marvel Characters',
		},
	],
	schemes: ['http'],
	produces: ['application/json'],

	paths: {
		'/characters': {
			get: {
				tags: ['Characters'],
				summary: 'returns all Marvel characters',
				responses: {
					200: {
						description: 'OK',
						schema: {
							type: 'array',
							items: {
								type: 'integer',
								example: [
									1011334,
									1017100,
									1009144,
									1010699,
									1009146,
								],
							},
						},
					},
				},
			},
		},
		'/characters/{id}': {
			get: {
				tags: ['Characters'],
				summary: 'returns a character by id',
				parameters: [
					{
						in: 'path',
						name: 'id',
						schema: {
							type: 'integer',
						},
						required: true,
						description: 'Numeric ID of the character to get',
					},
				],
				responses: {
					200: {
						description: 'OK',
						schema: {
							$ref: '#/definitions/Character',
						},
					},
					404: {
						description: 'Not Found',
						schema: {
							type: 'string',
							example: 'Not Found',
						},
					},
					500: {
						description: 'Internal server error.',
						schema: {
							type: 'string',
							example: 'Internal server error',
						},
					},
				},
			},
		},
	},
	definitions: {
		Character: {
			properties: {
				id: {
					type: 'integer',
					uniqueItems: true,
				},
				name: {
					type: 'string',
				},
				description: {
					type: 'string',
				},
			},
		},
	},
};
