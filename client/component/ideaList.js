
import IdeasAPI from "../services/ideasAPI";

class IdeaList{
    constructor(idea = []){
        this._ideaList = document.querySelector('.idea-list')

        this._idea = idea
        this._getIdeas()
      

        this._validTags = new Set()
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('innovation');
        this._validTags.add('business');
        this._validTags.add('software');
        this._validTags.add('invention');
        this._validTags.add('technology')

        
    }

    async _getIdeas(){
      try{
        const res = await IdeasAPI.getIdeas()
        this._idea = res.data.data
        this.render()
      }catch(error){
        console.log(error)
      }
      //Add fetched Idea from server to DOM
      
    }

    _addEventListener(){
      this._ideaList.addEventListener('click', (e)=>{
        if(e.target.classList.contains('fa-xmark')){
          e.stopImmediatePropagation()
          const ideaId = e.target.parentElement.parentElement.dataset.id
          this._deleteIdea(ideaId)
        }        
      })

    }

       async _deleteIdea(ideaId){
        console.log('helll')
        try {
          const res = await IdeasAPI.deleteIdeas((ideaId))
          console.log(res.data)
          this._getIdeas()

          
        } catch (error) {
          alert('you cant delete this')
          
        }

      }




    // Get idea from database push new Idea unto it and render to DOM

    createIdea(idea){
      this._idea.push(idea)
      this.render()

    }

  




      


      render(){
          this._ideaList.innerHTML = this._idea.map(idea =>{
          

            // const ideaTag = this._tagClass(idea.tag.toLowerCase()) 
            
            if(!this._validTags.has(idea.tag.toLowerCase())){
              alert('Please, input valid tag')
              return
            }
            const deleteBtn = localStorage.getItem('username') === idea.username ? '<i class="fa fa-xmark"></i>' : ''
            

              return   `<div class="card">
          <div class="card-body" data-id="${idea._id}">
            <div class="font-awesome">
              ${deleteBtn} 
            </div>
            <p class="card-text">
              ${idea.text}
            </p>
            <h5 class="card-title" data-tag="${idea.tag.toLowerCase()}">${idea.tag.toUpperCase()}</h5>
            <small class="posted"> posted on ${idea.date} by ${idea.username}</small>
          </div>
        </div>
        `
          }).join('')
          this._addEventListener()
      }
    }


export default IdeaList