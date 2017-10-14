var config = {
    apiKey: "AIzaSyDya419AToHv1epe3xXoskZquVBW5Hpblc",
    authDomain: "dashboard-cognitivo.firebaseapp.com",
    databaseURL: "https://dashboard-cognitivo.firebaseio.com",
    projectId: "dashboard-cognitivo",
    storageBucket: "dashboard-cognitivo.appspot.com",
    messagingSenderId: "509643270121"
  };
function ready(fn){
    if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    }else{
    document.addEventListener('DOMContentLoaded',fn);
    }
}
ready(function(){
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
        var msg=document.querySelector("#message");
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            msg.textContent="Bem vindo "+displayName;
            
            firebase.database().ref('contacts').once('value',function(snapshot){
                snapshot.forEach(function(item){
                    var obj=item.val();
                    var table=document.querySelector("#contacts");

                    var date=document.createElement("td");
                    date.textContent=new Date(obj.date).toLocaleDateString();
                    date.title=new Date(obj.date).toString()

                    var message=document.createElement("td");
                    message.textContent=obj.message;

                    var email=document.createElement("td");
                    email.textContent=obj.email;

                    var name=document.createElement("td");
                    name.textContent=obj.name;
                    
                    var row=document.createElement("tr");
                    row.appendChild(date);
                    row.appendChild(name);
                    row.appendChild(email);
                    row.appendChild(message);
                    
                    table.appendChild(row);
                });
            });


        } else {
          msg.textContent="Você não está autenticado";
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider);
        }
      });
});

