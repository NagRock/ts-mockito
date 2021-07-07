export abstract class ThenableClass {
  public then(): string {
    return "bob";
  }

  public catch(): string {
    return "bob";
  }
}

export interface ThenableInterface {
  then(): string;

  catch(): string;
}
