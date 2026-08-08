import React, { useState, useRef, useEffect } from 'react';
import { Crop, ZoomIn, ZoomOut, RotateCw, Check, X, Move } from 'lucide-react';

/**
 * ImageCropperModal Component - Handcrafted Canvas Cropper
 * Allows Admin to zoom, pan, rotate, and crop photos before uploading to Supabase.
 */
export default function ImageCropperModal({ imageFile, file, aspectRatio = 1, onCropComplete, onClose, onCancel }) {
  const activeFile = imageFile || file;
  const handleClose = onClose || onCancel || (() => {});

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgElement, setImgElement] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!activeFile) return;
    const url = URL.createObjectURL(activeFile);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImgElement(img);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setRotation(0);
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [activeFile]);

  // Render main cropper canvas preview
  useEffect(() => {
    if (!imgElement || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    // Center canvas origin
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Draw scaled image centered
    ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2);
    ctx.restore();

    // Draw Crop Overlay Mask
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.fillRect(0, 0, width, height);

    // Calculate crop window size based on aspect ratio
    const cropSize = Math.min(width, height) * 0.75;
    const cropW = aspectRatio >= 1 ? cropSize : cropSize * aspectRatio;
    const cropH = aspectRatio >= 1 ? cropSize / aspectRatio : cropSize;
    const cropX = (width - cropW) / 2;
    const cropY = (height - cropH) / 2;

    // Clear crop window area
    ctx.clearRect(cropX, cropY, cropW, cropH);

    // Redraw image inside crop window
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropX, cropY, cropW, cropH);
    ctx.clip();
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2);
    ctx.restore();

    // Draw Crop Frame border & grid lines
    ctx.strokeStyle = '#E11D48';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(cropX, cropY, cropW, cropH);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cropX + cropW / 3, cropY); ctx.lineTo(cropX + cropW / 3, cropY + cropH);
    ctx.moveTo(cropX + (cropW * 2) / 3, cropY); ctx.lineTo(cropX + (cropW * 2) / 3, cropY + cropH);
    ctx.moveTo(cropX, cropY + cropH / 3); ctx.lineTo(cropX + cropW, cropY + cropH / 3);
    ctx.moveTo(cropX, cropY + (cropH * 2) / 3); ctx.lineTo(cropX + cropW, cropY + (cropH * 2) / 3);
    ctx.stroke();

  }, [imgElement, zoom, rotation, pan, aspectRatio]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCropSave = () => {
    if (!imgElement) return;

    // Create high-res target output canvas
    const outputCanvas = document.createElement('canvas');
    const targetW = 600;
    const targetH = 600 / aspectRatio;
    outputCanvas.width = targetW;
    outputCanvas.height = targetH;
    const ctx = outputCanvas.getContext('2d');

    const previewW = 400;
    const previewH = 400;
    const cropSize = Math.min(previewW, previewH) * 0.75;
    const cropW = aspectRatio >= 1 ? cropSize : cropSize * aspectRatio;
    const cropH = aspectRatio >= 1 ? cropSize / aspectRatio : cropSize;

    // Scale factor between output canvas and preview crop window
    const scale = targetW / cropW;

    ctx.save();
    ctx.translate(targetW / 2, targetH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom * scale, zoom * scale);

    // Adjust position relative to center pan offset
    const offsetX = pan.x * scale;
    const offsetY = pan.y * scale;
    ctx.drawImage(imgElement, -imgElement.width / 2 + offsetX, -imgElement.height / 2 + offsetY);
    ctx.restore();

    outputCanvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `cropped_${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCropComplete(file);
      }
    }, 'image/jpeg', 0.92);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stitch-slate-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-stitch-red" />
            <h3 className="font-extrabold text-sm tracking-tight">Crop & Adjust Image</h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Canvas Area */}
        <div className="p-6 bg-slate-900 flex flex-col items-center justify-center relative select-none">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cursor-move rounded-2xl shadow-inner border border-slate-700 max-w-full touch-none"
          />
          <div className="absolute bottom-8 bg-slate-950/70 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur flex items-center gap-1.5 border border-slate-700 pointer-events-none">
            <Move className="w-3.5 h-3.5 text-stitch-amber" />
            <span>Drag image to position crop</span>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="p-6 bg-slate-50 space-y-4 border-t border-slate-200">
          
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-slate-500" />
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-stitch-red cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <ZoomIn className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-mono font-bold text-slate-700 w-12 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <RotateCw className="w-4 h-4 text-stitch-amber" />
              <span>Rotate 90°</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-bold text-xs shadow-sm transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCropSave}
                className="px-5 py-2.5 rounded-xl bg-stitch-red hover:bg-stitch-red-dark text-white font-extrabold text-xs flex items-center gap-1.5 shadow-stitch-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Crop & Upload</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
