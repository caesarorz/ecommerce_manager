import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../classes/Product";


export default function Products() {

    const navegate = useNavigate();
    const [products, setProducts]  = useState([{id: 0, title:"", brand:"", description:"", price:0, image:"" }]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get(`/products?page=${page}`);
            // const response = await axios.get(`/products`);

            const val = localStorage.getItem("user")
            if(val) {
                const userInfo = JSON.parse(val)
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const { data } = await axios.get(
                    'products',
                    config
                )
                // setPage(data.meta.page);
                setProducts(data.data);
            }
        };
        fetchData();
      }, [page]);

      const deleteProduct = async (e:any) => {
        e.preventDefault()
        try {
            // await axios.delete(`products/${e.target.value}`)

            const val = localStorage.getItem("user")
            if(val) {
                const userInfo = JSON.parse(val)
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const { data } = await axios.delete(
                    `products/${e.target.value}`,
                    config
                )
                setProducts(products.filter((product: Product) => product.id !== parseInt(e.target.value)));
            }
        } catch(e) {
            console.log(e)
        }
      }

      const editProduct = (productID: number) => {
            navegate(
                `edit/${productID}/`,
                {state: { product: products.find((product: Product) =>
                    product.id === productID) }});
      }

      const pageBack = () => {
        if(page === 1) return;
        // setPage(page-1);
      }

      const pageNext = () => {
        // setPage(page+1)
        setPage((page) => page + 1);
        //navegate(`/products?page=${page+1}`)
      }


    return (
        <Wrapper>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={"/products/create"} type="button" className="btn btn-sm btn-outline-primary">Add</Link>
                    </div>
                </div>

                <div className="table-reponsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map(
                                (product: Product) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td><img src={product.image} width="50" alt={product.title}/></td>
                                            <td>{product.title}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <a href="." type="button" className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => editProduct(product.id)}>Edit
                                                    </a>
                                                    <button type="button" className="btn btn-sm btn-outline-danger"
                                                        value={product.id} defaultValue={product.id} onClick={deleteProduct}>Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a href="." className="page-link" onClick={pageBack}>Previous</a>
                        </li>
                        <li className="page-item">
                            <a href="." className="page-link">{page}</a>
                            </li>
                        <li className="page-item">
                            <a href="." className="page-link" onClick={pageNext}>Next</a>
                        </li>
                    </ul>
                </nav>

        </Wrapper>
    )
}