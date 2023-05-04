import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const onClickGo = (event) => {
        navigate("/dashboard");
    };
    return (
        <>
            <Button
                variant="primary"
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 10,
                }}
                size="lg"
                onClick={onClickGo}
                id="go-to-dashboard"
            >
                Go to Dashboard
            </Button>
            <Carousel interval={5000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/blockchain.jpg"
                        alt="First slide"
                        style={{ objectFit: "cover", height: "100vh" }}
                    />
                    <Carousel.Caption>
                        <h3>Blockchain technology</h3>
                        <p>Empowering the Future with Blockchain Technology.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/etherum-trufle-ganache.png"
                        alt="Second slide"
                        style={{ objectFit: "cover", height: "100vh" }}
                    />
                    <Carousel.Caption>
                        <h3>Smart Contract</h3>
                        <p>
                            Unlock the power of trust and automation with Smart
                            Contracts.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/metamask.png"
                        alt="Third slide"
                        style={{ objectFit: "cover", height: "100vh" }}
                    />
                    <Carousel.Caption>
                        <h3>Metamask</h3>
                        <p>
                            Securely connect with the world of blockchain
                            through Metamask.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/IPFS.jpg"
                        alt="Third slide"
                        style={{ objectFit: "cover", height: "100vh" }}
                    />
                    <Carousel.Caption>
                        <h3>IPFS</h3>
                        <p>
                            Empowering decentralized sharing with IPFS
                            technology.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default Home;
