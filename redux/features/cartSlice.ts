import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { IProduct } from "app-types";

// Define a type for the slice state
interface CartState {
  shouldShow: boolean;
  items: {
    quantity: number;
    product: IProduct;
  }[];
}

// Define the initial state using that type
const initialState: CartState = {
  shouldShow: false,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleCartDisplay: (state) => {
      state.shouldShow = !state.shouldShow;
    },
    increaseCartItemQuantity: (
      state,
      { payload }: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      let itemInCart = state.items.find(
        (item) => item.product._id === payload.product._id
      );
      if (itemInCart !== undefined) {
        itemInCart.quantity += payload.quantity;
      } else {
        state.items.push({
          quantity: payload.quantity,
          product: payload.product,
        });
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
    reduceCartItemQuantity: (
      state,
      { payload }: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      let itemInCart = state.items.find(
        (item) => item.product._id === payload.productId
      );
      if (itemInCart !== undefined) {
        itemInCart.quantity -= payload.quantity;
        if (itemInCart.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product._id !== payload.productId
          );
        }
      } else {
        state.items = state.items.filter(
          (item) => item.product._id !== payload.productId
        );
      }
    },
  },
});

export const {
  increaseCartItemQuantity,
  reduceCartItemQuantity,
  removeCartItem,
  toggleCartDisplay,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getTotalItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const getTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

export default cartSlice.reducer;
