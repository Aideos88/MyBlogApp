import React, { useEffect, useState } from 'react';
import { exitFromProfile, getUser, updateUser } from '../../services/usersService';
import ModalButton from '../ModalButton';
import UserProfileCreation from './UserProfileCreation';
import UserView from './UserView';

const UserProfile = () => {
    const [user, setUser] = useState({
        id: 0,
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
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <ModalButton
                    btnName={'Редактировать'}
                    modalContent={<UserProfileCreation user={user} setAction={updateUserView} />}
                    title={'Редактирование профиля'} />
                <button className="btn btn-secondary" onClick={() => exitFromProfile()}>Выход</button>
            </div>
            <UserView user={user} isProfile={true} />
        </div>
    );
};

export default UserProfile;