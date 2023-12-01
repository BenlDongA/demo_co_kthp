import { FaFacebook ,FaInstagramSquare} from "react-icons/fa";
import { Link} from 'react-router-dom';
import Image1 from '../best-sale/img/img1.png'
function BestSalez(){
    return(
        <div  className='max-w-[1640px] mx-auto p-4 mt-4'>
        <div id="best"className='max-h-[500px] relative '>
       
            <img className='img-bestsale' src={Image1} alt="/" />
            <h2 className='welcom'>Wecome to DBCO Restaurant</h2>
            <h2 className='welcom1'>
                Món ăn Việt - Yêu thương quay về
                <br />
                <span class="text-sm">Địa chỉ: 207 Phạm Văn Đồng, Thanh Khê, Đà Nẵng</span>
                <br />
                <span class="text-sm">Hotline: (+84) 344 123 853 </span>
                <br/>
                <span class="text-sm">Email: dbcorestaurant@gamil.com.vn</span>

                <div className="fe"><FaFacebook /><FaInstagramSquare /></div>  
                </h2>
                <Link to="/food">
            <button  className="but-best">Menu</button>
            </Link>
            <Link to="/booktable">
            <button className="but-best1">Đặt bàn</button>
            </Link>
        </div>
    </div>  
    )
}
export default BestSalez