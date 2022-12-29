import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";


// initial state
export const initialState = {
  loading: false,
  error: false,
  birds: [],
};

// our slice
const birdsDataSlice = createSlice({
  name: "birdsData",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.birds = payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

// export the actions
export const { setLoading, setBirds, setError } = birdsDataSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const birdsSelector = (state) => state.birds;

// export the default reducer
export default birdsDataSlice.reducer;

// set up axios - simple json-server prototype config here
const api = axios.create({
  baseURL: "http://localhost:3000/birds",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// fetch all items
export function fetchItems() {
  return async (dispatch) => {
    api
      .get("/birds")
      .then((response) => {
        dispatch(setItems(response.data));
      })
      .catch((er) => {
        dispatch(setError());
      });
  };
}




// pages/ItemsPage.js component that calls and renders the items
// --------------------------------------------------------------------
import React, { useEffect } from "react";

// redux mapping
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, itemsSelector } from "../slices/items";

const ItemsPage = () => {
  
  // set up dispatch
  const dispatch = useDispatch();
  
  // fetch data from our store
  const { loading, error, items } = useSelector(itemsSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // render the items
  const renderItems = () => {
    
    // loading state
    if (loading) return <strong>Loading please wait...</strong>;
    
    // error state
    if (error) return <strong>Items not available at this time</strong>;
    
    // regular data workflow
    return items.map((i) => <li> {i.name} </li>);
  };

  // template
  return (
    <div>
      hi items be here
      <ul>{renderItems()}</ul>
    </div>
  );
};

export default ItemsPage;
