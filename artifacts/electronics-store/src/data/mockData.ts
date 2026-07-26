export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number; // 0 = contact for pricing
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  sku: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  tags: string[];
}

export const CATEGORIES = [
  "Frequency Calibrators",
  "Resistance Calibrators",
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "f1000",
    name: "F1000 Digital Frequency Calibrator",
    category: "Frequency Calibrators",
    subcategory: "Frequency Standards",
    price: 0,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 24,
    inStock: true,
    sku: "FPP-F1000",
    description:
      "The F1000 Digital Frequency Calibrator is designed for high-precision calibration, ensuring accuracy across frequency meters, frequency counters, wave-meters, oscilloscopes, multi-meters, and clamp meters (frequency mode). With a frequency range up to 1 MHz and 0.005% best-in-class accuracy, it provides reliable calibration for professionals. Featuring an LCD display and support for permanent, site, and mobile calibration, the F1000 delivers consistent and dependable results — upholding industry standards and enhancing measurement precision.",
    specs: {
      "Model": "F1000",
      "Frequency Range": "10 Hz to 1 MHz",
      "Best 1-Year Accuracy": "±0.005% of reading",
      "Best Temperature Coefficient": "15 PPM/°C",
      "Display": "LCD",
      "Calibration Modes": "Permanent, Site, Mobile",
      "Compatible With": "Frequency meters, frequency counters, wave-meters, oscilloscopes, multi-meters, clamp meters (frequency)",
    },
    images: ["/products/f1000.jpg", "/products/test-leads.jpg"],
    tags: ["frequency calibrator", "f1000", "precision", "calibration", "frequency meter"],
  },
  {
    id: "r1000",
    name: "R1000 High Precision Digital Resistance Calibrator",
    category: "Resistance Calibrators",
    subcategory: "Resistance Standards",
    price: 0,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 18,
    inStock: true,
    sku: "FPP-R1000",
    description:
      "The R1000 High Precision Digital Resistance Calibrator is engineered for best-in-class accuracy in resistance calibration. Ideal for resistance meters, digital multi-meters, and earth resistance testers, it covers a wide range from 10 mΩ to 100 MΩ with ±0.02% accuracy. Featuring an LCD display that simultaneously shows the set value and calibrated value, dual power modes (rechargeable battery or AC mains), and approximately 4 hours of continuous battery operation, it is perfectly suited for permanent lab setups as well as field calibration.",
    specs: {
      "Model": "R1000",
      "Resistance Range": "10 mΩ to 100 MΩ",
      "Best 1-Year Accuracy": "±0.02% of reading",
      "Best Temperature Coefficient": "50 PPM/°C",
      "Display": "LCD (set value + calibrated value)",
      "Power Modes": "Rechargeable battery (Optional) or universal AC mains",
      "Battery Life": "~4 hours continuous operation",
      "Calibration Modes": "Permanent, Site, Mobile",
      "Compatible With": "Resistance meters, digital multi-meters, earth resistance testers",
    },
    images: ["/products/r1000.jpg", "/products/test-leads.jpg"],
    tags: ["resistance calibrator", "r1000", "precision", "calibration", "ohmmeter"],
  },
  {
    id: "r1001",
    name: "R1001 High Resistance Standard Box (Mega-ohmmeter Calibrator)",
    category: "Resistance Calibrators",
    subcategory: "High Resistance Standards",
    price: 0,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 14,
    inStock: true,
    sku: "FPP-R1001",
    description:
      "The R1001 High Resistance Standard Box is a precision reference instrument for calibrating insulation testers, meg-ohm meters, portable and bench insulation testers, and meggers. With a resistance range from 1 MΩ to 20 GΩ at up to 1 kV test voltage, and a best-in-class 1-year accuracy of ±0.55%, it sets the benchmark for high-resistance calibration. The front panel provides clearly labelled resistance output terminals (1 MΩ, 10 MΩ, 100 MΩ, 500 MΩ, 1 GΩ, 10 GΩ, 20 GΩ) for convenient, error-free calibration workflows.",
    specs: {
      "Model": "R1001",
      "Resistance Range": "1 MΩ to 20 GΩ",
      "Test Voltage": "Up to 1 kV",
      "Best 1-Year Accuracy": "±0.55% of reading",
      "Best Temperature Coefficient": "50 PPM/°C",
      "Resistance Steps": "1 MΩ, 10 MΩ, 100 MΩ, 500 MΩ, 1 GΩ, 10 GΩ, 20 GΩ",
      "Calibration Modes": "Permanent, Site, Mobile",
      "Compatible With": "Resistance meters, meg-ohm meters, portable & bench insulation testers, meggers",
    },
    images: ["/products/r1001.jpg", "/products/test-leads.jpg"],
    tags: ["high resistance", "r1001", "mega-ohmmeter", "insulation tester", "calibration"],
  },
];
