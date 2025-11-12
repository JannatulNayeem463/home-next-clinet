import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("https://home-nest-server-sigma.vercel.app/properties/limit")
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error(err));
  }, []);


  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/properties/${id}`);
    }
  };

  return (
    <div className="home-page">
      {/* Slider / Banner  */}
      <section className="banner-slider">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3500 }}
          loop={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <div
              className="slide bg-cover bg-center text-black flex flex-col items-center justify-center h-[400px]"
              style={{ backgroundImage: "url('https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg')" }}
            >
              <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
              <p className="text-lg mt-2">Modern, affordable, and ready for you.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="slide bg-cover bg-center text-black flex flex-col items-center justify-center h-[400px]"
              style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikiqPryejGy3pfGro0694QYEz-uGeOiKjHQ&s')" }}
            >
              <h1 className="text-4xl font-bold">Luxury Apartments</h1>
              <p className="text-lg mt-2">Explore the best properties in your area.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="slide bg-cover bg-center text-black flex flex-col items-center justify-center h-[400px]"
              style={{ backgroundImage: "url('https://media.istockphoto.com/id/1187090198/photo/happy-young-boy-kid-opening-the-sliding-door-on-rooftop-patio-area-at-home.jpg?s=612x612&w=0&k=20&c=_bysKac6ot7vxC_Mtid9CYcf6ApuaGQXAXEa3AVWiSU=')" }}
            >
              <h1 className="text-4xl font-bold">Invest Smartly</h1>
              <p className="text-lg mt-2">Buy and rent properties with confidence.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/*  Featured Property */}
      <section className="featured-properties py-10">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
            Featured Real Estate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <div
                key={property._id}
                className="border rounded-lg shadow-md overflow-hidden bg-white"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-52 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-black font-bold">{property.name}</h3>
                  <p className="text-sm text-gray-500">{property.category}</p>
                  <p className="text-gray-700 my-2 line-clamp-2">
                    {property.description}
                  </p>
                  <p className="text-gray-600">
                    📍 <strong>{property.location}</strong>
                  </p>
                  <p className="text-blue-600 font-bold mt-2">
                    ${property.price}
                  </p>
                  <button
                    onClick={() => navigate(`/details/${property._id}`)}
                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US  */}
      <section className="why-choose-us bg-gray-100 py-10">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Why Choose HomeNest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Verified Listings</h3>
              <p className="text-black">
                All our properties are verified for safety and legal compliance.
              </p>
            </div>
            <div className="p-5 bg-white rounded shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Trusted Agents</h3>
              <p className="text-black">
                We connect you only with the most reliable and experienced agents.
              </p>
            </div>
            <div className="p-5 bg-white rounded shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-black">
                Find properties that fit your budget without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  EXTRA SECTION 1 */}
      <section className="testimonials py-10 bg-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 shadow rounded bg-gray-50">
              <p className="text-black">"HomeNest helped me find my dream apartment quickly!"</p>
              <h4 className="mt-3 font-semibold text-blue-600">– Sarah M.</h4>
            </div>
            <div className="p-5 shadow rounded bg-gray-50">
              <p className="text-black">"Excellent service and very professional agents!"</p>
              <h4 className="mt-3 font-semibold text-blue-600">– John D.</h4>
            </div>
            <div className="p-5 shadow rounded bg-gray-50">
              <p className="text-black">"I sold my property faster than I expected. Highly recommend!"</p>
              <h4 className="mt-3 font-semibold text-blue-600">– Ayesha R.</h4>
            </div>
          </div>
        </div>
      </section>

      {/*  EXTRA SECTION 2  */}
      <section className="blog-section py-10 bg-gray-100">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Real Estate Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white shadow rounded">
              <h3 className="font-semibold text-black text-xl mb-2">
                How to Choose the Right Location
              </h3>
              <p className="text-black">
                Learn key factors that affect property value and living quality.
              </p>
            </div>
            <div className="p-5 bg-white shadow rounded">
              <h3 className="font-semibold text-black text-xl mb-2">
                5 Tips for First-Time Buyers
              </h3>
              <p className="text-black">
                Simple but effective steps to make your first purchase smoother.
              </p>
            </div>
            <div className="p-5 bg-white shadow rounded">
              <h3 className="font-semibold text-black text-xl mb-2">
                How to Increase Property Value
              </h3>
              <p className="text-black">
                Renovations and design ideas to get better resale prices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
