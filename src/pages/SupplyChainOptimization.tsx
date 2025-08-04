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
  Settings, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Share, 
  Star, 
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
  FileText, 
  Coffee, 
  Leaf, 
  Apple
} from 'lucide-react';

const SupplyChainOptimization = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const suppliers = [
    {
      id: '1',
      name: 'Global Electronics Co.',
      status: 'active',
      reliability: 95,
      location: 'Shanghai, China',
      lastDelivery: '2024-08-01',
      rating: 4.8
    },
    {
      id: '2',
      name: 'TechParts Industries',
      status: 'warning',
      reliability: 78,
      location: 'Mumbai, India',
      lastDelivery: '2024-07-28',
      rating: 4.2
    },
    {
      id: '3',
      name: 'Premium Components Ltd.',
      status: 'active',
      reliability: 92,
      location: 'Frankfurt, Germany',
      lastDelivery: '2024-08-02',
      rating: 4.6
    }
  ];

  const inventory = [
    {
      id: '1',
      name: 'Circuit Boards',
      stock: 1250,
      minStock: 500,
      category: 'Electronics',
      supplier: 'Global Electronics Co.',
      lastOrdered: '2024-07-15'
    },
    {
      id: '2',
      name: 'Power Adapters',
      stock: 75,
      minStock: 100,
      category: 'Accessories',
      supplier: 'TechParts Industries',
      lastOrdered: '2024-07-20'
    },
    {
      id: '3',
      name: 'Packaging Materials',
      stock: 850,
      minStock: 200,
      category: 'Materials',
      supplier: 'Premium Components Ltd.',
      lastOrdered: '2024-07-25'
    }
  ];

  const shipments = [
    {
      id: 'SH001',
      origin: 'Shanghai, China',
      destination: 'Los Angeles, USA',
      status: 'in_transit',
      expectedDelivery: '2024-08-15',
      carrier: 'Global Freight',
      value: 125000
    },
    {
      id: 'SH002',
      origin: 'Mumbai, India',
      destination: 'New York, USA',
      status: 'customs',
      expectedDelivery: '2024-08-18',
      carrier: 'Express Logistics',
      value: 85000
    },
    {
      id: 'SH003',
      origin: 'Frankfurt, Germany',
      destination: 'Chicago, USA',
      status: 'delivered',
      expectedDelivery: '2024-08-10',
      carrier: 'Euro Express',
      value: 95000
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800',
      in_transit: 'bg-blue-100 text-blue-800',
      customs: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  const getStockStatus = (current: number, min: number) => {
    if (current < min) return 'low';
    if (current < min * 1.5) return 'warning';
    return 'good';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supply Chain Optimization</h1>
          <p className="text-gray-500 mt-2">
            Monitor and optimize your supply chain operations
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-xs text-green-600 mt-1">+2 this month</p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inventory Items</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
                <p className="text-xs text-blue-600 mt-1">97% in stock</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                <p className="text-2xl font-bold text-orange-600">18</p>
                <p className="text-xs text-orange-600 mt-1">6 in transit</p>
              </div>
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-green-600">$48.2K</p>
                <p className="text-xs text-green-600 mt-1">This quarter</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Supply Chain Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">On-Time Delivery</span>
                    <span className="text-sm font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quality Score</span>
                    <span className="text-sm font-bold text-blue-600">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cost Efficiency</span>
                    <span className="text-sm font-bold text-purple-600">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Low Stock Alert</p>
                      <p className="text-xs text-gray-500">Power Adapters below minimum threshold</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Delivery Delay</p>
                      <p className="text-xs text-gray-500">Shipment SH002 delayed in customs</p>
                      <p className="text-xs text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Supplier Approved</p>
                      <p className="text-xs text-gray-500">New supplier verification completed</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>Monitor and manage your supplier relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Building className="h-10 w-10 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{supplier.name}</h3>
                        <p className="text-sm text-gray-500">{supplier.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusBadge(supplier.status)}>
                            {supplier.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {supplier.reliability}% reliability
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Rating: {supplier.rating}/5</p>
                      <p className="text-xs text-gray-500">Last delivery: {supplier.lastDelivery}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track and manage your inventory levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => {
                  const stockStatus = getStockStatus(item.stock, item.minStock);
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Package className="h-10 w-10 text-gray-400" />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-xs text-gray-400">Supplier: {item.supplier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Stock: {item.stock} / {item.minStock} min
                        </p>
                        <Badge className={getStatusBadge(stockStatus === 'low' ? 'warning' : 'active')}>
                          {stockStatus}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Last ordered: {item.lastOrdered}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Tracking</CardTitle>
              <CardDescription>Monitor active shipments and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Truck className="h-10 w-10 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{shipment.id}</h3>
                        <p className="text-sm text-gray-500">
                          {shipment.origin} → {shipment.destination}
                        </p>
                        <p className="text-xs text-gray-400">Carrier: {shipment.carrier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusBadge(shipment.status)}>
                        {shipment.status}
                      </Badge>
                      <p className="text-sm font-medium mt-1">
                        ${shipment.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        ETA: {shipment.expectedDelivery}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChainOptimization;