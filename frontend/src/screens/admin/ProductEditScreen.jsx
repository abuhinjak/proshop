import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'	
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const navigate = useNavigate();

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            }).unwrap(); 
            toast.success('Product Updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.message);   
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            setImage(res);
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }

    }

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    return (
        <>
            <Link to='/admin/productlist'>
                <Button className="btn btn-light my-3">
                    Go Back
                </Button>
            </Link>
            <FormContainer>
                <h1>Edit Product</h1> 
                    {loadingUpdate && <Loader />}

                    {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' style={{marginBottom: '10px'}}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price' style={{marginBottom: '10px'}}>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image' style={{marginBottom: '10px'}}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image url'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.Control
                                    type='file'
                                    placeholder='Choose file'
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                                {loadingUpload && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='brand' style={{marginBottom: '10px'}}>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock' style={{marginBottom: '10px'}}>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter countInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category' style={{marginBottom: '10px'}}>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description' style={{marginBottom: '10px'}}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>

                                <Button type='submit' variant='primary' className="btn btn-block my-3">
                                    Update
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
