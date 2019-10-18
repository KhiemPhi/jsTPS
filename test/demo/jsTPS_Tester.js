"use strict";

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
    let entry = document.getElementById("userCommandInput").value;
    if (!entry.startsWith("Q")) {      
      if (entry.startsWith("1")) {       
        var amount = prompt("Enter An Amount To Add");
        let transaction = new AddToNum_Transaction(this.num, parseInt(amount));
        this.tps.addTransaction(transaction);
        let update = this.num.getNum();
        let updateTextField = document.getElementById("userCurrentNum");
        updateTextField.value = update;
        document.getElementById("jsTPState").innerHTML = (this.tps.toString());
        //entry.focus();
      }
      // UNDO A TRANSACTION
      else if (entry.startsWith("2")) {
        this.tps.undoTransaction();
        let update = this.num.getNum();
        let updateTextField = document.getElementById("userCurrentNum");
        updateTextField.value = update;
        document.getElementById("jsTPState").innerHTML = (this.tps.toString());
        entry.focus();
      }
      // REDO A TRANSACTION
      else if (entry.startsWith("3")) {
        this.tps.doTransaction();
        let update = this.num.getNum();
        let updateTextField = document.getElementById("userCurrentNum");
        updateTextField.value = update;
        document.getElementById("jsTPState").innerHTML = (this.tps.toString());
        entry.focus();
      }
      // CLEAR ALL TRANSACTIONS
      else if (entry.startsWith("4")) {
        this.tps.clearAllTransactions();
        let update = this.num.getNum();
        let updateTextField = document.getElementById("userCurrentNum");
        updateTextField.value = update;
        document.getElementById("jsTPState").innerHTML = (this.tps.toString());
        entry.focus();
      }
      // CLEAR ALL TRANSACTIONS AND RESET NUM TO 0
      else if (entry.startsWith("5")) {
        this.tps.clearAllTransactions();
        this.num.setNum(0);
        let update = this.num.getNum();
        let updateTextField = document.getElementById("userCurrentNum");
        updateTextField.value = update;
        document.getElementById("jsTPState").innerHTML = (this.tps.toString());
        entry.focus();
      }
    } else {
      console.log("GOODBYE");
    }
  }
}
