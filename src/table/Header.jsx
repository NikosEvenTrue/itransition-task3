import {useCookies} from "react-cookie";

function Header({logoutHandleOnClick}) {
    const [cookies] = useCookies();

    return (
        <div className="row">
            <div className="col-10">
                <div>Itransition Task 3</div>
                <div>user e-mail: {cookies.autorizedData != undefined ? cookies.autorizedData.email : null}</div>
            </div>
            <div className="col-2">
                <input type="button" value="logout" onClick={logoutHandleOnClick}/>
            </div>
        </div>
    );

}

export default Header;
