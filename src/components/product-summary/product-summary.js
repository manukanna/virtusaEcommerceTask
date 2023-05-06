import React from 'react';
import ShippingInformation from './shippingInformation'



const ProductSummary = (props) => {
    const { totalProductsAdded } = props;
    return (
        <div>

            <div>
                <ShippingInformation totalProductsAdded={totalProductsAdded} />
            </div>
        </div>
    )

}

export default ProductSummary;