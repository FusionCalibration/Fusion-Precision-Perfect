export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
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
  "Sensors",
  "Arduino",
  "Raspberry Pi",
  "Robotics & DIY",
  "3D Printing",
  "Modules & ICs"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "DHT22 Temperature & Humidity Sensor",
    category: "Sensors",
    subcategory: "Environmental",
    price: 299,
    originalPrice: 450,
    rating: 4.8,
    reviewsCount: 156,
    inStock: true,
    sku: "SEN-DHT22-01",
    description: "The DHT22 is a basic, low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, and spits out a digital signal on the data pin (no analog input pins needed).",
    specs: {
      "Operating Voltage": "3.3V - 6V",
      "Humidity Range": "0-100% RH",
      "Temperature Range": "-40 to 80°C",
      "Accuracy": "±2% RH, ±0.5°C"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80"],
    tags: ["sensor", "dht22", "temperature", "humidity"]
  },
  {
    id: "p2",
    name: "Arduino Uno R3 (Original Italy)",
    category: "Arduino",
    subcategory: "Boards",
    price: 2499,
    originalPrice: 2800,
    rating: 4.9,
    reviewsCount: 842,
    inStock: true,
    sku: "ARD-UNO-R3",
    description: "The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.",
    specs: {
      "Microcontroller": "ATmega328P",
      "Operating Voltage": "5V",
      "Input Voltage": "7-12V",
      "Digital I/O Pins": "14 (6 PWM)"
    },
    images: ["https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=600&q=80"],
    tags: ["arduino", "uno", "microcontroller", "board"]
  },
  {
    id: "p3",
    name: "Raspberry Pi 4 Model B (4GB RAM)",
    category: "Raspberry Pi",
    subcategory: "Boards",
    price: 7499,
    originalPrice: 8500,
    rating: 4.9,
    reviewsCount: 1205,
    inStock: false,
    sku: "RPI-4B-4GB",
    description: "The Raspberry Pi 4 Model B offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+, while retaining backwards compatibility and similar power consumption.",
    specs: {
      "Processor": "Broadcom BCM2711, Quad core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz",
      "RAM": "4GB LPDDR4-3200 SDRAM",
      "Connectivity": "2.4 GHz and 5.0 GHz IEEE 802.11ac wireless, Bluetooth 5.0, BLE, Gigabit Ethernet",
      "Ports": "2 USB 3.0 ports; 2 USB 2.0 ports."
    },
    images: ["https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&q=80"],
    tags: ["raspberry pi", "rpi", "sbc", "computer"]
  },
  {
    id: "p4",
    name: "HC-SR04 Ultrasonic Distance Sensor",
    category: "Sensors",
    subcategory: "Proximity",
    price: 85,
    originalPrice: 150,
    rating: 4.6,
    reviewsCount: 312,
    inStock: true,
    sku: "SEN-HCSR04",
    description: "The HC-SR04 ultrasonic sensor uses sonar to determine distance to an object like bats do. It offers excellent non-contact range detection with high accuracy and stable readings in an easy-to-use package.",
    specs: {
      "Operating Voltage": "5V DC",
      "Operating Current": "15mA",
      "Measure Angle": "15 degree",
      "Ranging Distance": "2cm - 400cm"
    },
    images: ["https://images.unsplash.com/photo-1620288627228-55a003362145?w=600&q=80"],
    tags: ["sensor", "ultrasonic", "distance", "hc-sr04"]
  },
  {
    id: "p5",
    name: "MPU-6050 3 Axis Accelerometer & Gyroscope",
    category: "Sensors",
    subcategory: "Motion",
    price: 150,
    originalPrice: 250,
    rating: 4.7,
    reviewsCount: 198,
    inStock: true,
    sku: "SEN-MPU6050",
    description: "The MPU-6050 devices combine a 3-axis gyroscope and a 3-axis accelerometer on the same silicon die, together with an onboard Digital Motion Processor (DMP).",
    specs: {
      "Operating Voltage": "3V - 5V",
      "Communication Mode": "Standard IIC communication protocol",
      "Gyroscope Range": "± 250 500 1000 2000 °/s",
      "Acceleration Range": "± 2 ± 4 ± 8 ± 16g"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"],
    tags: ["sensor", "accelerometer", "gyroscope", "mpu6050"]
  },
  {
    id: "p6",
    name: "L298N Motor Driver Module",
    category: "Robotics & DIY",
    subcategory: "Motor Drivers",
    price: 120,
    originalPrice: 200,
    rating: 4.5,
    reviewsCount: 420,
    inStock: true,
    sku: "MOD-L298N",
    description: "This L298N Motor Driver Module is a high power motor driver module for driving DC and Stepper Motors. This module consists of an L298 motor driver IC and a 78M05 5V regulator.",
    specs: {
      "Driver IC": "L298N Dual H Bridge Motor Driver",
      "Operating Voltage": "5V - 35V",
      "Max Current": "2A per bridge",
      "Logic Voltage": "5V"
    },
    images: ["https://images.unsplash.com/photo-1620288627228-55a003362145?w=600&q=80"],
    tags: ["module", "motor driver", "l298n", "robotics"]
  },
  {
    id: "p7",
    name: "SG90 Micro Servo Motor (9g)",
    category: "Robotics & DIY",
    subcategory: "Actuators",
    price: 99,
    originalPrice: 150,
    rating: 4.8,
    reviewsCount: 534,
    inStock: true,
    sku: "MOT-SG90",
    description: "Tiny and lightweight with high output power. Servo can rotate approximately 180 degrees (90 in each direction), and works just like the standard kinds but smaller.",
    specs: {
      "Operating Speed": "0.12 second/ 60 degree (4.8V no load)",
      "Stall Torque": "1.2 kg-cm (4.8V); 1.6 kg-cm (6.0V)",
      "Operating Voltage": "4.8V ~ 6V",
      "Weight": "9g"
    },
    images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80"],
    tags: ["motor", "servo", "sg90", "robotics"]
  },
  {
    id: "p8",
    name: "LM2596 DC-DC Buck Converter Step Down Module",
    category: "Modules & ICs",
    subcategory: "Power Supply",
    price: 65,
    originalPrice: 120,
    rating: 4.6,
    reviewsCount: 245,
    inStock: true,
    sku: "MOD-LM2596",
    description: "This is a high performance DC to DC step-down adjustable power supply module based on the LM2596 switching regulator.",
    specs: {
      "Input Voltage": "3.2V - 40V",
      "Output Voltage": "1.25V - 35V (Adjustable)",
      "Output Current": "3A (Max)",
      "Efficiency": "Up to 92%"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"],
    tags: ["module", "power", "buck converter", "lm2596"]
  },
  {
    id: "p9",
    name: "PETG 3D Printer Filament 1.75mm 1kg (Black)",
    category: "3D Printing",
    subcategory: "Filament",
    price: 899,
    originalPrice: 1200,
    rating: 4.5,
    reviewsCount: 178,
    inStock: true,
    sku: "3DP-PETG-BLK-1KG",
    description: "High quality PETG filament for 3D printing. Combines the functionality of ABS (temperature resistant, tough) and reliability of PLA (easy to print).",
    specs: {
      "Material": "PETG",
      "Diameter": "1.75mm",
      "Print Temperature": "230-250°C",
      "Bed Temperature": "70-90°C"
    },
    images: ["https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=600&q=80"],
    tags: ["3d printing", "filament", "petg", "black"]
  },
  {
    id: "p10",
    name: "Arduino Nano V3.0 (CH340G Clone)",
    category: "Arduino",
    subcategory: "Boards",
    price: 250,
    originalPrice: 350,
    rating: 4.7,
    reviewsCount: 652,
    inStock: true,
    sku: "ARD-NANO-CLONE",
    description: "The Arduino Nano is a small, complete, and breadboard-friendly board based on the ATmega328 (Arduino Nano 3.x). It has more or less the same functionality of the Arduino Duemilanove, but in a different package.",
    specs: {
      "Microcontroller": "ATmega328P",
      "Operating Voltage": "5V",
      "Input Voltage": "7-12V",
      "Digital I/O Pins": "14 (6 PWM)",
      "USB Chip": "CH340G"
    },
    images: ["https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&q=80"],
    tags: ["arduino", "nano", "microcontroller", "board", "clone"]
  },
  {
    id: "p11",
    name: "N20 Micro Gear Motor (60RPM, 6V)",
    category: "Robotics & DIY",
    subcategory: "Motors",
    price: 180,
    originalPrice: 250,
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
    sku: "MOT-N20-60RPM",
    description: "Small but powerful N20 micro gear motor. Perfect for small robotics projects, mini line followers, and custom actuators.",
    specs: {
      "Rated Voltage": "6V DC",
      "No-Load Speed": "60 RPM",
      "Rated Torque": "0.3 kg.cm",
      "Shaft Diameter": "3mm (D-shaped)"
    },
    images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80"],
    tags: ["motor", "n20", "gear motor", "robotics"]
  },
  {
    id: "p12",
    name: "0.4mm Brass Nozzle Set (5 Pcs) for Ender 3",
    category: "3D Printing",
    subcategory: "Parts",
    price: 199,
    originalPrice: 300,
    rating: 4.6,
    reviewsCount: 98,
    inStock: true,
    sku: "3DP-NOZ-04-5",
    description: "High quality MK8 brass nozzles for 1.75mm filament. Compatible with Creality Ender 3, CR-10, and other common 3D printers.",
    specs: {
      "Material": "Brass",
      "Nozzle Diameter": "0.4mm",
      "Filament Diameter": "1.75mm",
      "Thread": "M6"
    },
    images: ["https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=600&q=80"],
    tags: ["3d printing", "nozzle", "brass", "ender 3"]
  },
  {
    id: "p13",
    name: "4-Channel 5V Relay Module",
    category: "Modules & ICs",
    subcategory: "Relays",
    price: 160,
    originalPrice: 250,
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    sku: "MOD-RELAY-4CH",
    description: "4-channel 5V relay interface board, able to control various appliances, and other equipments with large current. It can be controlled directly by Micro-controller.",
    specs: {
      "Operating Voltage": "5V DC",
      "Max Load": "AC 250V/10A, DC 30V/10A",
      "Channels": "4",
      "Isolation": "Optocoupler"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"],
    tags: ["module", "relay", "4 channel", "home automation"]
  },
  {
    id: "p14",
    name: "MQ-2 Gas Sensor Module",
    category: "Sensors",
    subcategory: "Environmental",
    price: 90,
    originalPrice: 150,
    rating: 4.4,
    reviewsCount: 165,
    inStock: true,
    sku: "SEN-MQ2",
    description: "Sensitive material of MQ-2 gas sensor is SnO2, which with lower conductivity in clean air. When the target combustible gas exist, the sensor's conductivity is more higher along with the gas concentration rising.",
    specs: {
      "Operating Voltage": "5V DC",
      "Detects": "LPG, i-butane, propane, methane ,alcohol, Hydrogen, smoke",
      "Output": "Analog and Digital (TTL)"
    },
    images: ["https://images.unsplash.com/photo-1620288627228-55a003362145?w=600&q=80"],
    tags: ["sensor", "gas", "mq2", "smoke"]
  },
  {
    id: "p15",
    name: "ACS712 30A Current Sensor Module",
    category: "Sensors",
    subcategory: "Power",
    price: 110,
    originalPrice: 180,
    rating: 4.5,
    reviewsCount: 112,
    inStock: true,
    sku: "SEN-ACS712-30A",
    description: "The ACS712 Module uses the famous ACS712 IC to measure current using the Hall Effect principle. This module gets its name from the IC (ACS712) used in the module.",
    specs: {
      "Operating Voltage": "5V DC",
      "Measurement Range": "-30A to +30A",
      "Sensitivity": "66mV/A",
      "Output": "Analog voltage proportional to current"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"],
    tags: ["sensor", "current", "acs712", "power"]
  },
  {
    id: "p16",
    name: "Raspberry Pi Camera Module V2",
    category: "Raspberry Pi",
    subcategory: "Accessories",
    price: 2499,
    originalPrice: 3000,
    rating: 4.8,
    reviewsCount: 420,
    inStock: false,
    sku: "RPI-CAM-V2",
    description: "The Raspberry Pi Camera Module v2 is a high quality 8 megapixel Sony IMX219 image sensor custom designed add-on board for Raspberry Pi, featuring a fixed focus lens.",
    specs: {
      "Sensor": "8 megapixel Sony IMX219",
      "Resolution": "3280 × 2464 pixels",
      "Video": "1080p30, 720p60 and 640x480p90",
      "Interface": "CSI connector"
    },
    images: ["https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&q=80"],
    tags: ["raspberry pi", "camera", "video", "sensor"]
  },
  {
    id: "p17",
    name: "4WD Robot Chassis Kit",
    category: "Robotics & DIY",
    subcategory: "Kits",
    price: 550,
    originalPrice: 800,
    rating: 4.6,
    reviewsCount: 230,
    inStock: true,
    sku: "ROB-4WD-KIT",
    description: "A complete 4-wheel drive robot chassis kit. Includes acrylic chassis plates, 4 BO motors, 4 wheels, battery holder, and mounting hardware. Perfect for building line followers or remote-controlled vehicles.",
    specs: {
      "Material": "Clear Acrylic (with protective paper)",
      "Motors": "4 x BO Motors (150 RPM)",
      "Wheels": "4 x 65mm Rubber Wheels",
      "Power": "4xAA Battery Holder included"
    },
    images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80"],
    tags: ["robotics", "chassis", "4wd", "kit", "bo motor"]
  },
  {
    id: "p18",
    name: "Pulse Sensor / Heart Rate Sensor",
    category: "Sensors",
    subcategory: "Biometric",
    price: 199,
    originalPrice: 350,
    rating: 4.3,
    reviewsCount: 89,
    inStock: true,
    sku: "SEN-PULSE",
    description: "The Pulse Sensor is a plug-and-play heart-rate sensor for Arduino. It can be used by students, artists, athletes, makers, and game & mobile developers who want to easily incorporate live heart-rate data into their projects.",
    specs: {
      "Operating Voltage": "3.3V to 5V",
      "Current Consumption": "4mA",
      "Diameter": "16mm",
      "Output": "Analog"
    },
    images: ["https://images.unsplash.com/photo-1620288627228-55a003362145?w=600&q=80"],
    tags: ["sensor", "pulse", "heart rate", "biometric"]
  },
  {
    id: "p19",
    name: "LDR Photoresistor (Light Dependent Resistor) - Pack of 10",
    category: "Sensors",
    subcategory: "Light",
    price: 45,
    originalPrice: 80,
    rating: 4.9,
    reviewsCount: 450,
    inStock: true,
    sku: "SEN-LDR-10",
    description: "A Light Dependent Resistor (LDR) or a photoresistor is a device whose resistivity is a function of the incident electromagnetic radiation. Pack of 10 standard 5mm LDRs.",
    specs: {
      "Diameter": "5mm",
      "Light Resistance": "~10kΩ",
      "Dark Resistance": ">1MΩ",
      "Max Voltage": "150V DC"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"],
    tags: ["sensor", "ldr", "light", "photoresistor"]
  },
  {
    id: "p20",
    name: "Arduino Mega 2560 R3 (Clone)",
    category: "Arduino",
    subcategory: "Boards",
    price: 850,
    originalPrice: 1200,
    rating: 4.8,
    reviewsCount: 512,
    inStock: true,
    sku: "ARD-MEGA-CLONE",
    description: "The Arduino Mega 2560 is a microcontroller board based on the ATmega2560. It has 54 digital input/output pins (of which 15 can be used as PWM outputs), 16 analog inputs, 4 UARTs (hardware serial ports), a 16 MHz crystal oscillator, a USB connection, a power jack, an ICSP header, and a reset button.",
    specs: {
      "Microcontroller": "ATmega2560",
      "Operating Voltage": "5V",
      "Digital I/O Pins": "54 (15 PWM)",
      "Analog Input Pins": "16",
      "Flash Memory": "256 KB"
    },
    images: ["https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=600&q=80"],
    tags: ["arduino", "mega", "microcontroller", "board", "clone"]
  }
];