import React from "react"
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function ProductList(){

    const products = useSelector(state => state.products.products)

    return (
        <>
        <div>
            <h1> Product List</h1>
            <Link to ="/add"> Add new Product</Link>
            <table border ="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Total Cost</th>
                        <th>No of Raw Materials</th>
                    </tr>
                </thead>

                
            </table>
        </div>
        </>
    )
}

export default ProductList;