import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Truck, 
  Star, 
  Heart, 
  Eye, 
  Share, 
  Filter, 
  Search, 
  Tag, 
  Percent, 
  Gift, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  DollarSign, 
  ShoppingBag, 
  Store, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Wifi, 
  WifiOff, 
  Signal, 
  Battery, 
  Power, 
  Zap, 
  Activity, 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Bell, 
  Settings, 
  MoreHorizontal, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload, 
  RefreshCw, 
  Save, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  XCircle, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  User, 
  Lock, 
  Unlock, 
  Key, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Database, 
  Server, 
  Cloud, 
  HardDrive, 
  Folder, 
  File, 
  Image, 
  Video, 
  Music, 
  FileText, 
  Archive, 
  Link, 
  ExternalLink, 
  Bookmark, 
  Flag, 
  Target, 
  Award, 
  Trophy, 
  Medal, 
  Crown, 
  Gem, 
  Diamond, 
  Coins, 
  Banknote, 
  Wallet, 
  CreditCard as CreditCardIcon, 
  PaypalIcon, 
  Bitcoin, 
  Landmark, 
  Building, 
  Building2, 
  Factory, 
  Warehouse, 
  Home as HomeIcon, 
  Car, 
  Plane, 
  Train, 
  Bus, 
  Bike, 
  Ship, 
  Anchor, 
  Compass, 
  Map, 
  Navigation, 
  Route, 
  Milestone, 
  Signpost, 
  MapPin as MapPinIcon, 
  Locate, 
  LocateFixed, 
  LocateOff, 
  Navigation2, 
  Send, 
  Inbox, 
  Outbox, 
  Archive as ArchiveIcon, 
  Trash, 
  Delete, 
  Eraser, 
  PenTool, 
  Brush, 
  Palette, 
  Pipette, 
  Eyedropper, 
  Scissors, 
  Crop, 
  Move, 
  RotateCcw, 
  RotateCw, 
  FlipHorizontal, 
  FlipVertical, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  Expand, 
  Shrink, 
  Fullscreen, 
  ExitFullscreen, 
  PictureInPicture, 
  PictureInPicture2, 
  Layers, 
  Layers2, 
  Layers3, 
  Layout, 
  LayoutGrid, 
  LayoutList, 
  LayoutTemplate, 
  Sidebar, 
  PanelLeft, 
  PanelRight, 
  PanelTop, 
  PanelBottom, 
  Columns, 
  Rows, 
  Grid, 
  Grid3x3, 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Octagon, 
  Pentagon, 
  Star as StarIcon, 
  Heart as HeartIcon, 
  Smile, 
  Frown, 
  Meh, 
  Angry, 
  Laugh, 
  Zap as ZapIcon, 
  Flame, 
  Sun, 
  Moon, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Rainbow, 
  Umbrella, 
  Thermometer, 
  Wind, 
  Tornado, 
  Snowflake, 
  Droplets, 
  Waves, 
  Mountain, 
  MountainSnow, 
  Trees, 
  TreePine, 
  TreeDeciduous, 
  Flower, 
  Flower2, 
  Leaf, 
  Seedling, 
  Sprout, 
  Cherry, 
  Apple, 
  Grape, 
  Banana, 
  Lemon, 
  Orange, 
  Strawberry, 
  Carrot, 
  Corn, 
  Wheat, 
  Coffee, 
  Wine, 
  Beer, 
  Milk, 
  Egg, 
  Fish, 
  Beef, 
  Chicken, 
  Pizza, 
  Cake, 
  Cookie, 
  IceCream, 
  Candy, 
  Donut, 
  Croissant, 
  Sandwich, 
  Salad, 
  Soup, 
  Utensils, 
  UtensilsCrossed, 
  ChefHat, 
  Soup as SoupIcon, 
  GlassWater, 
  Martini, 
  Cocktail, 
  WineOff, 
  BeerOff, 
  Cigarette, 
  CigaretteOff, 
  Smoking, 
  SmokingOff, 
  Pill, 
  Syringe, 
  Stethoscope, 
  Thermometer as ThermometerIcon, 
  Bandage, 
  HeartPulse, 
  Brain, 
  Bone, 
  Skull, 
  Eye as EyeIcon, 
  Ear, 
  Nose, 
  Mouth, 
  Teeth, 
  Tongue, 
  Hand, 
  Footprints, 
  Baby, 
  Child, 
  PersonStanding, 
  Accessibility, 
  Wheelchair, 
  WheelchairMove, 
  Crutch, 
  Glasses, 
  Sunglasses, 
  Watch, 
  Timer, 
  Stopwatch, 
  AlarmClock, 
  Clock3, 
  Clock6, 
  Clock9, 
  Clock12, 
  Hourglass, 
  Calendar as CalendarIcon, 
  CalendarDays, 
  CalendarCheck, 
  CalendarX, 
  CalendarPlus, 
  CalendarMinus, 
  CalendarClock, 
  CalendarHeart, 
  CalendarSearch, 
  CalendarRange, 
  Date, 
  History, 
  HistoryIcon, 
  Repeat, 
  Repeat1, 
  Repeat2, 
  Shuffle, 
  SkipBack, 
  SkipForward, 
  Rewind, 
  FastForward, 
  Play, 
  Pause, 
  Stop, 
  Square as SquareIcon, 
  Circle as CircleIcon, 
  Triangle as TriangleIcon, 
  Polygon, 
  Shapes, 
  Spline, 
  Bezier, 
  Pen, 
  PenLine, 
  Pencil, 
  PencilLine, 
  Highlighter, 
  Marker, 
  Crayon, 
  Paintbrush, 
  Paintbrush2, 
  PaintBucket, 
  Spray, 
  Stamp, 
  Sticker, 
  StickerCircle, 
  Magnet, 
  Paperclip, 
  Pin, 
  PinOff, 
  Pushpin, 
  Thumbtack, 
  Clip, 
  Unlink, 
  Link2, 
  LinkIcon, 
  Chain, 
  Anchor as AnchorIcon, 
  Lock as LockIcon, 
  Unlock as UnlockIcon, 
  Key as KeyIcon, 
  KeyRound, 
  KeySquare, 
  Fingerprint, 
  Scan, 
  ScanLine, 
  ScanText, 
  ScanBarcode, 
  ScanQrCode, 
  QrCode, 
  Barcode, 
  Hash, 
  AtSign, 
  Percent as PercentIcon, 
  Dollar, 
  Euro, 
  Pound, 
  Yen, 
  Ruble, 
  IndianRupee, 
  Bitcoin as BitcoinIcon, 
  Ethereum, 
  Litecoin, 
  Dogecoin, 
  Tether, 
  Binance, 
  Cardano, 
  Solana, 
  Polkadot, 
  Chainlink, 
  Uniswap, 
  Aave, 
  Compound, 
  MakerDao, 
  SushiSwap, 
  PancakeSwap, 
  Curve, 
  Yearn, 
  Synthetix, 
  Balancer, 
  Ren, 
  Loopring, 
  Kyber, 
  Bancor, 
  Augur, 
  Gnosis, 
  Decentraland, 
  Sandbox, 
  Axie, 
  Enjin, 
  Flow, 
  Theta, 
  Filecoin, 
  Storj, 
  Siacoin, 
  Arweave, 
  Helium, 
  Iota, 
  Nano, 
  Stellar, 
  Ripple, 
  Tron, 
  Eos, 
  Neo, 
  Qtum, 
  Waves, 
  Lisk, 
  Stratis, 
  Ark, 
  Komodo, 
  Zcash, 
  Monero, 
  Dash, 
  DigiByte, 
  Verge, 
  Siacoin as SiacoinIcon, 
  Decred, 
  Pivx, 
  Navcoin, 
  Vertcoin, 
  Groestlcoin, 
  Feathercoin, 
  Peercoin, 
  Primecoin, 
  Namecoin, 
  Dogecoin as DogecoinIcon, 
  Litecoin as LitecoinIcon, 
  Bitcoin as BitcoinIcon2, 
  Ethereum as EthereumIcon, 
  Ripple as RippleIcon, 
  BitcoinCash, 
  Cardano as CardanoIcon, 
  Stellar as StellarIcon, 
  Eos as EosIcon, 
  Tron as TronIcon, 
  Iota as IotaIcon, 
  Neo as NeoIcon, 
  Dash as DashIcon, 
  Monero as MoneroIcon, 
  Zcash as ZcashIcon, 
  Qtum as QtumIcon, 
  Lisk as LiskIcon, 
  Stratis as StratisIcon, 
  Waves as WavesIcon, 
  Ark as ArkIcon, 
  Komodo as KomodoIcon, 
  Pivx as PivxIcon, 
  Decred as DecredIcon, 
  DigiByte as DigiByteIcon, 
  Verge as VergeIcon, 
  Navcoin as NavcoinIcon, 
  Vertcoin as VertcoinIcon, 
  Groestlcoin as GroestlcoinIcon, 
  Feathercoin as FeathercoinIcon, 
  Peercoin as PeercoinIcon, 
  Primecoin as PrimecoinIcon, 
  Namecoin as NamecoinIcon 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Area, 
  Pie, 
  Cell, 
  Line, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const salesData = [
  { id: 1, product: 'لابتوب Dell XPS 13', category: 'إلكترونيات', price: 1299, quantity: 45, revenue: 58455, status: 'متاح', rating: 4.8, reviews: 234 },
  { id: 2, product: 'هاتف iPhone 15 Pro', category: 'إلكترونيات', price: 999, quantity: 78, revenue: 77922, status: 'متاح', rating: 4.9, reviews: 567 },
  { id: 3, product: 'ساعة Apple Watch Series 9', category: 'إكسسوارات', price: 399, quantity: 123, revenue: 49077, status: 'متاح', rating: 4.7, reviews: 189 },
  { id: 4, product: 'سماعات AirPods Pro', category: 'إكسسوارات', price: 249, quantity: 156, revenue: 38844, status: 'نفد المخزون', rating: 4.6, reviews: 345 },
  { id: 5, product: 'جهاز iPad Air', category: 'إلكترونيات', price: 599, quantity: 67, revenue: 40133, status: 'متاح', rating: 4.8, reviews: 278 },
];

const categoryPerformanceData = [
  { name: 'إلكترونيات', sales: 176510, orders: 190, avgOrder: 929, growth: 15.2 },
  { name: 'إكسسوارات', sales: 87921, orders: 279, avgOrder: 315, growth: 8.7 },
  { name: 'أزياء', sales: 54320, orders: 145, avgOrder: 375, growth: 12.1 },
  { name: 'منزل وحديقة', sales: 43210, orders: 98, avgOrder: 441, growth: -2.3 },
  { name: 'رياضة', sales: 32100, orders: 76, avgOrder: 422, growth: 18.9 },
];

const monthlyRevenueData = [
  { name: 'يناير', revenue: 285000, orders: 1250, customers: 890 },
  { name: 'فبراير', revenue: 320000, orders: 1380, customers: 950 },
  { name: 'مارس', revenue: 298000, orders: 1290, customers: 920 },
  { name: 'أبريل', revenue: 345000, orders: 1450, customers: 1020 },
  { name: 'مايو', revenue: 378000, orders: 1580, customers: 1150 },
  { name: 'يونيو', revenue: 394000, orders: 1620, customers: 1200 },
];

const customerSegmentData = [
  { name: 'عملاء VIP', value: 25, color: '#0088FE' },
  { name: 'عملاء منتظمون', value: 45, color: '#00C49F' },
  { name: 'عملاء جدد', value: 20, color: '#FFBB28' },
  { name: 'عملاء غير نشطين', value: 10, color: '#FF8042' },
];

const paymentMethodsData = [
  { name: 'بطاقة ائتمان', transactions: 1250, amount: 187500, percentage: 47.5 },
  { name: 'PayPal', transactions: 890, amount: 133500, percentage: 33.8 },
  { name: 'تحويل بنكي', transactions: 340, amount: 51000, percentage: 12.9 },
  { name: 'محفظة رقمية', transactions: 180, amount: 27000, percentage: 6.8 },
];

const AdvancedEcommerce = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-blue-600">$394K</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +16.2% عن الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-green-600">1,620</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.7% عن الشهر الماضي
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">العملاء النشطين</p>
                <p className="text-2xl font-bold text-purple-600">1,200</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.3% عن الشهر الماضي
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط قيمة الطلب</p>
                <p className="text-2xl font-bold text-orange-600">$243</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +5.8% عن الشهر الماضي
                </p>
              </div>
              <ShoppingBag className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء الفئات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={categoryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="المبيعات ($)" />
                <Line type="monotone" dataKey="orders" stroke="#ff7300" name="الطلبات" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              شرائح العملاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            الإيرادات الشهرية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" name="الإيرادات ($)" />
              <Bar dataKey="orders" fill="#82ca9d" name="الطلبات" />
              <Line type="monotone" dataKey="customers" stroke="#ff7300" name="العملاء" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              إضافة منتج جديد
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية المباعة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإيرادات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={product.status === 'متاح' ? 'default' : 'destructive'}
                      className={`${
                        product.status === 'متاح' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {product.rating} ({product.reviews})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            طرق الدفع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethodsData.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.transactions} معاملة</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">${method.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{method.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المعاملات</p>
                <p className="text-2xl font-bold text-blue-600">2,660</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +18.2% عن الشهر الماضي
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل نجاح المعاملات</p>
                <p className="text-2xl font-bold text-green-600">98.5%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +0.3% عن الشهر الماضي
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط وقت المعالجة</p>
                <p className="text-2xl font-bold text-purple-600">2.3s</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" /> -12.5% عن الشهر الماضي
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Store className="h-8 w-8 text-blue-600" />
            التجارة الإلكترونية المتقدمة
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة ومتقدمة لمتجرك الإلكتروني مع تحليلات عميقة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            تحديد الفترة
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="payments">المدفوعات</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="products">
          {renderProducts()}
        </TabsContent>

        <TabsContent value="payments">
          {renderPayments()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedEcommerce;

