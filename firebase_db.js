const userdetails = document.querySelector(".userdetail");
const editsprofile = document.getElementById("editsprofile");
function createusercollection(user) {
    firebase.firestore()
        .collection("users")
        .doc(user.uid)
        .set({
            uid:user.uid,
            name:user.displayName,
            email:user.email,
            phone:"",
            course:"",
            protfoliourl:"",
            experience:"",

        })
}
// const mypara = document.qetElementbyId()
async function getuserinfoRealtimes(userID) {
    if (userID) {
        const userdocRef = await firebase.firestore()
            .collection("users")
            .doc(userID)
        userdocRef.onSnapshot((doc) => {
            if (doc.exists) {
                const userinfo = doc.data();
                if (userinfo) {
                    userdetails.innerHTML = `
                            <h3 class="hi">${userinfo.name}</h3>
                            <h3 class="hi"> ${userinfo.email}</h3>
                           
                            <h3 class="hi">${userinfo.phone}</h3>
                             <h3 class="hi">${userinfo.course}</h3>
                            <h3 class="hi">${userinfo.protfoliourl}</h3>
                             <h3 class="hi">${userinfo.experience}</h3>

                       `
                        editsprofile["name"].value = userinfo.name
                        editsprofile["profileemail"].value = userinfo.email
                        editsprofile["phone"].value = userinfo.phone
                        editsprofile["course"].value = userinfo.course
                        editsprofile["protfoliourl"].value = userinfo.protfoliourl
                        editsprofile["experience"].value = userinfo.experience

                        
                        if(firebase.auth().currentUser.photoURL){
                            document.querySelector("#propic").src = firebase.auth().currentUser.photoURL 
                        }
      
                }
            }
        })

    } else {
        userdetails.innerHTML = `
        <h3> please login </h3>
        `
    }
}


function userupdata(e) {
    e.preventDefault()
    const userDocRefs = firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

    userDocRefs.update({
        name:editsprofile["name"].value,
        email:editsprofile["profileemail"].value,
        // gender:editsprofile["gender"].value,
        phone:editsprofile["phone"].value,
        course:editsprofile["course"].value,
        protfoliourl:editsprofile["protfoliourl"].value,
        experience:editsprofile["experience"].value,
    })
}




function uploading(e) {
    const uid = firebase.auth().currentUser.uid;
    const fileRef = firebase.storage().ref().child(`/users/${uid}/profile`);
    const uploadTask = fileRef.put(e.target.files[0])

    // var uploadTask = storageRef.child('images/rivers.jpg').put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
         
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          if(progress=='100')alert("uploaded pic")
          
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
        
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            firebase.auth().currentUser.updateProfile({
                photoURL: downloadURL
              })
          });
        }
      );
}


