export class Token {
    name: string;
    symbol: string;
    address: string;
    balance: string;
  
    constructor(name: string, symbol: string, address: string, balance: string) {
      this.name = name;
      this.symbol = symbol;
      this.address = address;
      this.balance = balance;
    }
  }
  