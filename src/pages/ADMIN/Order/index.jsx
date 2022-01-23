import axios from "axios";
import React, { useState } from "react";
import Logo from "../../../assets/png/logo.png";
import "./order.scss";
import { test } from "../../../config/config.json";
import { useEffect } from "react";
import Component from "./Component";
import { Link } from "react-router-dom";

export default function Order(params) {
  const url = test;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("inchToken")}`,
    "content-type": "application/json",
  };
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [numbers, setNumbers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [request, setRequest] = useState(1);

  const changeColor=(num)=>{
    const categories=document.querySelectorAll('.deliverd')
    console.log(categories);
    categories.forEach(cats=>{
      if(cats.id===`${num}`){
        console.log(cats)
        cats.style.color='red'
    }
      else cats.style.color='black'
    })
  }
  useEffect(() => {
    changeColor(request)
    if (request === 1) {
      axios
        .get(`${url}orders?delivered=1&page=${pages}`, {
          headers: {
            Authorization: headers.Authorization,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          setOrders(response.results);
          setTotalPages(response.totalPages);
        });

    
    } else if (request === 2) {
      axios
        .get(`${url}orders?delivered=2&page=${pages}`, { headers: headers })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          setOrders(response.results);
          setTotalPages(response.totalPages);
        });
    } else if (request === 3) {
      axios
        .get(`${url}orders?method=AUTOMATIC&page=${pages}`, {
          headers: headers,
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          setOrders(response.results);
          setTotalPages(response.totalPages);
        });
    } else {
      axios
        .get(`${url}orders?method=MANUAL&page=${pages}`, { headers: headers })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          setOrders(response.results);
          setTotalPages(response.totalPages);
        });
    }
  }, [request, pages]);


  const displayNumbers = () => {
    let number = 1;
    let array = [];
    while (number < totalPages + 1) {
      array.push(number);
      console.log(array);
      setNumbers(array);
      number++;
    }
  };
  
  useEffect(() => displayNumbers(), []);
  console.log(totalPages, numbers);
  return (
    <div class="dashBoard">
      <Link to="/admin/dashboard" class="head">
        <img src={Logo} alt="logo" />
      </Link>
      <div class="order_body">
        <div className="top">
          <span id='4' className="deliverd" onClick={() => setRequest(4)}>
            Transfer
          </span>
          <span id='3' class="deliverd" onClick={() => setRequest(3)}>
            card
          </span>
          <span id='1' class="deliverd" onClick={() => setRequest(1)}>
            Pending
          </span>
          <span id='2' class="deliverd" onClick={() => setRequest(2)}>
            Delivered
          </span>
        </div>
        <div class="content">
          {orders.map((order) => (
            <Component data={order} />
          ))}
        </div>
        <div class="pages">
          {numbers.map((number) => (
            <div onClick={() => setPages(number)} class="number">
              {number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
