export const Login = () => {
  return (
    <div className="authorization">
      <form>
        <h2>Login</h2>
        <div className="form-div">
          <label className="form-tag">Email</label>
          <input type="text" placeholder="Insert your email" name="email" />
        </div>
        <div className="form-div">
          <label className="form-tag">Password</label>
          <input type="text" placeholder="Insert your password" name="email" />
        </div>
        <div className="form-confirm">
          <a href="/sign-up">Register</a>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
