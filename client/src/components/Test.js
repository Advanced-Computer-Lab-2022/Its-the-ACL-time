import axios from 'axios';
import React from 'react';

const Test = () => {
  const sendCertificate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/user/certification',
        {
          email: 'ammarammar200112@gmail.com',
          username: 'amr',
          course: 'React Course',
        }
      );
      console.log(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={sendCertificate}>Send Certificate</button>
    </>
  );
};

export default Test;
