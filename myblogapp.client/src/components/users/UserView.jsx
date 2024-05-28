import ImageComponent from '../ImageComponent';
import { NewsByUser, NewsProfileView } from '../news/News';
import NewsCreation from '../news/NewsCreation';
import { createNews } from '../../services/newsService';
import { PROFILE_URL } from '../../services/commonService';
import ModalButton from '../ModalButton';
import '../../custom.css';

const UserView = ({ user, isProfile }) => {

    const addNewNews = (news) => {
        createNews(news);
        window.location.href = PROFILE_URL;
    }

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

            {isProfile ?
                <div>
                    <ModalButton
                        btnName={'Создать пост'}
                        modalContent={<NewsCreation id={0} oldtext={''} oldImage={''} setAction={addNewNews} />}
                        title={'Новый пост'} />
                    <NewsProfileView userId={user.id} />
                </div> :
                <NewsByUser userId={user.id} />}
        </div>
    )
}

export default UserView;