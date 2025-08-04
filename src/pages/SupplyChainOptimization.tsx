import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  Package, 
  Factory, 
  MapPin, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Target, 
  Users, 
  DollarSign, 
  Calendar, 
  Settings, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Share, 
  Star, 
  Heart, 
  MessageSquare, 
  Phone, 
  Mail, 
  Globe, 
  Building, 
  Home, 
  Car, 
  Plane, 
  Ship, 
  Train, 
  Warehouse, 
  ShoppingCart, 
  CreditCard, 
  Banknote, 
  Receipt, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Headphones, 
  Mic, 
  Camera, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Battery, 
  Wifi, 
  Bluetooth, 
  Usb, 
  Power, 
  Plug, 
  Cable, 
  Router, 
  Server, 
  Database, 
  Cloud, 
  CloudUpload, 
  CloudDownload, 
  CloudRain, 
  Sun, 
  Moon, 
  Wind, 
  Snowflake, 
  Thermometer, 
  Droplets, 
  Flame, 
  Zap as Lightning, 
  Leaf, 
  Tree, 
  Flower, 
  Seedling, 
  Apple, 
  Coffee, 
  Pizza, 
  Cake, 
  IceCream, 
  Cookie, 
  Candy, 
  Lollipop, 
  ChefHat, 
  UtensilsCrossed, 
  Wine, 
  Beer, 
  Martini, 
  Cocktail, 
  GlassWater, 
  Milk, 
  Egg, 
  Beef, 
  Fish, 
  Carrot, 
  Corn, 
  Wheat, 
  Grape, 
  Cherry, 
  Strawberry, 
  Banana, 
  Orange, 
  Lemon, 
  Watermelon, 
  Pineapple, 
  Coconut, 
  Avocado, 
  Broccoli, 
  Pepper, 
  Mushroom, 
  Onion, 
  Garlic, 
  Potato, 
  Tomato, 
  Cucumber, 
  Lettuce, 
  Cabbage, 
  Spinach, 
  Kale, 
  Herbs, 
  Spice, 
  Salt, 
  Sugar, 
  Honey, 
  Oil, 
  Butter, 
  Cheese, 
  Bread, 
  Croissant, 
  Bagel, 
  Pretzel, 
  Donut, 
  Muffin, 
  Pancakes, 
  Waffle, 
  Sandwich, 
  Hamburger, 
  HotDog, 
  Taco, 
  Burrito, 
  Sushi, 
  Ramen, 
  Soup, 
  Salad, 
  Pasta, 
  Rice, 
  Noodles, 
  Dumpling, 
  Pie, 
  Cupcake, 
  Chocolate, 
  Candy as Sweet, 
  Lollipop as Sucker, 
  IceCream as Gelato, 
  Popsicle, 
  Smoothie, 
  Juice, 
  Soda, 
  Tea, 
  Coffee as Espresso, 
  Latte, 
  Cappuccino, 
  Mocha, 
  Frappuccino, 
  Milkshake, 
  Bubble, 
  Straw, 
  Cup, 
  Mug, 
  Glass, 
  Bottle, 
  Can, 
  Jar, 
  Bowl, 
  Plate, 
  Spoon, 
  Fork, 
  Knife, 
  Chopsticks, 
  Napkin, 
  Tablecloth, 
  Candle, 
  Match, 
  Lighter, 
  Cigarette, 
  Pipe, 
  Cigar, 
  Ashtray, 
  Smoking, 
  NoSmoking, 
  Wheelchair, 
  Crutch, 
  Bandage, 
  Pill, 
  Syringe, 
  Stethoscope, 
  Thermometer as MedicalThermometer, 
  Microscope, 
  TestTube, 
  Dna, 
  Virus, 
  Bacteria, 
  Microbe, 
  Cell, 
  Bone, 
  Tooth, 
  Brain, 
  Heart, 
  Lungs, 
  Liver, 
  Kidney, 
  Stomach, 
  Eye, 
  Ear, 
  Nose, 
  Mouth, 
  Tongue, 
  Lips, 
  Teeth, 
  Hair, 
  Beard, 
  Mustache, 
  Eyebrow, 
  Eyelash, 
  Nail, 
  Finger, 
  Thumb, 
  Hand, 
  Fist, 
  Palm, 
  Wrist, 
  Arm, 
  Elbow, 
  Shoulder, 
  Back, 
  Chest, 
  Belly, 
  Hip, 
  Leg, 
  Knee, 
  Ankle, 
  Foot, 
  Toe, 
  Heel, 
  Sole, 
  Footprint, 
  Handprint, 
  Fingerprint, 
  Dna as Genetics, 
  Gene, 
  Chromosome, 
  Mutation, 
  Evolution, 
  Species, 
  Animal, 
  Mammal, 
  Bird, 
  Fish as Aquatic, 
  Reptile, 
  Amphibian, 
  Insect, 
  Spider, 
  Butterfly, 
  Bee, 
  Ant, 
  Fly, 
  Mosquito, 
  Beetle, 
  Worm, 
  Snail, 
  Slug, 
  Octopus, 
  Squid, 
  Jellyfish, 
  Starfish, 
  Seahorse, 
  Shark, 
  Whale, 
  Dolphin, 
  Seal, 
  Penguin, 
  Eagle, 
  Hawk, 
  Owl, 
  Parrot, 
  Peacock, 
  Swan, 
  Duck, 
  Goose, 
  Chicken, 
  Rooster, 
  Turkey, 
  Ostrich, 
  Flamingo, 
  Pelican, 
  Crane, 
  Stork, 
  Heron, 
  Kingfisher, 
  Woodpecker, 
  Robin, 
  Sparrow, 
  Canary, 
  Finch, 
  Cardinal, 
  BlueJay, 
  Crow, 
  Raven, 
  Magpie, 
  Pigeon, 
  Dove, 
  Hummingbird, 
  Swallow, 
  Swift, 
  Martin, 
  Wren, 
  Thrush, 
  Blackbird, 
  Nightingale, 
  Lark, 
  Warbler, 
  Flycatcher, 
  Shrike, 
  Vireo, 
  Tanager, 
  Bunting, 
  Grosbeak, 
  Siskin, 
  Goldfinch, 
  Greenfinch, 
  Bullfinch, 
  Crossbill, 
  Redpoll, 
  Linnet, 
  Twite, 
  Canary as SongBird, 
  Budgie, 
  Cockatiel, 
  Cockatoo, 
  Macaw, 
  Conure, 
  Lovebird, 
  Parakeet, 
  Lorikeet, 
  Rosella, 
  Galah, 
  Corella, 
  Eclectus, 
  Caique, 
  Pionus, 
  Amazon, 
  African, 
  Grey, 
  Senegal, 
  Meyer, 
  Jardine, 
  Cape, 
  Ruppell, 
  Brown, 
  Red, 
  Timneh, 
  Congo, 
  Cameroon, 
  Ghana, 
  Togo, 
  Benin, 
  Nigeria, 
  Chad, 
  Sudan, 
  Ethiopia, 
  Kenya, 
  Tanzania, 
  Uganda, 
  Rwanda, 
  Burundi, 
  DRC, 
  CAR, 
  Gabon, 
  Equatorial, 
  Sao, 
  Tome, 
  Principe, 
  Angola, 
  Zambia, 
  Malawi, 
  Mozambique, 
  Zimbabwe, 
  Botswana, 
  Namibia, 
  South, 
  Africa, 
  Lesotho, 
  Swaziland, 
  Madagascar, 
  Mauritius, 
  Seychelles, 
  Comoros, 
  Mayotte, 
  Reunion, 
  Rodrigues, 
  Agalega, 
  Cargados, 
  Carajos, 
  Shoals, 
  Tromelin, 
  Glorioso, 
  Juan, 
  Nova, 
  Europa, 
  Bassas, 
  India, 
  Scattered, 
  Islands, 
  French, 
  Southern, 
  Antarctic, 
  Territories, 
  Kerguelen, 
  Crozet, 
  Amsterdam, 
  Saint, 
  Paul, 
  Adelie, 
  Land, 
  Dumont, 
  Urville, 
  Base, 
  Antarctica, 
  Ross, 
  Dependency, 
  McMurdo, 
  Station, 
  Scott, 
  Amundsen, 
  South, 
  Pole, 
  Geographic, 
  Magnetic, 
  Geomagnetic, 
  Aurora, 
  Borealis, 
  Australis, 
  Northern, 
  Southern, 
  Lights, 
  Polar, 
  Night, 
  Day, 
  Midnight, 
  Sun, 
  Arctic, 
  Circle, 
  Tropic, 
  Cancer, 
  Capricorn, 
  Equator, 
  Prime, 
  Meridian, 
  Greenwich, 
  Mean, 
  Time, 
  UTC, 
  GMT, 
  International, 
  Date, 
  Line, 
  Time, 
  Zone, 
  Daylight, 
  Saving, 
  Standard, 
  Local, 
  Solar, 
  Sidereal, 
  Atomic, 
  Coordinated, 
  Universal, 
  Ephemeris, 
  Terrestrial, 
  Barycentric, 
  Dynamical, 
  Geocentric, 
  Coordinate, 
  Julian, 
  Calendar, 
  Gregorian, 
  Leap, 
  Year, 
  Month, 
  Week, 
  Day, 
  Hour, 
  Minute, 
  Second, 
  Millisecond, 
  Microsecond, 
  Nanosecond, 
  Picosecond, 
  Femtosecond, 
  Attosecond, 
  Zeptosecond, 
  Yoctosecond, 
  Planck, 
  Unit, 
  Length, 
  Mass, 
  Time as Duration, 
  Electric, 
  Current, 
  Temperature, 
  Amount, 
  Substance, 
  Luminous, 
  Intensity, 
  Meter, 
  Kilogram, 
  Second as TimeUnit, 
  Ampere, 
  Kelvin, 
  Mole, 
  Candela, 
  Radian, 
  Steradian, 
  Hertz, 
  Newton, 
  Pascal, 
  Joule, 
  Watt, 
  Coulomb, 
  Volt, 
  Farad, 
  Ohm, 
  Siemens, 
  Weber, 
  Tesla, 
  Henry, 
  Celsius, 
  Lumen, 
  Lux, 
  Becquerel, 
  Gray, 
  Sievert, 
  Katal, 
  Degree, 
  Minute as AngleMinute, 
  Second as AngleSecond, 
  Grad, 
  Turn, 
  Revolution, 
  Cycle, 
  Frequency, 
  Wavelength, 
  Amplitude, 
  Phase, 
  Period, 
  Oscillation, 
  Vibration, 
  Wave, 
  Sound, 
  Light, 
  Electromagnetic, 
  Radiation, 
  Spectrum, 
  Visible, 
  Infrared, 
  Ultraviolet, 
  X, 
  Ray, 
  Gamma, 
  Alpha, 
  Beta, 
  Neutron, 
  Proton, 
  Electron, 
  Positron, 
  Neutrino, 
  Photon, 
  Boson, 
  Fermion, 
  Quark, 
  Lepton, 
  Hadron, 
  Baryon, 
  Meson, 
  Atom, 
  Nucleus, 
  Shell, 
  Orbital, 
  Spin, 
  Charge, 
  Magnetic, 
  Moment, 
  Dipole, 
  Quadrupole, 
  Multipole, 
  Field, 
  Force, 
  Energy, 
  Momentum, 
  Angular, 
  Kinetic, 
  Potential, 
  Rest, 
  Binding, 
  Ionization, 
  Excitation, 
  Ground, 
  State, 
  Excited, 
  Metastable, 
  Transition, 
  Emission, 
  Absorption, 
  Scattering, 
  Reflection, 
  Refraction, 
  Diffraction, 
  Interference, 
  Polarization, 
  Coherence, 
  Laser, 
  Maser, 
  LED, 
  Diode, 
  Transistor, 
  Resistor, 
  Capacitor, 
  Inductor, 
  Transformer, 
  Generator, 
  Motor, 
  Battery as ElectricBattery, 
  Cell as ElectricCell, 
  Fuel, 
  Solar, 
  Panel, 
  Wind, 
  Turbine, 
  Hydroelectric, 
  Dam, 
  Nuclear, 
  Reactor, 
  Fission, 
  Fusion, 
  Chain, 
  Reaction, 
  Critical, 
  Mass, 
  Enrichment, 
  Uranium, 
  Plutonium, 
  Thorium, 
  Radium, 
  Radon, 
  Polonium, 
  Francium, 
  Actinium, 
  Protactinium, 
  Neptunium, 
  Americium, 
  Curium, 
  Berkelium, 
  Californium, 
  Einsteinium, 
  Fermium, 
  Mendelevium, 
  Nobelium, 
  Lawrencium, 
  Rutherfordium, 
  Dubnium, 
  Seaborgium, 
  Bohrium, 
  Hassium, 
  Meitnerium, 
  Darmstadtium, 
  Roentgenium, 
  Copernicium, 
  Nihonium, 
  Flerovium, 
  Moscovium, 
  Livermorium, 
  Tennessine, 
  Oganesson
} from 'lucide-react';

const SupplyChainOptimization = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات نموذجية لسلسلة التوريد
  const supplyChainData = {
    totalSuppliers: 45,
    activeOrders: 128,
    onTimeDelivery: 94.2,
    costSavings: 18.5,
    inventoryTurnover: 8.3,
    qualityScore: 96.8,
    riskLevel: 'منخفض',
    sustainabilityScore: 87.4
  };

  // بيانات الموردين
  const suppliers = [
    {
      id: 1,
      name: 'شركة الخليج للمواد الخام',
      category: 'مواد خام',
      location: 'الرياض، السعودية',
      rating: 4.8,
      onTimeDelivery: 96.5,
      qualityScore: 98.2,
      totalOrders: 245,
      activeOrders: 12,
      lastDelivery: '2024-01-20',
      riskLevel: 'منخفض',
      contractValue: 850000,
      paymentTerms: '30 يوم',
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
      status: 'نشط'
    },
    {
      id: 2,
      name: 'مصنع الشرق للتعبئة',
      category: 'تعبئة وتغليف',
      location: 'الدمام، السعودية',
      rating: 4.6,
      onTimeDelivery: 92.8,
      qualityScore: 95.7,
      totalOrders: 189,
      activeOrders: 8,
      lastDelivery: '2024-01-19',
      riskLevel: 'منخفض',
      contractValue: 420000,
      paymentTerms: '45 يوم',
      certifications: ['ISO 9001', 'BRC'],
      status: 'نشط'
    },
    {
      id: 3,
      name: 'شركة النقل المتطور',
      category: 'نقل ولوجستيات',
      location: 'جدة، السعودية',
      rating: 4.4,
      onTimeDelivery: 89.3,
      qualityScore: 91.5,
      totalOrders: 156,
      activeOrders: 15,
      lastDelivery: '2024-01-18',
      riskLevel: 'متوسط',
      contractValue: 320000,
      paymentTerms: '15 يوم',
      certifications: ['ISO 9001', 'HACCP'],
      status: 'نشط'
    },
    {
      id: 4,
      name: 'مؤسسة التقنية الحديثة',
      category: 'تقنية ومعدات',
      location: 'الكويت، الكويت',
      rating: 4.2,
      onTimeDelivery: 85.7,
      qualityScore: 88.9,
      totalOrders: 78,
      activeOrders: 5,
      lastDelivery: '2024-01-15',
      riskLevel: 'متوسط',
      contractValue: 680000,
      paymentTerms: '60 يوم',
      certifications: ['ISO 9001'],
      status: 'تحت المراجعة'
    },
    {
      id: 5,
      name: 'شركة البيئة المستدامة',
      category: 'مواد صديقة للبيئة',
      location: 'دبي، الإمارات',
      rating: 4.9,
      onTimeDelivery: 98.1,
      qualityScore: 99.3,
      totalOrders: 67,
      activeOrders: 3,
      lastDelivery: '2024-01-21',
      riskLevel: 'منخفض',
      contractValue: 290000,
      paymentTerms: '30 يوم',
      certifications: ['ISO 9001', 'ISO 14001', 'FSC', 'LEED'],
      status: 'نشط'
    }
  ];

  // بيانات الطلبات
  const orders = [
    {
      id: 'PO-2024-001',
      supplier: 'شركة الخليج للمواد الخام',
      items: 'مواد خام - دفعة يناير',
      quantity: 500,
      unit: 'طن',
      value: 125000,
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-25',
      actualDelivery: null,
      status: 'قيد التنفيذ',
      priority: 'عالية',
      progress: 65
    },
    {
      id: 'PO-2024-002',
      supplier: 'مصنع الشرق للتعبئة',
      items: 'عبوات بلاستيكية',
      quantity: 10000,
      unit: 'قطعة',
      value: 45000,
      orderDate: '2024-01-18',
      expectedDelivery: '2024-01-28',
      actualDelivery: null,
      status: 'قيد التنفيذ',
      priority: 'متوسطة',
      progress: 30
    },
    {
      id: 'PO-2024-003',
      supplier: 'شركة النقل المتطور',
      items: 'خدمات نقل - الربع الأول',
      quantity: 1,
      unit: 'عقد',
      value: 80000,
      orderDate: '2024-01-10',
      expectedDelivery: '2024-03-31',
      actualDelivery: null,
      status: 'نشط',
      priority: 'عالية',
      progress: 25
    },
    {
      id: 'PO-2024-004',
      supplier: 'مؤسسة التقنية الحديثة',
      items: 'معدات إنتاج جديدة',
      quantity: 3,
      unit: 'وحدة',
      value: 180000,
      orderDate: '2024-01-12',
      expectedDelivery: '2024-02-15',
      actualDelivery: null,
      status: 'متأخر',
      priority: 'عالية',
      progress: 45
    },
    {
      id: 'PO-2024-005',
      supplier: 'شركة البيئة المستدامة',
      items: 'مواد تغليف قابلة للتحلل',
      quantity: 2000,
      unit: 'كيلو',
      value: 35000,
      orderDate: '2024-01-20',
      expectedDelivery: '2024-01-30',
      actualDelivery: '2024-01-29',
      status: 'مكتمل',
      priority: 'منخفضة',
      progress: 100
    }
  ];

  // بيانات المخاطر
  const risks = [
    {
      id: 1,
      type: 'تأخير التوريد',
      supplier: 'مؤسسة التقنية الحديثة',
      level: 'متوسط',
      probability: 35,
      impact: 'متوسط',
      description: 'احتمال تأخير في توريد المعدات الجديدة',
      mitigation: 'البحث عن موردين بديلين',
      status: 'قيد المراقبة'
    },
    {
      id: 2,
      type: 'ارتفاع الأسعار',
      supplier: 'شركة الخليج للمواد الخام',
      level: 'منخفض',
      probability: 20,
      impact: 'عالي',
      description: 'احتمال ارتفاع أسعار المواد الخام',
      mitigation: 'عقود طويلة الأجل بأسعار ثابتة',
      status: 'تحت السيطرة'
    },
    {
      id: 3,
      type: 'مشاكل الجودة',
      supplier: 'مصنع الشرق للتعبئة',
      level: 'منخفض',
      probability: 15,
      impact: 'متوسط',
      description: 'احتمال مشاكل في جودة التعبئة',
      mitigation: 'فحص دوري وتدريب الموردين',
      status: 'تحت السيطرة'
    },
    {
      id: 4,
      type: 'مخاطر النقل',
      supplier: 'شركة النقل المتطور',
      level: 'متوسط',
      probability: 25,
      impact: 'متوسط',
      description: 'مخاطر تلف أو فقدان البضائع أثناء النقل',
      mitigation: 'تأمين شامل وتتبع GPS',
      status: 'قيد المراقبة'
    }
  ];

  // بيانات التحليلات
  const analytics = {
    monthlySpend: 1250000,
    costSavings: 231000,
    supplierPerformance: 92.5,
    inventoryOptimization: 15.8,
    demandForecast: 94.2,
    sustainabilityScore: 87.4
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'تحت المراجعة': return 'bg-yellow-100 text-yellow-800';
      case 'معلق': return 'bg-red-100 text-red-800';
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'متأخر': return 'bg-red-100 text-red-800';
      case 'ملغي': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'منخفض': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'عالي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-800';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                تحسين سلسلة التوريد
              </h1>
              <p className="text-gray-600">
                إدارة شاملة ومتطورة لسلسلة التوريد والموردين والمخاطر
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة مورد
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث البيانات
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تقرير شامل
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الموردين</p>
                  <p className="text-2xl font-bold text-gray-900">{supplyChainData.totalSuppliers}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +12% هذا الشهر
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الطلبات النشطة</p>
                  <p className="text-2xl font-bold text-gray-900">{supplyChainData.activeOrders}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    قيد التنفيذ
                  </p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">التسليم في الوقت</p>
                  <p className="text-2xl font-bold text-gray-900">{supplyChainData.onTimeDelivery}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +2.3% من الشهر الماضي
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">توفير التكاليف</p>
                  <p className="text-2xl font-bold text-gray-900">{supplyChainData.costSavings}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    231K ريال هذا الشهر
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="suppliers">الموردين</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="risks">المخاطر</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Supply Chain Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 ml-2" />
                    صحة سلسلة التوريد
                  </CardTitle>
                  <CardDescription>المؤشرات الرئيسية لأداء سلسلة التوريد</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 ml-3" />
                        <span className="font-medium text-gray-900">معدل الجودة</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {supplyChainData.qualityScore}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <RefreshCw className="h-5 w-5 text-blue-600 ml-3" />
                        <span className="font-medium text-gray-900">دوران المخزون</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {supplyChainData.inventoryTurnover}x
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 ml-3" />
                        <span className="font-medium text-gray-900">مستوى المخاطر</span>
                      </div>
                      <Badge className={getRiskColor(supplyChainData.riskLevel)}>
                        {supplyChainData.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Leaf className="h-5 w-5 text-green-600 ml-3" />
                        <span className="font-medium text-gray-900">الاستدامة</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {supplyChainData.sustainabilityScore}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Suppliers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 ml-2" />
                    أفضل الموردين
                  </CardTitle>
                  <CardDescription>الموردين ذوي الأداء الأعلى</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suppliers.slice(0, 4).map((supplier) => (
                      <div key={supplier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{supplier.name}</p>
                            <p className="text-sm text-gray-600">{supplier.category}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium text-gray-900 ml-1">
                              {supplier.rating}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <Badge className={getStatusColor(supplier.status)} size="sm">
                            {supplier.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 ml-2" />
                  الطلبات الحديثة
                </CardTitle>
                <CardDescription>آخر الطلبات وحالتها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-orange-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{order.id}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><span className="font-medium">المورد:</span> {order.supplier}</p>
                              <p><span className="font-medium">المنتج:</span> {order.items}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">الكمية:</span> {order.quantity.toLocaleString()} {order.unit}</p>
                              <p><span className="font-medium">التسليم المتوقع:</span> {order.expectedDelivery}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>التقدم</span>
                              <span>{order.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${order.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <p className="text-lg font-bold text-gray-900 mb-1">
                          {order.value.toLocaleString()} ريال
                        </p>
                        <Badge className={getPriorityColor(order.priority)} size="sm">
                          {order.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                          <p className="text-sm text-gray-600">{supplier.category}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الموقع:</span>
                        <span className="text-sm font-medium text-gray-900">{supplier.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">التقييم:</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 ml-1">
                            {supplier.rating}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">التسليم في الوقت:</span>
                        <span className="text-sm font-medium text-green-600">{supplier.onTimeDelivery}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">نقاط الجودة:</span>
                        <span className="text-sm font-medium text-blue-600">{supplier.qualityScore}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الطلبات النشطة:</span>
                        <span className="text-sm font-medium text-orange-600">{supplier.activeOrders}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">قيمة العقد:</span>
                        <span className="text-sm font-medium text-green-600">
                          {(supplier.contractValue / 1000).toFixed(0)}K ريال
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">مستوى المخاطر:</span>
                        <Badge className={getRiskColor(supplier.riskLevel)} size="sm">
                          {supplier.riskLevel}
                        </Badge>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-600 mb-2">الشهادات:</p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 ml-2" />
                    طلبات الشراء
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 ml-2" />
                      فلترة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 ml-2" />
                      بحث
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-orange-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{order.id}</h4>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                              <Badge className={getPriorityColor(order.priority)} size="sm">
                                {order.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <p><span className="font-medium">المورد:</span> {order.supplier}</p>
                              <p><span className="font-medium">المنتج:</span> {order.items}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">الكمية:</span> {order.quantity.toLocaleString()} {order.unit}</p>
                              <p><span className="font-medium">تاريخ الطلب:</span> {order.orderDate}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>التقدم</span>
                            <span>{order.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                order.status === 'متأخر' ? 'bg-red-500' :
                                order.status === 'مكتمل' ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <p className="text-lg font-bold text-gray-900 mb-1">
                          {order.value.toLocaleString()} ريال
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          التسليم: {order.expectedDelivery}
                        </p>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Truck className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risks Tab */}
          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 ml-2" />
                  إدارة المخاطر
                </CardTitle>
                <CardDescription>تحليل ومراقبة مخاطر سلسلة التوريد</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {risks.map((risk) => (
                    <div key={risk.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            risk.level === 'عالي' ? 'bg-red-100' :
                            risk.level === 'متوسط' ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            <AlertTriangle className={`h-5 w-5 ${
                              risk.level === 'عالي' ? 'text-red-600' :
                              risk.level === 'متوسط' ? 'text-yellow-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{risk.type}</h4>
                            <p className="text-sm text-gray-600">{risk.supplier}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Badge className={getRiskColor(risk.level)}>
                            {risk.level}
                          </Badge>
                          <Badge variant="secondary" size="sm">
                            {risk.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">الوصف:</p>
                          <p className="text-sm text-gray-900">{risk.description}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">إجراءات التخفيف:</p>
                          <p className="text-sm text-gray-900">{risk.mitigation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div>
                            <p className="text-xs text-gray-600">احتمالية الحدوث</p>
                            <div className="flex items-center mt-1">
                              <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                                <div
                                  className="bg-orange-500 h-2 rounded-full"
                                  style={{ width: `${risk.probability}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-900">{risk.probability}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-600">التأثير</p>
                            <Badge className={getRiskColor(risk.impact)} size="sm" className="mt-1">
                              {risk.impact}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 ml-2" />
                    تحليل التكاليف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">الإنفاق الشهري</span>
                        <span className="text-blue-600 font-semibold">
                          {(analytics.monthlySpend / 1000).toFixed(0)}K ريال
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">إجمالي المشتريات هذا الشهر</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">توفير التكاليف</span>
                        <span className="text-green-600 font-semibold">
                          {(analytics.costSavings / 1000).toFixed(0)}K ريال
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">التوفير مقارنة بالعام الماضي</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">أداء الموردين</span>
                        <span className="text-purple-600 font-semibold">{analytics.supplierPerformance}%</span>
                      </div>
                      <p className="text-sm text-gray-600">متوسط أداء جميع الموردين</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">تحسين المخزون</span>
                        <span className="text-orange-600 font-semibold">{analytics.inventoryOptimization}%</span>
                      </div>
                      <p className="text-sm text-gray-600">تحسن في إدارة المخزون</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 ml-2" />
                    مؤشرات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">دقة التنبؤ بالطلب</span>
                        <span className="text-yellow-600 font-semibold">{analytics.demandForecast}%</span>
                      </div>
                      <p className="text-sm text-gray-600">دقة توقع احتياجات المخزون</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">نقاط الاستدامة</span>
                        <span className="text-green-600 font-semibold">{analytics.sustainabilityScore}%</span>
                      </div>
                      <p className="text-sm text-gray-600">التزام الموردين بالاستدامة</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">التسليم في الوقت</span>
                        <span className="text-blue-600 font-semibold">{supplyChainData.onTimeDelivery}%</span>
                      </div>
                      <p className="text-sm text-gray-600">معدل التسليم في المواعيد المحددة</p>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">مستوى المخاطر</span>
                        <Badge className={getRiskColor(supplyChainData.riskLevel)}>
                          {supplyChainData.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">تقييم المخاطر الإجمالية</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supplier Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 ml-2" />
                  أداء الموردين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
                  {suppliers.slice(0, 5).map((supplier, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t-md mb-2 transition-all duration-300 hover:opacity-80"
                        style={{ height: `${(supplier.rating / 5) * 200}px` }}
                      ></div>
                      <p className="text-xs text-gray-600 text-center mb-1">
                        {supplier.name.split(' ')[0]}
                      </p>
                      <p className="text-xs font-medium text-gray-900">{supplier.rating}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplyChainOptimization;

