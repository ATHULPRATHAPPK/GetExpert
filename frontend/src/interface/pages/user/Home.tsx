import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Find Service at Your Doorstep</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Service Categories */}
          {['Electrician', 'Plumber', 'Home Appliances Technician', 'Painter', 'Carpenter', 'Pest Control Service', 'Laundry', 'Gardening', 'Home Cleaning'].map((service) => (
            <div key={service} className="bg-white p-6 rounded shadow text-center">
              <h2 className="text-xl font-semibold">{service}</h2>
            </div>
          ))}
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Transform Your Space with Professional Painting Services!</h2>
          <p>25% off on all interior and exterior painting jobs. Free Consultation and Safety Training. Quality Assurance and Satisfaction Guarantee.</p>
          <button className="mt-4 bg-orange-600 text-white py-2 px-4 rounded">Book Now</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Other Advantages */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Diverse Range of Classes</h3>
            <p>Enjoy a wide range of hands-on, interactive, and online learning classes that offer practical and industry-relevant knowledge.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Opportunity to Teach</h3>
            <p>Share your expertise with others. Join our platform to teach and earn while you help others gain new skills.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
            <p>Engage in hands-on, interactive lessons that provide a practical understanding of various trades and skills.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Level Up!</h3>
            <p>Take your career to the next level with our expert training and certification programs.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
