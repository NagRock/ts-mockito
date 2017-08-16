export class Spy {
  constructor(private originalInstance: any) {
    this.wrapMethods(this.originalInstance);
  }

  private wrapMethods(originalInstance: any) {
    for (let key in originalInstance) {
      console.log(originalInstance[key]);
      this[key] = (...args) => {
        return originalInstance[key].apply(originalInstance, args);
      }
    }
  }
}
