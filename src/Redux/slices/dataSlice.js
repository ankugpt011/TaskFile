import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchAllPosts = createAsyncThunk(
  'post/fetchAll',
  async (order = 'asc') =>
    fetchData(`https://dummyjson.com/posts?order=${order}`).then(
      data => data.posts,
    ),
);

export const searchPosts = createAsyncThunk(
  'post/searchPosts',
  async ({query, order = 'asc'}) =>
    fetchData(
      `https://dummyjson.com/posts/search?q=${query}&order=${order}`,
    ).then(data => data.posts),
);

export const fetchPostDetail = createAsyncThunk('post/fetchDetail', async id =>
  fetchData(`https://dummyjson.com/posts/${id}`),
);

const initialState = {
  posts: [],
  postDetail: {},
  searchResults: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostDetail.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetail = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
