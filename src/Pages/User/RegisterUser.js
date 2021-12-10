import React, { useState } from "react";
import CheckBoxComponent from "./CheckBoxComponent";
import "./login.css";

function RegisterUser() {
    const [groups, setGroups] = useState([
        {
            groupName: "Group Name",
            permissions: [
                {
                    id: "someid",
                    description: "Some Desicription",
                    checked: false,
                },
                {
                    id: "someid2",
                    description: "Some Desicription2",
                    checked: false,
                },
            ],
        },
        {
            groupName: "Group Name2",
            permissions: [
                {
                    id: "someid",
                    description: "Some Desicription",
                    checked: false,
                },
                {
                    id: "someid2",
                    description: "Some Desicription2",
                    checked: false,
                },
            ],
        },
    ]);
    const [user, setUser] = useState({ username: "", password: "" });

    const onChangeChecked = (key, index) => {
        console.log(key, index);
        const newGroups = [...groups];
        newGroups[key].permissions[index].checked =
            !newGroups[key].permissions[index].checked;
        setGroups(newGroups);
    };

    const onSubmitEvent = async () => {
        let user = {};

        await fetch("https://virangi-creation.herokuapp.com/registeruser", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: user }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.userCreated) {
                    alert("User Create Successfully");
                } else {
                    alert("Not able to create user");
                }
            })
            .catch((err) => {
                console.log(err);
                alert(err.message);
            });
    };
    return (
        <div>
            <table
                className="table table-bordered table-hover table-responsive "
                style={{
                    verticalAlign: "middle",
                    width: "50%",
                    margin: "0px auto",
                }}
            >
                <tbody>
                    <tr>
                        <td>User Name</td>
                        <td>
                            <input
                                class="form-control"
                                value={user.username}
                                onChange={(e) =>
                                    setUser((prevState) => ({
                                        ...prevState,
                                        username: e.target.value,
                                    }))
                                }
                                placeholder="User Name"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input
                                class="form-control"
                                value={user.password}
                                onChange={(e) =>
                                    setUser((prevState) => ({
                                        ...prevState,
                                        password: e.target.value,
                                    }))
                                }
                                placeholder="Password"
                            />
                        </td>
                    </tr>
                    {groups.map((group, key) => {
                        return (
                            <>
                                <tr>
                                    <td rowSpan={group.permissions.length}>
                                        {group.groupName}
                                    </td>

                                    {group.permissions.map(
                                        (permission, index) => (
                                            <tr>
                                                <CheckBoxComponent
                                                    id={permission.id}
                                                    key1={key}
                                                    index={index}
                                                    checked={permission.checked}
                                                    onChangeChecked={
                                                        onChangeChecked
                                                    }
                                                    description={
                                                        permission.description
                                                    }
                                                />
                                            </tr>
                                        )
                                    )}
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
            <button
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "30px auto",
                }}
                className="btn btn-primary"
                onClick={onSubmitEvent}
            >
                Create User
            </button>
        </div>
    );
}

export default RegisterUser;
