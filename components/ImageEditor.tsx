
import React, { useState, useRef } from 'react';
import { editRamadanImage } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setImage(readerEvent.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setIsProcessing(true);
    const edited = await editRamadanImage(image, prompt, mimeType);
    setResult(edited);
    setIsProcessing(false);
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
        <div className="text-center">
            <h2 className="text-4xl font-dancing text-pink-500 mb-2">Ramadan Memories</h2>
            <p className="text-gray-500 italic">Capture and enhance your moments with AI</p>
        </div>

        <div className="space-y-6">
            <div className="bg-white border-2 border-dashed border-pink-200 rounded-3xl p-4 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                {result ? (
                    <img src={result} alt="Edited" className="max-h-[500px] object-contain rounded-2xl" />
                ) : image ? (
                    <img src={image} alt="Original" className="max-h-[500px] object-contain rounded-2xl" />
                ) : (
                    <div className="text-center space-y-4">
                        <span className="text-6xl">📸</span>
                        <p className="text-gray-400">Upload a photo of your Iftar, Eid prep, or decoration</p>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-pink-100 text-pink-600 font-bold py-2 px-6 rounded-full hover:bg-pink-200"
                        >
                            Select Photo
                        </button>
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
            </div>

            {(image || result) && (
                <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Ask AI to enhance</p>
                    <div className="flex gap-2">
                        <input 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. 'Add golden lanterns and a warm glow', 'Make it look like a polaroid'..."
                            className="flex-1 p-3 rounded-xl border border-pink-100 focus:outline-pink-400"
                        />
                        <button 
                            onClick={handleEdit}
                            disabled={isProcessing || !prompt}
                            className={`px-6 rounded-xl font-bold transition-all ${isProcessing ? 'bg-gray-200 text-gray-400' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
                        >
                            {isProcessing ? 'Thinking...' : 'Magic ✨'}
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['Add retro filter', 'Make it cinematic', 'Add Ramadan greetings', 'Enhance colors'].map(suggestion => (
                            <button 
                                key={suggestion}
                                onClick={() => setPrompt(suggestion)}
                                className="text-[10px] bg-pink-50 text-pink-500 font-bold px-3 py-1 rounded-full border border-pink-100 hover:bg-pink-100"
                            >
                                + {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {result && (
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => { setImage(result); setResult(null); }}
                        className="text-pink-500 font-bold text-sm"
                    >
                        Reset to this edit
                    </button>
                    <a 
                        href={result} 
                        download="ramadan_memory.png"
                        className="text-blue-500 font-bold text-sm"
                    >
                        Download Memory
                    </a>
                </div>
            )}
        </div>

        <style>{`
            .animate-fade-in { animation: fadeIn 0.8s ease-out; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
    </div>
  );
};

export default ImageEditor;
