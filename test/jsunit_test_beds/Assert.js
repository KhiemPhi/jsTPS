class Assert{
   

    assertEquals(num1, num2){
        if (num1 === num2){
            let testResults = document.getElementById("testResults");            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Passed";
            messageElement.setAttribute("class", "test_passed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }
    }

    assertTrue(boolean){

        if (boolean){
            let testResults = document.getElementById("testResults");            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Passed";
            messageElement.setAttribute("class", "test_passed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }
    }

    assertFalse(boolean){

        if (boolean === false){
            let messageElement = document.createElement("div");
            messageElement.innerHTML =  "Test Passed";
            console.log("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }

    }

}