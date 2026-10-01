var Username =""
async function getCurrentUser(){
    var username=document.getElementById("username")
    var userId= localStorage.getItem("loginUser")
    var studentemail=document.getElementById("studentEmail")
    var studentname=document.getElementById("studentName")
    var studentimage = document.getElementById("stdImage")
    var studentCourse = document.getElementById("studentCourse")
    await firebase.database().ref("user").child(userId).get()
    .then((db)=>{
        console.log(db.val())
        // username.innerText+="WELCOME "+db.val()["name"]
        studentemail.innerText+=": "+db.val()["email"]
        studentname.innerText+=": "+db.val()["name"]
        studentimage.src=db.val()["image"]   
        studentCourse.innerText+=": "+db.val()["courseName"]
             new QRCode(document.getElementById("qrcode"),{
                text:JSON.stringify({
                    name :db.val()["name"],
                    email:db.val()["email"],

                }),
                // width:
                // heigth
            })
    })
};
function pdfDownload(){
    var card = document.getElementById("card")
    html2canvas(card,{
        scale:3,
        useCORS: true, 
    }).then((canva)=>{
        const image = canva.toDataURL("image/png")
        const {jsPDF} = window.jspdf;
        const pdf = new jsPDF()

        pdf.addImage(image,"PNG",50,50,100,61)

        pdf.save(`${Username}.pdf`)


    })
}
// a=>97
// A=>65

getCurrentUser();
 

function StartQuiz() {
    window.location.href = "quix.html";

}