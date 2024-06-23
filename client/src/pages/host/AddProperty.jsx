import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useProperty } from '../../context/PropertyContext';

const PropertyDetails = ({ property, handleChange, handleNext }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Property Details</h2>
    <div className="mb-4">
      <label className="block mb-1">Title:</label>
      <input
        type="text"
        name="title"
        value={property.title}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Description:</label>
      <textarea
        name="description"
        value={property.description}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Total Unique Sections:</label>
      <input
        type="number"
        name="total_unique_sections"
        value={property.total_unique_sections}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Property Type:</label>
      <select
        name="type"
        value={property.type}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      >
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Cottage">Cottage</option>
        <option value="Cabin">Cabin</option>
        <option value="Hotel">Hotel</option>
      </select>
    </div>
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
);

const PropertySections = ({ property, navigate, handlePrevious, handleNext }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Sections</h2>
    {property.sections.map((section, index) => (
      <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
        <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
        <p><strong>Name:</strong> {section.section_name}</p>
        <p><strong>Count:</strong> {section.count}</p>
        <p><strong>Beds:</strong> {section.plan.beds}</p>
        <p><strong>Living Area:</strong> {section.plan.living_area}</p>
        <p><strong>Bathrooms:</strong> {section.plan.bathrooms}</p>
        <p><strong>Kitchens:</strong> {section.plan.kitchens}</p>
        <p><strong>Price Per Night:</strong> ${section.price_per_night}</p>
        <p><strong>Image URL:</strong> <a href={section.images[0].url} target="_blank" rel="noopener noreferrer">{section.images[0].url}</a></p>
      </div>
    ))}
    <button
      type="button"
      onClick={() => navigate('/host/add-section', { state: { ...property, stage: 2 } })}
      className="bg-green-500 text-white px-4 py-2 rounded mb-4"
    >
      Add Section
    </button>
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={handlePrevious}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
);

const PropertyImages = ({ property, handleChange, handlePrevious, handleNext, setProperty }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Property Images</h2>
    {property.images.map((image, index) => (
      <div key={index} className="mb-4">
        <label className="block mb-1">Image URL:</label>
        <input
          type="text"
          name={`image_${index}`}
          value={image.url}
          onChange={(e) => {
            const newImages = property.images.map((img, imgIndex) => {
              if (imgIndex !== index) return img;
              return { ...img, url: e.target.value };
            });
            setProperty(prevState => ({
              ...prevState,
              images: newImages
            }));
          }}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
    ))}
    <button
      type="button"
      onClick={() => setProperty(prevState => ({
        ...prevState,
        images: [...prevState.images, { url: '' }]
      }))}
      className="bg-green-500 text-white px-4 py-2 rounded mb-4"
    >
      Add More Images
    </button>
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={handlePrevious}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
);

const LocationInformation = ({ property, handleChange, handlePrevious, handleSubmit, navigate }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Location Information</h2>
    <div>
      <label className="block mb-1">Address:</label>
      <input
        type="text"
        name="address"
        value={property.location.address}
        onChange={(e) => handleChange({ target: { name: 'location.address', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Latitude:</label>
      <input
        type="number"
        name="latitude"
        value={property.location.latitude}
        onChange={(e) => handleChange({ target: { name: 'location.latitude', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Longitude:</label>
      <input
        type="number"
        name="longitude"
        value={property.location.longitude}
        onChange={(e) => handleChange({ target: { name: 'location.longitude', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">City:</label>
      <input
        type="text"
        name="city"
        value={property.location.city}
        onChange={(e) => handleChange({ target: { name: 'location.city', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">District:</label>
      <input
        type="text"
        name="district"
        value={property.location.district}
        onChange={(e) => handleChange({ target: { name: 'location.district', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Province:</label>
      <input
        type="text"
        name="province"
        value={property.location.province}
        onChange={(e) => handleChange({ target: { name: 'location.province', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Zip Code:</label>
      <input
        type="text"
        name="zipcode"
        value={property.location.zipcode}
        onChange={(e) => handleChange({ target: { name: 'location.zipcode', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={handlePrevious}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => navigate('/host/add-location', { state: { ...property, stage: 4 } })}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Change Location
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  </div>
);


const AddProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, token } = useAuth();
  const { property, setProperty } = useProperty();
  const [stage, setStage] = useState(location.state?.stage || 1);

  useEffect(() => {
    if (location.state) {
      setProperty(prevState => ({
        ...prevState,
        ...location.state
      }));
    }
  }, [location.state, setProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNext = () => {
    setStage(prevStage => prevStage + 1);
  };
  
  const handleStageChange = (newStage) => {
    setStage(newStage);
  };
  
  const handlePrevious = () => {
    setStage(prevStage => prevStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/properties/add`, property, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Property added:', response.data);
    } catch (error) {
      console.error('There was an error adding the property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
      {stage === 1 && (
        <PropertyDetails property={property} handleChange={handleChange} handleNext={handleNext} />
      )}
      {stage === 2 && (
        <PropertySections property={property} navigate={navigate} handlePrevious={handlePrevious} handleNext={handleNext} />
      )}
      {stage === 3 && (
        <PropertyImages property={property} handleChange={handleChange} handlePrevious={handlePrevious} handleNext={handleNext} setProperty={setProperty} />
      )}
{stage === 4 && (
  <LocationInformation
    property={property}
    handleChange={handleChange}
    handlePrevious={handlePrevious}
    handleSubmit={handleSubmit}
    navigate={navigate}
  />
)}


    </form>
  );
};

export default AddProperty;
