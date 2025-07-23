import { useEffect, useRef } from "react";
import { NavLink, useActionData, Form } from "react-router-dom";
import Button from "../../components/Button";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const actionData = useActionData();
  const passwordRef = useRef();

  useEffect(() => {
    if (actionData?.clearPassword && passwordRef.current) {
      passwordRef.current.value = "";
    }
  }, [actionData]);

  return (
    <section className={classes.auth}>
      <h1>Sign In</h1>
      {actionData?.message && (
        <p className={classes.error}>{actionData.message}</p>
      )}
      <Form method="post" className={classes.form}>
        <input type="hidden" name="mode" value="login" />
        <input type="email" name="email" placeholder="Email" required />
        <input
          ref={passwordRef}
          className={classes.lastInput}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div className={classes.actions}>
          <Button type="submit">SIGN IN</Button>
          <div className={classes.toggle}>
            Create an account?{" "}
            <NavLink className={classes.navLink} to={"/register"}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default LoginForm;
