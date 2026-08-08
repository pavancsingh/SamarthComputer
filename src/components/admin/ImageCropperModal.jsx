import React, { useState, useRef, useEffect } from 'react';
import { 
  Crop, ZoomIn, ZoomOut, RotateCcw, RotateCw, Check, X, Move, FlipHorizontal, FlipVertical,
  Sliders, Sun, Contrast, Sparkles, Image, RefreshCw, Upload, FileImage, ShieldAlert
} from 'lucide-react';

/**
 * ImageCropperModal Component — Advanced Professional Image Editor
 * Handcrafted to match Stitch Project 3606051479193696064 (Image Editor Screen fef62ed507bf438a97f2c3b05287c378)
 * Features:
 * - Crop Aspect Ratios: Square (1:1), Widescreen (16:9), Circle (1:1 masked)
 * - Real-time Image Adjustments: Brightness, Contrast, Saturation, Blur, Grayscale
 * - Canvas Controls: Zoom, Rotate CW/CCW, Flip Horizontal, Flip Vertical, Revert to Original
 * - Right Live Preview Panel: Realtime rendering preview, Compression Quality slider, Format picker (JPG/PNG/WEBP), Estimated Size calculation
 * - Direct Supabase Storage integration compatibility
 */
export default function ImageCropperModal({ 
  imageFile, 
  file, 
  aspectRatio = 1, 
  onCropComplete, 
  onClose, 
  onCancel 
}) {
  const activeFile = imageFile || file;
  const handleClose = onClose || onCancel || (() => {});

  // Image source state
  const [currentFile, setCurrentFile] = useState(activeFile);
  const [imgElement, setImgElement] = useState(null);

  // Canvas Crop & Transform state
  const [cropShape, setCropShape] = useState(aspectRatio === 1 ? 'square' : '16-9'); // 'square' | '16-9' | 'circle'
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Adjustments state
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [isBlur, setIsBlur] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  // Export Settings
  const [exportQuality, setExportQuality] = useState(0.9); // 0.6 = Low, 0.8 = Med, 0.95 = High
  const [exportFormat, setExportFormat] = useState('image/jpeg'); // 'image/jpeg' | 'image/png' | 'image/webp'
  const [estimatedSizeKb, setEstimatedSizeKb] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync prop changes
  useEffect(() => {
    if (activeFile) setCurrentFile(activeFile);
  }, [activeFile]);

  // Load Image element from file
  useEffect(() => {
    if (!currentFile) return;
    const url = URL.createObjectURL(currentFile);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImgElement(img);
      handleResetAll();
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [currentFile]);

  const handleResetAll = () => {
    setZoom(1);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setPan({ x: 0, y: 0 });
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setIsBlur(false);
    setIsGrayscale(false);
    setShowCompare(false);
  };

  // Determine current active numerical aspect ratio
  const activeAspectRatio = cropShape === '16-9' ? (16 / 9) : 1;

  // Render Main Editing Canvas
  useEffect(() => {
    if (!imgElement || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    // 1. Position & Transform Canvas Origin
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale((flipH ? -1 : 1) * zoom, (flipV ? -1 : 1) * zoom);

    // Apply Filter Adjustments if Compare is OFF
    if (!showCompare) {
      const filters = [
        `brightness(${brightness}%)`,
        `contrast(${contrast}%)`,
        `saturate(${saturation}%)`,
        isBlur ? 'blur(3px)' : '',
        isGrayscale ? 'grayscale(100%)' : ''
      ].filter(Boolean).join(' ');
      ctx.filter = filters || 'none';
    } else {
      ctx.filter = 'none';
    }

    // Draw scaled image centered
    ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2);
    ctx.restore();

    // 2. Draw Crop Overlay Dark Mask
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.fillRect(0, 0, width, height);

    // Calculate crop window dimensions
    const cropSize = Math.min(width, height) * 0.72;
    const cropW = activeAspectRatio >= 1 ? cropSize : cropSize * activeAspectRatio;
    const cropH = activeAspectRatio >= 1 ? cropSize / activeAspectRatio : cropSize;
    const cropX = (width - cropW) / 2;
    const cropY = (height - cropH) / 2;

    // Clear Crop Window Window Area
    ctx.save();
    ctx.beginPath();
    if (cropShape === 'circle') {
      ctx.arc(width / 2, height / 2, cropW / 2, 0, Math.PI * 2);
    } else {
      ctx.rect(cropX, cropY, cropW, cropH);
    }
    ctx.clip();
    ctx.clearRect(0, 0, width, height);

    // Redraw Image in Crop Window with Filters & Transforms
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale((flipH ? -1 : 1) * zoom, (flipV ? -1 : 1) * zoom);
    if (!showCompare) {
      const filters = [
        `brightness(${brightness}%)`,
        `contrast(${contrast}%)`,
        `saturate(${saturation}%)`,
        isBlur ? 'blur(3px)' : '',
        isGrayscale ? 'grayscale(100%)' : ''
      ].filter(Boolean).join(' ');
      ctx.filter = filters || 'none';
    } else {
      ctx.filter = 'none';
    }
    ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2);
    ctx.restore();

    // 3. Draw Crop Window Border Frame & Grid
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (cropShape === 'circle') {
      ctx.arc(width / 2, height / 2, cropW / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.strokeRect(cropX, cropY, cropW, cropH);

      // Rule of Thirds Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cropX + cropW / 3, cropY); ctx.lineTo(cropX + cropW / 3, cropY + cropH);
      ctx.moveTo(cropX + (cropW * 2) / 3, cropY); ctx.lineTo(cropX + (cropW * 2) / 3, cropY + cropH);
      ctx.moveTo(cropX, cropY + cropH / 3); ctx.lineTo(cropX + cropW, cropY + cropH / 3);
      ctx.moveTo(cropX, cropY + (cropH * 2) / 3); ctx.lineTo(cropX + cropW, cropY + (cropH * 2) / 3);
      ctx.stroke();
    }

  }, [imgElement, zoom, rotation, flipH, flipV, pan, cropShape, activeAspectRatio, brightness, contrast, saturation, isBlur, isGrayscale, showCompare]);

  // Update Live Preview Card & Estimated File Size
  useEffect(() => {
    if (!imgElement) return;

    const outputCanvas = document.createElement('canvas');
    const targetW = 600;
    const targetH = 600 / activeAspectRatio;
    outputCanvas.width = targetW;
    outputCanvas.height = targetH;
    const ctx = outputCanvas.getContext('2d');

    const previewW = 450;
    const previewH = 450;
    const cropSize = Math.min(previewW, previewH) * 0.72;
    const cropW = activeAspectRatio >= 1 ? cropSize : cropSize * activeAspectRatio;
    const scale = targetW / cropW;

    ctx.save();
    if (cropShape === 'circle') {
      ctx.beginPath();
      ctx.arc(targetW / 2, targetH / 2, targetW / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    ctx.translate(targetW / 2, targetH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale((flipH ? -1 : 1) * zoom * scale, (flipV ? -1 : 1) * zoom * scale);

    if (!showCompare) {
      const filters = [
        `brightness(${brightness}%)`,
        `contrast(${contrast}%)`,
        `saturate(${saturation}%)`,
        isBlur ? 'blur(3px)' : '',
        isGrayscale ? 'grayscale(100%)' : ''
      ].filter(Boolean).join(' ');
      ctx.filter = filters || 'none';
    }

    const offsetX = pan.x * scale;
    const offsetY = pan.y * scale;
    ctx.drawImage(imgElement, -imgElement.width / 2 + offsetX, -imgElement.height / 2 + offsetY);
    ctx.restore();

    outputCanvas.toBlob((blob) => {
      if (blob) {
        setEstimatedSizeKb(Math.round(blob.size / 1024));
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    }, exportFormat, exportQuality);

  }, [imgElement, zoom, rotation, flipH, flipV, pan, cropShape, activeAspectRatio, brightness, contrast, saturation, isBlur, isGrayscale, showCompare, exportQuality, exportFormat]);

  // Pan Mouse Handlers
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

  // File replacement handler
  const handleReplaceFile = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setCurrentFile(newFile);
    }
  };

  // Final Export & Upload trigger
  const handleSaveAndUpload = () => {
    if (!imgElement) return;

    const outputCanvas = document.createElement('canvas');
    const targetW = 800;
    const targetH = 800 / activeAspectRatio;
    outputCanvas.width = targetW;
    outputCanvas.height = targetH;
    const ctx = outputCanvas.getContext('2d');

    const previewW = 450;
    const previewH = 450;
    const cropSize = Math.min(previewW, previewH) * 0.72;
    const cropW = activeAspectRatio >= 1 ? cropSize : cropSize * activeAspectRatio;
    const scale = targetW / cropW;

    ctx.save();
    if (cropShape === 'circle') {
      ctx.beginPath();
      ctx.arc(targetW / 2, targetH / 2, targetW / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    ctx.translate(targetW / 2, targetH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale((flipH ? -1 : 1) * zoom * scale, (flipV ? -1 : 1) * zoom * scale);

    if (!showCompare) {
      const filters = [
        `brightness(${brightness}%)`,
        `contrast(${contrast}%)`,
        `saturate(${saturation}%)`,
        isBlur ? 'blur(3px)' : '',
        isGrayscale ? 'grayscale(100%)' : ''
      ].filter(Boolean).join(' ');
      ctx.filter = filters || 'none';
    }

    const offsetX = pan.x * scale;
    const offsetY = pan.y * scale;
    ctx.drawImage(imgElement, -imgElement.width / 2 + offsetX, -imgElement.height / 2 + offsetY);
    ctx.restore();

    const ext = exportFormat === 'image/png' ? 'png' : exportFormat === 'image/webp' ? 'webp' : 'jpg';

    outputCanvas.toBlob((blob) => {
      if (blob) {
        const finalFile = new File([blob], `edited_${Date.now()}.${ext}`, { type: exportFormat });
        onCropComplete(finalFile);
      }
    }, exportFormat, exportQuality);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0E17]/90 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      
      {/* Stitch Design Container (Project 3606051479193696064) */}
      <div className="bg-[#111827] border border-slate-800 rounded-3xl shadow-2xl max-w-6xl w-full flex flex-col overflow-hidden text-slate-200 min-h-[640px] max-h-[95vh]">
        
        {/* Header Bar */}
        <div className="h-16 px-6 bg-[#1F2937]/80 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-base text-white tracking-tight">Advanced Professional Image Editor</h2>
          </div>

          <div className="flex items-center gap-3">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleReplaceFile} 
              className="hidden" 
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span>Replace Image</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAndUpload}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Check className="w-4 h-4 text-white" />
              <span>Save &amp; Upload</span>
            </button>
          </div>
        </div>

        {/* Main Editor Body: 3 Columns (Left Controls, Center Canvas, Right Live Preview) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT SIDEBAR: Crop, Rotate & Adjustment Controls (3 cols) */}
          <div className="lg:col-span-3 p-5 bg-[#172033] border-r border-slate-800 space-y-6 overflow-y-auto">
            
            {/* 1. Crop & Rotate Presets */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Crop className="w-3.5 h-3.5 text-blue-400" />
                <span>Crop &amp; Shape</span>
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCropShape('square')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${cropShape === 'square' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                >
                  <div className="w-5 h-5 border-2 border-current rounded-sm" />
                  <span>SQUARE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCropShape('16-9')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${cropShape === '16-9' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                >
                  <div className="w-6 h-3.5 border-2 border-current rounded-sm" />
                  <span>16:9</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCropShape('circle')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${cropShape === 'circle' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                >
                  <div className="w-5 h-5 border-2 border-current rounded-full" />
                  <span>CIRCLE</span>
                </button>
              </div>
            </div>

            {/* 2. Color & Tone Adjustments */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>Adjustments</span>
              </h3>

              {/* Brightness Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /> Brightness</span>
                  <span className="font-mono text-slate-400">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Contrast Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5"><Contrast className="w-3.5 h-3.5 text-blue-400" /> Contrast</span>
                  <span className="font-mono text-slate-400">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Saturation Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-purple-400" /> Saturation</span>
                  <span className="font-mono text-slate-400">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Toggles: Blur & Grayscale */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-xs font-bold text-slate-300">Blur Filter</span>
                  <button
                    type="button"
                    onClick={() => setIsBlur(!isBlur)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${isBlur ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isBlur ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-xs font-bold text-slate-300">Grayscale (B&amp;W)</span>
                  <button
                    type="button"
                    onClick={() => setIsGrayscale(!isGrayscale)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${isGrayscale ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isGrayscale ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* CENTER WORKSPACE: Main Interactive Canvas (6 cols) */}
          <div className="lg:col-span-6 bg-[#0D131F] p-4 flex flex-col items-center justify-between relative select-none overflow-hidden">
            
            {/* Floating Top Actions */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-[11px] font-bold text-slate-400 bg-slate-800/70 border border-slate-700/60 px-3 py-1 rounded-full backdrop-blur">
                Canvas Studio
              </span>
              <button
                type="button"
                onClick={handleResetAll}
                className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-full backdrop-blur flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                <span>Revert to Original</span>
              </button>
            </div>

            {/* Main Interactive Canvas */}
            <div className="my-auto relative flex items-center justify-center p-2">
              <canvas
                ref={canvasRef}
                width={450}
                height={450}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="cursor-move rounded-2xl shadow-2xl border border-slate-800 touch-none max-w-full"
              />

              <div className="absolute bottom-4 bg-slate-950/80 text-white text-[11px] font-medium px-3.5 py-1 rounded-full backdrop-blur border border-slate-700 flex items-center gap-1.5 pointer-events-none">
                <Move className="w-3.5 h-3.5 text-amber-400" />
                <span>Drag to position image inside crop area</span>
              </div>
            </div>

            {/* Floating Bottom Toolbar (Stitch 3606051479193696064 layout) */}
            <div className="bg-[#1A2333]/90 border border-slate-700/80 rounded-2xl p-2 px-4 backdrop-blur-md flex items-center justify-center gap-3 z-10 shadow-xl max-w-full overflow-x-auto">
              
              {/* Zoom Out & In */}
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-400 min-w-[36px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-700" />

              {/* Rotations */}
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Rotate 90° CCW"
              >
                <RotateCcw className="w-4 h-4 text-blue-400" />
              </button>

              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Rotate 90° CW"
              >
                <RotateCw className="w-4 h-4 text-blue-400" />
              </button>

              <div className="h-4 w-px bg-slate-700" />

              {/* Flips */}
              <button
                type="button"
                onClick={() => setFlipH(!flipH)}
                className={`p-1.5 rounded-lg transition-colors ${flipH ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                title="Flip Horizontal"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setFlipV(!flipV)}
                className={`p-1.5 rounded-lg transition-colors ${flipV ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                title="Flip Vertical"
              >
                <FlipVertical className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-700" />

              {/* Compare Toggle */}
              <button
                type="button"
                onClick={() => setShowCompare(!showCompare)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${showCompare ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                Compare: {showCompare ? 'Original' : 'Edited'}
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR: Live Preview, Quality & Export Format (3 cols) */}
          <div className="lg:col-span-3 p-5 bg-[#172033] border-l border-slate-800 space-y-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* LIVE PREVIEW Card */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>LIVE PREVIEW</span>
                  <span className="text-[10px] font-extrabold text-blue-400 bg-blue-600/20 px-2 py-0.5 rounded-md">OUTPUT</span>
                </h3>

                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center p-2 shadow-inner">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Live Preview" 
                      className={`max-w-full max-h-full object-contain ${cropShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`} 
                    />
                  ) : (
                    <FileImage className="w-10 h-10 text-slate-600 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Image Quality / Compression Slider */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                  <span>Image Quality</span>
                  <span className="text-blue-400 font-mono">
                    {exportQuality >= 0.95 ? 'High (95%)' : exportQuality >= 0.8 ? 'Medium (80%)' : 'Low (60%)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="0.95"
                  step="0.05"
                  value={exportQuality}
                  onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>Low</span>
                  <span>Med</span>
                  <span>High</span>
                </div>
              </div>

              {/* Format Selector */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-300">Output Format:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportFormat('image/jpeg')}
                    className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${exportFormat === 'image/jpeg' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                  >
                    .JPG
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat('image/png')}
                    className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${exportFormat === 'image/png' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                  >
                    .PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat('image/webp')}
                    className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${exportFormat === 'image/webp' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                  >
                    .WEBP
                  </button>
                </div>
              </div>

            </div>

            {/* Estimated File Size Indicator */}
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400">Est. Output Size:</span>
              <span className="font-mono font-black text-emerald-400 text-sm">~{estimatedSizeKb} KB</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
