const signup = document.getElementById("signup")
const email = document.getElementById("email")
const password = document.getElementById("password")
const name =document.getElementById("name")



signup.addEventListener("click", async function(){
    console.log(email.value,password.value)

         var courseKey = courseList.options[courseList.selectedIndex].getAttribute('key')
   console.log(courseKey)
   console.log(courseList.value)


   
   await firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
    .then(async(result)=>{
        if(result.user.uid){
            var imageUrl= await uplaodImage()
              await  firebase.database().ref("user").child(result.user.uid).set({
            email:email.value,
            password:password.value,
            name:name.value,
            image:imageUrl,
            courseName :courseList.value,
             courseKey :courseKey

        })
        // console.log(result)
        setTimeout(()=>{
            window.location.href = "login.html";
        },1000)
        }
    
})
    
    .catch((error)=>{
        alert(error)
        
})})

async function uplaodImage() {
    const fileInput=document.getElementById("imageuplaod")
    const file = fileInput.files[0]
    let imageUrl="";
    if(!file){
        return alert("slect profile photo")
    }
    const claudname = "b9utxkfn";
    const claudfolder = "quizapp";
    // const btn = document.getElementById("btn")
    // const laoding = document.getElementById("load")
    // btn.style.display="none";
    // laoding.style.display="inline"


    const formdata = new FormData()
    formdata.append("file",file)
    formdata.append("upload_preset",claudfolder)
    // try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${claudname}/image/upload`,{
        method:"POST",
        body: formdata
    }) 
    const data = await response.json()
    console.log(data);
    alert("photo uplaoded")
    // laoding.innerText="Image uploaded"
    imageUrl= data.secure_url
    return imageUrl
    
// }
//      catch(e){
//         alert("error" ,e)
//     }
}

let getAlLCourses = async () => {
    await firebase.database().ref("course").get().then((db) => {
        console.log(db.val()) //firebase data base human read form convert
        var arrList = Object.values(db.val()) //object to array
        console.log(arrList)
        for (var value of arrList) {
            console.log(value)
            courseList.innerHTML+=`
            <option key=${value.coursekey}>${value.courseName}</option>
            `
        }
        courseList.style.display="inline"
    })
    
        .catch((err) => {
            console.log(err)
        })
}

getAlLCourses()
