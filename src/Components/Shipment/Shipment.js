import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const onSubmit = data => {
      console.log('data submiteed',data)
    };
  console.log(watch("example")); 
    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

           {/* <input name="example" defaultValue={loggedInUser.name} ref={register} /> */}
           <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name" />
          {errors.name && <span className="error">Name is required</span>}

           <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
          {errors.email && <span className="error">email is required</span>}

           <input name="address" ref={register({ required: true })} placeholder="Your address"/>
          {errors.address && <span className="error">address is required</span>}

           <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number"/>
          {errors.phone && <span className="error">Phone is required</span>}
          <input type="submit" />
        </form>
      );
};

export default Shipment;