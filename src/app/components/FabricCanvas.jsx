'use client'; // This is needed since we're using client-side features

import { useEffect, useRef, useState } from 'react';
import * as fabric  from 'fabric';

export default function FabricCanvasComponent() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState('#ffffff');
  const [price, setPrice] = useState(0);
  const [recentImages, setRecentImages] = useState([]);
  const [productType, setProductType] = useState('tshirt');

  // Initialize fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const initCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true
    });

    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  // Setup canvas when ready
  useEffect(() => {
    if (!canvas) return;

    loadBaseProductImage();
    setupPrintArea(productType);
    setupEventListeners();
    setupObjectControls();
    loadRecentImages();
  }, [canvas, productType]);

  const loadBaseProductImage = () => {
    // Implement your base product image loading logic
    const imgUrl = productType === 'tshirt' 
      ? '/images/file.svg' 
      : '/images/globe.svg';
    
    fabric.Image.fromURL(imgUrl, (img) => {
      img.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false
      });
      canvas.add(img);
      canvas.sendToBack(img);
    });
  };

  const setupPrintArea = (type) => {
    // Implement print area setup based on product type
    const printArea = new fabric.Rect({
      width: 200,
      height: 200,
      fill: 'rgba(0,0,0,0.1)',
      stroke: '#000',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      originX: 'center',
      originY: 'center',
      left: canvas.width / 2,
      top: type === 'tshirt' ? 150 : 180,
      selectable: false,
      evented: false
    });
    canvas.add(printArea);
  };

  const setupEventListeners = () => {
    canvas.on('object:added', updatePrice);
    canvas.on('object:modified', updatePrice);
    canvas.on('object:removed', updatePrice);
  };

  const setupObjectControls = () => {
    // Configure object controls
    fabric.Object.prototype.set({
      borderColor: '#3891f9',
      cornerColor: '#3891f9',
      cornerSize: 10,
      transparentCorners: false,
      cornerStrokeColor: '#000',
      cornerStyle: 'circle'
    });
  };

  const loadRecentImages = async () => {
    // try {
    //   const response = await fetch('/api/recent-designs');
    //   const data = await response.json();
    //   setRecentImages(data);
    // } catch (error) {
    //   console.error('Error loading recent images:', error)
    // }
  };

  const updatePrice = () => {
    // Calculate price based on canvas objects
    const basePrice = productType === 'tshirt' ? 19.99 : 29.99;
    const objectCount = canvas.getObjects().length - 2; // Subtract base image and print area
    const newPrice = basePrice + (objectCount * 5.99);
    setPrice(newPrice.toFixed(2));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    canvas.setBackgroundColor(e.target.value, canvas.renderAll.bind(canvas));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.set({
          left: canvas.width / 2,
          top: canvas.height / 2,
          scaleX: 0.5,
          scaleY: 0.5,
          originX: 'center',
          originY: 'center'
        });
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleProductTypeChange = (type) => {
    setProductType(type);
    canvas.clear();
    // setupCanvas(type);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <canvas 
              ref={canvasRef} 
              id="design-canvas" 
              width="600" 
              height="700"
              className="border border-gray-300"
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Design Tools</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleProductTypeChange('tshirt')}
                  className={`px-4 py-2 rounded ${productType === 'tshirt' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  T-Shirt
                </button>
                <button 
                  onClick={() => handleProductTypeChange('hoodie')}
                  className={`px-4 py-2 rounded ${productType === 'hoodie' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Hoodie
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <input 
                type="color" 
                value={color}
                onChange={handleColorChange}
                className="w-full h-10"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Price</h2>
            <div className="text-2xl font-bold">${price}</div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>

          {recentImages.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
              <div className="grid grid-cols-3 gap-2">
                {recentImages.map((img, index) => (
                  <img 
                    key={index}
                    src={img.url} 
                    alt="Recent design"
                    className="cursor-pointer hover:opacity-80 border border-gray-200"
                    onClick={() => addImageToCanvas(img.url)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}