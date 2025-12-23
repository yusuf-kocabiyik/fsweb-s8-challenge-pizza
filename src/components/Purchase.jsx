import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function Purchase({disabled,secimler,toplam}){

    

    return(
        <div className="siparis-kutusu">
            <div className="siparis-ozeti">
                <p className="form-input-title">Sipariş Toplamı</p>
                <div className="siparis-secimler">
                    <p>Secimler</p>
                    <p>{secimler}₺</p>
                </div>

                <div className="siparis-toplam">
                    <p>Toplam</p>
                    <p>{toplam}₺</p>
                </div>
            </div>

          <button  type="submit" className="siparis-butonu" disabled={disabled} >SİPARİŞ VER</button>
            
            
            

        </div>

    )
}