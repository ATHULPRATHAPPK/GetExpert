import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaBolt, FaWrench, FaHome, FaPaintBrush, FaCouch, FaLeaf, FaTshirt, FaSprayCan, FaBroom } from "react-icons/fa";
import { FaStar, FaHandshake, FaChalkboardTeacher, FaLevelUpAlt } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />

      {/* Main content padding */}
      <div className="pt-16"> {/* Adjust padding to match the height of your navbar */}
        {/* Service Categories and Images */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Service Categories */}
              <div className="w-full bg-gray-100">
                <div className="py-10 text-xl text-black">
                  Find your service
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-1">
                  {[
                    { name: "Electrician", icon: <FaBolt className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Plumber", icon: <FaWrench className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Home Appliances", icon: <FaHome className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Painter", icon: <FaPaintBrush className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Carpenter", icon: <FaCouch className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Pest Control", icon: <FaSprayCan className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Laundry", icon: <FaTshirt className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Gardening", icon: <FaLeaf className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                    { name: "Home Cleaning", icon: <FaBroom className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125" size={30} /> },
                  ].map(({ name, icon }) => (
                    <div
                      key={name}
                      className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center"
                    >
                      {icon}
                      <h3 className="text-l font-semibold mt-2 mb-1">{name}</h3>
                    </div>
                  ))}
                </div>
              </div>
              {/* Service Images */}
              <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <img
                  src="path-to-images/your-large-image.jpg"
                  alt="Service Overview"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Promotion */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Space with Professional Painting Services!
            </h2>
            <p className="text-lg mb-6">
              25% off on all interior and exterior painting jobs. Free
              Consultation and Safety Training. Quality Assurance and Satisfaction
              Guarantee.
            </p>
            <button className="bg-orange-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-orange-700 transition">
              Book Now
            </button>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaStar className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125 mr-4" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Diverse Range of Classes</h3>
                  <p>
                    Enjoy a wide range of hands-on, interactive, and online learning
                    classes that offer practical and industry-relevant knowledge.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaHandshake className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125 mr-4" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Opportunity to Teach</h3>
                  <p>
                    Share your expertise with others. Join our platform to teach and
                    earn while you help others gain new skills.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaChalkboardTeacher className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125 mr-4" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
                  <p>
                    Engage in hands-on, interactive lessons that provide a practical
                    understanding of various trades and skills.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaLevelUpAlt className="text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-125 mr-4" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Level Up!</h3>
                  <p>
                    Take your career to the next level with our expert training and
                    certification programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
