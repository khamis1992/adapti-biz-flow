import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Clock, 
  Fuel, 
  Route, 
  AlertTriangle,
  Play,
  Pause,
  Square,
  Search,
  Filter,
  Download,
  Settings
} from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  plateNumber: string;
  driver: string;
  status: 'moving' | 'stopped' | 'idle' | 'offline';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  speed: number;
  fuel: number;
  lastUpdate: string;
  odometer: number;
}

interface Trip {
  id: string;
  vehicleId: string;
  vehicleName: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  duration: number;
  fuelConsumed: number;
  maxSpeed: number;
  avgSpeed: number;
}

interface Geofence {
  id: string;
  name: string;
  type: 'circular' | 'polygon';
  center: { lat: number; lng: number };
  radius: number;
  vehicles: string[];
  alerts: boolean;
}

const GPSTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  // Mock data for vehicles
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'شاحنة التوصيل 1',
      plateNumber: 'أ ب ج 123',
      driver: 'أحمد محمد',
      status: 'moving',
      location: {
        lat: 24.7136,
        lng: 46.6753,
        address: 'شارع الملك فهد، الرياض'
      },
      speed: 65,
      fuel: 75,
      lastUpdate: '2024-08-04T10:30:00',
      odometer: 45230
    },
    {
      id: '2',
      name: 'سيارة الخدمة 2',
      plateNumber: 'د هـ و 456',
      driver: 'محمد علي',
      status: 'stopped',
      location: {
        lat: 24.6877,
        lng: 46.7219,
        address: 'حي العليا، الرياض'
      },
      speed: 0,
      fuel: 45,
      lastUpdate: '2024-08-04T10:25:00',
      odometer: 32150
    },
    {
      id: '3',
      name: 'شاحنة النقل 3',
      plateNumber: 'ز ح ط 789',
      driver: 'سعد الأحمد',
      status: 'idle',
      location: {
        lat: 24.7744,
        lng: 46.7383,
        address: 'حي الملز، الرياض'
      },
      speed: 0,
      fuel: 20,
      lastUpdate: '2024-08-04T10:15:00',
      odometer: 67890
    }
  ]);

  // Mock data for trips
  const [trips] = useState<Trip[]>([
    {
      id: '1',
      vehicleId: '1',
      vehicleName: 'شاحنة التوصيل 1',
      startTime: '2024-08-04T08:00:00',
      endTime: '2024-08-04T10:30:00',
      startLocation: 'المستودع الرئيسي',
      endLocation: 'شارع الملك فهد',
      distance: 45.5,
      duration: 150,
      fuelConsumed: 8.5,
      maxSpeed: 80,
      avgSpeed: 35
    },
    {
      id: '2',
      vehicleId: '2',
      vehicleName: 'سيارة الخدمة 2',
      startTime: '2024-08-04T09:00:00',
      endTime: '2024-08-04T10:25:00',
      startLocation: 'المكتب الرئيسي',
      endLocation: 'حي العليا',
      distance: 25.3,
      duration: 85,
      fuelConsumed: 4.2,
      maxSpeed: 70,
      avgSpeed: 28
    }
  ]);

  // Mock data for geofences
  const [geofences] = useState<Geofence[]>([
    {
      id: '1',
      name: 'المستودع الرئيسي',
      type: 'circular',
      center: { lat: 24.7136, lng: 46.6753 },
      radius: 500,
      vehicles: ['1', '2'],
      alerts: true
    },
    {
      id: '2',
      name: 'منطقة التوصيل الشمالية',
      type: 'circular',
      center: { lat: 24.7744, lng: 46.7383 },
      radius: 1000,
      vehicles: ['3'],
      alerts: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'moving': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-red-100 text-red-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'moving': return 'متحرك';
      case 'stopped': return 'متوقف';
      case 'idle': return 'خامل';
      case 'offline': return 'غير متصل';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'moving': return <Play className="h-4 w-4" />;
      case 'stopped': return <Square className="h-4 w-4" />;
      case 'idle': return <Pause className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || vehicle.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const movingVehicles = vehicles.filter(v => v.status === 'moving').length;
  const stoppedVehicles = vehicles.filter(v => v.status === 'stopped').length;
  const idleVehicles = vehicles.filter(v => v.status === 'idle').length;
  const offlineVehicles = vehicles.filter(v => v.status === 'offline').length;

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            تتبع GPS
          </h1>
          <p className="text-gray-600 mt-2">تتبع المركبات والمعدات في الوقت الفعلي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات التتبع
          </Button>
          <Button className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            عرض الخريطة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المركبات</p>
                <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
              </div>
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متحركة</p>
                <p className="text-2xl font-bold text-green-600">{movingVehicles}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوقفة</p>
                <p className="text-2xl font-bold text-red-600">{stoppedVehicles}</p>
              </div>
              <Square className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">خاملة</p>
                <p className="text-2xl font-bold text-yellow-600">{idleVehicles}</p>
              </div>
              <Pause className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">التتبع المباشر</TabsTrigger>
          <TabsTrigger value="trips">الرحلات</TabsTrigger>
          <TabsTrigger value="geofences">المناطق الجغرافية</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Live Tracking Tab */}
        <TabsContent value="live" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">البحث</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="البحث باسم المركبة، رقم اللوحة، أو السائق..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">الحالة</Label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="moving">متحرك</option>
                    <option value="stopped">متوقف</option>
                    <option value="idle">خامل</option>
                    <option value="offline">غير متصل</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>الخريطة التفاعلية</CardTitle>
              <CardDescription>عرض مواقع جميع المركبات في الوقت الفعلي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">خريطة تفاعلية لتتبع المركبات</p>
                  <p className="text-sm text-gray-500 mt-2">سيتم دمج Google Maps أو OpenStreetMap هنا</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicles List */}
          <div className="grid gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Car className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                        <CardDescription>
                          {vehicle.plateNumber} | السائق: {vehicle.driver}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(vehicle.status)}>
                        {getStatusIcon(vehicle.status)}
                        {getStatusText(vehicle.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">الموقع الحالي</p>
                        <p className="font-medium text-sm">{vehicle.location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">السرعة</p>
                        <p className="font-medium">{vehicle.speed} كم/ساعة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">مستوى الوقود</p>
                        <p className="font-medium">{vehicle.fuel}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">آخر تحديث</p>
                        <p className="font-medium text-sm">
                          {new Date(vehicle.lastUpdate).toLocaleTimeString('ar-SA')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fuel Level Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">مستوى الوقود</span>
                      <span className="text-sm font-medium">{vehicle.fuel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          vehicle.fuel > 50 ? 'bg-green-500' : 
                          vehicle.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${vehicle.fuel}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      عرض على الخريطة
                    </Button>
                    <Button variant="outline" size="sm">
                      تاريخ الرحلات
                    </Button>
                    <Button variant="outline" size="sm">
                      إرسال أمر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trips Tab */}
        <TabsContent value="trips" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>سجل الرحلات</CardTitle>
                  <CardDescription>تفاصيل جميع الرحلات المكتملة</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    فلترة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trips.map((trip) => (
                  <div key={trip.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{trip.vehicleName}</h3>
                        <p className="text-sm text-gray-600">
                          {trip.startLocation} ← {trip.endLocation}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(trip.startTime).toLocaleDateString('ar-SA')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(trip.startTime).toLocaleTimeString('ar-SA')} - 
                          {new Date(trip.endTime).toLocaleTimeString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">المسافة: </span>
                        <span className="font-medium">{trip.distance} كم</span>
                      </div>
                      <div>
                        <span className="text-gray-600">المدة: </span>
                        <span className="font-medium">{trip.duration} دقيقة</span>
                      </div>
                      <div>
                        <span className="text-gray-600">استهلاك الوقود: </span>
                        <span className="font-medium">{trip.fuelConsumed} لتر</span>
                      </div>
                      <div>
                        <span className="text-gray-600">السرعة القصوى: </span>
                        <span className="font-medium">{trip.maxSpeed} كم/ساعة</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Route className="h-4 w-4 mr-2" />
                        عرض المسار
                      </Button>
                      <Button variant="outline" size="sm">
                        تفاصيل الرحلة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geofences Tab */}
        <TabsContent value="geofences" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>المناطق الجغرافية</CardTitle>
                  <CardDescription>إدارة المناطق المحددة والتنبيهات</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  إضافة منطقة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {geofences.map((geofence) => (
                  <div key={geofence.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{geofence.name}</h3>
                        <p className="text-sm text-gray-600">
                          نوع المنطقة: {geofence.type === 'circular' ? 'دائرية' : 'مضلعة'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={geofence.alerts ? 'default' : 'secondary'}>
                          {geofence.alerts ? 'التنبيهات مفعلة' : 'التنبيهات معطلة'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">نصف القطر: </span>
                        <span className="font-medium">{geofence.radius} متر</span>
                      </div>
                      <div>
                        <span className="text-gray-600">المركبات المرتبطة: </span>
                        <span className="font-medium">{geofence.vehicles.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">الإحداثيات: </span>
                        <span className="font-medium">
                          {geofence.center.lat.toFixed(4)}, {geofence.center.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        عرض على الخريطة
                      </Button>
                      <Button variant="outline" size="sm">
                        تعديل المنطقة
                      </Button>
                      <Button variant="outline" size="sm">
                        إعدادات التنبيهات
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقرير الاستخدام اليومي</CardTitle>
                <CardDescription>إحصائيات الاستخدام لليوم الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>إجمالي المسافة المقطوعة:</span>
                    <span className="font-bold">245.8 كم</span>
                  </div>
                  <div className="flex justify-between">
                    <span>إجمالي ساعات التشغيل:</span>
                    <span className="font-bold">18.5 ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>استهلاك الوقود:</span>
                    <span className="font-bold">45.2 لتر</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط السرعة:</span>
                    <span className="font-bold">32 كم/ساعة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تقرير الكفاءة</CardTitle>
                <CardDescription>مؤشرات الأداء والكفاءة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>كفاءة استهلاك الوقود:</span>
                    <span className="font-bold text-green-600">18.4 كم/لتر</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نسبة الاستخدام:</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>وقت الخمول:</span>
                    <span className="font-bold text-yellow-600">2.5 ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مخالفات السرعة:</span>
                    <span className="font-bold text-red-600">3 مخالفات</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                التنبيهات والإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Fuel className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">مستوى وقود منخفض</p>
                      <p className="text-sm text-gray-600">شاحنة النقل 3 - مستوى الوقود 20%</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    عرض
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <Navigation className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">تجاوز السرعة المحددة</p>
                      <p className="text-sm text-gray-600">شاحنة التوصيل 1 - السرعة 85 كم/ساعة</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    عرض
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">دخول منطقة جغرافية</p>
                      <p className="text-sm text-gray-600">سيارة الخدمة 2 دخلت المستودع الرئيسي</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    عرض
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GPSTracking;

