import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  X,
  RotateCcw,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  RefreshCw,
  Sliders,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { Expense, ExpenseCategory, TaxProfile } from '../types';
import { formatAUD } from '../utils/taxAndRegulatoryEngine';
import { parseReceipt } from '../ai.functions';

interface ReceiptScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  taxProfile: TaxProfile;
  onExpenseParsed: (expense: Expense) => void;
}

interface ParsedReceiptData {
  supplier: string;
  supplierAbn?: string;
  date: string;
  grossAmount: number;
  gstAmount: number;
  netAmount: number;
  category: ExpenseCategory;
  description: string;
  suggestedBusinessUsePercentage: number;
  deductibilityConfidence: 'HIGH' | 'REVIEW' | 'RULE_DEPENDENT';
  taxNotes: string;
}

export const ReceiptScannerModal: React.FC<ReceiptScannerModalProps> = ({
  isOpen,
  onClose,
  taxProfile,
  onExpenseParsed
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedReceiptData | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [businessUsePct, setBusinessUsePct] = useState<number>(100);

  // Initialize camera stream when modal opens
  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device access is not supported in this browser.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      let message = 'Unable to access camera. Please check browser permissions or upload an image.';
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        message = 'Camera permission was denied. Please allow camera access in browser permissions or use image upload below.';
      } else if (err?.name === 'NotFoundError') {
        message = 'No video camera device was detected on your system.';
      }
      setCameraError(message);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setCapturedImage(dataUrl);
    stopCamera();
    analyzeReceipt(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      const dataUrl = evt.target?.result as string;
      setCapturedImage(dataUrl);
      stopCamera();
      analyzeReceipt(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyzeReceipt = async (imageDataUrl: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const parsed = await parseReceipt({ data: { imageBase64: imageDataUrl } });
      setParsedData(parsed);
      setBusinessUsePct(parsed.suggestedBusinessUsePercentage || 100);
    } catch (err) {
      console.error('[v0] Receipt parsing error:', err instanceof Error ? err.message : 'unknown error');
      setParsedData(null);
      setAnalysisError(err instanceof Error ? err.message : 'Receipt analysis failed. Please enter the expense manually.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setParsedData(null);
    startCamera();
  };

  const handleSaveToLedger = () => {
    if (!parsedData || !parsedData.supplier.trim() || parsedData.grossAmount <= 0) return;

    const gross = parsedData.grossAmount;
    const gst = taxProfile.gstRegistered ? parsedData.gstAmount : 0;
    const net = gross - gst;
    const claimableAmount = Math.round(gross * (businessUsePct / 100) * 100) / 100;
    const claimableGst = Math.round(gst * (businessUsePct / 100) * 100) / 100;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      date: parsedData.date,
      supplier: parsedData.supplier,
      supplierAbn: parsedData.supplierAbn || undefined,
      category: parsedData.category,
      description: parsedData.description,
      grossAmount: gross,
      gstAmount: gst,
      netAmount: net,
      businessUsePercentage: businessUsePct,
      claimableAmount,
      claimableGst,
      deductibilityConfidence: parsedData.deductibilityConfidence,
      taxNotes: parsedData.taxNotes,
      receiptUrl: capturedImage || undefined,
      receiptName: `scan-${parsedData.supplier.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}.jpg`,
      receiptOcrVerified: true,
      isReconciled: false
    };

    onExpenseParsed(newExpense);
    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setParsedData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Scan Receipt Document</h3>
              <p className="text-[11px] text-neutral-400">
                Capture paper tax invoice · Auto-parsed with Gemini Multimodal Vision
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {!capturedImage ? (
            /* CAMERA VIEWFINDER & CONTROLS */
            <div className="space-y-4">
              <div className="relative aspect-video max-h-[420px] w-full bg-black rounded-2xl overflow-hidden border border-neutral-800 flex items-center justify-center">
                {cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Framing Guidelines & Scanner Laser Effect */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                      <div className="relative w-4/5 h-4/5 border-2 border-emerald-500/60 rounded-xl">
                        {/* Corner markers */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-emerald-400"></div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-emerald-400"></div>
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-emerald-400"></div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-emerald-400"></div>

                        {/* Animated Laser Scanning Beam */}
                        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse"></div>

                        <div className="absolute bottom-3 inset-x-0 text-center">
                          <span className="text-[11px] font-mono bg-black/70 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                            Align receipt within border
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center max-w-sm space-y-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Camera Standby / Permission</div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {cameraError || 'Click below to start your camera or choose a receipt file to upload.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-[#fff] rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer"
                    >
                      Start Camera Device
                    </button>
                  </div>
                )}
              </div>

              {/* Shutter & Alternate Input Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
                    }}
                    className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Flip camera"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Flip Camera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                {/* Primary Shutter Button */}
                {cameraActive && (
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/20"
                    title="Capture Receipt Photo"
                  >
                    <Camera className="w-6 h-6 text-black" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* ANALYSIS & VERIFICATION VIEW */
            <div className="space-y-5">
              {isAnalyzing ? (
                <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
                    <Sparkles className="w-6 h-6 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Lex is reading the receipt…
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                      Extracting vendor name, 11-digit ABN, GST line items, and ATO expense classification.
                    </p>
                  </div>
                </div>
          ) : analysisError ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Receipt could not be analysed</h3>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-neutral-300">{analysisError}</p>
              <p className="mt-3 text-xs text-neutral-400">You can enter this expense manually instead.</p>
              <button type="button" onClick={() => setAnalysisError(null)} className="mt-5 rounded-lg border border-neutral-700 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800">Try another receipt</button>
            </div>
          ) : parsedData ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left: Captured Receipt Image Preview */}
                  <div className="md:col-span-5 space-y-2">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Captured Document Evidence:
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-black aspect-[3/4] flex items-center justify-center group">
                      <img
                        src={capturedImage}
                        alt="Captured paper receipt"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/90 text-black font-semibold shadow">
                          AI SCANNED
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake or Scan Another</span>
                    </button>
                  </div>

                  {/* Right: Parsed Financial Fields & Apportionment */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Parsed Tax Invoice Details</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {parsedData.deductibilityConfidence} CONFIDENCE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                        <label className="text-[10px] font-mono text-neutral-500 uppercase">
                          Supplier / Store
                        </label>
                        <input
                          type="text"
                          value={parsedData.supplier}
                          onChange={e =>
                            setParsedData(prev => (prev ? { ...prev, supplier: e.target.value } : null))
                          }
                          className="w-full bg-transparent text-white font-semibold focus:outline-none focus:text-emerald-400"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                        <label className="text-[10px] font-mono text-neutral-500 uppercase">
                          Supplier ABN
                        </label>
                        <input
                          type="text"
                          value={parsedData.supplierAbn || ''}
                          placeholder="Not detected"
                          onChange={e =>
                            setParsedData(prev =>
                              prev ? { ...prev, supplierAbn: e.target.value } : null
                            )
                          }
                          className="w-full bg-transparent text-emerald-400 font-mono text-xs focus:outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                        <label className="text-[10px] font-mono text-neutral-500 uppercase">
                          Date
                        </label>
                        <input
                          type="date"
                          value={parsedData.date}
                          onChange={e =>
                            setParsedData(prev => (prev ? { ...prev, date: e.target.value } : null))
                          }
                          className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                        <label className="text-[10px] font-mono text-neutral-500 uppercase">
                          Category
                        </label>
                        <select
                          value={parsedData.category}
                          onChange={e =>
                            setParsedData(prev =>
                              prev ? { ...prev, category: e.target.value as ExpenseCategory } : null
                            )
                          }
                          className="w-full bg-transparent text-neutral-200 text-xs focus:outline-none cursor-pointer"
                        >
                          <option value="Equipment & Cameras" className="bg-neutral-900">Equipment & Cameras</option>
                          <option value="Photography & Studio" className="bg-neutral-900">Photography & Studio</option>
                          <option value="Software & Subscriptions" className="bg-neutral-900">Software & Subscriptions</option>
                          <option value="Telecommunications" className="bg-neutral-900">Telecommunications</option>
                          <option value="Costumes & Business Clothing" className="bg-neutral-900">Costumes & Business Clothing</option>
                          <option value="Props & Styling" className="bg-neutral-900">Props & Styling</option>
                          <option value="Travel & Flights" className="bg-neutral-900">Travel & Flights</option>
                          <option value="Accommodation" className="bg-neutral-900">Accommodation</option>
                          <option value="Contractors & Assistants" className="bg-neutral-900">Contractors & Assistants</option>
                          <option value="Advertising" className="bg-neutral-900">Advertising</option>
                          <option value="Other Expenses" className="bg-neutral-900">Other Expenses</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">
                        Purchased Items / Description
                      </label>
                      <input
                        type="text"
                        value={parsedData.description}
                        onChange={e =>
                          setParsedData(prev => (prev ? { ...prev, description: e.target.value } : null))
                        }
                        className="w-full bg-transparent text-neutral-200 text-xs focus:outline-none"
                      />
                    </div>

                    {/* Financial Figures Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                      <label>
                        <span className="text-[10px] font-mono text-neutral-500 block">GROSS AUD</span>
                        <input
                          inputMode="decimal"
                          value={parsedData.grossAmount}
                          onChange={(e) => {
                            const gross = Number(e.target.value) || 0;
                            const gst = taxProfile.gstRegistered ? Math.round((gross / 11) * 100) / 100 : 0;
                            setParsedData((prev) =>
                              prev ? { ...prev, grossAmount: gross, gstAmount: gst, netAmount: Math.round((gross - gst) * 100) / 100 } : prev,
                            );
                          }}
                          className="w-full bg-transparent text-base font-bold text-white tabular-nums focus:outline-none"
                        />
                      </label>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 block">GST (10%)</span>
                        <div className="text-base font-bold text-emerald-400 tabular-nums">{formatAUD(parsedData.gstAmount)}</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 block">NET EX-GST</span>
                        <div className="text-base font-bold text-neutral-300 tabular-nums">{formatAUD(parsedData.netAmount)}</div>
                      </div>
                    </div>

                    {/* Creator Business Apportionment Slider */}
                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">Business Use Apportionment</span>
                        <span className="font-mono text-emerald-400 font-bold">{businessUsePct}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={businessUsePct}
                        onChange={e => setBusinessUsePct(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
                        <span>Tax Claimable: <strong className="text-white tabular-nums">{formatAUD(parsedData.grossAmount * (businessUsePct / 100))}</strong></span>
                        {taxProfile.gstRegistered && (
                          <span>GST Credit (1B): <strong className="text-emerald-400 tabular-nums">{formatAUD(parsedData.gstAmount * (businessUsePct / 100))}</strong></span>
                        )}
                      </div>
                    </div>

                    {/* ATO Tax Notes */}
                    <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{parsedData.taxNotes}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveToLedger}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept & Post to Ledger</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Hidden Canvas used for video frame snapshot */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
