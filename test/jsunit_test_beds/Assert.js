class Assert{
   

    assertEquals(num1, num2){
        if (num1 === num2){
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }
    }

    assertTrue(boolean){

        if (boolean){
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }
    }

    assertFalse(boolean){

        if (boolean === false){
            console.log("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }

    }

}