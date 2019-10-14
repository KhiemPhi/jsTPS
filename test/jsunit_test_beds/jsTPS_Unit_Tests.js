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
    let testResults = document.getElementById("allTestResults");
    let messageElement = document.createElement("div");
    messageElement.setAttribute("class", "testCase");
    messageElement.setAttribute("id", "testAdd");
    messageElement.innerHTML = "Unit Tests Add";   
    testResults.appendChild(messageElement);
    let div = "testAdd";
   
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(0, num.getNum(), div);

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    userAssert.assertEquals(5, num.getNum(), div);
    userAssert.assertEquals(1, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(1, tps.getUndoSize(), div);

    // ADD 10 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    userAssert.assertEquals(15, num.getNum(), div);
    userAssert.assertEquals(2, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(2, tps.getUndoSize(), div);

    // ADD 15 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);
  }

  /**
   *
   */
  testAndMask() {
    let testResults = document.getElementById("allTestResults");
    let messageElement = document.createElement("div");
    messageElement.setAttribute("class", "testCase");
    messageElement.setAttribute("id", "testAndMask");
    messageElement.innerHTML = "Unit Tests For AndMask";  
    testResults.appendChild(messageElement);
    let div = "testAndMask";
    
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(0, num.getNum(), div);

    // ADD 12 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 12));
    tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
    userAssert.assertEquals(4, num.getNum(), div);
    userAssert.assertEquals(2, tps.getSize(), div);

    tps.undoTransaction();
    userAssert.assertEquals(12, num.getNum(), div);
    userAssert.assertEquals(2, tps.getSize(), div);
    userAssert.assertEquals(1, tps.getRedoSize(), div);
    userAssert.assertEquals(1, tps.getUndoSize(), div);

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 6));
    userAssert.assertEquals(0, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);

    tps.undoTransaction();
    userAssert.assertEquals(17, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(1, tps.getRedoSize(), div);
    userAssert.assertEquals(2, tps.getUndoSize(), div);
  }

  testOrMask() {
    let testResults = document.getElementById("allTestResults");
    let messageElement = document.createElement("div");
    messageElement.setAttribute("class", "testCase");
    messageElement.setAttribute("id", "testOrMask");
    messageElement.innerHTML = "Unit Tests For OrMask";    
    testResults.appendChild(messageElement);
    let div = "testOrMask";

    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(0, num.getNum(), div);

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 12));
    userAssert.assertEquals(13, num.getNum(), div);
    userAssert.assertEquals(2, tps.getSize(), div);

    // UNDO TRANSACTION
    tps.undoTransaction();
    userAssert.assertEquals(5, num.getNum(), div);
    userAssert.assertEquals(2, tps.getSize(), div);
    userAssert.assertEquals(1, tps.getRedoSize(), div);
    userAssert.assertEquals(1, tps.getUndoSize(), div);

    // ADD 10 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 12));
    userAssert.assertEquals(14, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
  }

  /**
   * This JUnit test is for testing the undoing of transactions.
   */
  testUndo() {
    let testResults = document.getElementById("allTestResults");
    let messageElement = document.createElement("div");
    messageElement.setAttribute("id", "testUndo");
    messageElement.setAttribute("class", "testCase");
    messageElement.innerHTML = "Unit Tests For Undo";   
    testResults.appendChild(messageElement); 
    let div = "testUndo";
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();

    userAssert.assertEquals(num.getNum(), 0, div);
    userAssert.assertFalse(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // UNDO A TRANSACTION
    tps.undoTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertTrue(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(15, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(1, tps.getRedoSize(), div);
    userAssert.assertEquals(2, tps.getUndoSize(), div);

    // UNDO ANOTHER
    tps.undoTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertTrue(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(5, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(2, tps.getRedoSize(), div);
    userAssert.assertEquals(1, tps.getUndoSize(), div);

    // AND ANOTHER
    tps.undoTransaction();
    userAssert.assertFalse(tps.hasTransactionToUndo(), div);
    userAssert.assertTrue(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(0, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(3, tps.getRedoSize(), div);
    userAssert.assertEquals(0, tps.getUndoSize(), div);

    // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
    tps.undoTransaction();
    userAssert.assertFalse(tps.hasTransactionToUndo(), div);
    userAssert.assertTrue(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(0, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(3, tps.getRedoSize(), div);
    userAssert.assertEquals(0, tps.getUndoSize(), div);
  }

  /**
   * This JUnit test is for testing the redoing of transactions.
   */
  testRedo() {
    let testResults = document.getElementById("allTestResults");
    let messageElement = document.createElement("div");
    messageElement.setAttribute("id", "testRedo");
    messageElement.setAttribute("class", "testCase");
    messageElement.innerHTML = "Unit Tests For Redo";   
    testResults.appendChild(messageElement);   
    let div = "testRedo";   
    
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(num.getNum(), 0, div);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // UNDO A TRANSACTION AND THEN REDO IT
    tps.undoTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // UNDO TWO TRANSACTIONS AND THEN REDO THEM
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // UNDO ALL THREE TRANSACTIONS AND REDO THEM
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // UNDO THREE TRANSACTIONS AND REDO TWO
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertTrue(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(15, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(1, tps.getRedoSize(), div);
    userAssert.assertEquals(2, tps.getUndoSize(), div);

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
    userAssert.assertTrue(tps.hasTransactionToUndo(), div);
    userAssert.assertFalse(tps.hasTransactionToRedo(), div);
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);
  }

  /**
   * This JUnit test is for testing clearing of transactions.
   */
  testClear() {
    let testResults = document.getElementById("allTestResults");
    let messageElement = document.createElement("div");
    messageElement.setAttribute("id", "testClear");
    messageElement.setAttribute("class", "testCase");
    messageElement.innerHTML = "Unit Tests For Clear";   
    testResults.appendChild(messageElement);   
    let div = "testClear";
    // WE'LL JUST USE A SIMPLE NUM FOR TESTING
    let tps = new jsTPS();
    let num = new Num();
    let userAssert = new Assert();
    userAssert.assertEquals(num.getNum(), 0, div);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(35, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // CLEAR ALL THE TRANSACTIONS
    tps.clearAllTransactions();
    userAssert.assertEquals(35, num.getNum(),div);
    userAssert.assertEquals(0, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(0, tps.getUndoSize(), div);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(70, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);

    // CLEAR THEM ALL OUT AGAIN
    tps.clearAllTransactions();
    userAssert.assertEquals(70, num.getNum(), div);
    userAssert.assertEquals(0, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(0, tps.getUndoSize(), div);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    userAssert.assertEquals(105, num.getNum(), div);
    userAssert.assertEquals(3, tps.getSize(), div);
    userAssert.assertEquals(0, tps.getRedoSize(), div);
    userAssert.assertEquals(3, tps.getUndoSize(), div);
  }
}
