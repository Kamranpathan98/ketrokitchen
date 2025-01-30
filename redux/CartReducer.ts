import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a cart item
interface CartItem {
    id: number; // or string, depending on your use case
    name: string;
    price: number;
    quantity: number; // You can add more properties as needed
}

// Define the type for the cart state
interface CartState {
    cart: CartItem[];
}

// Initial state for the cart
const initialState: CartState = {
    cart: []
};

// Create the cart slice
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const itemExist = state.cart.find((item) => item.id === action.payload.id);
            if (itemExist) {
                itemExist.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const itemExist = state.cart.find((item) => item.id === action.payload.id);
            if (itemExist) {
                itemExist.quantity += 1;
            }
        },
        decrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const itemExist = state.cart.find((item) => item.id === action.payload.id);
            if (itemExist) {
                if (itemExist.quantity > 1) {
                    itemExist.quantity--;
                } else {
                    // If quantity is 1, remove the item from the cart
                    state.cart = state.cart.filter(item => item.id !== action.payload.id);
                }
            }
        },
        clearCart: (state) => {
            state.cart = [];
        }
    }
});

// Export the actions
export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = CartSlice.actions;

// Export the reducer
export default CartSlice.reducer;