'use strict'
import jsTPS_Transaction from '../../src/jstps/jsTPS_Transaction.js'
import Num from './Num'

/**
 *
 * @author McKillaGorilla
 */
class AndMask_Transaction  {
    // THIS IS THE OBJECT IT WILL MANIPULATE
      

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    
    doTransaction() {
        this.andMask(mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    
    undoTransaction() {
        this.num.setNum(intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */

    toString() {
        return "And Mask " + mask;
    }
}