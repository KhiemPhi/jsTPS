class Assert{
   

    assertEquals(num1, num2, div){
        if (num1 === num2){
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Passed";
            messageElement.setAttribute("class", "test_passed_message")
            testResults.appendChild(messageElement);
                     
            let result = document.createElement("div");     
            let string1 =  "Expected ".concat(num1.toString()).concat(" ");
            let string2 =  "Actual ".concat(num2.toString());    
            result.innerHTML =  string1.concat(string2);
            
            messageElement.appendChild(result);

            console.log ("Test Passed");
        }else{
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Failed";
            messageElement.setAttribute("class", "test_failed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Faled");

            let result = document.createElement("div");     
            let string1 =  "Expected ".concat(num1.toString()).concat(" ");
            let string2 =  "Actual ".concat(num2.toString());    
            result.innerHTML =  string1.concat(string2);
            
            messageElement.appendChild(result);
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

            let result = document.createElement("div");     
            let string1 =  "Expected ".concat("true ");
            let string2 =  "Actual ".concat(boolean.toString());    
            result.innerHTML =  string1.concat(string2);
            
            messageElement.appendChild(result);


            console.log ("Test Passed");
        }else{
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Failed";
            messageElement.setAttribute("class", "test_failed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Faled");

            let result = document.createElement("div");     
            let string1 =  "Expected ".concat("true ");
            let string2 =  "Actual ".concat(boolean.toString());    
            result.innerHTML =  string1.concat(string2);
            
            messageElement.appendChild(result);
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

            let result = document.createElement("div");     
            let string1 =  "Expected ".concat("false ");
            let string2 =  "Actual ".concat(boolean.toString());    
            result.innerHTML =  string1.concat(string2);
            
            messageElement.appendChild(result);

        }else{
            let testResults = document.getElementById(div);            
            let messageElement = document.createElement("div");           
            messageElement.innerHTML =  "Test Failed";
            messageElement.setAttribute("class", "test_failed_message")
            testResults.appendChild(messageElement);
            console.log ("Test Faled");

            let result = document.createElement("div");     
            let string1 =  "Expected ".concat("false ");
            let string2 =  "Actual ".concat(boolean.toString());    
            result.innerHTML =  string1.concat(string2);
            
            messageElement.appendChild(result);
            console.error("Test Did Not Passed");
        }

    }

}