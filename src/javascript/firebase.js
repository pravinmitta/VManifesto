import * as firebase from 'firebase'
let database
export const init = () => {
  let config = {
     apiKey: "AIzaSyD8a9zSaGFud3do7QYNnqL_zbqxlWqcalk",
    authDomain: "villagevala-bbf60.firebaseapp.com",
    databaseURL: "https://villagevala-bbf60.firebaseio.com",
    projectId: "villagevala-bbf60",
    storageBucket: "villagevala-bbf60.appspot.com",
    messagingSenderId: "443678270858"
  }
  firebase.initializeApp(config)
  database = firebase.database()


}

export const getSectionsDB = () => {
  return database.ref('/').once('value')
}
export const InsertData = (data) => {
  
  return database.ref('/ManifestoData').push(data)
}