import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booktable.css';
import { useAuth } from '../Login/AuthProvider';

function BookTable() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 1,
        specialRequests: ''
    });
    const [books, setbooks] = useState([]);
    const { isAdmin ,isLoggedIn} = useAuth();

    useEffect(() => {
        if (isAdmin) {
            // Lấy dữ liệu sản phẩm từ API khi đăng nhập với quyền Admin
            axios.get('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable')
                .then(response => {
                    setbooks(response.data);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        }
    }, [isAdmin]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            window.alert("Hãy đăng nhập để đặt bàn")
            return;
        }
        // Gửi dữ liệu lên API
        axios.post('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable', formData)
            .then(response => {
                // Xử lý phản hồi từ server (nếu cần)
                console.log('Đặt bàn thành công!', response.data);
                window.alert('Đặt bàn thành công!');
               
                if (isAdmin) {
                    axios.get('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable')
                        .then(response => {
                            setbooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching books:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Đặt bàn thất bại:', error);
            });
    };
    const handleChange = (e) => {
        // Cập nhật giá trị của các trường vào state
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleDelete = (id) => {
        axios.delete(`https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable/${id}`)
            .then(response => {
                console.log('Deleted booking:', id);
                // After successful deletion, update the list of bookings
                if (isAdmin) {
                    axios.get('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable')
                        .then(response => {
                            setbooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching books:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
            });
    };

    return (
        <div >
        <div className="book-table-container">
            <h1 className='book'>Đặt Bàn</h1>
            <form onSubmit={handleSubmit}>
                <label >Tên:</label>
                <input className="ip" name="name" onChange={handleChange} value={formData.name} required />

                <label >SDT:</label>
                <input className="ip" name="phone" onChange={handleChange} value={formData.phone} required />
                <label htmlFor="time">Giờ:</label>
                <input className="ip"type="time" id="time" name="time"onChange={handleChange} value={formData.time} required />

                
                <label htmlFor="date">Ngày:</label>
                <input className="ip" type="date" id="date" name="date" onChange={handleChange} value={formData.date} required />
                
                <label htmlFor="guests">Số Lượng Khách:</label>
                <input className="ip"type="number" id="guests" name="guests" min="1" onChange={handleChange} value={formData.guests}required />
                <label htmlFor="specialRequests">Yêu Cầu Đặc Biệt:</label>
                <textarea className="ip" id="specialRequests" name="specialRequests" rows="4" onChange={handleChange} value={formData.specialRequests}></textarea>

                <div className='but-sub' onClick={handleSubmit}> Đặt Bàn</div>
            </form>    
        </div>
        {isAdmin && (
                <div className='box-book'>
                    <h2>Danh sách khách đặt bàn</h2>
                    <hr></hr>
                    <ul>
                        {books.map(book => (
                            <li key={book.id}>
                                
                                Tên: {book.name} - {book.phone}<br></br>
                                Ngày: {book.date} -Giờ: {book.time}<br></br>
                                Số khách: {book.guests}<br/> 
                                Yêu cầu: {book.specialRequests}
                                <button onClick={() => handleDelete(book.id)}>Xóa</button>
                                <hr></hr>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        
    );
}

export default BookTable;
