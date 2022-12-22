import './HotelReservation.css'

const HotelReservation = () => {
    return (
        <div className="HotelContainer">
            <div className="HotelInformation">
                <div className="HotelNameStar">
                    <h2 className="HotelName">هتل آستان هشتم</h2>
                    <h3 className="HotelStar">4ستاره</h3>
                </div>
                <div className="HotelAddress">ادرس : <span>بلوار شهید شوشتری، شهید شوشتری 7، انتهای شهید شوشتری 7</span></div>
            </div>
        </div>
    );
}
 
export default HotelReservation;