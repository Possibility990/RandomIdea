import '@fortawesome/fontawesome-free/css/all.css'

import Modal  from '../component/modal.js';
import IdeaForm from '../component/ideaForm';
import IdeaList from '../component/ideaList.js';
import './css/style.css';


new Modal();
const ideaForm  = new IdeaForm();
ideaForm.render()
new IdeaList()
// ideaList.render()

