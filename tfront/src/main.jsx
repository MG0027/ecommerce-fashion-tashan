
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import {Provider} from 'react-redux';
import tashanStore from './store/index.js';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Men from './routes/men.jsx';
import Home from './routes/home.jsx';
import Women from './routes/women.jsx';
import Login from './routes/login.jsx';
import Signup from './routes/signup.jsx';
import Bag from './routes/bag.jsx';
import Success from './components/success.jsx';
import Cancel from './components/fail.jsx';
import KeepAlive from './routes/KeepAlive.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/men",
        element: <Men/>
       
      },
      {
        path: "/women",
        element: <Women/>
       
      },
      {
        path: "/login",
        element: <Login/>
       
      },
      {
        path: "/signup",
        element: <Signup/>
       
      },
      {
        path: "/bag",
        element: <Bag/>
       
      },
      {
        path: '/success',
    element: <Success></Success>,
      },
      {
        path: '/cancel',
    element: <Cancel></Cancel>
      },
      { path: '/keep-alive', element: <KeepAlive /> }, 
    ],
   
  
  },
]);


createRoot(document.getElementById('root')).render(
  
 <Provider store={tashanStore}>
     <RouterProvider router={router}/>
     </Provider>
    
  
)
