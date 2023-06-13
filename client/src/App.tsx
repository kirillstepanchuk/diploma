import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { checkIsAuth } from './store/actions/auth.actions';
import Header from './components/Header';
import RouteList from './RouteList';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkIsAuth(navigate))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Header/>
      <RouteList />
    </div>
  );
}

export default App;
