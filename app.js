const sigin = async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value
    // console.log(email, password);

    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // console.log(result);
        await result.user.updateProfile({
            displayName: "User"
          })
        createusercollection(result.user)
        await result.user.sendEmailVerification()

        alert(` wellcom ${result.user.email}`)
        
    } catch (err) {
        console.log(err);
        alert(err.message)
        createusercollection(null)
        
    }
}



const login = async (e) => {
    e.preventDefault()
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value
    // console.log(email, password);

    try {
        const result = await firebase.auth().signInWithEmailAndPassword( email, password)
        
        console.log(result);
        alert(` user is successfullu login ${result.user.email}`)
    } catch (err) {
        alert(err.message)
    }
}

const logout = (e)=>{
    e.preventDefault()
    firebase.auth().signOut()

      


}
const unsubscribe = firebase.auth().onAuthStateChanged( (user) => {
    if (user) {
        getuserinfoRealtimes(user.uid)
    console.log(user);

    } else {
    console.log(`user successfully log out`);
    alert(`user successfully log out`)
    getuserinfoRealtimes(null)

    }
  })

;