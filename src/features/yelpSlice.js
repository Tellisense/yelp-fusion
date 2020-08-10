import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import moment from "moment";

export const yelpSlice = createSlice({
  name: "yelp",
  initialState: {
    businesses: [],
    reviews: [],
    loading: false,
    lastFetch: null,
    error: "",
    businessReviews: [],
  },
  reducers: {
    businessRequested: (yelp, action) => {
      yelp.loading = true;
    },
    requestCompleted: (yelp, action) => {
      yelp.loading = false;
    },
    businessReceived: (yelp, action) => {
      yelp.businesses = action.payload;
      yelp.lastFetch = Date.now();
    },

    reviewsReceived: (yelp, action) => {
      yelp.reviews.push(action.payload);
      const combinedArray = (arr1, arr2) => {
        let result = [];
        for (let i = 0; i < arr1.length; i++) {
          result.push({ ...arr1[i], ...arr2[i] });
        }
        return result;
      };
      yelp.businessReviews = combinedArray(yelp.businesses, yelp.reviews);
      yelp.loading = false;
      yelp.lastFetch = Date.now();
    },

    requestFailed: (yelp, action) => {
      yelp.error = action.payload;
      yelp.loading = false;
    },
  },
});

export const {
  businessRequested,
  businessReceived,
  reviewsReceived,
  combineBusinessesAndReviews,
  requestFailed,
  requestCompleted,
} = yelpSlice.actions;

//heroku CORS bypass is used temporarily, API call should be moved to server side to fix
const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";

export const loadYelp = () => (dispatch, getState) => {
  // (Memoization) has the API been called in the last 15 mins, if so, don't make call and return current state
  dispatch(businessRequested());
  const { lastFetch } = getState().yelp;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 15) {
    dispatch(requestCompleted());
    return;
  }

  let yelpREST = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      "Content-type": "application/json",
    },
  });

  const getReviews = businessArray => {
    businessArray.forEach(business => {
      yelpREST(`/businesses/${business.id}/reviews`)
        .then(({ data }) => {
          let { reviews } = data;
          dispatch(reviewsReceived(reviews[0]));
        })
        .catch(error => {
          dispatch(requestFailed(error.message));
        });
    });
  };

  yelpREST("/businesses/search", {
    params: {
      location: "Alpharetta, Georgia",
      term: "ice cream",
      sort_by: "rating",
      limit: 5,
    },
  })
    .then(({ data }) => {
      let { businesses } = data;
      getReviews(businesses);
      dispatch(businessReceived(businesses));
    })
    .catch(error => {
      dispatch(requestFailed(error.message));
    });
};

export const selectYelp = state => {
  return state.yelp.businessReviews && state.yelp.businessReviews;
};

export const selectLoading = state => {
  return state.yelp.loading;
};

export const selectError = state => {
  return state.yelp.error;
};

export default yelpSlice.reducer;
