import { NotintegerPipe } from './notinteger.pipe';

describe('NotintegerPipe', () => {
  it('create an instance', () => {
    const pipe = new NotintegerPipe();
    expect(pipe).toBeTruthy();
  });
});
