import React, { useState, useEffect } from 'react';
import { exitFromProfile, getUser, updateUser } from '../../services/usersService';
import ImageComponent from '../ImageComponent';
import ModalButton from '../ModalButton';
import UserProfileCreation from './UserProfileCreation';

const UserProfile = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        description: '',
        password: '',
        photo: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data);
        };

        fetchUser();
    }, []);

    const updateUserView = (newUser) => {
        setUser(newUser);
        updateUser(newUser);
    }

    return (
        <div>
            <h2>User profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Description: {user.description}</p>
            <ImageComponent base64String={user.photo} />
            <ModalButton modalContent={<UserProfileCreation user={user} setAction={updateUserView} />} btnName={'Редактирование профиля' } />
            <button className=" btn-secondary" onClick={() => exitFromProfile()}>Выйти</button>
        </div>
    );
};

export default UserProfile;