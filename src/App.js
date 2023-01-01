import {Container, Nav, Navbar} from 'react-bootstrap';
import './App.css';
import {useState} from 'react';
import data from './data.js'
import Col from './component.js';

function App() {

  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <div className="main-bg"></div>
    
      <div>
        <br></br>
      <div class="container text-center">
          <div class="row">
            {
            shoes.map(function(item,i){
              return(
                <Col url = {shoes[i].jpg} title = {shoes[i].title} price = {shoes[i].price}/>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;