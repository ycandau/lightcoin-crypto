// index.js

//------------------------------------------------------------------------------

class Account {
  constructor(username) {
    this.username = username;
    this._balance = 0;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce(
      (bal, trans) => bal + trans.value,
      this._balance
    );
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

//------------------------------------------------------------------------------

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  get isNotAllowed() {
    return this.value + this.account.balance < 0;
  }

  commit() {
    if (this.isNotAllowed) return;
    this.time = new Date();
    this.account.addTransaction(this);
  }
}

//------------------------------------------------------------------------------

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

//------------------------------------------------------------------------------

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

//------------------------------------------------------------------------------
// Driver

const myAccount = new Account("snow-patrol");

console.log("----------------");
t1 = new Withdrawal(30, myAccount);
t1.commit();
console.log("Transaction 1:", t1);
console.log("Balance:", myAccount.balance);

console.log("----------------");
t2 = new Deposit(100, myAccount);
t2.commit();
console.log("Transaction 2:", t2);
console.log("Balance:", myAccount.balance);

console.log("----------------");
t3 = new Withdrawal(90, myAccount);
t3.commit();
console.log("Transaction 3:", t3);
console.log("Balance:", myAccount.balance);

console.log("----------------");
