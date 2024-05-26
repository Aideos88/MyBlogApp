import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import { getNewsByUser, updateNews, deleteNews } from "../../services/newsService";
import { PROFILE_URL } from "../../services/commonService";
import ModalButton from "../ModalButton";
import NewsCreation from "./NewsCreation";
import "../../custom.css";


export const News = ({ id, text, imageStr, date, updateAction }) => {

    const updateNewsView = async (news) => {
        await updateNews(news);
        updateAction();
    }

    const deleteNewsView = async () => {
        await deleteNews(id);
        updateAction();
    }

    return (
        <div className='news-item'>
            <div className='news-actions'>
                <ModalButton
                    btnName={'Редактировать запись'}
                    modalContent={<NewsCreation id={id} oldtext={text} oldImage={imageStr} setAction={updateNewsView} />}
                    title={'Новый пост'} />
                <button className='btn btn-danger' onClick={() => deleteNewsView()}>Удалить</button>
            </div>
            <div className={'img-box'}>
                <ImageComponent base64String={imageStr} />
            </div>
            <div>
                <p>{date}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}

export const NewsByUser = ({ userId }) => {
    const [news, setNews] = useState([]);
    const [updateUser, setUpdateUser] = useState(0);

    const getAllNews = async () => {
        if (userId === 0) return;
        const allNews = await getNewsByUser(userId);
        setNews(allNews);
    }

    useEffect(() => {
        getAllNews();
    }, [userId, updateUser]);

    return (
        <div>
            {news.map((el, key) => {
                return <News key={key}
                    id={el.id}
                    text={el.text}
                    imageStr={el.image}
                    date={el.postDate}
                    updateAction={setUpdateUser} />
            })}
        </div>
    )
}
