import { expect } from 'chai';
import request from 'supertest';

import app from '../app.js';

describe('GET /characters/{id}', () => {
	it('OK - Get character data', (done) => {
		request(app)
			.get('/characters/1011334')
			.send()
			.then((res) => {
				const body = res.body;
				expect(body).to.have.property('id');
				expect(body).to.have.property('name');
				expect(body).to.have.property('description');
				done();
			});
	});

	it('Not Found - No character found', (done) => {
		request(app)
			.get('/characters/9189')
			.send()
			.then((err, _res) => {
				expect(err.text).to.be.equal('Not Found.');
				expect(err.statusCode).to.be.equal(404);
				done();
			});
	});
});

describe('GET /characters/', () => {
	it('OK - Get all characters data', (done) => {
		request(app)
			.get('/characters')
			.send()
			.then((res) => {
				const body = res.body;
				expect(body).to.be.an('array');
				done();
			});
	}).timeout(50000);
});
