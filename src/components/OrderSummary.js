import React from 'react';
import '../styles/OrderSummary.css';
import { useLocation } from 'react-router-dom';

function OrderSummary() {
    const location = useLocation();
    const selectedSeats = location.state.selectedSeats;
    const playName = location.state.playName
    const studentTicket = parseInt(location.state.studentTicket);
    const normalTickets = Math.max(0, selectedSeats.length - studentTicket);
    const totalPrice = normalTickets * 50 + studentTicket * 30

/*     const removeProduct = (index) => {
        console.log("deleted")
    } */

    return (
        <div>   
            <div className="order-summary">
                <h2>Biletler</h2>
                <ul>
                    {selectedSeats.map((seat, index) => (
                        <li key={index} className="product-container">
                            <div className="product-info">
                                {/* <span className="close-button" onClick={() => removeProduct(index)}><FontAwesomeIcon icon={faTimesCircle}/></span> */}
                                <span><b>Oyun İsmi: </b>{playName}&nbsp;</span>
                                <span><b>Koltuk No: </b>{seat}&nbsp;</span>
                                <span><b>Bilet Türü: </b>{index < normalTickets ? "Tam" : "Öğrenci"}&nbsp;</span>
                                <span><b>Bilet Tutarı: </b>{index < normalTickets ? "50" : "30"}&nbsp;TL</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="total">
                <span className='total-text'><b>Toplam Tutar: </b>{totalPrice} TL</span>

            </div>
        </div>
    );
}

export default OrderSummary;