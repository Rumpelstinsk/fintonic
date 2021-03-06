import superTest from 'supertest';
import { IntegrationEnviroment } from '@test/enviroments';
import { ProductsNormalization } from './ProductsNormalization';
import { IdGenerator } from '@test/helpers';
import { ERROR_CODES } from '@modules/products/domain';
import { ProductFactory } from '@modules/products/test';

const enviroment = new IntegrationEnviroment();
const baseURL = '/products';

describe(`${baseURL}`, () => {
  beforeEach(async () => {
    await enviroment.setup();
  });

  afterAll(async () => {
    await enviroment.tearDown();
  });

  describe('GET', () => {
    it('returns the products', async () => {
      const { completeProduct, incompleteProduct } = await (await enviroment.getDBClient()).seedProducts();
      const testRequester = superTest(await enviroment.getAPI());
      const expectedBody = [
        ProductsNormalization.normalize(incompleteProduct),
        ProductsNormalization.normalize(completeProduct),
      ];
      const toMatchBody = (res: any) => {
        expect(res.body).toEqual(expectedBody);
      };

      const response = testRequester.get(baseURL);

      await response.expect(200).expect(toMatchBody);
    });

    it('returns an empty array if there is no products', async () => {
      const testRequester = superTest(await enviroment.getAPI());
      const toMatchBody = (res: any) => {
        expect(res.body).toEqual([]);
      };

      const response = testRequester.get(baseURL);

      await response.expect(200).expect(toMatchBody);
    });
  });

  describe('DELETE', () => {
    it('deletes a product', async () => {
      const dbClient = await enviroment.getDBClient();
      const { completeProduct } = await dbClient.seedProducts();
      const { token } = await dbClient.seedUser();
      const testRequester = superTest(await enviroment.getAPI());

      const response = testRequester
        .delete(`${baseURL}/${completeProduct._id}`)
        .set('Authorization', 'bearer ' + token);

      await response.expect(204);
    });

    it('returns an error if the product does not exists', async () => {
      const { token } = await (await enviroment.getDBClient()).seedUser();
      const testRequester = superTest(await enviroment.getAPI());
      const toMatchBody = (res: any) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            code: ERROR_CODES.PRODUCT_NOT_FOUND,
          }),
        );
      };

      const response = testRequester
        .delete(`${baseURL}/${IdGenerator.generate()}`)
        .set('Authorization', 'bearer ' + token);

      await response.expect(400).expect(toMatchBody);
    });

    it('responses with an error if the url is malformed', async () => {
      const { token } = await (await enviroment.getDBClient()).seedUser();
      const testRequester = superTest(await enviroment.getAPI());

      const response = testRequester.delete(`${baseURL}/wrongId}`).set('Authorization', 'bearer ' + token);

      await response.expect(400);
    });

    it('throws an error on anonymous requests', async () => {
      const { completeProduct } = await (await enviroment.getDBClient()).seedProducts();
      const testRequester = superTest(await enviroment.getAPI());

      const response = testRequester.delete(`${baseURL}/${completeProduct._id}`);

      await response.expect(401);
    });
  });

  describe('POST', () => {
    it('creates a product', async () => {
      const { token } = await (await enviroment.getDBClient()).seedUser();
      const payload = ProductFactory.createParams();
      const testRequester = superTest(await enviroment.getAPI());
      const toMatchBody = (res: any) => {
        expect(res.body).toEqual({
          ...payload,
          id: expect.any(String),
        });
      };

      const response = testRequester
        .post(baseURL)
        .set('Authorization', 'bearer ' + token)
        .send(payload);

      await response.expect(200).expect(toMatchBody);
    });

    it('responses with an error if the payload is malformed', async () => {
      const { token } = await (await enviroment.getDBClient()).seedUser();
      const emptyPayload = {};
      const testRequester = superTest(await enviroment.getAPI());

      const response = testRequester
        .post(baseURL)
        .set('Authorization', 'bearer ' + token)
        .send(emptyPayload);

      await response.expect(400);
    });

    it('throws an error on anonymous requests', async () => {
      const payload = ProductFactory.createParams();
      const testRequester = superTest(await enviroment.getAPI());

      const response = testRequester.post(baseURL).send(payload);

      await response.expect(401);
    });
  });
});
