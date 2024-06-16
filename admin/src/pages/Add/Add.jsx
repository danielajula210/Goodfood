import React, { useState } from 'react'
import './Add.css'
import { assets,url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salate"
    });

    const [image, setImage] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salate"
            })
            setImage(false);
        }
        else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Încarcă imaginea</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Nume produs</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Scrie aici' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Descriere</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Scrie descrierea aici' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Categorii</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Salate">Salate</option>
                            <option value="Rulade">Rulade</option>
                            <option value="Deserturi">Deserturi</option>
                            <option value="Sandvișuri">Sandvișuri</option>
                            <option value="Garnituri">Garnituri</option>
                            <option value="Pește">Pește</option>
                            <option value="Paste">Paste</option>
                            <option value="Băuturi">Băuturi</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Preț</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25 RON' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
