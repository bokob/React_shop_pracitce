import { Container, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import { useEffect, useState, createContext } from 'react'
import data from './data.js'
import Col from './component.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js'
import axios from 'axios'
import Cart from './pages/Cart.js'

export let Context1 = createContext()

function App() {
  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate()
  let [loading, setLoading] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem('watched'))
      localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate(1)
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail')
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart')
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <button onClick={()=>{
        let copy = [...shoes]
        console.log('정렬 전' + copy.title);
        copy.title.sort();
        console.log("정렬됨");
        console.log('정렬 후' + copy.title);
      }}>가나다 정렬</button> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div>
                <br></br>
                <div class="container text-center">
                  <div class="row">
                    {shoes.map(function (item, i) {
                      return (
                        <Col
                          url={
                            'https://codingapple1.github.io/shop/shoes' +
                            (i + 1) +
                            '.jpg'
                          }
                          title={shoes[i].title}
                          price={shoes[i].price}
                        />
                      )
                    })}
                  </div>
                </div>

                <button
                  onClick={() => {
                    axios
                      .get('https://codingapple1.github.io/shop/data2.json')
                      .then((data) => {
                        //console.log(shoes)
                        //console.log(data.data)

                        for (let i = 0; i < data.data.length; i++) {
                          let obj = {
                            id: data.data[i].id,
                            title: data.data[i].title,
                            content: data.data[i].content,
                            price: data.data[i].price
                          }
                          shoes.push(obj)
                        }

                        let copy = [...shoes]
                        setShoes(copy)

                        console.log(shoes)
                      })
                      .catch(() => {
                        //console.log("으악")
                      })
                  }}
                >
                  버튼
                </button>
              </div>
            </>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ 재고 }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />

        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<h1>첫 주문시 양배추즙 서비스</h1>} />
          <Route path="two" element={<>생일기념 쿠폰받기</>} />
        </Route>

        <Route path="/about" element={<About />}>
          <Route path="memeber" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
      </Routes>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App
