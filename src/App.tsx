import { useState, useMemo } from 'react';

export default function App() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const handleClear = () => {
    setHeight('');
    setWeight('');
  };

  const { bmi, bsa, bmiCategory } = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      return { bmi: null, bsa: null, bmiCategory: null };
    }

    // BMI = weight(kg) / (height(m) * height(m))
    const bmiValue = w / ((h / 100) * (h / 100));
    
    // BSA (Mosteller formula) = sqrt((height(cm) * weight(kg)) / 3600)
    const bsaValue = Math.sqrt((h * w) / 3600);

    let category = '';
    if (bmiValue < 18.5) category = '低体重';
    else if (bmiValue < 25) category = '普通体重';
    else category = '肥満';

    return { 
      bmi: bmiValue.toFixed(2), 
      bsa: bsaValue.toFixed(2),
      bmiCategory: category
    };
  }, [height, weight]);

  const getBmiColor = (category: string | null) => {
    switch (category) {
      case '低体重': return { bg: 'bg-blue-50', text: 'text-blue-600', bold: 'text-blue-900' };
      case '普通体重': return { bg: 'bg-emerald-50', text: 'text-emerald-600', bold: 'text-emerald-900' };
      case '肥満': return { bg: 'bg-red-50', text: 'text-red-600', bold: 'text-red-900' };
      default: return { bg: 'bg-indigo-50', text: 'text-indigo-600', bold: 'text-indigo-900' };
    }
  };

  const bmiColors = getBmiColor(bmiCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">BSA & BMI Calculator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">身長 (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="例: 170"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">体重 (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="例: 65"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className={`${bmiColors.bg} p-4 rounded-xl`}>
            <p className={`text-sm ${bmiColors.text} font-medium`}>BMI ({bmiCategory ?? '-'})</p>
            <p className={`text-2xl font-bold ${bmiColors.bold}`}>{bmi ?? '-'}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <p className="text-sm text-emerald-600 font-medium">BSA (m²)</p>
            <p className="text-2xl font-bold text-emerald-900">{bsa ?? '-'}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:text-red-700 underline"
          >
            クリア
          </button>
        </div>
      </div>
    </div>
  );
}
