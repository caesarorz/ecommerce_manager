import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ProductEdit() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const initialProduct = {id: 1, title: '', description: '', image: 'image', price: '', brand: ''}
    const [product, setProducts]  = useState(initialProduct);
    const [image, setImage] = useState("")

    useEffect(() => {
        if (state && state.product) {
            setProducts(state.product);
        }
    }, [state]);

    const handleValue = (e:any) => {
        e.preventDefault()
        setProducts({...product, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        if(token) {
            const submitInfo = {
                title: product.title,
                brand: product.brand,
                description: product.description,
                image: product.image,
                price: product.price
            }
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.put(
                `products/${product.id}`,
                submitInfo,
                config,
            )
            navigate('/products')
        }
    }

    const upload = async (e:any) => {
        if (e.target.files[0]) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            const response = await axios.post('upload', formData);
            product.image = response.data.url
            setImage(product.image);
          }
    }

    return(
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Edit Product</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control" id="inputTitle" required
                            name="title" value={product.title} onChange={handleValue}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputBrand">Brand</label>
                        <input type="text" className="form-control" id="inputBrand" required
                            name="brand" value={product.brand} onChange={handleValue}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPrice">Price</label>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="$0.00"
                            required name="price" value={product.price} onChange={handleValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputDescription">Description</label>
                    <input type="text" className="form-control" id="inputDescription" required
                       name="description" value={product.description} onChange={handleValue}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Upload image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"
                        onChange={upload}    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button className="btn btn" type="submit"
                            onClick={() => navigate('/products')}>Cancel
                </button>
            </form>
        </Wrapper>
    )
}