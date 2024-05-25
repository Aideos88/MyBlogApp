import ImageComponent from '../ImageComponent';
import { NewsByUser } from '../news/News';
import '../../custom.css';

const UserView = ({ user }) => {

    return (
        <div>
            <h2>{user.name}</h2>
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
                    </div>
                </div>
            </div>
            <NewsByUser userId={user.id} />
        </div>
    );
}

export default UserView;