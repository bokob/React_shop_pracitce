import { useParams } from 'react-router-dom'
import data from '../data.js'
import styled from 'styled-components'
import React, { useEffect, useState, useContext } from 'react'
import { Nav } from 'react-bootstrap'

import { Context1 } from './../App.js'

import { addItem } from './../store.js'
import { useDispatch } from 'react-redux'

function Detail(props) {
  let { 재고 } = useContext(Context1)

  let [alert1, setAlert] = useState(true)
  let [count, setCount] = useState('')
  let [탭, 탭변경] = useState(0)
  let dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setAlert(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (isNaN(count) == true) {
      alert('경고 숫자입력하셈')
    }
  }, [count])

  let { id } = useParams()

  let find_item = props.shoes.find((x) => x.id == id)

  // console.log(find_item)

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(find_item.id)

    //Set으로 바꿨다가 다시 array로 만들기
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])

  return (
    <div className="container">
      {alert1 == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              'https://codingapple1.github.io/shop/shoes' +
              (find_item.id + 1) +
              '.jpg'
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input
            onChange={(e) => {
              setCount(e.target.value)
            }}
          />
          <h4 className="pt-5">{find_item.title}</h4>
          <p>{find_item.content}</p>
          <p>{find_item.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem({ id: 1, name: 'eree', count: 1 }))
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              탭변경(0)
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              탭변경(1)
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              탭변경(2)
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent 탭={탭} />
    </div>
  )
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState('')
  let { 재고 } = useContext(Context1)

  useEffect(() => {
    let a = setTimeout(() => {
      setFade('end')
    }, 10)

    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [탭])

  return (
    <div className={'start ' + fade}>
      {
        [
          <div>{재고}</div>,
          <div className="">내용0</div>,
          <div>내용1</div>,
          <div>내용2</div>
        ][탭]
      }
    </div>
  )
}

export default Detail
