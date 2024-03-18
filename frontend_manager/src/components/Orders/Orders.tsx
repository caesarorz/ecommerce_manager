import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Order } from "../../classes/Order";

export default function Orders() {
    const navegate = useNavigate();
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
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
                    'orders',
                    config
                )
                setOrders(data.data)
            }
        }
        fetchData()
    }, [])

    const viewOrder = (orderID:number) => {
            navegate(`/orders/${orderID}`, {
                state: { order: orders.find((order: Order) =>
                    order.id === orderID) }
            });
    }

    const exportTo = async () => {
        // const response = await axios.get(`export`, {responseType: 'blob'});
        const val = localStorage.getItem("user")
        if(val) {
            const userInfo = JSON.parse(val)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
            }
            const { data } = await axios.get(
                'export',
                config,
            )
            const blob = new Blob([data], {type: 'text/csv'});
            // const downloadURL = window.URL.createObjectURL(data)
            // const link = document.createElement('a')
            // link.href = downloadURL;
            // link.download = 'orders.csv'
            // link.click()
        }

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
                        <button onClick={exportTo} className="btn btn-sm btn-outline-primary">Export Orders</button>
                    </div>
                </div>

                <div className="table-reponsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Order Items</th>
                                <th>Total</th>
                                <th>Customer first name</th>
                                <th>Customer last name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(
                                (order: Order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.order_items.map(product => product.product_title)}</td>
                                            <td>{order.total}</td>
                                            <td>{order.first_name}</td>
                                            <td>{order.last_name}</td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => viewOrder(order.id)}>View
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