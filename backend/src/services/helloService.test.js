import { helloService } from './helloService';

test('getHelloWorld', async () => {
  let result = await helloService.getHelloWorld();

  expect(result.message).toEqual('Hello World!');
});
