import { useState } from "react";
import { toast } from "sonner";



const Register = () => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: null,
        rollNumber: ""
    });
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value});
    }
    const handleRegistration = () => {
        if(!userDetails.username || !userDetails.password || !userDetails.rollNumber) {
            toast.error("Please enter all details.");
        } else {
            fetch("https://hall-booking-system-backend.onrender.com/api/v1/createUser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(userDetails),
            }).then( response => response.json())
            .then( response => {
                if(response.success) {
                    toast.success("User registered successfully.");
                } else {
                    toast.error(response.message);
                }
            })
        }
        setUserDetails({
            username: "",
            password: null,
            rollNumber: ""
        });
    }
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image" />
          </div>
          <div className="md:w-1/3 max-w-sm">
            <h1 className="text-5xl font-bold mb-10">Register</h1>
            <input onChange={handleChange} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" name="username" type="text" placeholder="Username" />
            <input onChange={handleChange} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" name="password" type="password" placeholder="Password" />
            <input onChange={handleChange} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" name="rollNumber" type="text" placeholder="Roll Number" />
            <div className="text-center md:text-left">
              <button onClick={handleRegistration} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              Already have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="/login">Login</a>
            </div>
          </div>
        </section>
      );
}
export default Register;