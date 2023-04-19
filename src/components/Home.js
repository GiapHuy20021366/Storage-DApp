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
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
