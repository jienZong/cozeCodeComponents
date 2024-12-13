import {Avatar, Image} from "antd"
import data from "./data";
import { Markdown } from "./Markdown";
import even from './even'
import { createFromIconfontCN } from '@ant-design/icons';
import default_user_avatar from './file/default-user-avatar.jpg'
import default_ai_avatar from './file/default-ai-avatar.jpg'
import {EyeOutlined} from  '@ant-design/icons'
interface Props{
    type:string,
    text: string | null | any,
    image: Array<string> | null,
    file: Array<FileType> | null
}

interface FileType{
    name:string,
    icon:string,
    size:number
}

const ComIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4749857_1fmwedysplz.js'
});

export function Content(obj:Props) {
    return(
        <div className="content-item" style={{flexDirection:obj.type === 'answer'?'row':"row-reverse"}}>
            <div className="user-avatar">
                <Avatar size={40} src={obj.type === 'answer'?(
                    data.bot_avatar_url?data.bot_avatar_url:default_user_avatar
                ):(
                    data.user_avatar_url? data.user_avatar_url : default_ai_avatar
                )} />
            </div>
            <div className="content-right-box" style={{alignItems: obj.type === 'answer' ? 'flex-start' : "flex-end"}}>
                <div className="user-name flex"
                     style={{justifyContent: obj.type === 'answer' ? 'flex-start' : "flex-end"}}>
                    {
                        obj.type === 'answer' ? data.bot_nickname ? data.bot_nickname : 'a i' : data.user_nickname ? data.user_nickname : '我'
                    }
                </div>
                {/*<div className="content-content" style={{backgroundColor:obj.type === 'answer'?'white':'blue'}}>*/}
                <div className={`content-content ${obj.type === 'answer' ? 'bubble-answer' : 'bubble-question'}`}>
                    {
                        obj.type === 'answer' ? obj.text ? typeof obj.text === 'string'?<Markdown content={obj.text}/> : obj.text:null : null
                    }

                    {
                        obj.type === 'question' ? (
                            <>
                                <>
                                    {
                                        obj.file?.length ? (
                                            obj.file.map((item, index) => (
                                                <div className="box-upload-file" key={index}>
                                                    <ComIcon className="box-upload-image-img" type={item.icon}
                                                             style={{fontSize: 35}}/>
                                                    <div className="box-upload-file-item">
                                                        {/* <span className="file-name">{item.name.length > 20 ? item.name.slice(0, 15) + '...' : item.name}</span> */}
                                                        <span className="file-name">{item.name }</span>
                                                        <small
                                                            className="text-desc">{even.compute_size(item.size)}</small>
                                                    </div>
                                                </div>
                                            ))
                                        ) : null
                                    }
                                </>
                                <>
                                    {
                                        obj.image ? (
                                            obj.image.map((item, index) => (
                                                <Image style={{ margin:5, width:100,height:100}} preview={{mask:<EyeOutlined />}} src={item} key={index}/>
                                            ))
                                        ) : null
                                    }
                                </>
                                <>
                                    {
                                        obj.text ? <Markdown content={obj.text}/> : null
                                    }
                                </>
                            </>
                        ) : null
                    }
                </div>
            </div>

        </div>
    )
}