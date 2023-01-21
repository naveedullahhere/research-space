
import './App.css';
import { Header } from './Component/layout/Header';
import { Footer } from './Component/layout/Footer';
import { MainRoutes } from './MainRoutes';
import { AppContext } from "./context/AppContext.js";
import { useState, useEffect } from 'react';
import { URL, APP_NAME, API_TOKEN, SITE_URL } from './config'
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData, addUserData, updateUserData, setStyle } from './actions';

import { Footer1 } from './Component/layout/Footer1';
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {
  const dispatch = useDispatch();

  const style = useSelector((state) => { return state.styleReducer.style });
  const user = useSelector((state) => state.userReducer.user[0]);
  // const items = useSelector((state) => state.userReducer.items);


  // dispatch(wishlistItems({ "name": "Mannan" }));
  // var style = "list";
  // console.log(items);
  const [couponItems, setCouponItems] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [heartedTags, setHeartedTags] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [FilterStore, setFilterStore] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const [LikedItems, setLikedItems] = useState([]);
  const [SavedItems, setSavedItems] = useState([]);
  const [Title, setTitle] = useState(`Home${APP_NAME}`);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamsImgPath, setTeamsImgPath] = useState("");
  const [search, setSearch] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [img, setImg] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // var APP_NAME = APP_NAME;


  useEffect(() => {
    fetchTeams();
    let store = `${URL}api/web/top-stores?token=${user && user.data.user_token}&since_id=0&paginate=20&api_token=${API_TOKEN}`;
    let categ = `${URL}api/web/category?token=${user && user.data.user_token}&type=coupon&api_token=${API_TOKEN}`;
    fetchStore(store);
    fetchCateg(categ);

    if (user) {
      fetch(`${URL}api/web/getgoals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_token: user.data.user_token })
      })
        .then((response) => response.json())
        .then((actualData) => {
          if (JSON.parse(actualData[0].keywords).length != 0) {
            setHeartedTags(JSON.parse(actualData[0].keywords));
          }
          else {
            setTimeout(() => {
              setShowPopup(true);
            }, 3000);
          }
        })
    }
    fetch(`${URL}api/web/keywords`)
      .then((response) => response.json())
      .then((actualData) => { setKeywords(actualData); })
      .catch((err) => {
        toast.error("something went wrong!");
      }
      );
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

  const continueWithSocials = (type, credentials, where, domain) => {

    if (where === 'login') {

      fetch(`${URL}api/web/loginwithsocial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success != false) {
            dispatch(addUserData(data.data, []));
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        }).catch((err) => {
          toast.error("Something went wrong!");
        })
    }
    else if (where === 'signup') {
      if (type === 'facebook') {
        fetch(`${URL}api/web/signupwithsocial`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success != false) {
              dispatch(addUserData(data.data, []));
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          }).catch((err) => {
            toast.error("Something went wrong!");
          })
      }

      else {
        fetch(`${URL}api/web/signupwithsocial`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success != false) {
              dispatch(addUserData(data.data, []));
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          }).catch((err) => {
            toast.error("Something went wrong!");
          })
      }
    }

    else {
      toast.error("Something went wrong!");
    }
  }

  var values = {
    SITE_URL, API_TOKEN, teams, teamsImgPath, currentTag, continueWithSocials, setCurrentTag, keywords, couponItems, heartedTags, setHeartedTags, setCouponItems, setStyle, style, SavedItems, setSavedItems, WishlistItems, LikedItems, setLikedItems, setWishlistItems, search, setSearch, setNoteValue, noteValue, FilterCategory, setFilterCategory, FilterStore, setFilterStore, setTitle, Title, APP_NAME, URL, data, setData, img, setImg, removeUserData, addUserData, updateUserData, dispatch, user
  }
  return (
    <GoogleOAuthProvider clientId="191543384667-v96v2vm38b2sib51itnfvsbk1p130ul9.apps.googleusercontent.com">

      <AppContext.Provider value={values}>
        <BrowserRouter>
          {
            showPopup &&
            <>
              <div className="popup-overlay"></div>
              <div class="popup">
                <button id="close" onClick={() => setShowPopup(false)}>&times;</button>
                <h2 className='mb-0'>Can't Use Our New Free Goals Feature?</h2>
                <p>
                  Hurry!!! Go And Add Some Goals TO Improve Your Experience with Discount Space!
                </p>
                <Link to="/goals" className='btn bg-signature text-white' onClick={() => setShowPopup(false)}>Let's Goooo</Link>
              </div>
            </>
          }
          <Header />
          <MainRoutes />
          <Footer1 />
          <Toaster position="top-right" containerStyle={{ "transform": "translateY(104px)" }} />
        </BrowserRouter>
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
