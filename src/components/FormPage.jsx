import Order from "./Order";
import Purchase from "./Purchase";
import QuantitySelector from "./QuantitySelector";
import { useState,useEffect } from "react";
import axios from "axios";

export default function FormPage(){
   


    return(
    <>
    <section className="form-header">
        <h1 className="logo">Teknolojik Yemekler</h1>

        <div className="header-text">
            <p className="header-text1">Anasayfa -</p>
            <p className="header-text2">Sipariş Oluştur</p>
         </div>
    </section>

    <section className="form-main">
        <Order />
    </section>

    </>
    )
}