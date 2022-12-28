import axios from 'axios';
import { useAppContext } from '../context/App/appContext';
import { backendApi } from '../projectConfig';
import { useState } from 'react';

function RequestCourse({ courseId }) {
  const [isLoading, setLoading] = useState(false);
  const { user, token } = useAppContext();

  function handleRequestCourse() {
    let url = `${backendApi}request/addRequest/${courseId}`;
    let data = {};
    axios.post(url, data,
      {
        headers:
          { authorization: `Token ${token}` }
      })
      .then((res) => {
        res = res.data;
        console.log(res.data);
      })
      .catch(
        (err) => console.warn(err)
      );
  }
  return (
    <button
      className='btn btn-primary w-75'
      disabled={isLoading}
      onClick={handleRequestCourse}>
      {isLoading ? <i class="fa fa-refresh fa-spin"></i>
        : "Request"}
    </button>
  )
}
export default RequestCourse;