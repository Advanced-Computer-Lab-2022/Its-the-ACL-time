import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { backendApi } from '../../projectConfig';

function useWallet(props) {
  const { token, user } = useSelector((state) => state.auth);
  const [wallet, setWallet] = useState(0);
  useEffect(() => {
    let url = `${backendApi}user/wallet/${user._id}`;
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('wallet', res.data);
        if (res.data) {
          console.log('balance', res.data.balance);
          setWallet(res.data.balance);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return wallet;
}

export default useWallet;
