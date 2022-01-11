import React, {useState} from 'react'

const UserDetails = ({userDetail}) => {

    return (
        <div>
            User Detail
            <div className="container">
            <div className="firstCol">
                <ul>
                <li>Todo ID</li>
                <li>Todo Title</li>
                <li>User Id</li>
                <li>Name</li>
                <li>Email</li>
                </ul>
            </div>
            <div className="secondCol">
                <ul>
                <li>{userDetail.TodoId}</li>
                <li>{userDetail.TodoTitle}</li>
                <li>{userDetail.UserId}</li>
                <li>{userDetail.Name}</li>
                <li>{userDetail.email}</li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default UserDetails
