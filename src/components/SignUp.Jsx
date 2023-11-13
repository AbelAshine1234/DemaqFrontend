import React from "react"
import img from '../assets/img/mic.jpg'
import edit from '../assets/img/edit.jpg'

const Signup =()=>{
    return(
        
        <div className="Signup">
           <div className="grid grid-flow-col gap-4 mt-24 mx-72  h-3  " >
           <div class="grid grid-cols-2 gap-0  shadow-md rounded" >
                <div >
                  <img src={img} className="object-contain  w-full"/> 
                </div>
                <div className="bg-dark2 px-12">
                <div class="w-full max-w-xs ">
                  <form >
                    <div class="mb-4 mt-12">
                        <p className="text-center bold text-white font-bold text-xl pb-12   ">Demaq's Sign Up</p>
                      <label class="block text-green1 text-sm font-bold mb-2" for="username">
                        Username
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                    </div>

                    <div class="mb-4 mt-4">
                      <label class="block text-green1 text-sm font-bold mb-2" for="username">
                        Email
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Abebe@gmail.com"/>
                    </div>
                    
                    <div class="mt-4">
                      <label class="block text-green1 text-sm font-bold mb-2" for="password">
                        Password
                      </label>
                      <input class="shadow appearance-none border border-green1 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                      <p class="text-white text-xs italic"></p>
                    </div>

                    <div class="">
                      <label class="block text-green1 text-sm font-bold mb-2" for="password">
                        Confirm Password
                      </label>
                      <input class="shadow appearance-none border border-green1 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                      
                    </div>
                    <div class=" items-center">
                      <button class="bg-green1 hover:bg-green2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto mt-5" type="button">
                        Sign Up
                      </button>
                      <p class="  text-sm text-white mt-8" href="#">
                        Already have an account? <a className="text-green1" href="/login">Login</a>
                      </p>
                    </div>
                  </form>
  
                </div>
                    
                </div>
                
               
            </div>

           </div>
        </div>
    )
}
export default Signup;