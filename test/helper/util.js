import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { requestAPI, getAPIHash } from '../../src/helper/util.js';
import crypto from 'crypto';
import fetch from 'node-fetch';

chai.use(chaiAsPromised);
const expect = chai.expect;
describe('Utils test', function () {
	it('should get MD5 hash', () => {
		const cryptoStub = sinon.stub(crypto, 'createHash').returns({
			update: () => {
				return {
					digest: () => {
						return 'hashed';
					},
				};
			},
		});
		const hash = getAPIHash();

		expect(hash).to.be.equal('hashed');
		sinon.assert.calledOnce(cryptoStub);
		cryptoStub.restore();
	});

	it('should return 200 response', async () => {
		const expectedResult = {
			code: 200,
			results: [{ id: 1, name: 'spiderman' }],
		};
		const responseObject = {
			status: 200,
			json: () => {
				return expectedResult;
			},
		};
		const fetchStub = sinon.stub(fetch, 'Promise').returns(responseObject);

		const res = await requestAPI();

		expect(res).to.be.equal(expectedResult);
		fetchStub.restore();
	});

	it('should throw Error', async () => {
		const expectedResult = {
			code: 500,
		};
		const responseObject = {
			status: 500,
			json: () => {
				return expectedResult;
			},
		};
		const fetchStub = sinon.stub(fetch, 'Promise').returns(responseObject);

		await expect(requestAPI()).to.eventually.be.rejectedWith(Error, '500');
		fetchStub.restore();
	});
});
