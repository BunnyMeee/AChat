var firebaseConfig = {
      apiKey: "AIzaSyB8E4rciN76w_sIsoiRd0-8yp0YgQPO46k",
      authDomain: "kwitter-12536.firebaseapp.com",
      databaseURL: "https://kwitter-12536-default-rtdb.firebaseio.com",
      projectId: "kwitter-12536",
      storageBucket: "kwitter-12536.appspot.com",
      messagingSenderId: "266532523383",
      appId: "1:266532523383:web:0a5a435456eeb7aebfe572",
      measurementId: "G-61D2ZCR0BD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome " + user_name + "!";
function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"

      });
      localStorage.setItem("room_name", room_name);
      window.location = "AChat_page.html";


}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room Name :" + Room_names);
                  row = "<div class='room_name' id = " + Room_names + "onclick = 'redirecttoroomname(this.id)'>#" + Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML += row;


            });
      });
}
getData();

function redirecttoroomname(Name) {
      console.log(Name);
      localStorage.setItem("room_name", Name);
      window.location = "AChat_page.html";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}