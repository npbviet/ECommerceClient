import { Form, useActionData, NavLink } from "react-router-dom";
import Button from "../../components/Button";
import classes from "./RegisterForm.module.css";

const RegisterForm = () => {
  const error = useActionData();

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      {error && <p className={classes.error}>{error.message}</p>}

      <Form method="post" className={classes.form}>
        <input type="hidden" name="mode" value="signup" />
        <input type="text" name="fullname" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          className={classes.lastInput}
          type="tel"
          name="phone"
          placeholder="Phone"
          required
        />

        <div className={classes.actions}>
          <Button type="submit">SIGN UP</Button>
          <div className={classes.toggle}>
            Login?
            <NavLink className={classes.navLink} to={"/login"}>
              Click
            </NavLink>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default RegisterForm;
