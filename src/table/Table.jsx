import React from "react";
import PeopleTable from "./PeopleTable";
import Toolbar from "./Toolbar";
import Header from "./Header";
import {useCookies} from 'react-cookie';
import {useEffect, useState} from "react";
import API from "../shared/API";
import {useNavigate} from "react-router";

function Table() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [people, setPeople] = useState([]);
    const [checkedMain, setCheckedMain] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let ppl = await API.getPeople(cookies.autorizedData);
        let autorized = ppl.length == 1 ? ppl[0].id == -1 ? false : true : true;
        if (!autorized)
            logoutHandleOnClick();
        else {
            ppl.map(person => person.checked = false);
            setPeople(ppl)
        }
    }, [])

    const logoutHandleOnClick = () => {
        removeCookie("autorizedData");
        navigate("/login")
    }

    const checkboxHandleOnClick = (id, checked) => {
        let newPeople = people.slice();
        newPeople.map(person => person.checked = person.id == id ? checked : person.checked);
        setPeople(newPeople)
        changedMainCheckbox()
    }

    const changedMainCheckbox = () => {
        let checked = 0;
        people.forEach(person => checked = person.checked ? checked + 1 : checked);
        setCheckedMain(checked == people.length);
    }

    const mainHandleOnClick = (isChecked) => {
        setCheckedMain(isChecked)
        let newPeople = people.slice();
        newPeople.map(person => person.checked = isChecked)
        setPeople(newPeople);
    }

    const getCheckedPeople = () => {
        let ids = [];
        people.forEach(person => {
            if (person.checked) ids.push(person.id)
        });
        return ids;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Header logoutHandleOnClick={logoutHandleOnClick}/>
                </div>
                <div className="col-12">
                    <Toolbar getCheckedPeople={getCheckedPeople}/>
                </div>
                <div className="col-12">
                    <PeopleTable people={people} checkboxHandleOnClick={checkboxHandleOnClick} checkedMain={checkedMain}
                                 mainHandleOnClick={mainHandleOnClick}/>
                </div>
            </div>
        </div>
    );

}

export default Table;
