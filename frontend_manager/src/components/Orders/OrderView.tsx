import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import { useEffect, useState } from "react";

export default function OrderView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const initialState = {
        id: -1,
        email: "",
        first_name: "",
        last_name: "",
        order_items: [{created_at: "", id: -1, order: -1, price: "", product_title: "", quantity: -1, updated_at: ""}],
        total: -1,
        updated_at: "",
        created_at: "",
    }
    const [order, setOrder] = useState(initialState)

    useEffect(() => {
        if (state && state.order) {
            setOrder(state.order);
        }
    }, [state]);

    return (
        <Wrapper>
            <form>
            <h1 className="h1 mb-3 font-weight-normal">Order Information</h1>
            <hr />
            <fieldset disabled>
                <h1 className="h4 mb-3 font-weight-normal">Order Number # {order.id}</h1>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputCity">Order was created at:</label>
                        <input type="text" className="form-control" id="inputCity" placeholder={order.created_at}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Last time was updated:</label>
                        <input type="text" className="form-control" id="inputCity" placeholder={order.updated_at}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputCity">Total</label>
                        <input type="text" className="form-control" id="inputCity" placeholder={String(order.total)}/>
                    </div>
                </div>
                <hr />
                <h1 className="h4 mb-3 font-weight-normal">Customer</h1>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4">First name</label>
                        <input type="text" className="form-control" id="inputEmail4" placeholder={order.first_name}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">Last name</label>
                        <input type="text" className="form-control" id="inputPassword4" placeholder={order.last_name}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">Email</label>
                        <input type="email" className="form-control" id="inputPassword4" placeholder={order.email}/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder=""/>
                    </div>
                </div>
                <hr />
                <h1 className="h4 mb-3 font-weight-normal">Products</h1>
                <div className="form-group">
                    <div className="table-reponsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Created at</th>
                                    <th>Last Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.order_items.map(
                                    (product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.product_title}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.price}</td>
                                                <td>{product.created_at}</td>
                                                <td>{product.updated_at}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                </fieldset>
                <button className="btn btn" type="submit"
                            onClick={() => navigate('/orders')}>Back
                </button>
            </form>
        </Wrapper>
    )
}