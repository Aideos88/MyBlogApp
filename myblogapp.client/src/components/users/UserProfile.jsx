import React, { useState, useEffect } from 'react';
import { exitFromProfile, getUser, updateUser } from '../../services/usersService';
import ImageComponent from '../ImageComponent';
import ModalButton from '../ModalButton';
import UserProfileCreation from './UserProfileCreation';
import { NewsByUser } from '../news/News';

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
                justifyContent: 'center'
            }}>
                <div className='image-box' style={{ width: '50%' }}>
                    <ImageComponent base64String={user.photo} />
                </div>
                <div className='user-data' style={{ margin: '0 10%' }}>
                    <p>Имя: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Описание: {user.description}</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <ModalButton modalContent={<UserProfileCreation user={user} setAction={updateUserView} />}
                            btnName={'Редактирование профиля'}
                            title={'Редактирование профиля'} />
                        <button type='button' className=" btn-secondary" onClick={() => exitFromProfile()}>Выйти</button>
                    </div>
                </div>
            </div>
            <NewsByUser userId={user.id} />
        </div>

    );
};

export default UserProfile;