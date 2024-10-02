import React from "react";
import './Care.css'

import search from '../../assets/svg/search.svg'
import Card from "./Companion/Card";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Essentials/Header";
import Footer from "../Essentials/Footer";

export default function Care() {

    const params = useParams()
    const title = params.type;

    return (
        <div>
            <Header/>
            <div className="p-4">
            <div className="topbar d-flex justify-content-between">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button class="btn"><img src={search} alt="" /></button>
                </div>

                <button className="btn register-btn"><Link key={title} to={`/register/${title}`}>Register Service</Link></button>
            </div>

            <div className="companions pt-2">
                <h1 className="mb-4">{title}</h1>
                <div className="list d-flex flex-wrap justify-content-around">
                    <Card img='https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?uid=R136664623&ga=GA1.1.2089377494.1724692086&semt=ais_hybrid' 
                     name='Somebody'
                     experience='2 yrs'
                     bio='Lorem ipsum dolor sit amet Ut enim ad minim veniam, ex ea commodo consequat.'
                     gender='Male'
                     location='Mumbai'
                     type={title}
                    />

<Card img='https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?uid=R136664623&ga=GA1.1.2089377494.1724692086&semt=ais_hybrid' 
                     name='Somebody'
                     experience='2 yrs'
                     bio='Lorem ipsum dolor sit amet Ut enim ad minim veniam, ex ea commodo consequat.'
                     gender='Male'
                     location='Mumbai'
                     type={title}
                    />

<Card img='https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?uid=R136664623&ga=GA1.1.2089377494.1724692086&semt=ais_hybrid' 
                     name='Somebody'
                     experience='2 yrs'
                     bio='Lorem ipsum dolor sit amet Ut enim ad minim veniam, ex ea commodo consequat.'
                     gender='Male'
                     location='Mumbai'
                     type={title}
                    />

<Card img='https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?uid=R136664623&ga=GA1.1.2089377494.1724692086&semt=ais_hybrid' 
                     name='Somebody'
                     experience='2 yrs'
                     bio='Lorem ipsum dolor sit amet Ut enim ad minim veniam, ex ea commodo consequat.'
                     gender='Male'
                     location='Mumbai'
                     type={title}
                    />  

<Card img='https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?uid=R136664623&ga=GA1.1.2089377494.1724692086&semt=ais_hybrid' 
                     name='Somebody'
                     experience='2 yrs'
                     bio='Lorem ipsum dolor sit amet Ut enim ad minim veniam, ex ea commodo consequat.'
                     gender='Male'
                     location='Mumbai'
                     type={title}
                    />  
                </div>
            </div>
            <Outlet/>
        </div>
        <Footer/>
        </div>
    );
}