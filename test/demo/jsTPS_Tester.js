'use strict'


/**
 * This driver demonstrates simple usage of the jTPS API.
 *
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 2.0
 */
class jsTPS_Tester {
  
    constructor() {
    // HERE'S OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();
    // HERE'S THE DATA WE'RE MANIPULATING IN THIS DEMO
    this.num = new Num();
   
  }

 
 
  mainTester() {
    
    var keepGoing = new Boolean(true);
    while (keepGoing) {
      // DISPLAY THE CURRENT TPS
      console.log("CURRENT jsTPS:");
      console.log(this.tps);
      console.log();

      // DISPLAY NUM
      console.log("num is " + this.num.getNum());
      
      console.log();

      // DISPLAY THE MENU
      console.log("ENTER A SELECTION");
      console.log("1) Add a Transaction");
      console.log("2) Undo a Transaction");
      console.log("3) Redo a Transaction");
      console.log("4) Clear All Transactions");
      console.log("5) Reset Num and Transactions");
      console.log("-");

      // GET THE USER SELECTION
      var entry = prompt("Enter A Selection");

      // ADD AND EXECUTE A TRANSACTION
      if (entry.startsWith("1")) {
        console.log("\nEnter an amount to add: ");
        entry = prompt("Enter An Amount To Add");        
        let transaction = new AddToNum_Transaction(this.num, parseInt(entry));
        this.tps.addTransaction(transaction);
      }
      // UNDO A TRANSACTION
      else if (entry.startsWith("2")) {
        this.tps.undoTransaction();
      }
      // REDO A TRANSACTION
      else if (entry.startsWith("3")) {
        this.tps.doTransaction();
      }
      // CLEAR ALL TRANSACTIONS
      else if (entry.startsWith("4")) {
        this.tps.clearAllTransactions();
      }
      // CLEAR ALL TRANSACTIONS AND RESET NUM TO 0
      else if (entry.startsWith("5")) {
        this.tps.clearAllTransactions();
        this.num.setNum(0);
      }
      // QUIT
      else if (entry.startsWith("Q")) {
        keepGoing = false;
      }
    }
    console.log("GOODBYE");
  }
}
