
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Header } from './Component/layout/Header';
import { Footer } from './Component/layout/Footer';
import { MainRoutes } from './MainRoutes';
import { AppContext } from "./context/AppContext.js";
import { useState, useEffect } from 'react';
import { URL, APP_NAME } from './config'
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData, addUserData, updateUserData } from './actions';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user[0]);
  const [couponItems, setCouponItems] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [FilterStore, setFilterStore] = useState([]);
  const [Title, setTitle] = useState(`${APP_NAME}Home`);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamsImgPath, setTeamsImgPath] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [img, setImg] = useState(null);

  // var APP_NAME = APP_NAME;

  var values = {
    teams, teamsImgPath, couponItems, setCouponItems, setNoteValue, noteValue, FilterCategory, setFilterCategory, FilterStore, setFilterStore, setTitle, Title, APP_NAME, URL, data, setData, img, setImg, removeUserData, addUserData, updateUserData, dispatch, user
  }

  useEffect(() => {
    fetchTeams();
  }, []);


  const fetchTeams = () => {
    fetch(`${URL}api/team-member`)
      .then((response) => response.json())
      .then((actualData) => { setTeams(actualData.team); setTeamsImgPath(actualData.media_path); })
      .catch((err) => {
        setData([]);
        
      }
      );
  }


  const initialOptions = {
    "client-id": "AeNv_91L0KGqMWRNUl-J00NsP080jqi7csIKewmFf9nQxVzSXsHQkWy5ma94mB7HB4RJY2zGDqkOCqlY",
    currency: "USD",
    intent: "capture",
    "disable-funding": 'credit,card'
  };


  document.title = Title;
  return (
    <PayPalScriptProvider options={initialOptions}>
      <AppContext.Provider value={values}>
        <BrowserRouter>
          <Header />
          <MainRoutes />
          <Footer />
          <Toaster position="top-right" containerStyle={{ "transform": "translateY(104px)" }} />
        </BrowserRouter>
      </AppContext.Provider>
    </PayPalScriptProvider>
  );
}

export default App;
