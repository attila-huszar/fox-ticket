import { helloWorld } from '../models/helloWorld';

export const helloService = {
  async getHelloWorld() {
    return helloWorld;
  },
};
