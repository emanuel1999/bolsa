const { uploadFile,getFileStream,getObjectsKey } = require("./S3Service")


const upload= async (file)=>{
    const result = await uploadFile(file);
    const response= {
        key: result.Key
    };
    return response;
}
const anyImg= async (key,res)=>{
    const readStream= await getFileStream(key)
    return readStream.pipe(res)
}
const allImg= async ()=>{
    const result =  await getObjectsKey();
    let i=0;
    let order= result.Contents.map(image=>{
        i++;
        return { 
                imageN:i,
                key:image.Key,
                LastModified:image.LastModified
        }
    })
    return order
}

module.exports={upload,anyImg,allImg}