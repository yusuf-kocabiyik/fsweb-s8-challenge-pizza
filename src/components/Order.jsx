
import { useState,useEffect } from "react";
import Purchase from "./Purchase";
import QuantitySelector from "./QuantitySelector";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Order(){
    const history=useHistory();
    ////////sipariş detayı için boş bir state tanımlıyoruz
    const [ordersDetail,setOrdersDetail]=useState({
        isim:"",
        boyut:"",
        malzemeler:[],
        note:"",
        hamur:"",
        quantity:1,
        
     })

     //////Adet azaltma ve çoğaltma fonkisyonları

     const increaseQuantity = () => {
            setOrdersDetail((prev) => ({
                ...prev,
                quantity: prev.quantity + 1
            }));
        };

        const decreaseQuantity = () => {
            setOrdersDetail((prev) => ({
                ...prev,
                quantity: Math.max(1, prev.quantity - 1)
            }));
        };


     ////İsim validasyonu için error mesajımız
     const [nameError, setNameError] = useState("");

     ///////malzeme sayısı için error mesajı oluşturuyoruz

     const [malzemeError,setMalzemeError] = useState("");


    ///MALZEMELERİ BİR ARRAYDE TOPLAYALIM
    const malzemeListesi = [
        "Pepperoni",
        "Sosis",
        "Kanada Jambonu",
        "Tavuk Izgara",
        "Soğan",
        "Domates",
        "Mısır",
        "Sucuk",
        "Jalepeno",
        "Sarımsak",
        "Biber",
        "Zeytin",
        "Ananas",
        "Kabak"
        ];

        ///BOYUTLARI BİR ARRAYDE TOPLAYALIM
        const sizes = ["Küçük", "Orta", "Büyük"];

        ///Hamur kalınlıklarını bir array içine alalım
        
        const hamurSecenekleri = [
            "İnce Hamur",
            "Kalın Hamur",
            ];


        /////// ÖDENECEK TUTARI BELİRLEMEK İÇİN BAŞLANGIÇ ÜCRETİ VE SECİM ÜCRETİNİ TANIMLAYALIM
        
        const baslangicUcreti=85.5;
        const secimUcreti=5;

        const secimler=ordersDetail.malzemeler.length*secimUcreti;
        const toplam=(baslangicUcreti+secimler)*ordersDetail.quantity;  //TOPLAM ÜCRETİ BULDUK
            
     /////formdaki input değişimleri için changeHandler fonskiyonumuzu tanımladık
     const changeHandler = (e)=>{

        const { name, value, type, checked } = e.target;

            if (type === "checkbox") {

                setOrdersDetail((prev) => {
                // EKLEME
                if (checked) {
                    if (prev.malzemeler.length >= 10) {
                    // 10 doluysa daha fazla ekleme
                    e.target.checked = false;
                    return prev;
                    }

                    return {
                    ...prev,
                    malzemeler: [...prev.malzemeler, value],
                    };
                }

                // ÇIKARMA
                return {
                    ...prev,
                    malzemeler: prev.malzemeler.filter(
                    (item) => item !== value
                    ),
                };
                });
            }

            

            //  Diğer tüm inputlar (text, radio, select, textarea)

            setOrdersDetail((prev) => ({
                ...prev,
                [name]: value,
            }));

            //  İSİM VALIDASYONU
            if (name === "isim") {
                if (value.trim().length < 3) {
                setNameError("İsim en az 3 karakter olmalıdır.");
                } else {
                setNameError("");
                }
             }
        }

        useEffect(() => {
            const count = ordersDetail.malzemeler.length;

            if (count < 4 && count>0) {
                setMalzemeError("En az 4 malzeme seçmelisiniz.");
            } else if (count > 10) {
                setMalzemeError("En fazla 10 malzeme seçebilirsiniz.");
            } else {
                setMalzemeError("");
            }
        }, [ordersDetail.malzemeler]);

        ///// useEffect ile değişiklikleri anlık olarak görebiliriz
        useEffect(()=>{console.log(ordersDetail)},[ordersDetail])

        const isNameValid = ordersDetail.isim.trim().length >= 3;
        const malzemeCount = ordersDetail.malzemeler.length;
        const isMalzemeValid = malzemeCount >= 4 && malzemeCount <= 10;

        const isFormValid = isNameValid && isMalzemeValid;
        

        ///POST İSTEĞİ ATACAĞIMIZ YAPI

        const handleSubmit = async (e) => {
            
            e.preventDefault();
            
            const payload={
                ...ordersDetail,secimler,toplam
            };
            try {
                const response = await axios.post(
                "https://reqres.in/api/pizza",
                payload,
                {
                    headers: {
                    "x-api-key": "reqres-free-v1",
                    "Content-Type": "application/json",
                    },
                }
                );

                //  API'den dönen cevap
                console.log("SİPARİŞ ÖZETİ (API RESPONSE):", response.data);
                history.push("/successPage");

            } catch (error) {
                console.error("Sipariş gönderilirken hata oluştu:", error);
            }

        };

            
    return(<>
    
    <form onSubmit={handleSubmit} className="form">
            <h1 className="form-h1">Position Absolute Acı Pizza</h1>

            <div className="form-price-rating">
            <p className="form-price">85.50₺</p>
            <div className="form-rating">
                <p>4.9</p>
                <p>(200)</p>
            </div>
            </div>

            <p className="form-order-explanation">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
            </p>

            <div className="form-boyut-hamur">
                <div className="form-boyut">
                <p className="form-input-title">
                    Boyut Seç <span style={{ color: "red" }}>*</span>
                </p>

                {sizes.map((size, index) => {
                    const id = size.toLowerCase();

                    return (
                    <div className="radio-item" key={index}>
                        <input
                        type="radio"
                        id={id}
                        name="boyut"
                        value={id}
                        checked={ordersDetail.boyut === id}
                        onChange={changeHandler}
                        />
                        <label htmlFor={id}>{size}</label>
                    </div>
                    );
                })}
                </div>

                <div className="form-hamur">
                    <p className="form-input-title">
                        Hamur Seç <span style={{ color: "red" }}>*</span>
                    </p>

                    <select
                        name="hamur"
                        value={ordersDetail.hamur}
                        onChange={changeHandler}
                    >
                        <option value="">Hamur Kalınlığı</option>

                        {hamurSecenekleri.map((option, index) => {
                        const value = option
                            .toLowerCase()
                            .replace(/\s+/g, "-");

                        return (
                            <option value={value} key={index}>
                            {option}
                            </option>
                        );
                        })}
                    </select>
                </div>
    
            </div>
    
                {/*EK MALZEMELERİ MAP İLE OLUŞTURUYORUZ  */}
                <p className="form-input-title">Ek Malzemeler</p>
                <p className="form-order-explanation">En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
    
                <div className="checkbox-content">
                    {malzemeListesi.map((item, index) => {
                        const id = item.toLowerCase().replace(/\s+/g, "-");

                        return (
                        <div className="checkbox-item" key={index}>
                            <input
                            type="checkbox"
                            id={id}
                            value={item}
                            onChange={changeHandler}
                            data-testid="topping-checkbox"
                            />
                            <label htmlFor={id}>{item}</label>
                        </div>
                        );
                    })}
                    </div>

                    {malzemeError && (
                    <p className="error-text">{malzemeError}</p>
                    )}
                
                <label htmlFor="isim" className="form-input-title">İsminiz:</label>
                <input type="text" id="isim" name="isim" placeholder="Adınızı giriniz:" value={ordersDetail.isim} onChange={changeHandler} data-testid="name-input"/>
                {nameError && <p className="error-text">{nameError}</p>}

                <label htmlFor="siparisNotu"><p className="form-input-title">Sipariş Notu</p></label>
                <textarea className="text-area" id="siparisNotu" placeholder="Siparişine eklemek istediğin bir not var mı?" name="note"  value={ordersDetail.note} onChange={changeHandler}></textarea>
                <hr />
                
    
                
            <div className="siparis-tamamla">
                <QuantitySelector quantity={ordersDetail.quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
                <Purchase disabled={!isFormValid} secimler={secimler} toplam={toplam} />
            </div>  
            
    
        </form>
    
    </>)
}