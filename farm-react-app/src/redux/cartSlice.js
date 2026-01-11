import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.find(i => i.id === item.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.find(i => i.id === itemId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                return state.filter(i => i.id !== itemId);
            }
        },
        removeItemFully: (state, action) => {
            const itemId = action.payload;
            return state.filter(i => i.id !== itemId);
        },
    },
});

export const { addToCart, removeFromCart, removeItemFully } = cartSlice.actions;
export default cartSlice.reducer;