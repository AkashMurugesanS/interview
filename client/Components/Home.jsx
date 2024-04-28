import React from 'react'
import { Link } from 'react-router-dom'
import { useDeletePropertyApiMutation, useGetallPropertyQuery } from '../src/Features/apiCall';

export default function Home() {

  const  { data, isError, isLoading, isSuccess } =
    useGetallPropertyQuery();
    console.log(data)

    const [deleteDetailssend, { dataa, isErrorr, isLoadingg, isSuccesss }] =
    useDeletePropertyApiMutation();

    
  const deleteSubmit = async (event,propertyid) => {

    event.preventDefault()
    console.log("Received values of form: ", propertyid);
    try {
      const abcd = await deleteDetailssend(propertyid).unwrap();

        alert(
          "sucess!",
        );
        navigate("/");
      
    } catch (error) {
      if (error && error?.status != 200) {
        alert({
          "message": "Fail!",
          "description": error?.message,
        });
      }
    }
  };

  return (
    <div>
      <Link to='/create'>
      <button className="btn btn-primary">Create</button>
      </Link>

<div className='row'>
  {data?.map(e=>(
      <div className="col-4">

    <div className="card mt-3" >
    <div className="card-body">
      <h4 className="card-title">{e.propertyName}</h4>
      <p className="card-text">{e.description}</p>
      <a href="#" className="btn btn-primary">
        {e.type}</a>
        <button className='btn btn-danger mx-4' onClick={(event)=>deleteSubmit(event,e._id)}>Delete</button>
    </div>
    {/* <img class="card-img-bottom" src="../bootstrap4/img_avatar6.png" alt="Card image" style="width:100%"/> */}
  </div>
  </div>
  
  ))}
</div>


    </div>
  )
}
