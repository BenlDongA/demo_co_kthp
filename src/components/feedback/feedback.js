import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../feedback/feed.css'
const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    name: '',
    comment: '',
  });
  const [showForm, setShowForm] = useState(false);

  // Lấy dữ liệu phản hồi từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://656a0f7dde53105b0dd81455.mockapi.io/feedback/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchData();
  }, []);

  // Gửi phản hồi mới đến API
  const submitFeedback = async () => {
    try {
      const createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); // Tạo giá trị cho trường createdAt
      const dataToSend = { ...newFeedback, createdAt }; // Thêm createdAt vào dữ liệu mới

      await axios.post('https://656a0f7dde53105b0dd81455.mockapi.io/feedback/feedback', dataToSend);
     
      const response = await axios.get('https://656a0f7dde53105b0dd81455.mockapi.io/feedback/feedback');
      setFeedbacks(response.data);
      // Reset form phản hồi mới về trạng thái rỗng
      setNewFeedback({ name: '', comment: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className='feed'>
      <h1 className='titlefeed'>Phản hồi của khách hàng </h1>
      <ul className='uses'>
        {feedbacks.map((feedback) => (
          <li className='usess'  key={feedback.id}>
            <img src={feedback.avatar} alt={feedback.name} />
            <p> Name: {feedback.name}</p>
            <p> Cmt: {feedback.comment}</p>
            <p>Ngày cmt: {moment(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p> 
          </li>
        ))}
      </ul>

      <button className='addcmt' onClick={() => setShowForm(true)}>Thêm bình luận +</button>

      {showForm && (
        <form className="formfeed"onSubmit={(e) => {
          e.preventDefault();
          submitFeedback();
          setShowForm(false); // Tắt form sau khi nhấn submit
        }}>
         <button type="button" onClick={handleCloseForm}>X</button>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={newFeedback.name}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Your Comment"
            name="comment"
            value={newFeedback.comment}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Gởi</button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
