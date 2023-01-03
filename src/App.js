import { Container, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import { useState } from 'react'
import data from './data.js'
import Col from './component.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js';

function App() {
  let [shoes] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate(1)}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={
            <>
              <div className="main-bg"></div>
              <div>
                <br></br>
                <div class="container text-center">
                  <div class="row">
                    {shoes.map(function (item, i) {
                      return (
                        <Col
                          url={shoes[i].jpg}
                          title={shoes[i].title}
                          price={shoes[i].price}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route path="/detail" element={<Detail shoes={shoes} />} />

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<>첫 주문시 양배추즙 서비스</>}/>
          <Route path="two" element={<>생일기념 쿠폰받기</>}/>
        </Route>

        <Route path="/about" element={<About/>}>
          <Route path="memeber" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치정보임</div>}/>
        </Route>
      </Routes>

    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App
