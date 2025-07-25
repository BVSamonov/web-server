const Component = (id: number) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (target: Function) => {
    target.prototype.userId = id;
  };
};

type GenericFunction<T extends unknown[]> = (...args: T) => void;

function Method() {
  return function <T extends object>(
    target: T,
    propertyKey: keyof T,
    descriptor: TypedPropertyDescriptor<GenericFunction<number[]>>,
  ) {
    const oldValue = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const [newId] = args;

      if (typeof newId === "number") {
        return newId * 10;
      }
    };
  };
}

const prop = (target: object, propertyKey: string) => {
  let value: number;

  const getter = () => {
    return value;
  };

  const setter = (newValue: number) => {
    value = newValue;

    return value;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};

@Component(1)
class User {
  @prop userId: number;

  @Method()
  updateUser(newId: number) {
    this.userId = newId;
  }
}

console.log(new User().userId);
console.log(new User().updateUser(2));
console.log(new User().userId);
