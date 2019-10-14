/**
 * jTPS_Unit_Tests.java
 *
 * This file provides a test bed for the jTPS framework.
 *
 * @author McKilla Gorilla
 * @version 2.0
 */
class jsTPS_Unit_Tests {
  /**
   * This JUnit test is for testing the adding of transactions.
   */
  testAdd() {
    let testResults = document.getElementById("alltestResults");
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Unit Tests For Add";   
    testResults.appendChild(messageElement);
   
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(0, num.getNum());

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    userAssert.assertEquals(5, num.getNum());
    userAssert.assertEquals(1, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(1, tps.getUndoSize());

    // ADD 10 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    userAssert.assertEquals(15, num.getNum());
    userAssert.assertEquals(2, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(2, tps.getUndoSize());

    // ADD 15 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());
  }

  /**
   *
   */
  testAndMask() {
    let testResults = document.getElementById("alltestResults");
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Unit Tests For AndMask";  
    testResults.appendChild(messageElement);
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(0, num.getNum());

    // ADD 12 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 12));
    tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
    userAssert.assertEquals(4, num.getNum());
    userAssert.assertEquals(2, tps.getSize());

    tps.undoTransaction();
    userAssert.assertEquals(12, num.getNum());
    userAssert.assertEquals(2, tps.getSize());
    userAssert.assertEquals(1, tps.getRedoSize());
    userAssert.assertEquals(1, tps.getUndoSize());

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 6));
    userAssert.assertEquals(0, num.getNum());
    userAssert.assertEquals(3, tps.getSize());

    tps.undoTransaction();
    userAssert.assertEquals(17, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(1, tps.getRedoSize());
    userAssert.assertEquals(2, tps.getUndoSize());
  }

  testOrMask() {
    let testResults = document.getElementById("alltestResults");
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Unit Tests For OrMask";    
    testResults.appendChild(messageElement);
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(0, num.getNum());

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 12));
    userAssert.assertEquals(13, num.getNum());
    userAssert.assertEquals(2, tps.getSize());

    // UNDO TRANSACTION
    tps.undoTransaction();
    userAssert.assertEquals(5, num.getNum());
    userAssert.assertEquals(2, tps.getSize());
    userAssert.assertEquals(1, tps.getRedoSize());
    userAssert.assertEquals(1, tps.getUndoSize());

    // ADD 10 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 12));
    userAssert.assertEquals(14, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
  }

  /**
   * This JUnit test is for testing the undoing of transactions.
   */
  testUndo() {
    let testResults = document.getElementById("alltestResults");
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Unit Tests For Undo";   
    testResults.appendChild(messageElement); 
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();

    userAssert.assertEquals(num.getNum(), 0);
    userAssert.assertFalse(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // UNDO A TRANSACTION
    tps.undoTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertTrue(tps.hasTransactionToRedo());
    userAssert.assertEquals(15, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(1, tps.getRedoSize());
    userAssert.assertEquals(2, tps.getUndoSize());

    // UNDO ANOTHER
    tps.undoTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertTrue(tps.hasTransactionToRedo());
    userAssert.assertEquals(5, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(2, tps.getRedoSize());
    userAssert.assertEquals(1, tps.getUndoSize());

    // AND ANOTHER
    tps.undoTransaction();
    userAssert.assertFalse(tps.hasTransactionToUndo());
    userAssert.assertTrue(tps.hasTransactionToRedo());
    userAssert.assertEquals(0, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(3, tps.getRedoSize());
    userAssert.assertEquals(0, tps.getUndoSize());

    // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
    tps.undoTransaction();
    userAssert.assertFalse(tps.hasTransactionToUndo());
    userAssert.assertTrue(tps.hasTransactionToRedo());
    userAssert.assertEquals(0, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(3, tps.getRedoSize());
    userAssert.assertEquals(0, tps.getUndoSize());
  }

  /**
   * This JUnit test is for testing the redoing of transactions.
   */
  testRedo() {
    let testResults = document.getElementById("alltestResults");
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Unit Tests For Redo";   
    testResults.appendChild(messageElement);   
    
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(num.getNum(), 0);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // UNDO A TRANSACTION AND THEN REDO IT
    tps.undoTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // UNDO TWO TRANSACTIONS AND THEN REDO THEM
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // UNDO ALL THREE TRANSACTIONS AND REDO THEM
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // UNDO THREE TRANSACTIONS AND REDO TWO
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertTrue(tps.hasTransactionToRedo());
    userAssert.assertEquals(15, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(1, tps.getRedoSize());
    userAssert.assertEquals(2, tps.getUndoSize());

    // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
    // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
    // REDO SHOULD DO NOTHING
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo());
    userAssert.assertFalse(tps.hasTransactionToRedo());
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());
  }

  /**
   * This JUnit test is for testing clearing of transactions.
   */
  testClear() {
    let testResults = document.getElementById("alltestResults");
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Unit Tests For Clear";   
    testResults.appendChild(messageElement);   
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(num.getNum(), 0);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // CLEAR ALL THE TRANSACTIONS
    tps.clearAllTransactions();
    userAssert.assertEquals(35, num.getNum());
    userAssert.assertEquals(0, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(0, tps.getUndoSize());

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(70, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());

    // CLEAR THEM ALL OUT AGAIN
    tps.clearAllTransactions();
    userAssert.assertEquals(70, num.getNum());
    userAssert.assertEquals(0, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(0, tps.getUndoSize());

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(105, num.getNum());
    userAssert.assertEquals(3, tps.getSize());
    userAssert.assertEquals(0, tps.getRedoSize());
    userAssert.assertEquals(3, tps.getUndoSize());
  }
}
