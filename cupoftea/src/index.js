//import de react
import React from 'react';
import ReactDOM from 'react-dom/client';

//import des css
import "./css/font-awesome.min.css";
import "./css/flexslider.css";
import "./css/normalize.css";
import "./css/base.css";
import "./css/style.css";

//import pour le routage
import { BrowserRouter,Routes,Route } from 'react-router-dom';

// import des components
import Home from './Components/Home';
import Tea from './Components/Tea';
import Product from './Components/Product';
import About from './Components/About';
import Login from './Components/Login';
import Historique from './Components/Historique';
import CreateAccount from './Components/Account';
import Panier from './Components/Panier';
import HomeAdmin from './Components/Admin/Home';
import CommandsAdmin from './Components/Admin/Commands';
import AddTea from './Components/Admin/AddTea';
import EditTea from './Components/Admin/EditTea';

//import de redux pour le reducer
import { createStore } from 'redux';
import reducer from './reducers/caddie';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

// création du store => prêt pour l'app
const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()) ) ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/tea/:id" element={<Product />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/create_account" element={<CreateAccount />} />
        <Route path="/panier" element={<Panier />} />

        <Route path="/admin/dashboard" element={<HomeAdmin />} />
        <Route path="/admin/dashboard/commandes" element={<CommandsAdmin />} />
        <Route path="/admin/dashboard/add/tea" element={<AddTea />} />
        <Route path="/admin/dashboard/update/tea/:id" element={<EditTea />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
