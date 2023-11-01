/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Gallery = ({inputText, onInputTextChange, isSearch, onIsSearchChange}) => {
  const [images, setImages] = useState([]);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const clientId = "l4-86YDNoC9f4vwFJRlEOufqi2GoqB3Y7g0Q09tS7r4";
  const apiUrl = `https://api.unsplash.com/search/photos?client_id=${clientId}&query=${inputText}&page=${pages}`;
  // const containerRef = useRef(null);

  const fetchImages = async () => {
    try { 
      const response = await axios.get(apiUrl);
      const newImages = response.data.results;
      if (pages === 1) {
        setImages(newImages);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (e) {
      console.error("Error fetching images from Unsplash:", e);  
    } 
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollThreshold = 0.9;

    if (scrollTop + windowHeight >= documentHeight * scrollThreshold) {
      setIsLoading(true);
      setTimeout(() => {
        setPages(pages + 1);
      }, 2000);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearch) {
      setImages([]);
      setPages(1);
      fetchImages();
    }
    if (inputText === '') {
      onInputTextChange(null);
      setImages([]);
      setPages(1);
      fetchImages();
    } 
    onIsSearchChange(false);
    window.addEventListener("scroll", handleScroll);
    fetchImages();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pages, isSearch]);

  return (
    <>
      <div id="gallery" className="gallery">
        {images.map((image) => (
            <img loading="lazy" src={image.urls.regular} key={image.id} />
        ))}
      </div>  
      <div className="loading-field">
        {
          isLoading ? (<div className="loader"></div>) : (<></>)
        }
      </div> 
      
    </>
  );
};

export default Gallery;
