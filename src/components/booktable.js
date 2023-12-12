import React from 'react';

function BookTable() {
    const handleSubmit = (e) => {
        e.preventDefault();
     
        alert('Đặt bàn thành công!');
    };

    return (
        <div className="book-table-container">
            <h1 className='book'>Đặt Bàn</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Ngày:</label>
                <input type="date" id="date" name="date" required />

                <label htmlFor="time">Giờ:</label>
                <input type="time" id="time" name="time" required />

                <label htmlFor="guests">Số Lượng Khách:</label>
                <input type="number" id="guests" name="guests" min="1" required />

                <label htmlFor="specialRequests">Yêu Cầu Đặc Biệt:</label>
                <textarea id="specialRequests" name="specialRequests" rows="4"></textarea>

                <button type="submit">Đặt Bàn</button>
            </form>
        </div>
    );
}

export default BookTable;