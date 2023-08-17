import React from 'react'
import Base from '../Base/Base'

import { useHistory } from 'react-router-dom';

function Students({students, setStudents}) {
   const history = useHistory();
    // delete functionality
    const deleteStudent = async (studId)=>{
      console.log(studId)
      const response = await fetch(`https://assign-mentor-2ge7.onrender.com/app/delete/${studId}`, {
         method:"DELETE",
      });

      const data = await response.json()
     if(data){
       const remainingStudents = 
       students.filter((stud, idx)=> stud._id !== studId)
       setStudents(remainingStudents)
     }
    }

  
  return (
    <Base 
    title={"Students Dashboard"}
    description={"The page contains all students data"}
    >

         <div className='card-container'>
            {students.map((stud, idx)=>(
                     <div className='card' key={idx}>
                        <div className='content'>
                     <h3>{stud.name}</h3>
                     <p>{stud.batch}</p>
                     <p>{stud.gender}</p>
                     <p>{stud.qualification}</p>
                     </div>

                     <div className='control'>
                     <button onClick={()=>history.push("/edit/"+stud._id)}>edit</button> {" "}
                     <button  onClick={()=>deleteStudent(stud._id)}>delete</button>
                     </div>
                    </div>
            ))}
     </div>

    </Base>
  )
}

export default Students
//crud
// read
//delete
//add
//update
// const arr = [1, 2, 3, 4, 5, 10, 15]

// function deleteFromArray(arr, num){
//   console.log(arr)
//   const removedArra = arr.filter((data, index)=>data != num)
//   console.log(removedArra)
// }

//deleteFromArray(arr, 4)