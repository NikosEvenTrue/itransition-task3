import {useCookies} from 'react-cookie';
import API from "../shared/API"
import {useNavigate} from "react-router";

function Toolbar({getCheckedPeople}) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const block = async () => {
        let loginData = (await API.setIsBlockedToPeople(cookies.autorizedData, true, getCheckedPeople()));
        setCookie("autorizedData", loginData);
        window.location.reload();
    }

    const unblock = async () => {
        let loginData = (await API.setIsBlockedToPeople(cookies.autorizedData, false, getCheckedPeople()));
        setCookie("autorizedData", loginData);
        window.location.reload();
    }

    const del = async () => {
        let loginData = (await API.deletePeople(cookies.autorizedData, getCheckedPeople()));
        setCookie("autorizedData", loginData);
        window.location.reload();
    }

    return (
        <div>
            <input onClick={block} type="button" value="block"/>
            <input onClick={unblock} type="button" value="unblock"/>
            <input onClick={del} type="button" value="delete"/>
        </div>
    );

}

export default Toolbar;
