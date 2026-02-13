    import ideasAPI from "../services/ideasAPI";
    import IdeaList from "./ideaList";


class IdeaForm{
    constructor(){
      this._formBox = document.querySelector(('#form-box')); 
      // document.querySelector('.testing-1').addEventListener('submit', this._testing.bind(this)) 
      this._validTags = new Set()
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('innovation');
        this._validTags.add('business');
        this._validTags.add('software');
        this._validTags.add('invention');
        this._validTags.add('technology')
         this._ideaList = new IdeaList()
       
    }

      _addEventListeners(){
        this._form.addEventListener('submit', this._handleSubmit.bind(this))
      }

      async _handleSubmit(e){   
        e.preventDefault()
        const data = {
          username : this._form.elements.username.value,
          text : this._form.elements.text.value,
          tag : this._form.elements.tag.value
        }


  
        // validate fields

        if(!this._validTags.has(data.tag)){
          alert('Please, input a valid tag')
          return
        } else if(this._form.elements.username.value === '' || this._form.elements.text.value === ''){
          alert('Fields cant be empty')
          return
          
        }

             // save username to locastorage
        localStorage.setItem('username', this._form.elements.username.value)


                 
        //Add idea to server
        const newIdea = await ideasAPI.postIdeas(data)
        console.log(newIdea)


        // Add idea to DOM
        this._ideaList.createIdea(newIdea.data.data)
        console.log(newIdea.status)

   
      


        // clear fields

          this._form.elements.username.value = ''
          this._form.elements.text.value = ''
          this._form.elements.tag.value = ''
            this.render()

        document.dispatchEvent(new Event('closeModal'))

      }

      render(){
          
        this._formBox.innerHTML = `<form id="idea-form">
          <div class="username">
            <label>Enter a Username</label>
            <input type="text" name="username" value = "${localStorage.getItem('username') ? localStorage.getItem('username') : '' }">
          </div>

          <div class="idea">
            <label> What's Your Idea?</label>
            <textarea name="text" id="text"></textarea>
          </div>

          <div class="tag">
            <label>Tag</label>
            <input type="text" name="tag">
          </div>
          <button class="btn" type="submit">Submit</button>
        </form> ` ;

        this._form = document.querySelector('#idea-form')
        this._addEventListeners()
      }
}


export default IdeaForm;