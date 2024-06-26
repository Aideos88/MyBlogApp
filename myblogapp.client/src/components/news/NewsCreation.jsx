import { useState } from "react"
import ImageComponent from "../ImageComponent";
import ImageUploader from "../ImageUploader";
import "../../custom.css";

const NewsCreation = ({ id, oldtext, oldImage, setAction }) => {
    const [text, setText] = useState(oldtext);
    const [image, setImage] = useState(oldImage);
    const [imageStr, setImageStr] = useState('');

    const endCreate = () => {
        const newNews = {
            id: id,
            text: text,
            image: image
        };

        setAction(newNews);
    }

    const imageView = imageStr.length > 0 ?
            <img src={imageStr} alt="Image" className='image-box'/>
        : <div className='image-box'>
            <ImageComponent base64String={oldImage} />;
        </div>

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <textarea defaultValue={text} onChange={e => setText(e.target.value)} />
            {imageView}
            <ImageUploader byteImageAction={(str, bytes) => { setImage(bytes); setImageStr(str) }} />
            <button onClick={endCreate}>Ок</button>
        </div>
    )
}

export default NewsCreation;