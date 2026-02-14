import axios from 'axios'

class IdeasAPI{
    constructor(){
        //Before hosting
        // this._APIURL = 'http://localhost:5000/api/ideas'
        //after hosting
        this._APIURL = '/api/ideas'
    }

    getIdeas(){

        return axios.get(this._APIURL);
      
    }
    postIdeas(data){
        
      return   axios.post(this._APIURL, data)
    }

    updateIdea(id, data){
        return axios.put(`${this._APIURL}/${id}`, data)
    }

    deleteIdeas(id){
        console.log(id, 'from api')
      const username =   localStorage.getItem('username')? localStorage.getItem('username'):''
      return axios.delete(`${this._APIURL}/${id}`, {
        data:{
            username
        }
      })
        
    }
}

export default new IdeasAPI()