import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Camera, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyAfimzT_0von6hyNaetu0h-HauKCjGZh5s";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

interface TryMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
}

export default function TryMeModal({ isOpen, onClose, productName, productImage }: TryMeModalProps) {
  const [step, setStep] = useState(1);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [fullBody, setFullBody] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selfieInputRef = useRef<HTMLInputElement>(null);
  const fullBodyInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'selfie' | 'fullBody') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'selfie') setSelfie(reader.result as string);
        else setFullBody(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const urlToBase64 = async (url: string): Promise<{ mimeType: string, data: string }> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve({ mimeType: blob.type, data: base64String });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const dataURLToPart = (dataURL: string): { inlineData: { mimeType: string, data: string } } => {
    const [header, data] = dataURL.split(',');
    const mimeType = header.split(':')[1].split(';')[0];
    return { inlineData: { mimeType, data } };
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const productPart = await urlToBase64(productImage);
      const selfiePart = dataURLToPart(selfie!);
      const fullBodyPart = dataURLToPart(fullBody!);

      const prompt = `Virtual try-on request: I have provided a product image of a "${productName}", a close-up selfie, and a full-body photo of a person. 
      Please render a high-fidelity image of the person from the photos wearing the exact ${productName} outfit. 
      Maintain the person's facial features and body proportions. 
      The resulting image should look like a professional fashion photography asset.`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-pro-image-preview",
        contents: [
          { text: prompt },
          { inlineData: productPart },
          selfiePart,
          fullBodyPart
        ],
        config: {
          imageConfig: {
            aspectRatio: "3:4",
            imageSize: "2K",
          },
        }
      });

      if (response && response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        const parts = candidate.content?.parts;
        
        if (parts) {
          const imagePart = parts.find((p: any) => p.inlineData);
          
          if (imagePart && imagePart.inlineData) {
            const base64Data = imagePart.inlineData.data;
            const mimeType = imagePart.inlineData.mimeType;
            if (base64Data && mimeType) {
              setResultImage(`data:${mimeType};base64,${base64Data}`);
              setStep(3);
            } else {
              throw new Error("Image data or mime type is missing in the response.");
            }
          } else {
            throw new Error("No image data found in the response parts.");
          }
        } else {
          throw new Error("No parts found in the response content.");
        }
      } else {
        throw new Error("No response candidates received from MERRACHI AI.");
      }
    } catch (err: any) {
      console.error("MERRACHI AI Error:", err);
      if (err.message?.includes("429") || err.message?.includes("Quota")) {
        setError("Our MERRACHI AI is currently at capacity. Please wait about 60 seconds and try again.");
      } else {
        setError(err.message || "An error occurred while generating your try-on result.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelfie(null);
    setFullBody(null);
    setResultImage(null);
    setIsProcessing(false);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-off-white overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream-dark bg-cherry text-cream">
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                <h2 className="font-display text-xl tracking-wide">MERRACHI Try-On</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-center max-w-lg mx-auto">
                    <h3 className="text-2xl font-display mb-4">See yourself in {productName}</h3>
                    <p className="text-stone">
                      Our MERRACHI AI will render you wearing this outfit. 
                      Please upload two clear photos for the best results.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Selfie Upload */}
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-center">1. Close-up Selfie</p>
                      <div
                        onClick={() => selfieInputRef.current?.click()}
                        className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                          selfie ? 'border-cherry bg-cherry/5' : 'border-cream-dark hover:border-cherry hover:bg-cream'
                        }`}
                      >
                        {selfie ? (
                          <img src={selfie} className="w-full h-full object-cover rounded-2xl" alt="Selfie" />
                        ) : (
                          <>
                            <Camera size={40} className="text-stone mb-4" />
                            <p className="text-sm text-stone text-center px-4">
                              Click to upload or take a selfie
                            </p>
                          </>
                        )}
                        <input
                          type="file"
                          ref={selfieInputRef}
                          onChange={(e) => handleFileUpload(e, 'selfie')}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Full Body Upload */}
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-center">2. Full Body Photo</p>
                      <div
                        onClick={() => fullBodyInputRef.current?.click()}
                        className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                          fullBody ? 'border-cherry bg-cherry/5' : 'border-cream-dark hover:border-cherry hover:bg-cream'
                        }`}
                      >
                        {fullBody ? (
                          <img src={fullBody} className="w-full h-full object-cover rounded-2xl" alt="Full Body" />
                        ) : (
                          <>
                            <Upload size={40} className="text-stone mb-4" />
                            <p className="text-sm text-stone text-center px-4">
                              Click to upload a full body standing photo
                            </p>
                          </>
                        )}
                        <input
                          type="file"
                          ref={fullBodyInputRef}
                          onChange={(e) => handleFileUpload(e, 'fullBody')}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      disabled={!selfie || !fullBody}
                      onClick={() => setStep(2)}
                      className="px-12 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-cherry disabled:bg-stone disabled:cursor-not-allowed transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <div className="relative w-64 h-80 mb-8 overflow-hidden rounded-2xl bg-cream border border-cream-dark shadow-inner">
                    {isProcessing ? (
                      <>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-cherry/5">
                          <div className="flex gap-2">
                            <div className="w-12 h-16 bg-off-white rounded-lg overflow-hidden border border-cream-dark shadow-sm">
                              <img src={selfie!} className="w-full h-full object-cover opacity-40" />
                            </div>
                            <div className="w-12 h-16 bg-off-white rounded-lg overflow-hidden border border-cream-dark shadow-sm">
                              <img src={fullBody!} className="w-full h-full object-cover opacity-40" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="font-display text-cherry text-2xl tracking-widest animate-pulse">MERRACHI AI</p>
                            <p className="text-[10px] tracking-[0.4em] uppercase text-stone mt-1">Processing Design</p>
                          </div>
                        </div>
                        {/* Scanning Line Animation */}
                        <motion.div
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-1 bg-cherry/40 z-10 shadow-[0_0_15px_rgba(90,42,42,0.5)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cherry/5 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-cherry/5">
                        <div className="flex gap-4 items-center mb-8">
                          <div className="relative">
                            <div className="w-20 h-28 bg-off-white rounded-xl overflow-hidden border-2 border-cherry/20 shadow-md transform -rotate-6 transition-transform hover:rotate-0">
                              <img src={selfie!} className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="relative">
                            <div className="w-20 h-28 bg-off-white rounded-xl overflow-hidden border-2 border-cherry/20 shadow-md transform rotate-6 transition-transform hover:rotate-0">
                              <img src={fullBody!} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleProcess}
                          className="group relative px-10 py-4 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-cherry transition-transform group-hover:scale-105" />
                          <div className="relative flex items-center gap-2 text-cream text-xs tracking-[0.2em] uppercase font-medium">
                            <Sparkles size={16} className="relative z-10" />
                            <span className="relative z-10">Start Rendering</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {isProcessing ? (
                    <div className="text-center space-y-4 max-w-xs mx-auto">
                      <h3 className="text-2xl font-display text-charcoal">Weaving your look...</h3>
                      <p className="text-stone text-sm leading-relaxed">
                        Our MERRACHI AI is analyzing your measurements and stitching the {productName} into a custom render.
                      </p>
                    </div>
                  ) : error ? (
                    <div className="text-center space-y-6">
                      <div className="flex flex-col items-center gap-2 text-cherry">
                        <AlertCircle size={48} />
                        <h3 className="text-2xl font-display">Generation Failed</h3>
                      </div>
                      <p className="text-stone max-w-xs mx-auto">
                        {error}
                      </p>
                      <button
                        onClick={reset}
                        className="px-12 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-cherry transition-all"
                      >
                        Try Again from Step 1
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 max-w-xs mx-auto">
                      <h3 className="text-2xl font-display">Ready to see?</h3>
                      <p className="text-stone text-sm leading-relaxed">
                        Both photos uploaded successfully. Click above to begin the MERRACHI AI transformation.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-center gap-2 text-olive">
                    <CheckCircle2 size={24} />
                    <p className="font-medium tracking-wide">MERRACHI AI Render Complete</p>
                  </div>

                  <div className="max-w-md mx-auto aspect-[3/4] bg-cream rounded-2xl overflow-hidden shadow-2xl relative group">
                    <img 
                      src={resultImage!} 
                      className="w-full h-full object-cover" 
                      alt="Virtual Try-On Result" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent flex items-end p-8">
                      <div className="text-cream">
                        <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-2">Tailored by MERRACHI AI</p>
                        <p className="font-display text-2xl tracking-wide">{productName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={onClose}
                      className="px-10 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-cherry transition-all"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={reset}
                      className="px-10 py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-cream transition-all"
                    >
                      Try Another Look
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-cream/50 border-t border-cream-dark flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-[9px] text-stone uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
                POWERED BY MERRACHI AI
              </div>
              <div className="w-[1px] h-3 bg-cream-dark" />
              <div className="text-[9px] text-stone uppercase tracking-[0.2em]">
                PROFESSIONAL RENDER
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
