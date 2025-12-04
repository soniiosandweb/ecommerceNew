import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearProductsErrors, getProductDetails } from "../../Store/Actions/productActions";
import { useSnackbar } from "notistack";
import SEO from "../../Layout/SEO";
import { Col, Container, Row } from "react-bootstrap";

const ProductDetails = () => {

    const params = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const productURL = params.url;

    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearProductsErrors());
        }

        if(loading === undefined && productURL !== product?.url){
          dispatch(getProductDetails(productURL));  
        }
    }, [dispatch, productURL, product, loading, error, enqueueSnackbar])

    return(
        <>
            <SEO title={`${product && product.name} - Ecomart`} />

            <div className="product_details_section padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="main_heading">{product && product.name}</h2>
                            <img src={product && product.images} alt={product && product.name} className="margin-top margin-below" />
                            <p className="paragraph">{product && product.description}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )

}

export default ProductDetails