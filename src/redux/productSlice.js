import  {createSlice} from '@reduxjs/toolkit'

const intialState ={

    products :[],
};

const productSlice =createSlice({
    name:'product',
    intialState,
    reducers:{
        addProduct(state,action){
            state.products.push(action.payload);

        },

        /*updateProduct(state,action){
            const index = state .products.findIndex(p =>p.id ===action.payload.id);

            if(index !==-1){
                state.product[index]=action.payload;
            }
        },*/
    },
});

export const {addProduct} =productSlice.actions
export default productSlice.reducer