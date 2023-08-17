import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import{useParams} from 'react-router-dom'
function UpdateStudents({students, setStudents}) {
  const history = useHistory()
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
  const params = useParams()
  useEffect(() => {
    getStudentDetails();
  },)

  const getStudentDetails = async () => {
    let result = await fetch(`https://assign-mentor-2ge7.onrender.com/app/all/${params.id}`)
    result = await result.json()
    console.log(result)
    setName(result.data.name)
    setBatch(result.data.batch)
    setGender(result.data.gender)
    setQualification(result.data.qualification)
  
  }
  const UpdateStudent = async () => {
    // creating object from input states
    const updatedObject = {
            name : name,
            batch : batch,
            gender: gender,
            qualification :qualification
         }
    let result = await fetch(`https://assign-mentor-2ge7.onrender.com/app/edit-students/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, batch, gender, qualification }),
      headers: {
        "Content-Type":"application/json"
      }
    })

    const data  = await result.json()
    console.log(data)
    if (data) {
     console.log(updatedObject)
         students[params.id] = updatedObject
         setStudents([...students])
         history.push("/students")
     }
  }

  return (
    <Base
    title={"UpdateStudent"}
    description={"We can able to update students data here"}
    >
    <div>
        <input
        placeholder='Enter Name'
        type ="text"
        value = {name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input
        placeholder='Enter Batch'
        type ="text"
        value ={batch}
        onChange={(e)=>setBatch(e.target.value)}
        />

        <input
        placeholder='Enter Gender'
        type ="text"  
        value ={gender}
        onChange={(e)=>setGender(e.target.value)}
        />

        <input
        placeholder='Enter Qualification'
        type ="text" 
        value= {qualification}
        onChange={(e)=>setQualification(e.target.value)}
        />

        <button
        onClick={UpdateStudent}
        >Update Students</button>
    </div>
    </Base>
  )
}

export default UpdateStudents