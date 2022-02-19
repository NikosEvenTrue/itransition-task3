import {useCookies} from 'react-cookie';
import {useEffect, useState} from "react";
import API from "../shared/API";
import SignupData from "../shared/SignupData";
import LoginData from "../shared/LoginData";
import {useNavigate} from "react-router";

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [forms, setForms] = useState({})
    const [noSuchUserError, setNoSuchUserError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.autorizedData.email != null && cookies.autorizedData.pass_word.length == 64)
            navigate("/")
    }, []);

    const login = async (event) => {
        event.preventDefault();
        let loginData = await API.login(cookies.autorizedData, new LoginData(forms.email, forms.password));
        if (loginData.email != null && loginData.pass_word != null) {
            setCookie("autorizedData", loginData);
            navigate("/");
        } else
            setNoSuchUserError(true)
    }

    const handlerOnBlur = (event) => {
        let newForms = {...forms};
        newForms[event.target.name] = event.target.value;
        setForms(newForms);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <form className="">
                        <div className="">
                            <label className="">e-mail:<br/>
                                <input onBlur={handlerOnBlur} className="" name="email" type="text"/>
                            </label><br/>
                            <label>password:<br/>
                                <input onBlur={handlerOnBlur} className="" name="password" type="password"/>
                            </label><br/>
                            {noSuchUserError ? <div>Wrong e-mail or password</div> : <div></div>}
                            <button onClick={login} type="submit">login</button>
                        </div>
                    </form>
                    <div>
                        Don't have account yet?
                    </div>
                    <div>
                        <a href="/signup">create account</a>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );

}

export default Login;
