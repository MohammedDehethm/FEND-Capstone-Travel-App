function validateName() {
    let nameCity = document.getElementById("cityName").value;
    if (nameCity  === "") {
      alert("There is no value");
      return false;
    }
  }
  export{validateName}