import React, {Fragment, useEffect, useContext} from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import {HomeContext} from "./";
import {sliderImages} from "../../admin/dashboardAdmin/Action";
import Carousel from "react-bootstrap/Carousel";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const {data, dispatch} = useContext(HomeContext);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data.sliderImages.map((each, index) => index));
  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2">
        {data.sliderImages.length > 0 ? (
          <Carousel data-bs-theme="dark" style={{height: "40%"}}>
            {data.sliderImages.map((each, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`${apiURL}/uploads/customize/${each.slideImage}`}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>No slider images available.</p>
        )}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
