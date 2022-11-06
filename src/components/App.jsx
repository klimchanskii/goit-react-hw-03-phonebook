import { Component } from "react";
import { nanoid } from 'nanoid'
import { AddContact } from "./AddContact/AddContact";
import { ListContact } from "./ListContact/ListContact";
import { Filter } from "./Filter/Filter";

export class App extends Component {

  state = {
    contacts: [ ],  
    filter: ''
  
  }

  componentDidMount() {
   
      
      const contacts = localStorage.getItem('contacts')
      const localContacts = JSON.parse(contacts)
      console.log(localContacts);
      if (localContacts) {
        this.setState({ contacts: localContacts})

      }
      

    
  }
  componentDidUpdate(pP,pS) {
    if (pS !== this.state) {
      localStorage.setItem("contacts",JSON.stringify(this.state.contacts))
    }
  }


  

  testhandelSubmit = data => {

    const contact = {
        id: nanoid(5),
        name: data.name,
      number: data.number
    }
    if (this.state.contacts.find(contac => contac.name === data.name )) {
      alert(`${data.name} is already in contact`)
    } else {
      this.setState(prevState =>({
      contacts:[...prevState.contacts,contact]
     
    }))
    }
  }

  handelFilterChange = e => {

    this.setState({
      filter: e.target.value
    })
  }

  deletContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact=> contact.id !== id)
    }))

  }
  filterContact = () => {
    const normalizerFilter = this.state.filter.toLocaleLowerCase()
   return  this.state.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizerFilter))

  }


  render() {
    
    const visible = this.filterContact()
    return (
      <div>
            <h1>Phonebook</h1>
        <AddContact onSubmit={this.testhandelSubmit} />
        <h2>Contacts</h2>
        <Filter change={this.handelFilterChange } filterValue={this.state.filter} />
        <ListContact contacts={visible } del={ this.deletContact} />


      </div>

      
    
    )
  }
  
};
