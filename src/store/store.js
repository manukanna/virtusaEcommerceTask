import { configureStore, createSlice } from "@reduxjs/toolkit";

import { storePoducts } from '../fetchProducts/fetchProducts'


const initialState = {
    loading: false,
    storeProducts: [],
    error: ""
}

const allStoreProducts = createSlice({
    name: "allProducts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(storePoducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(storePoducts.fulfilled, (state, action) => {
            state.loading = false
            state.storeProducts = action.payload
            state.error = ""
        })
        builder.addCase(storePoducts.rejected, (state, action) => {
            state.loading = false
            state.storeProducts = []
            state.error = action.error.message
        })
    }
})



const addedProductsToCart = createSlice({
    name: "productsAdded",
    initialState: [],
    reducers: {
        addProduct(state, action) {
            let data;
            if (state.length === 0) {
                state.push(action.payload);
            } else {
                let quantityAddeed = false;
                data = state.map(item => {
                    if (item.title === action.payload.title) {
                        quantityAddeed = true
                        return { ...item, quantityProduct: item.quantityProduct + 1 }
                    } else {
                        return item
                    }
                })
                if (!quantityAddeed) state.push(action.payload)
                if (quantityAddeed) state = data
            }

            return state;
        },
        removeProduct(state, action) {

            let decreaseCountItem = state.map(item => {
                if (item.title === action.payload.title) {
                    return { ...item, quantityProduct: item.quantityProduct - 1 }
                }
                return item
            })
            let removeItem = decreaseCountItem.filter(item => item.quantityProduct !== 0)
            return removeItem

        }
    }
})


const orderSummaryStatus = createSlice({
    name: "orderSummary",
    initialState: [
        {
            shippingsSummary: true,
            shippingsEditedSummary: false,
            billingInformation: false,
            billingInformationEdited: false,
            oderSummary: false,
            oderSummaryEdited: false,
            paymentInformation: false,
            paymentInformationEdited: false
        }
    ],
    reducers: {
        addressSelected(state, action) {
            let userShippingAddressSelected = state.map(item => {
                return { ...item, shippingsSummary: false, shippingsEditedSummary: true, billingInformation: true }
            })
            return userShippingAddressSelected;
        },
        billingSelected(state,action) {
            let userBillingAddressSelected = state.map(item => {
                return { ...item, billingInformation: false, billingInformationEdited: true, oderSummary: true }
            })
            return userBillingAddressSelected;
        },
        productsConfirmed(state,action) {
            let userProductsConfirmed = state.map(item => {
                return { ...item, oderSummary: false, oderSummaryEdited: true, paymentInformation: true }
            })
            return userProductsConfirmed;
        },
        changeButtonSummary(state, action) {
            let openSummaryDetails;
            switch (action.payload) {
                case "shippingSummary":
                    openSummaryDetails = state.map(item => {
                        return { ...item, shippingsSummary: true, billingInformation: false, oderSummary: false, paymentInformation: false }
                    })
                    break;
                case "billingSummary":
                    openSummaryDetails = state.map(item => {
                        return { ...item, shippingsSummary: false, billingInformation: true, oderSummary: false, paymentInformation: false }
                    })
                    break;

                case "orderSummary":
                    openSummaryDetails = state.map(item => {
                        return { ...item, shippingsSummary: false, billingInformation: false, oderSummary: true, paymentInformation: false }
                    })
                    break;
                default:
                    openSummaryDetails = state.map(item => {
                        return { ...item, shippingsSummary: false, billingInformation: false, oderSummary: false, paymentInformation: true }
                    })

                    break;
            }
            return openSummaryDetails;
        }

    }
})


const userShippingAddressSelected = createSlice({
    name: "userAddressSelected",
    initialState: {},
    reducers: {
        deliveryAddress(state, action) {
            return action.payload
        },
    }
})

const userBillingAddressSelected = createSlice({
    name: "userAddressSelected",
    initialState: {},
    reducers: {
        billingAddress(state, action) {
            return action.payload
        }
    }
})

const userAllAddress = createSlice({
    name: "usersAllAddress",
    initialState: [
        { name: "Ramesh", phone: "9987654321", pincode: "345645", address: "10-345/6", locality: "Hebbal", landMark: "Near Water Tank", state: "Karnataka", city: "Banglore", altPhone: "9876878865", addressConfirmed: false },
        { name: "Suresh", phone: "9654208765", pincode: "560045", address: "102", locality: "Sai Nagar Colony", landMark: "Near Sai Nagar Bus Stop", state: "Telangana", city: "Hyderabad", altPhone: "9876789075", addressConfirmed: false },
        { name: "Ram babu", phone: "9324165768", pincode: "5000047", address: "1-35/", locality: "Marathahalli", landMark: "Near tivoli Theatre", state: "Andhra Pradesh", city: "Vijayawada", altPhone: "9123414678", addressConfirmed: false },
        { name: "Satya Narayana", phone: "9789632987", pincode: "560004", address: "8-34-6", locality: "Sai Ram Theatre", landMark: "Near Big Garden", state: "Karnataka", city: "Banglore", altPhone: "8754614379", addressConfirmed: false }
    ],
    reducers: {
        defaultAddresses(state, action) {
            let changeAddress = state.filter(item => item.pincode !== action.payload.pincode)
            changeAddress.unshift(action.payload)
            // [action.payload, ...changeAddress]
            return changeAddress
        },
        changesAddress(state, action) {
            let addressChange = state.map(item => {
                if (item.phone === action.payload) {
                    return { ...item, addressConfirmed: true }
                } else {
                    return { ...item, addressConfirmed: false }
                }
            })
            return addressChange
        }
    }
})


const getMonthsList = createSlice({
    name: "monthsList",
    initialState: [],
    reducers: {
        getMonths(state, action) {
            let date;
            const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            let currentYear = new Date().getFullYear();
            if (JSON.stringify(currentYear) === action.payload) {
                date = new Date();
            } else {
                date = new Date("January", action.payload);
            }
            const rest = month.slice(date.getMonth())

            return rest
        }
    }
})

// const increaseCountProducts = createSlice({
//     name: "increaseCountProductss",
//     initialState: [],
//     reducers: {
//         increaseCountProduct(state, action) {
//             // console.log(action.payload);
//             let userAddedSameProducr = action.payload.oldProductsAdded.map(item => {
//                 if (item.title === action.payload.newSameProduct.title) {
//                     return { ...item, quantityProduct: item.quantityProduct + 1 }
//                 } else {
//                     return item
//                 }
//             })
//             return userAddedSameProducr
//         }
//     }
// })





const store = configureStore({
    reducer: {
        allProducts: allStoreProducts.reducer,
        addProduct: addedProductsToCart.reducer,
        changeOrderSummary: orderSummaryStatus.reducer,
        deliveryAddress: userShippingAddressSelected.reducer,
        billingAddress: userBillingAddressSelected.reducer,
        defaultAddresses: userAllAddress.reducer,
        getMonths: getMonthsList.reducer,

    }
})

export { store };
export const { allProducts } = allStoreProducts.actions
export const { addProduct, removeProduct } = addedProductsToCart.actions
export const { addressSelected, billingSelected, productsConfirmed, changeButtonSummary } = orderSummaryStatus.actions
export const { deliveryAddress } = userShippingAddressSelected.actions
export const { billingAddress } = userBillingAddressSelected.actions
export const { defaultAddresses, changesAddress } = userAllAddress.actions
export const { getMonths } = getMonthsList.actions
