import React ,{useState,useEffect} from "react";
import Axios from "axios";
import {random,commerce,datatype} from "faker"
import {Container,Row,Col} from "reactstrap"
import CartItem from "./CartItem"

const apiKey = "INSERT_YOUR_KEY_HERE"
const url="https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"
const localurl = "http://myjson.dit.upm.es/api/bins/hyrn"

const BuyPage = ({addInCart}) => {
    const[product,setProduct] = useState([]);

    // const fetchPhotos = async () => {
    //     const response = await Axios.get(url,{
    //         header:{
    //             Authorization : apiKey
    //         }
    //     });

    const fetchPhotos = async () => {
        const { data } = await Axios.get(localurl)
           
        
        const { photos } = data;

        const allProuduct = photos.map(photo => ({
            smallImage:photo.src.medium,
            tinyImage:photo.src.tiny,
            productName:random.word(),
            productPrice:commerce.price(),
            id: datatype.uuid()
        }))
        setProduct(allProuduct);
    }

        useEffect(() => {
            fetchPhotos();
        },[]);

        return(
            <Container fluid>
                <h1 className="text-success text-center">BuyPage</h1>
                <Row>
                    {product.map(product => (
                        <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        )

};

export default BuyPage