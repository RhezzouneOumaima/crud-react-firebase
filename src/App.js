import { useEffect, useState } from 'react';
import './App.css';
import {db} from './firebase-config'
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from 'firebase/firestore'
import { async } from '@firebase/util';

function App() {
  const [users,setUsers]= useState([]);
  const [newName,setnewName]= useState("");
  const [newAge,setnewAge]= useState(0);
  const userCollectionRef = collection(db,"users")

  const createUser = async() =>{

await addDoc(userCollectionRef,{name:newName,age:Number(newAge)})
window.location.reload(false);
  }

  const updateUser = async(id,age) =>{
    const userDoc = doc(db,"users",id)
    const newFields = {age : age+1}
    await updateDoc(userDoc,newFields)
    window.location.reload(false);

      }
      const deleteUser = async(id) =>{
        const userDoc = doc(db,"users",id)
        await deleteDoc(userDoc)
        window.location.reload(false);

          }
  useEffect(() =>
  {
    const getUsers = async () => {
       const data = await getDocs(userCollectionRef);
       setUsers(data.docs.map((doc) => ({...doc.data(),id: doc.id})))
    }

    getUsers()

  },[])
  return (
    <div className="App">
      <input placeholder='Name...' onChange={(event) => {
        setnewName(event.target.value);
      }}/>
      <input type='number' placeholder='Age...' onChange={(event) => {
        setnewAge(event.target.value);
      }}/>
      <button onClick={createUser}>Create user</button>
      <table border="1">

        <tr><th>Name</th><th>Age</th><th>Action</th></tr>
        {users.map((user) => { return <tr>
        <td>{user.name}</td><td>{user.age}</td><td>  <button onClick={() => {updateUser(user.id,user.age)}}>increase age</button>
        <button onClick={() => {deleteUser(user.id)}}>Delete user</button></td></tr>})}
      </table>
  
    </div>
  );
}

export default App;
