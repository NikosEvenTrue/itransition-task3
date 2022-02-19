function PeopleTable({people, checkboxHandleOnClick, checkedMain, mainHandleOnClick}) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th><input type="checkbox" onClick={(e) => mainHandleOnClick(e.target.checked)}
                           checked={checkedMain}/></th>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>registered</th>
                <th>last activity</th>
                <th>status</th>
            </tr>
            </thead>
            <tbody>
            {people.length > 0 ? people.map(person => (
                <tr key={person.id}>
                    <td><input type="checkbox"
                               onClick={(e) => checkboxHandleOnClick(person.id, e.target.checked)}
                               checked={person.checked} id={person.id}/></td>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{(new Date(person.registeredDate)).toLocaleString("ru-RU")}</td>
                    <td>{(new Date(person.lastActivity)).toLocaleString("ru-RU")}</td>
                    <td>{person.blocked ? "blocked" : "unblocked"}</td>
                </tr>
            )) : <tr>Table is empty</tr>}
            </tbody>
        </table>
    );

}

export default PeopleTable;
