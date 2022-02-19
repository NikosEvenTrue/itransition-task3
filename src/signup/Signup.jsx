import {useCookies} from 'react-cookie';
import {useEffect, useState} from "react";
import API from "../shared/API"
import SignupData from "../shared/SignupData";
import {useNavigate} from "react-router";

function Signup() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [forms, setForms] = useState({})
    const [inputError, setInputError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.autorizedData != null)
            if (cookies.autorizedData.email != null && cookies.autorizedData.pass_word.length == 64)
                navigate("/")
    }, []);

    const handlerOnBlur = (event) => {
        let newForms = {...forms};
        newForms[event.target.name] = event.target.value;
        setForms(newForms);
    }

    const signup = async (event) => {
        event.preventDefault();
        if (isValid()) {
            let loginData = await API.signup(cookies.autorizedData, new SignupData(forms.name, forms.email, new Date(), forms.password));
            setCookie("autorizedData", loginData)
            navigate("/")
        }
    }

    const isValid = () => {
        let newInputError = {...inputError};
        newInputError["email"] = !isEmailValid(forms.email);
        newInputError["name-length"] = !(forms.name.length > 0);
        newInputError["repeat-password-match"] = !(forms.password === forms["repeat-password"]);
        newInputError["password-length"] = !(forms.password.length > 0);
        setInputError(newInputError);
        let isAnyError = false;
        for (const prop in newInputError)
            isAnyError = isAnyError || newInputError[prop];
        return !isAnyError;
    }

    const isEmailValid = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <form className="">
                        <div className="">
                            <label className="">name:<br/>
                                <input onBlur={handlerOnBlur} className="" name="name" type="text"/>
                            </label><br/>
                            {inputError["name-length"] ? <div>name has to contain one character at least</div> :
                                <div></div>}
                            <label className="">e-mail:<br/>
                                <input onBlur={handlerOnBlur} className="" name="email" type="text"/>
                            </label><br/>
                            {inputError["email"] ? <div>wrong e-mail format</div> : <div></div>}
                            <label>password:<br/>
                                <input onBlur={handlerOnBlur} className="" name="password" type="password"/>
                            </label><br/>
                            {inputError["password-length"] ? <div>password has to contain one character at least</div> :
                                <div></div>}
                            <label>repeat password:<br/>
                                <input onBlur={handlerOnBlur} className="" name="repeat-password" type="password"/>
                            </label><br/>
                            {inputError["repeat-password-match"] ? <div>passwords don't match</div> : <div></div>}
                            <button type="submit" onClick={signup}>signup</button>
                        </div>
                    </form>
                    <div>
                        Already have account?
                    </div>
                    <div>
                        <a href="/login">login</a>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );

}

export default Signup;
