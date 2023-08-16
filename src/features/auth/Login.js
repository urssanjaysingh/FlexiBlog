import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    useTitle('Login');

    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('')

    const [userValid, setUserValid] = useState(false)
    const [pwdValid, setPwdValid] = useState(false)

    const [success, setSuccess] = useState(false);

    const handleUserChange = (e) => {
        const newUser = e.target.value;
        setUsername(newUser);
        setUserValid(USER_REGEX.test(newUser));
    };

    const handlePwdChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPwdValid(PWD_REGEX.test(newPassword));
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef?.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setSuccess(true);
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="public">
            <header>
                <h1><span className="nowrap">FlexiBlog</span></h1>
            </header>
            <main className="public__main">
                <div className="login" style={{ width: "400px" }}>
                    {success ? (
                        <div className="text-center">
                            <h1>Success!</h1>
                            <br />
                        </div>
                    ) : (
                        <div className="form-container">
                            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                            <h1 className="text-center">Login</h1><br />
                                <form onSubmit={handleSubmit}>
                                {/* User */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="user"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUserChange}
                                        className={`form-control ${userValid ? "" : "is-invalid"}`}
                                        ref={userRef}
                                        autoComplete="off"
                                        required
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
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="button-container">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!userValid || !pwdValid}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
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
