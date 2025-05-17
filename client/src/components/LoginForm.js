const LoginForm = () => {
  return (
    <div>
      <form>
        <label>Please enter your username: </label>
        <input type="text" id="username" name="username" />
        <label>Please enter your password: </label>
        <input type="password" id="password" name="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
