import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    useTitle('Login');

    const emailRef = useRef();
    const pwdRef = useRef();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);

    const [password, setPassword] = useState("");
    const [pwdValid, setPwdValid] = useState(false);

    useEffect(() => {
        emailRef?.current?.focus();
    }, []);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(EMAIL_REGEX.test(newEmail));
    };

    const handlePwdChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPwdValid(PWD_REGEX.test(newPassword));
    };

    return (
        <section className="public">
            <header>
                <h1><span className="nowrap">FlexiBlog</span></h1>
            </header>
            <main className="public__main">
                <div className="login" style={{ width: "400px" }}>
                    <div className="form-container">
                        <h1 className="text-center">Login</h1><br />
                        <form>
                            {/* Email */}
                            <div className="mb-3">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={`form-control ${emailValid ? "" : "is-invalid"}`}
                                    ref={emailRef}
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePwdChange}
                                    className={`form-control ${pwdValid ? "" : "is-invalid"}`}
                                    ref={pwdRef}
                                />
                            </div>
                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!emailValid || !pwdValid}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <footer>
                <Link to="/" className="btn btn-link">Home</Link>
                <span className="space"></span>
                <Link to="/register" className="btn btn-link">Sign Up</Link>
            </footer>
        </section>
    );
}

export default Login;
