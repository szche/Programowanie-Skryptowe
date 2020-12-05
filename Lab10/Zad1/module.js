    /**
   * Klasa "Operacja"
    * @constructor
    * @param {int} x - Wartosc x.
    * @param {int} y - Wartosc y.
    * 
   */
export class Operation {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
        /**
       * Zwraca sume elementow podaych w konstruktorze
       * @memberof Operation
       * @method sum
       */
    sum() {
        return this.x + this.y;
    }
}
