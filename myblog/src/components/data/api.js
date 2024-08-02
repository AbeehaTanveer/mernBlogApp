

import axios from 'axios';
const apiUrl='';
export const singlefileuploaded=async(data)=>{
    try {
        await axios.post(apiUrl+ 'singleFile',data);
    } catch (error) {
        throw error;
    }
}
 
export const getSingleFiles=async()=>{
    try {
      const {data} =await axios.get(apiUrl+'getFile') ;
      return data;
    } catch (error) {
        throw error;
    }
}

