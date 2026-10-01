const login = document.getElementById("signin")
const email = document.getElementById("email")
const password = document.getElementById("password")

login.addEventListener("click", async function(){
    await firebase.auth().signInWithEmailAndPassword(email.value,password.value)
    .then(async(login)=>{
        console.log(login.user.uid)
        await firebase.database().ref("user").child(login.user.uid).get()
        .then((db)=>{
            console.log(db.val())
            localStorage.setItem("loginUser",login.user.uid) 
        })
        .catch((e)=>{
            console.log(e)
        })
        alert("login succesfully")
        setTimeout(()=>{
            window.location.replace("dashbaord.html")
        },1000)
    })
    .catch((err)=>{
        alert(err)
    })
})
function SignLogin() {  
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
        .signInWithPopup(provider)
        .then((snap) => {
            console.log(snap.user)
            console.log(snap.user.email)
            console.log(snap.user.displayName)
            console.log(snap.user.photoURL)






        })
        .catch((e) => {
            console.log(e)
        })
}
