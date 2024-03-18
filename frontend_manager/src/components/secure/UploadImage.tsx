import axios from "axios";
import { useState } from "react"

export default function UploadImage() {
    const [image, setImage] = useState("")

    const upload = async (e:any) => {
        if (e.target.files[0]) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            const response = await axios.post('upload', formData);
            // product.image = response.data.url
            // setImage(product.image);
          }
    }

    return (
        <div>
            <div className="input-group is-invalid">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedInputGroupCustomFile" required />
                    <label className="custom-file-label" htmlFor="validatedInputGroupCustomFile">Choose file...</label>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Button</button>
                </div>
            </div>
        </div>
    )
}