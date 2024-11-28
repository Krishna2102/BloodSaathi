import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import image11 from '../images/image11.jpg';
import image12 from '../images/image12.jpg';
import image13 from '../images/image13.jpg';
import image14 from '../images/image14.jpg';
import image24 from '../images/image24.jpg';
import image21 from '../images/image21.jpg';
import image22 from '../images/image22.jpg';
import image23 from '../images/image23.jpg';
import image31 from '../images/image31.jpg';
import image32 from '../images/image32.jpg';
import image33 from '../images/image33.jpg';
import image34 from '../images/image34.jpg';
import image41 from '../images/image41.jpg';
import image42 from '../images/image42.jpg';
import image43 from '../images/image43.jpg';
import image44 from '../images/image44.jpg';
import image51 from '../images/image51.jpg';
import image52 from '../images/image52.jpg';
import image53 from '../images/image53.jpg';
import image54 from '../images/image54.jpg';
import Modal from 'react-modal';

// Dummy data for stories with multiple images
const storiesData = [
    {
        id: 1,
        title: "A Life Saved",
        content: [
            "In a small town, there lived a young girl named Aisha who was diagnosed with a rare blood disorder. Her family struggled to find the right blood donors to support her treatment.",
            "One day, a local blood bank organized a blood donation camp. The community came together, and many generous individuals stepped forward to donate blood.",
            "Among them was a brave young man named Raj. He had always been hesitant about donating blood, but after learning about Aisha's story, he knew he had to help.",
            "Raj donated blood, and soon after, Aisha received the transfusion she desperately needed. Thanks to the efforts of Raj and many other donors, Aisha's health improved dramatically.",
            "This act of kindness ignited a movement, leading to more blood donation drives in the town, helping countless patients in need.",
            "Aisha's story is a powerful reminder of the impact we can have on each other's lives. A single donation can change the world for someone in need. Let’s continue to spread hope and inspire others to give the gift of life."
        ],
        images: [image11, image12, image13, image14],
    },
    {
        id: 2,
        title: "The Community that Cares",
        content: [
            "In another part of the city, a community came together to support a local hero, a firefighter who suffered injuries during a rescue mission.",
            "They organized a fundraiser and a blood donation camp to help him recover. Many came forward to donate blood, showing the true spirit of unity.",
            "This incident inspired others to regularly donate blood, creating a ripple effect of kindness in the community."
        ],
        images: [image21, image22, image23, image24],
    },
    // Add more stories similarly...
];

const InspirationalStory = () => {
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [newStory, setNewStory] = useState({ title: '', content: [''], images: [''] });
    const selectedStory = storiesData[selectedStoryIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedStory.images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [selectedStory.images.length]);

    const handleNextStory = () => {
        const nextIndex = (selectedStoryIndex + 1) % storiesData.length;
        setSelectedStoryIndex(nextIndex);
        setCurrentImageIndex(0);
    };

    const handlePrevStory = () => {
        const prevIndex = (selectedStoryIndex - 1 + storiesData.length) % storiesData.length;
        setSelectedStoryIndex(prevIndex);
        setCurrentImageIndex(0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleContentChange = (e, index) => {
        const { value } = e.target;
        const updatedContent = [...newStory.content];
        updatedContent[index] = value;
        setNewStory(prevState => ({ ...prevState, content: updatedContent }));
    };

    const handleImageChange = (e, index) => {
        const { value } = e.target;
        const updatedImages = [...newStory.images];
        updatedImages[index] = value;
        setNewStory(prevState => ({ ...prevState, images: updatedImages }));
    };

    const handleAddContentField = () => {
        setNewStory(prevState => ({ ...prevState, content: [...prevState.content, ''] }));
    };

    const handleAddImageField = () => {
        setNewStory(prevState => ({ ...prevState, images: [...prevState.images, ''] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        storiesData.push({
            id: storiesData.length + 1,
            title: newStory.title,
            content: newStory.content,
            images: newStory.images
        });
        setNewStory({ title: '', content: [''], images: [''] });
        setShowForm(false);
    };

    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            padding: '20px',
            background: '#f9fafb',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex flex-col mt-16 items-center justify-center flex-grow px-4 md:px-0">
                <div className="max-w-4xl w-full px-6 py-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
                        Inspirational Stories
                    </h1>

                    {/* Image Carousel with Dots */}
                    <div className="relative mb-6 w-full h-72 overflow-hidden">
                        <img
                            src={selectedStory.images[currentImageIndex]}
                            alt={selectedStory.title}
                            className="w-full h-full object-cover rounded-lg transition duration-500 ease-in-out transform hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 flex space-x-2">
                            {selectedStory.images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Story Title and Content */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                        {selectedStory.title}
                    </h2>
                    <div className="text-lg text-gray-700 leading-relaxed">
                        {selectedStory.content.map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-6">
                        <button onClick={handlePrevStory} className="text-blue-600 hover:text-blue-800">
                            <FaChevronLeft size={30} />
                        </button>
                        <button onClick={handleNextStory} className="text-blue-600 hover:text-blue-800">
                            <FaChevronRight size={30} />
                        </button>
                    </div>

                    {/* Share Story Button */}
                    <button onClick={() => setShowForm(true)} className="mt-8 flex items-center justify-center text-blue-600 hover:text-blue-800">
                        <FaPlus className="mr-2" /> Share Your Story
                    </button>

                    {/* Modal for Form */}
                    <Modal
                        isOpen={showForm}
                        onRequestClose={() => setShowForm(false)}
                        style={customModalStyles}
                    >
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-2xl font-semibold mb-4">Share Your Story</h3>
                            <input
                                type="text"
                                name="title"
                                value={newStory.title}
                                onChange={handleInputChange}
                                placeholder="Story Title"
                                className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div>
                                {newStory.content.map((content, index) => (
                                    <textarea
                                        key={index}
                                        value={content}
                                        onChange={(e) => handleContentChange(e, index)}
                                        placeholder="Story Content"
                                        className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                ))}
                                <button type="button" onClick={handleAddContentField} className="text-blue-600">
                                    Add More Content
                                </button>
                            </div>
                            <div>
                                {newStory.images.map((image, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={image}
                                        onChange={(e) => handleImageChange(e, index)}
                                        placeholder="Image URL"
                                        className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ))}
                                <button type="button" onClick={handleAddImageField} className="text-blue-600">
                                    Add More Images
                                </button>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Submit Story
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default InspirationalStory;
