// Assignment code here
var ourPasswordCriteria = {
  //our password has several criteria: length, upper/lowercase, numeric, and special characters.
  length: 0,
  lowercase: false,
  uppercase: false,
  numeric: false,
  specialCharacters: false,
}

var myPassword = "";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  //WHEN I click the button to generate a password I am presented with a series of prompts for password criteria
  getPasswordCriteria();
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  //WHEN the password is generated the password is either displayed in an alert or written to the page
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//function that accepts a password length from the user. The length is: 8 <= length <= 128, and should only accept integers.
//WHEN prompted for the length of the password I choose a length from 8-128 characters.
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

//function that validates the answers input by the user.
function validateAnswer(answer, typeOfCharacter){
  if(answer){
    alert("You have selected 'yes', you do want "+typeOfCharacter+" in your password. They will be used.");
  }
  else{
    alert("You have selected 'no', you don't want "+typeOfCharacter+" in your password. They won't be used.");
  }
}

//function that will accept the user's input on what criteria is used for the password.
function getPasswordCriteria(){
  //WHEN prompted for the length of the password I choose a length of at least 8 characters and no more than 128 characters
  ourPasswordCriteria.length = getPasswordLength();

  //WHEN prompted for password criteria I select which criteria to include in the password
  //WHEN asked for character types to include in the password I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
  //please note: it appears we were supposed to use "confirm" for this. I wrote algorithms for each and have them saved with my functions.
  ourPasswordCriteria.lowercase = confirm("Would you like to use lowercase letters? Press 'OK' for yes, and 'Cancel' for no.");
  //WHEN I answer each prompt my input is validated
  validateAnswer(ourPasswordCriteria.lowercase, "lowercase letters");

  ourPasswordCriteria.uppercase = confirm("Would you like to use uppercase letters? Press 'OK' for yes, and 'Cancel' for no.");
  validateAnswer(ourPasswordCriteria.uppercase, "uppercase letters");

  ourPasswordCriteria.specialCharacters = confirm("Would you like to use special characters such as !,@,#,$, or %? Press 'OK' for yes, and 'Cancel' for no.");
  validateAnswer(ourPasswordCriteria.specialCharacters, "special characters");

    //WHEN I answer each prompt at least one character type should be selected.
  if(ourPasswordCriteria.lowercase == false && ourPasswordCriteria.uppercase == false && ourPasswordCriteria.specialCharacters == false){
    alert("You haven't selected either uppercase or lowercase letters, or special characters for your password; only numbers will be used.");
    ourPasswordCriteria.numeric = true;
  }
  else {
    ourPasswordCriteria.numeric = confirm("Would you like to use numbers? Press 'OK' for yes, and 'Cancel' for no.");
    validateAnswer(ourPasswordCriteria.numeric, "numbers");
  }
}

//WHEN all prompts are answered a password is generated that matches the selected criteria
//function that takes our inputted criteria for the password and creates a password based on it.
function generatePassword(){
  var temporaryPassword = "";
  var totalNumberPossibleCharacters = 0;
  var ourAcceptedCharacters = "";

  //building the string of our possible characters.
  if(ourPasswordCriteria.lowercase){
   //There are 26 lowercase letters.
    totalNumberPossibleCharacters += 26;
    ourAcceptedCharacters += "abcdefghijklmnopqrstuvwxyz";
    console.log("adding 26 characters for lowercase; totalNumberPossibleCharacters = "+totalNumberPossibleCharacters);
  }
  if(ourPasswordCriteria.uppercase){
    //There are 26 uppercase letters. 
    totalNumberPossibleCharacters += 26;
    ourAcceptedCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    console.log("adding 26 characters for uppercase; totalNumberPossibleCharacters = "+totalNumberPossibleCharacters);
  }
  if(ourPasswordCriteria.numeric){
    //There are 10 numbers.
    totalNumberPossibleCharacters += 10;
    ourAcceptedCharacters += "0123456789";
    console.log("adding 10 characters for numbers; totalNumberPossibleCharacters = "+totalNumberPossibleCharacters);
  }
  if(ourPasswordCriteria.specialCharacters){
    //I will be using 22 special characters. Note: instead of using a preset list, when asking whether to use special characters we could prompt the user for a list of characters to use.
    //This would take more work to ensure characters aren't repeated, as well as some altering of how we accept a base for password generation. As is, if we implemented a 
    //special character prompt function and the user entered just one character (or one character repeated several times), the password could only have that character. 
    totalNumberPossibleCharacters += 22;
    ourAcceptedCharacters += "!@#$%^&*()_+-=,./<>?;:"
    console.log("adding 22 characters for special characters; totalNumberPossibleCharacters = "+totalNumberPossibleCharacters);
  }

  //for loop to cycle through the full length of the password
  for(var currentPasswordPosition = 0; currentPasswordPosition < ourPasswordCriteria.length; currentPasswordPosition++){
    //generate  a random number based on the total number of possible characters
    var randomNumber = Math.floor(Math.random() * totalNumberPossibleCharacters);

    //figure out what character is being selected based on our available characters and the random number
    myPassword += ourAcceptedCharacters.charAt(randomNumber);
  }
  return myPassword;
}


//***UNUSED*** function that selects whether the user wants to use lowercase letters.
function selectLowercase(){
  var lowercaseDecided = false;
  while(lowercaseDecided == false){
      var yesOrNo = prompt("Please select whether you want to use lowercase letters by typing yes or no:");
      if(yesOrNo == "yes" || yesOrNo == "Yes" || yesOrNo == "Y" || yesOrNo == "y" || yesOrNo == 1 || yesOrNo == "lowercase" || yesOrNo == "Lowercase" || yesOrNo == "true"|| yesOrNo == "True"){
        alert("You have selected yes. Lowercase letters will be used.");
        lowercaseDecided = true;
        return true;
      }
      else if(yesOrNo == "no" || yesOrNo == "No" || yesOrNo == "N" || yesOrNo == "n" || yesOrNo == "2" || yesOrNo == "uppercase" || yesOrNo == "Uppercase" || yesOrNo == "false" || yesOrNo == "False"){
        alert("You have selected no. Lowercase letters will not be used.");
        lowercaseDecided = true;
        return false;
      }
      else{
        alert("You have not entered an acceptable response.")
      }
  }
}
//***UNUSED*** function that selects whether the user wants to use uppercase letters. 
//If both this function and selectLowercase() both return as false, then we will alert the user that no letters will be used.
function selectUppercase(){
  var uppercaseDecided = false;
  while(uppercaseDecided == false){
      var yesOrNo = prompt("Please select whether you want to use uppercase letters by typing yes or no:");
      if(yesOrNo == "yes" || yesOrNo == "Yes" || yesOrNo == "Y" || yesOrNo == "y" || yesOrNo == 1 || yesOrNo == "lowercase" || yesOrNo == "Lowercase" || yesOrNo == "true"|| yesOrNo == "True"){
        alert("You have selected yes. Uppercase letters will be used.");
        uppercaseDecided = true;
        return true;
      }
      else if(yesOrNo == "no" || yesOrNo == "No" || yesOrNo == "N" || yesOrNo == "n" || yesOrNo == "2" || yesOrNo == "uppercase" || yesOrNo == "Uppercase" || yesOrNo == "false" || yesOrNo == "False"){
        alert("You have selected no. Uppercase letters will not be used.");
        if(ourPasswordCriteria.lowercase == false){
          alert("Note: You have selected no for both lowercase and uppercase letters; no letters will be used for this password.");
        }
        uppercaseDecided = true;
        return false;
      }
      else{
        alert("You have not entered an acceptable response.")
      }

  }
}
//***UNUSED*** function that selects whether the user wants to use special characters.
function selectSpecialCharacters(){
  var specialCharactersDecided = false;
  while(specialCharactersDecided == false){
      var yesOrNo = prompt("Please select whether you want to use special characters (such as !,@,#, or $) by typing yes or no:");
      if(yesOrNo == "yes" || yesOrNo == "Yes" || yesOrNo == "Y" || yesOrNo == "y" || yesOrNo == 1 || yesOrNo == "lowercase" || yesOrNo == "Lowercase" || yesOrNo == "true"|| yesOrNo == "True"){
        alert("You have selected yes. special characters will be used.");
        specialCharactersDecided = true;
        return true;
      }
      else if(yesOrNo == "no" || yesOrNo == "No" || yesOrNo == "N" || yesOrNo == "n" || yesOrNo == "2" || yesOrNo == "uppercase" || yesOrNo == "Uppercase" || yesOrNo == "false" || yesOrNo == "False"){
        alert("You have selected no. Special characters will not be used.");
        specialCharactersDecided = true;
        return false;
      }
      else{
        alert("You have not entered an acceptable response.")
      }
  }
}
//***UNUSED*** function that selects whether numbers will be used.
//If lowercase, uppercase, and special characters are all false, then we will alert the user that only numbers will be used.
function selectNumbers(){
  var numbersDecided = false;
  while(numbersDecided == false){
    if(ourPasswordCriteria.lowercase == false && ourPasswordCriteria.uppercase == false && ourPasswordCriteria.specialCharacters == false){
      alert("You haven't selected letters or special characters for your password; only numbers will be used.");
      numbersDecided = true;
      return true;
    }
    else{
      var yesOrNo = prompt("Please select whether you want to use numbers by typing yes or no:");
      if(yesOrNo == "yes" || yesOrNo == "Yes" || yesOrNo == "Y" || yesOrNo == "y" || yesOrNo == 1 || yesOrNo == "lowercase" || yesOrNo == "Lowercase" || yesOrNo == "true"|| yesOrNo == "True"){
        alert("You have selected yes. Numbers will be used.");
        numbersDecided = true;
        return true;
      }
      else if(yesOrNo == "no" || yesOrNo == "No" || yesOrNo == "N" || yesOrNo == "n" || yesOrNo == "2" || yesOrNo == "uppercase" || yesOrNo == "Uppercase" || yesOrNo == "false" || yesOrNo == "False"){
        alert("You have selected no. Numbers will not be used.");
        numbersDecided = true;
        return false;
      }
      else{
        alert("You have not entered an acceptable response.")
      }
    }
  }
}