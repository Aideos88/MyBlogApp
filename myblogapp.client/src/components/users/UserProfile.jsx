import React, { useState, useEffect } from 'react';
import { exitFromProfile, getUser, updateUser } from '../../services/usersService';
import ModalButton from '../ModalButton';
import UserProfileCreation from './UserProfileCreation';
import UserView from './UserView';

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
            <h2>Профиль пользователя</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <ModalButton modalContent={<UserProfileCreation user={user} setAction={updateUserView} />}
                    btnName={'Редактирование профиля'}
                    title={'Редактирование профиля'} />
                <button type='button' className=" btn-secondary" onClick={() => exitFromProfile()}>Выйти</button>
            </div>
            <UserView user={user} />
        </div>
    );
};

export default UserProfile;