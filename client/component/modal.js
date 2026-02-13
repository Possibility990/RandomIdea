
class Modal{
    constructor(){
        this._modal= document.querySelector('#modal')
        this._modalbtn= document.querySelector('#modal-btn') 
        this.addEventListeners()
    }

    addEventListeners(){
        this._modalbtn.addEventListener('click', this._open.bind(this))
        window.addEventListener('click', this._outsideEvent.bind(this))
        document.addEventListener('closeModal', this._modalClose.bind(this))

    }


    _open(e){
        e.preventDefault()

        this._modal.style.display = 'block'
    }

    _close(){
        this._modal.style.display = 'none'
    }
    

    _modalClose(){

        this._close()
    }
    
    _outsideEvent(e){
       
        if(e.target === this._modal)
            this._close()
     


    }



}

export default Modal


