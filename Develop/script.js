// Assignment code here
var ourPasswordCriteria = {
  //our password has several criteria: length, upper/lowercase, numeric, and special characters.
  actualPassword: "",
  length: 0,
  lowercase: false,
  lppercase: false,
  numeric: false,
  specialCharacters: false
}

//WHEN I click the button to generate a password I am presented with a series of prompts for password criteria

//WHEN prompted for password criteria I select which criteria to include in the password

//WHEN prompted for the length of the password I choose a length of at least 8 characters and no more than 128 characters
ourPasswordCriteria.length = getPasswordLength();


//WHEN asked for character types to include in the password I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters

//WHEN I answer each prompt my input should be validated and at least one character type should be selected

//WHEN all prompts are answered a password is generated that matches the selected criteria

//WHEN the password is generated the password is either displayed in an alert or written to the page


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function getPasswordLength() {
  var passwordIsAcceptableLength = false;

  while(passwordIsAcceptableLength == false){
    var tempPasswordLength = prompt("please select a positive integer how long you want your password to be (min 8, max 128 characters): ");

    //first test examining whether the number is in our range of 8-128.
    if( tempPasswordLength >= 8 && tempPasswordLength <= 128){
      //second test examining whether the number is an integer.
      if(tempPasswordLength != Math.trunc(tempPasswordLength)){
        alert("You have entered a non-integer between 8 and 128. We are rounding this number down from "+tempPasswordLength+" to "+Math.trunc(tempPasswordLength)+".");
        tempPasswordLength = Math.trunc(tempPasswordLength);
      }
        passwordIsAcceptableLength = true;
    }
    else{
      alert("You have not entered an acceptable password length. Please try again.");
    }
  
  }
  alert("Thank you. Your password will be " + tempPasswordLength+" characters long.");
  return(tempPasswordLength);
}