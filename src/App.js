
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Header } from './Component/layout/Header';
import { Footer } from './Component/layout/Footer';
import { MainRoutes } from './MainRoutes';
import { AppContext } from "./context/AppContext.js";
import { useState, useEffect } from 'react';
import { URL, APP_NAME, API_TOKEN, SITE_URL } from './config'
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData, addUserData, updateUserData } from './actions';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function App() {
  const dispatch = useDispatch();

  const wishlistData = useSelector((state) => { return state.userReducer.user[0] ? state.userReducer.user[0].wishlist : [] });
  const user = useSelector((state) => state.userReducer.user[0]);
  // const items = useSelector((state) => state.userReducer.items);


  // dispatch(wishlistItems({ "name": "Mannan" }));

  // console.log(items);
  const [couponItems, setCouponItems] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [FilterStore, setFilterStore] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const [LikedItems, setLikedItems] = useState([]);
  const [SavedItems, setSavedItems] = useState([]);
  const [Title, setTitle] = useState(`${APP_NAME}Home`);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamsImgPath, setTeamsImgPath] = useState("");
  const [search, setSearch] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [img, setImg] = useState(null);

  // var APP_NAME = APP_NAME;


  var values = {
    SITE_URL, API_TOKEN, teams, teamsImgPath, couponItems, setCouponItems, SavedItems, setSavedItems, WishlistItems, LikedItems, setLikedItems, setWishlistItems, search, setSearch, setNoteValue, noteValue, FilterCategory, setFilterCategory, FilterStore, setFilterStore, setTitle, Title, APP_NAME, URL, data, setData, img, setImg, removeUserData, addUserData, updateUserData, dispatch, user
  }

  useEffect(() => {
    fetchTeams();
    let store = `${URL}api/web/top-stores?token=${user && user.data.user_token}&since_id=0&paginate=20&api_token=${API_TOKEN}`;
    let categ = `${URL}api/web/category?token=${user && user.data.user_token}&type=coupon&api_token=${API_TOKEN}`;
    fetchStore(store);
    fetchCateg(categ);
  }, []);

  const fetchStore = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFilterStore(json);
    } catch (error) {
    }
  }
  const fetchCateg = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFilterCategory(json.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchTeams = () => {
    fetch(`${URL}api/team-member`)
      .then((response) => response.json())
      .then((actualData) => { setTeams(actualData.team); setTeamsImgPath(actualData.media_path); })
      .catch((err) => {
        setData([]);
      });
  }




  document.title = Title;
  return (
    <AppContext.Provider value={values}>
      <BrowserRouter>
        <Header />
        <MainRoutes />
        <Footer />
        <Toaster position="top-right" containerStyle={{ "transform": "translateY(104px)" }} />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
