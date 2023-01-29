import { FC } from "react";

export const SignUp: FC = () => {
  return (
    <div className="authorization">
      <form>
        <h2>Register</h2>
        <div className="form-div">
          <label className="form-tag">Name</label>
          <input type="text" placeholder="Insert your name" name="name" />
        </div>
        <div className="form-div">
          <label className="form-tag">Email</label>
          <input type="text" placeholder="Insert your email" name="email" />
        </div>
        <div className="form-div">
          <label className="form-tag">Password</label>
          <input type="text" placeholder="Insert your password" name="email" />
        </div>
        <div className="form-div">
          <label className="form-tag">Confirm password</label>
          <input type="text" placeholder="Confirm your password" name="email" />
        </div>
        <div className="form-confirm">
          <a href="/login">Login</a>
          <button className="btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
