export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export class MockFactory {
  static getMock<T>(
    type: new (...args: any[]) => T,
    includes?: string[],
  ): MockType<T> {
    const mock: MockType<T> = {};

    Object.getOwnPropertyNames(type.prototype)
      .filter(
        (key: string) =>
          key !== 'constructor' && (!includes || includes.includes(key)),
      )
      .map((key: string) => {
        mock[key as keyof T] = jest.fn();
      });

    return mock;
  }
}
