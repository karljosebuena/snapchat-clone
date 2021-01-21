import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    cameraImage: null,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = null
    }
  },
});

// Actions
export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

// Selectors
export const selectCameraImage = state => state.camera.cameraImage;

export default cameraSlice.reducer;
