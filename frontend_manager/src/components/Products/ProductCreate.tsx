
import Wrapper from "../Wrapper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export default function ProductCreate() {
    const navigate = useNavigate();
    const initialProduct = {title: '', description: '', image: '', price: '', brand: ''}
    const [product, SetProduct] = useState(initialProduct)
    const [image, setImage] = useState("")
    const [submit, setSubmit] = useState(false)

    const handleValue = async (e:any) => {
        e.preventDefault()
        SetProduct({...product, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const fetchData = {
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            brand: product.brand
        }

        const token = localStorage.getItem("token")
        if(token) {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post(
                'products/',
                fetchData,
                config
            )
            console.log(data)
        }
        navigate('/products')
    }

    const upload = async (e:any) => {
        if (e.target.files[0]) {
            const formData = new FormData();
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(e.target.files[0])
            formData.append('image', e.target.files[0]);
            const response = await axios.post(
                'upload/',
                formData,
                config,
            );
            console.log(response)
            // product.image = response.data.url
            // console.log(response)
            // setImage(product.image);
            // setSubmit(true)
          }
    }


    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Create Product</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control" id="inputTitle" required
                            name="title" value={product.title} onChange={handleValue}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputBrand">Brand</label>
                        <input type="text" className="form-control" aria-label="" required
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
                         onChange={upload}/>
                </div>
                <button type="submit" className="btn btn-primary" >Create</button>
                <button className="btn" type="submit"
                            onClick={() => navigate('/products')}>Cancel
                </button>
            </form>
        </Wrapper>
    )
}