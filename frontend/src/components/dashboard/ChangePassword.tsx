import React from 'react';

const ChangePassword = () => {
    return (
        <div>
          <h2>Change Password </h2>
          <form>
              <div>
                  <label htmlFor="old_password">Old Password</label>
              <input type="password" name="old_password" id="old_password"  placeholder='Old Password'/>
              </div>
  
              <div>
                  <label htmlFor="new_password">New Password</label>
              <input type="password" name="new_password" id="new_password"  placeholder='New Password'/>
              </div>
  
              <div>
                  <label htmlFor="confirm_password">Confirm Password</label>
              <input type="password" name="confirm_password" id="confirm_password"  placeholder='Confirm Password'/>
              </div>
              <div>
                  <button>Update Password </button>
              </div>
          </form>

      </div>
    );
};

export default ChangePassword;
