"use client";
import { SquarePlus, Star } from "lucide-react";
import React, { useState } from "react";

const ProductOverView = ({ product }) => {
  const [activeBtn, setActiveBtn] = useState("description");
  const [addReview, setAddReview] = useState(false);
  const [rating, setRating] = useState(0);

  // 1. Unified state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    image: null,
  });

  // 2. Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  // 4. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    // Since we have an image, we use FormData for the API call
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    data.append("rating", rating);
    data.append("image", formData.image);

    try {
      // console.log("Submitting Review:", Object.fromEntries(data));

      //  API call:

      alert("Review submitted successfully!");

      // Reset form
      setFormData({ name: "", email: "", message: "", image: null });
      setRating(0);
      setAddReview(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="border border-gray-300 bg-white p-6 rounded-2xl">
      {/* Tab Navigation */}
      <div className="flex gap-3 p-1.5 bg-[#efeded] rounded-md">
        {["description", "review", "video"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveBtn(tab)}
            className={`px-5 py-2 rounded-md capitalize transition-all duration-300 ${
              activeBtn === tab ? "bg-primary text-white" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeBtn === "description" && (
        <div className="animate-in fade-in duration-300">
          <p className="text-2xl font-semibold text-gray-800 py-4 ">
            {product?.title}
          </p>
          <p className="text-gray-700 leading-8 tracking-wider">
            {product?.description}
          </p>
        </div>
      )}
      {activeBtn === "review" && (
        <div className="py-4 animate-in fade-in duration-300">
          <h2 className="text-2xl font-semibold my-5">
            Write a Review For This Product
          </h2>
          <button
            onClick={() => setAddReview(!addReview)}
            className="text-white bg-[#eab308] py-3 px-5 rounded-md flex items-center gap-1.5 hover:bg-yellow-600 transition-colors"
          >
            <SquarePlus size={28} className="text-[#eab308] fill-white" />
            {addReview ? "Close Form" : "Add Review"}
          </button>

          {addReview && (
            <div className="p-5 mt-5 border-2 border-gray-200 rounded-2xl">
              <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">
                    Select Rating *
                  </p>
                  <div className="flex gap-3 items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        onClick={() => setRating(index + 1)}
                        className={`cursor-pointer transition-colors ${
                          index < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="my-4">
                  <label className="text-sm font-semibold text-gray-600">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Full Name"
                    required
                    className="py-2.5 px-3 border border-gray-400 rounded-md w-full outline-none"
                  />
                </div>
                <div className="my-4">
                  <label className="text-sm font-semibold text-gray-600">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                    className="py-2.5 px-3 border border-gray-400 rounded-md w-full outline-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Review Message"
                    rows={3}
                    required
                    className="py-2.5 px-3 border border-gray-400 rounded-md w-full outline-primary"
                  />
                </div>

                <div className="my-4">
                  <label className="text-sm font-semibold text-gray-600 block mb-2">
                    Review Image *
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-yellow-500 transition-colors bg-gray-50 text-center">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {formData.image ? (
                        <span className="text-green-600 font-medium">
                          Selected: {formData.image.name}
                        </span>
                      ) : (
                        "Click to upload or drag and drop"
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 py-2.5 px-6 text-white font-semibold rounded-md transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {activeBtn === "video" && (
        <div className="py-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
              Product Video Showcase
            </h2>

            {/* Video Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Product Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Overlay Decoration  */}
              <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl"></div>
            </div>

            {/* Video Description/Details */}
            <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-2">
                About this video:
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                See the {product?.title || "product"} in action! This video
                demonstrates the key features, build quality, and real-world
                usage of our latest collection. Everything you need to know
                before making a purchase.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOverView;
