import {  FaCheck } from "react-icons/fa";
import { Link} from 'react-router-dom';
import Image1 from './img/fed1.jpg'
import './ShowFeedBack.css'

function ShowFeedBack(){
    
    return(
        <div  className='max-w-[1640px] mx-auto p-4 mt-4'>
        <div id="best1"className='max-h-[500px] relative '>
       
            <img className='img-bestsale1' src={Image1} alt="/" />
            <h2 className='welcom5'>FeedBack</h2>
                <h2 className='welcom2'>
                    
                    Điều quan trọng nhất của nhà hàng là <br /> chất lượng khách nhận được phải tương đương với số tiền
                    <br />
                    <br />
                    <span className="text-m 1" style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCheck color="orange"  /> Phục vụ tận tâm
                    </span>
                    <br />
                    <span className="text-m 1" style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCheck   color="orange" /> Chất lượng thực phẩm cao cấp
                    </span>
                    <br />
                    <span className="text-m 1" style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCheck  color="orange"  /> Thực đơn đa dạng
                    </span>
                    <br />
                    <span className="text-m 1" style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCheck  color="orange"  /> Không gian sang trọng
                    </span>
                    
                </h2>
                <Link to="/Feedback">
                    <button className="but-best2">FeedBack</button>
                </Link>
        </div>
    </div>  
    )
}
export default ShowFeedBack