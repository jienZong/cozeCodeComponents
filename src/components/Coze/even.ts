import { message } from 'antd';
import obj from './data'
import {useStore} from './store'
import axios from 'axios';

const error = (obj:Object) =>{
    console.log(obj)
    //@ts-ignore
    if (obj.thought) message.error(obj.thought)

}

const upload = async (files:FileList) =>{

    for(const file of files){
        console.log(file)
        let formData = new FormData();
        formData.append('file',file)
        console.log(formData)
        
        try{

            axios.post(' https://api.coze.cn/v1/files/upload', formData, {
                headers: {
                    ...obj.headers,
                    'Content-Type': 'multipart/form-data'
                },
            })
                //@ts-ignore
                .then(res => res.data.code?message.error(`文件:${file.name} 上传失败 => ${res.data.msg}`):handler({
                    file:file,
                    body:res.data
                }))
                .catch(error => message.error(error));

        }catch{
            message.error(`${file.name}上传失败:${error}`)
        }
    }

}


const handler = (param:{
    file:File,
    body:object
}) =>{
    if (param.file.type.split('/')[0] === 'image') {
        push_img(param)
    }  else  {
        switch(param.file.type){
            case 'application/vnd.ms-powerpoint':
                push_file(param,obj.icon_file.ppt)
                break
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                push_file(param,obj.icon_file.pptx)
                break
            case 'application/msword':
                push_file(param,obj.icon_file.doc)
                break
            case 'text/plain':
                push_file(param,obj.icon_file.txt)
                break
            case 'application/pdf':
                push_file(param,obj.icon_file.pdf)
                break
            case'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                push_file(param,obj.icon_file.docx)
                break
            case 'application/vnd.ms-excel':
                push_file(param,obj.icon_file.xls)
                break
            default:break
        }
    }


}

const push_img = (param:any) =>{
    obj.content_param.push({
        type:'image',
        //@ts-ignore
        file_id:param.body.data.id.toString()
    })
    
    //@ts-ignore
    useStore.getState().pushFiles({
        path: URL.createObjectURL(param.file),
        is_img: true,
        file_id:useStore.getState().files.length,
        is_loading:true
    });
}

const push_file = (param:any,icon:any) =>{
    
    obj.content_param.push({
        type:'file',
        //@ts-ignore
        file_id:param.body.data.id.toString()
    })  

    //@ts-ignore
    useStore.getState().pushFiles({
        is_img:false,
        //@ts-ignore
        name:param.file.name,
        icon:icon,
        size:param.file.size,
        file_id:useStore.getState().files.length,
        is_loading:true
    });
}

const start_request = (value:string) =>{
    useStore.getState().clearOptions()
    const content = []
    //@ts-ignore
    const file = []
    const image:Array<string> = []
    useStore.getState().files.forEach(data => data.is_img?image.push(data.path):file.push(data))
    if (value){
        useStore.getState().pushHistory({
            type:'question',
            //@ts-ignore
            file:file,
            image:image,
            text:value
        })
        useStore.getState().setLoading(true)
    }
    useStore.getState().clearFiles()
    content.push(...obj.content_param)
    content.push({
        type:'text',
        content:value
    })
    useStore.getState().setRequestFlag(true)
    return obj.content_param.length?JSON.stringify(content):value
}

const start_render = () =>{
    obj.content = ''
    useStore.getState().setContent('')
    // render.start()
}


const cancel = () =>{
    obj.stop = true
    obj.content = ''
    useStore.getState().setContent('')
    useStore.getState().setLoading(false)
    useStore.getState().setRenderFlag(false)
    useStore.getState().setRequestFlag(false)
    useStore.getState().pushHistory({
        text:'会话已中止',
        file:[],
        image:[],
        type:'answer'
    })
    console.log(obj.chat_id)
    console.log(obj.conversation_id)
    axios.post(' https://api.coze.cn/v3/chat/cancel',{
        chat_id:obj.chat_id,
        conversation_id:obj.conversation_id
    },{
        headers:obj.headers
    }).then(res =>{
        if (res.data.code) message.error(res.data.msg)
    })
}


const clear = () =>{
    cancel()
    useStore.getState().clearHistory()
    obj.history = []
}

const del_file = (index:number) =>{
    obj.content_param.splice(index,1)
    useStore.getState().spliceFiles(index,1)
}

const compute_size = (size:number | null) => {
    if (size){
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
}

const range_message = (item:any) =>{

    const image:Array<string> = []
    const file:Array<{size:number,name:string,path:string}> = []
    let text = ''
    
    try{
        //@ts-ignore
        JSON.parse(item.content).forEach(data =>{
            switch(data.type){
                case 'text':
                    data.content?text+=data.content:null
                    break
                case 'image':
                    image.push(data.file_url)
                    break
                case 'file':
                    file.push({
                        size:data.size,
                        name:data.name,
                        //@ts-ignore
                        icon:obj.icon_file[data.name.split('.').pop()]
                    })
                    
                    break
                default:break
            }
        })
        
        return {
            type:item.type,
            text:text || '',
            image:image,
            file:file
        }
    }catch{
        return {
            type:item.type,
            text:item.content || '',
            image:null,
            file:null
        }
    }
}

function parseData(rawData:string) {
    // Split the rawData by event
    // console.log(rawData)
    const eventData = rawData.split('event:').filter(item => item.trim() !== '').map(item => {
        const parts = item.split('\ndata:');
        let event = parts[0].trim();
        const data = parts[1] ? parts[1].trim() : null;
        let dataObj = null;

        if (data) {
            try {
                // Try to parse data as JSON
                dataObj = JSON.parse(data);
            } catch (e) {
                console.error("Error parsing JSON for data:", data);
                dataObj = null
                event = 'error'
            }
        }

        return { event, data: dataObj };
    });

    return eventData;
}

const change_send_state = (a:boolean,b:boolean) =>{
    if (!a) return true;
    return (a && b);

}

export default{
    upload,
    cancel,
    clear,
    del_file,
    compute_size,
    range_message,
    start_request,
    start_render,
    parseData,
    change_send_state,
}