import { useParams } from "react-router-dom";
import data from '../data.js';
import styled from "styled-components";
import React, { useEffect, useState} from "react";

function Detail(props) {

  let [alert1, setAlert] = useState(true)
  let [count, setCount] = useState('')
  
  useEffect(()=>{
      setTimeout(()=>{
        setAlert(false)},2000);
    },[]);

    useEffect(()=>{
     if(isNaN(count) == true){
      alert("경고 숫자입력하셈")
     }
    },[count])

    let {id} = useParams();

    let find_item = props.shoes.find((x)=>{
      return x.id == id
    })

    // console.log(find_item)

    return (
      <div className="container">
        {
          alert1 == true
          ? <div className="alert alert-warning">
          2초 이내 구매시 할인
          </div>
          :null
        }

        <div className="row">
          <div className="col-md-6">
            {

            }
            <img src={'https://codingapple1.github.io/shop/shoes'+ (find_item.id + 1) +'.jpg'}
              width="100%" />
          </div>
          <div className="col-md-6">
            <input onChange={(e)=>{setCount(e.target.value)}}/>
            <h4 className="pt-5">{find_item.title}</h4>
            <p>{find_item.content}</p>
            <p>{find_item.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    )
  }

  export default Detail;