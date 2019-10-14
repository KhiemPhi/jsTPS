class Assert{
   

    assertEquals(num1, num2, div){
        if (num1 === num2){
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Passed";
            messageElement.setAttribute("class", "test_passed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }
    }

    assertTrue(boolean,div){

        if (boolean){
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Passed";
            messageElement.setAttribute("class", "test_passed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }
    }

    assertFalse(boolean,div){

        if (boolean === false){
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Passed";
            messageElement.setAttribute("class", "test_passed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Passed");
        }else{
            console.error("Test Did Not Passed");
        }

    }

}