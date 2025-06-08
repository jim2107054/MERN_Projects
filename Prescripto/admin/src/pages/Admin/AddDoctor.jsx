import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <div>
      <form>
        <p>Add Doctor</p>
        <div>
          <div>
            <label htmlFor='doc-img'>
              <img className='cursor-pointer' src={assets.upload_area} alt="" />
            </label>
            <input type="file" id='doc-img' hidden/>
            <p>Upload doctor <br />picture</p>
          </div>

          {/*----------Doctors Information----------*/}
          <div>
            <div>

              <div>
                <p>Doctor Name</p>
                <input type="text" placeholder='Enter doctor name' required/>
              </div>

              <div>
                <p>Doctor Email</p>
                <input type="email" placeholder='Enter doctor email' required/>
              </div>

              <div>
                <p>Doctor Password</p>
                <input type="password" placeholder='password' required/>
              </div>

              <div>
                <p>Experience</p>
                <select name="" id="">
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10+ Year">10+ Year</option>
                </select>
              </div>

              <div>
                <p>Fees</p>
                <input type="number" placeholder='fees' required/>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor