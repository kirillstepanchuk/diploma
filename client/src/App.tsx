import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { checkIsAuth } from './store/actions/auth.actions';
import Header from './components/Header';
import RouteList from './RouteList';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsAuth())
  })

  return (
    <div className="App">
      <Header/>
      <RouteList />
    </div>
  );
}

export default App;
