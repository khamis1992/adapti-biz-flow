import React, { useState } from 'react';
import { 
  Shield, Link, Coins, Zap, Globe, Lock,
  TrendingUp, BarChart3, Users, Clock, Settings,
  CheckCircle, AlertTriangle, Eye, Copy, Share2,
  Wallet, CreditCard, ArrowUpRight, ArrowDownLeft,
  FileText, Database, Server, Key, RefreshCw
} from 'lucide-react';

const BlockchainIntegration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

  // Blockchain networks
  const networks = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '⟠',
      status: 'connected',
      balance: '12.45',
      gasPrice: '25',
      transactions: 1247,
      contracts: 8
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '₿',
      status: 'connected',
      balance: '0.85',
      gasPrice: '15',
      transactions: 892,
      contracts: 0
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      logo: '⬟',
      status: 'connected',
      balance: '2,450',
      gasPrice: '2',
      transactions: 3420,
      contracts: 12
    },
    {
      id: 'binance',
      name: 'Binance Smart Chain',
      symbol: 'BNB',
      logo: '🟡',
      status: 'pending',
      balance: '0',
      gasPrice: '5',
      transactions: 0,
      contracts: 0
    }
  ];

  const stats = [
    {
      title: 'إجمالي المعاملات',
      value: '5,559',
      change: '+18.5%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'العقود الذكية',
      value: '20',
      change: '+3',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'قيمة المحفظة',
      value: '$45,280',
      change: '+12.3%',
      icon: Wallet,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'رسوم الشبكة',
      value: '$127',
      change: '-8.2%',
      icon: Coins,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Smart contracts
  const smartContracts = [
    {
      id: 1,
      name: 'عقد إدارة المدفوعات',
      address: '0x742d35Cc6634C0532925a3b8D4C9db4C8b4b4b4b',
      network: 'Ethereum',
      status: 'active',
      transactions: 1247,
      gasUsed: '2.4 ETH',
      lastActivity: '2025-08-04 15:30'
    },
    {
      id: 2,
      name: 'عقد إدارة الهوية',
      address: '0x123a45B6789C0123456789012345678901234567',
      network: 'Polygon',
      status: 'active',
      transactions: 892,
      gasUsed: '450 MATIC',
      lastActivity: '2025-08-04 14:20'
    },
    {
      id: 3,
      name: 'عقد التوقيع الرقمي',
      address: '0x987f65E4321D0987654321098765432109876543',
      network: 'Ethereum',
      status: 'paused',
      transactions: 567,
      gasUsed: '1.8 ETH',
      lastActivity: '2025-08-03 18:45'
    },
    {
      id: 4,
      name: 'عقد إدارة الأصول',
      address: '0xABC123DEF456789012345678901234567890ABCD',
      network: 'Polygon',
      status: 'active',
      transactions: 1823,
      gasUsed: '890 MATIC',
      lastActivity: '2025-08-04 16:10'
    }
  ];

  // Recent transactions
  const transactions = [
    {
      id: 1,
      type: 'payment',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      from: '0x742d35Cc6634C0532925a3b8D4C9db4C8b4b4b4b',
      to: '0x123a45B6789C0123456789012345678901234567',
      amount: '2.5 ETH',
      fee: '0.002 ETH',
      status: 'confirmed',
      timestamp: '2025-08-04 15:30',
      confirmations: 12
    },
    {
      id: 2,
      type: 'contract',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      from: '0x987f65E4321D0987654321098765432109876543',
      to: '0xABC123DEF456789012345678901234567890ABCD',
      amount: '0 MATIC',
      fee: '15 MATIC',
      status: 'confirmed',
      timestamp: '2025-08-04 14:45',
      confirmations: 24
    },
    {
      id: 3,
      type: 'transfer',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      from: '0x123a45B6789C0123456789012345678901234567',
      to: '0x742d35Cc6634C0532925a3b8D4C9db4C8b4b4b4b',
      amount: '1.2 ETH',
      fee: '0.001 ETH',
      status: 'pending',
      timestamp: '2025-08-04 16:15',
      confirmations: 3
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} من الشهر الماضي
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blockchain Networks */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">الشبكات المتصلة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {networks.map((network) => (
            <div key={network.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-2xl">{network.logo}</span>
                  <div>
                    <h4 className="font-medium">{network.name}</h4>
                    <p className="text-sm text-gray-500">{network.symbol}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  network.status === 'connected' ? 'bg-green-100 text-green-800' :
                  network.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {network.status === 'connected' ? 'متصل' :
                   network.status === 'pending' ? 'معلق' : 'غير متصل'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الرصيد</span>
                  <span className="font-medium">{network.balance} {network.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">رسوم الغاز</span>
                  <span className="font-medium">{network.gasPrice} Gwei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المعاملات</span>
                  <span className="font-medium">{network.transactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">العقود</span>
                  <span className="font-medium">{network.contracts}</span>
                </div>
              </div>

              <button className="w-full mt-3 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
                إدارة
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">النشاط الأخير</h3>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center space-x-3 space-x-reverse p-3 border rounded-lg">
              <div className={`p-2 rounded-full ${
                tx.type === 'payment' ? 'bg-green-100' :
                tx.type === 'contract' ? 'bg-blue-100' :
                'bg-purple-100'
              }`}>
                {tx.type === 'payment' && <CreditCard className="h-4 w-4 text-green-600" />}
                {tx.type === 'contract' && <FileText className="h-4 w-4 text-blue-600" />}
                {tx.type === 'transfer' && <ArrowUpRight className="h-4 w-4 text-purple-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {tx.type === 'payment' ? 'دفعة' :
                     tx.type === 'contract' ? 'تنفيذ عقد ذكي' : 'تحويل'}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tx.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tx.status === 'confirmed' ? 'مؤكد' :
                     tx.status === 'pending' ? 'معلق' : 'فاشل'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{tx.amount} • {tx.timestamp}</p>
                <p className="text-xs text-gray-500">{tx.confirmations} تأكيدات</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="space-y-6">
      {/* Smart Contracts Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">العقود الذكية</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <FileText className="h-4 w-4 ml-2" />
            إنشاء عقد جديد
          </button>
        </div>

        <div className="space-y-4">
          {smartContracts.map((contract) => (
            <div key={contract.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{contract.name}</h4>
                  <p className="text-sm text-gray-600">{contract.network} • {contract.lastActivity}</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contract.status === 'active' ? 'bg-green-100 text-green-800' :
                    contract.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {contract.status === 'active' ? 'نشط' :
                     contract.status === 'paused' ? 'متوقف' : 'معطل'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">عنوان العقد:</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      {contract.address.slice(0, 10)}...{contract.address.slice(-8)}
                    </code>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{contract.transactions.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">المعاملات</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{contract.gasUsed}</p>
                  <p className="text-sm text-gray-600">الغاز المستخدم</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-1 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Settings className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Transaction History */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">سجل المعاملات</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>جميع الشبكات</option>
              <option>Ethereum</option>
              <option>Polygon</option>
              <option>Bitcoin</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              تصدير
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'payment' ? 'bg-green-100' :
                    tx.type === 'contract' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    {tx.type === 'payment' && <CreditCard className="h-4 w-4 text-green-600" />}
                    {tx.type === 'contract' && <FileText className="h-4 w-4 text-blue-600" />}
                    {tx.type === 'transfer' && <ArrowUpRight className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {tx.type === 'payment' ? 'دفعة' :
                       tx.type === 'contract' ? 'تنفيذ عقد ذكي' : 'تحويل'}
                    </h4>
                    <p className="text-sm text-gray-600">{tx.timestamp}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-medium">{tx.amount}</p>
                  <p className="text-sm text-gray-600">رسوم: {tx.fee}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">من:</span>
                    <code className="block bg-white p-2 rounded border mt-1 text-xs">
                      {tx.from}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-600">إلى:</span>
                    <code className="block bg-white p-2 rounded border mt-1 text-xs">
                      {tx.to}
                    </code>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tx.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tx.status === 'confirmed' ? 'مؤكد' :
                     tx.status === 'pending' ? 'معلق' : 'فاشل'}
                  </span>
                  <span className="text-sm text-gray-600">{tx.confirmations} تأكيدات</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-green-50 rounded-lg mb-3 inline-block">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-600">التشفير</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
            <Key className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">المفاتيح الخاصة</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-purple-50 rounded-lg mb-3 inline-block">
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Multi-Sig</p>
          <p className="text-sm text-gray-600">المحافظ الآمنة</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-orange-50 rounded-lg mb-3 inline-block">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600">التهديدات</p>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">سياسات الأمان</h3>
        <div className="space-y-4">
          {[
            { name: 'التوقيع المتعدد', status: 'enabled', description: 'مطلوب توقيع متعدد للمعاملات الكبيرة' },
            { name: 'التشفير الكامل', status: 'enabled', description: 'تشفير جميع البيانات والمفاتيح الخاصة' },
            { name: 'مراقبة المعاملات', status: 'enabled', description: 'مراقبة جميع المعاملات في الوقت الفعلي' },
            { name: 'النسخ الاحتياطي الآمن', status: 'enabled', description: 'نسخ احتياطية مشفرة للمحافظ' },
            { name: 'فحص العقود الذكية', status: 'warning', description: 'فحص دوري للثغرات في العقود' },
            { name: 'حدود المعاملات', status: 'enabled', description: 'حدود يومية وشهرية للمعاملات' }
          ].map((policy, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`w-3 h-3 rounded-full ${
                  policy.status === 'enabled' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="font-medium">{policy.name}</h4>
                  <p className="text-sm text-gray-600">{policy.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  policy.status === 'enabled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {policy.status === 'enabled' ? 'مفعل' : 'تحذير'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إدارة المحافظ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'المحفظة الرئيسية', type: 'Hot Wallet', balance: '$32,450', status: 'active' },
            { name: 'محفظة التخزين البارد', type: 'Cold Storage', balance: '$12,830', status: 'secure' },
            { name: 'محفظة العقود الذكية', type: 'Contract Wallet', balance: '$8,920', status: 'active' },
            { name: 'محفظة الاحتياط', type: 'Backup Wallet', balance: '$2,150', status: 'standby' }
          ].map((wallet, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{wallet.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  wallet.status === 'active' ? 'bg-green-100 text-green-800' :
                  wallet.status === 'secure' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {wallet.status === 'active' ? 'نشط' :
                   wallet.status === 'secure' ? 'آمن' : 'احتياط'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{wallet.type}</p>
              <p className="text-lg font-bold text-blue-600">{wallet.balance}</p>
              <div className="flex space-x-2 space-x-reverse mt-3">
                <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700">
                  عرض
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-1 px-2 rounded text-sm hover:bg-gray-50">
                  إدارة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'contracts', name: 'العقود الذكية', icon: FileText },
    { id: 'transactions', name: 'المعاملات', icon: TrendingUp },
    { id: 'security', name: 'الأمان', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">تكامل البلوك تشين</h1>
              <p className="text-gray-600 mt-2">إدارة العقود الذكية والمعاملات اللامركزية</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <select 
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="binance">Binance Smart Chain</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث الشبكة
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 ml-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'contracts' && renderContracts()}
          {activeTab === 'transactions' && renderTransactions()}
          {activeTab === 'security' && renderSecurity()}
        </div>
      </div>
    </div>
  );
};

export default BlockchainIntegration;

