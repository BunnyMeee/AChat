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
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0

      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        console.log(firebase_message_id);
                        console.log(message_data);
                        name1 = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];

                        name_with_tag = "<h4>" + name1 + "<img class='user_tick' src = 'tick.png'> </h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class ='btn btn-warning' id = " + firebase_message_id + "value =" + like + "onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class ='glyphicon glyphicon-thumbs-up'> like:" + like + "</span> </button> <hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;


                  }
            });

      });
}
getData();

function updateLike(message_id) {
      console.log("click On like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

