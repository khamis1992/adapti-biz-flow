import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  User, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Heart, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  Zap, 
  DollarSign, 
  ShoppingBag, 
  Gift, 
  Award, 
  Trophy, 
  Medal, 
  Crown, 
  Gem, 
  Diamond, 
  Coins, 
  Banknote, 
  Wallet, 
  CreditCard, 
  Building, 
  MapPin, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Wifi, 
  Signal, 
  Battery, 
  Power, 
  Settings, 
  Filter, 
  Search, 
  Sort, 
  SortAsc, 
  SortDesc, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  MoreVertical, 
  Plus, 
  PlusCircle, 
  Minus, 
  MinusCircle, 
  Edit, 
  Edit2, 
  Edit3, 
  Trash, 
  Trash2, 
  Delete, 
  Copy, 
  Cut, 
  Paste, 
  Save, 
  SaveAll, 
  Download, 
  Upload, 
  Share, 
  Share2, 
  Send, 
  Inbox, 
  Outbox, 
  Archive, 
  Bookmark, 
  Flag, 
  Tag, 
  Tags, 
  Hash, 
  AtSign, 
  Percent, 
  Link, 
  Link2, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Key, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  Help, 
  HelpCircle, 
  Question, 
  Exclamation, 
  Warning, 
  Check, 
  CheckCheck, 
  CheckSquare, 
  CheckSquare2, 
  X, 
  XSquare, 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Octagon, 
  Grid, 
  Grid2x2, 
  Grid3x3, 
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
  Table, 
  Table2, 
  Database, 
  Server, 
  Cloud, 
  CloudUpload, 
  CloudDownload, 
  CloudSync, 
  CloudOff, 
  HardDrive, 
  Folder, 
  FolderOpen, 
  FolderPlus, 
  FolderMinus, 
  FolderX, 
  FolderCheck, 
  FolderEdit, 
  FolderSearch, 
  FolderTree, 
  File, 
  FileText, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileCode, 
  FilePdf, 
  FileSpreadsheet, 
  FilePresentation, 
  FileArchive, 
  Files, 
  FilePlus, 
  FileMinus, 
  FileX, 
  FileCheck, 
  FileEdit, 
  FileSearch, 
  Image, 
  Images, 
  ImagePlus, 
  ImageMinus, 
  Video, 
  VideoOff, 
  Play, 
  PlayCircle, 
  Pause, 
  PauseCircle, 
  Stop, 
  StopCircle, 
  SkipBack, 
  SkipForward, 
  Rewind, 
  FastForward, 
  Volume, 
  Volume1, 
  Volume2, 
  VolumeX, 
  VolumeOff, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Headphones, 
  Speaker, 
  Radio, 
  Tv, 
  Laptop, 
  Watch, 
  Timer, 
  Stopwatch, 
  AlarmClock, 
  Hourglass, 
  CalendarDays, 
  CalendarCheck, 
  CalendarX, 
  CalendarPlus, 
  CalendarMinus, 
  CalendarClock, 
  CalendarHeart, 
  CalendarSearch, 
  CalendarRange, 
  History, 
  Repeat, 
  Repeat1, 
  Repeat2, 
  Shuffle, 
  Random, 
  Dice1, 
  Dice2, 
  Dice3, 
  Dice4, 
  Dice5, 
  Dice6, 
  Casino, 
  Gamepad, 
  Gamepad2, 
  Joystick, 
  Keyboard, 
  Mouse, 
  MousePointer, 
  MousePointer2, 
  Touchpad, 
  Touchpad2, 
  Fingerprint, 
  Scan, 
  ScanLine, 
  ScanText, 
  ScanBarcode, 
  ScanQrCode, 
  QrCode, 
  Barcode, 
  Bluetooth, 
  BluetoothConnected, 
  BluetoothSearching, 
  BluetoothOff, 
  WifiOff, 
  SignalHigh, 
  SignalMedium, 
  SignalLow, 
  SignalZero, 
  Antenna, 
  Satellite, 
  SatelliteDish, 
  Radar, 
  Sonar, 
  Waves, 
  Soundwave, 
  AudioWaveform, 
  Equalizer, 
  Sliders, 
  SlidersHorizontal, 
  SlidersVertical, 
  Gauge, 
  Speedometer, 
  Tachometer, 
  Thermometer, 
  Barometer, 
  Compass, 
  Navigation, 
  Navigation2, 
  NavigationOff, 
  Map, 
  Locate, 
  LocateFixed, 
  LocateOff, 
  Route, 
  Directions, 
  Signpost, 
  Milestone, 
  Waypoints, 
  Pin, 
  PinOff, 
  Pushpin, 
  Thumbtack, 
  Paperclip, 
  Clip, 
  Unclip, 
  Unlink, 
  Chain, 
  ChainBreak, 
  Anchor, 
  Magnet, 
  MagnetOff, 
  Lightning, 
  Bolt, 
  Flash, 
  FlashOff, 
  Flashlight, 
  FlashlightOff, 
  Lightbulb, 
  LightbulbOff, 
  Lamp, 
  LampCeiling, 
  LampDesk, 
  LampFloor, 
  LampWall, 
  Candle, 
  Flame, 
  Fire, 
  Campfire, 
  Bonfire, 
  Fireplace, 
  Sun, 
  SunMedium, 
  SunDim, 
  Sunrise, 
  Sunset, 
  Moon, 
  Stars, 
  Sparkle, 
  Sparkles, 
  Rainbow, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudHail, 
  CloudFog, 
  Cloudy, 
  PartlyCloudy, 
  Overcast, 
  Fog, 
  Mist, 
  Haze, 
  Smog, 
  Wind, 
  Tornado, 
  Hurricane, 
  Cyclone, 
  Typhoon, 
  Storm, 
  Thunder, 
  Thunderstorm, 
  Hail, 
  Sleet, 
  Snow, 
  Snowflake, 
  Blizzard, 
  Avalanche, 
  Ice, 
  Icicle, 
  Frost, 
  Freeze, 
  Cold, 
  Hot, 
  Warm, 
  Cool, 
  Temperature, 
  Celsius, 
  Fahrenheit, 
  Kelvin, 
  Degree, 
  Humidity, 
  Pressure, 
  Altimeter, 
  Hygrometer, 
  AirQuality, 
  Pollution, 
  Dust, 
  Pollen, 
  Allergen, 
  Virus, 
  Bacteria, 
  Germ, 
  Microbe, 
  Pathogen, 
  Infection, 
  Disease, 
  Illness, 
  Sickness, 
  Health, 
  Wellness, 
  Fitness, 
  Exercise, 
  Workout, 
  Gym, 
  Dumbbell, 
  Barbell, 
  Weight, 
  Scale, 
  Balance, 
  Yoga, 
  Meditation, 
  Mindfulness, 
  Zen, 
  Peace, 
  Calm, 
  Relax, 
  Rest, 
  Sleep, 
  Dream, 
  Bed, 
  Pillow, 
  Blanket, 
  Sheet, 
  Mattress, 
  Bedroom, 
  Hotel, 
  Motel, 
  Inn, 
  Lodge, 
  Resort, 
  Spa, 
  Sauna, 
  Jacuzzi, 
  Pool, 
  Swimming, 
  Diving, 
  Snorkeling, 
  Surfing, 
  Sailing, 
  Boating, 
  Fishing, 
  Angling, 
  Hunting, 
  Camping, 
  Hiking, 
  Trekking, 
  Climbing, 
  Mountaineering, 
  Skiing, 
  Snowboarding, 
  Skating, 
  Hockey, 
  Soccer, 
  Football, 
  Basketball, 
  Baseball, 
  Tennis, 
  Golf, 
  Cricket, 
  Rugby, 
  Volleyball, 
  Badminton, 
  TableTennis, 
  Squash, 
  Racquetball, 
  Handball, 
  Polo, 
  Lacrosse, 
  FieldHockey, 
  IceHockey, 
  WaterPolo, 
  Gymnastics, 
  Athletics, 
  Track, 
  Field, 
  Marathon, 
  Running, 
  Jogging, 
  Walking, 
  Cycling, 
  Biking, 
  Motorcycle, 
  Scooter, 
  Skateboard, 
  Rollerblade, 
  Hoverboard, 
  Segway, 
  Unicycle, 
  Tricycle, 
  Bicycle, 
  Bike, 
  Car, 
  Automobile, 
  Vehicle, 
  Truck, 
  Van, 
  Bus, 
  Coach, 
  Minibus, 
  Taxi, 
  Cab, 
  Uber, 
  Lyft, 
  Rideshare, 
  Carpool, 
  Train, 
  Subway, 
  Metro, 
  Tram, 
  Trolley, 
  Streetcar, 
  LightRail, 
  Monorail, 
  Maglev, 
  HighSpeedRail, 
  Bullet, 
  Express, 
  Local, 
  Commuter, 
  Freight, 
  Cargo, 
  Container, 
  Ship, 
  Boat, 
  Yacht, 
  Sailboat, 
  Motorboat, 
  Speedboat, 
  Catamaran, 
  Ferry, 
  Cruise, 
  Liner, 
  Freighter, 
  Tanker, 
  Barge, 
  Tugboat, 
  Icebreaker, 
  Submarine, 
  Warship, 
  Battleship, 
  Destroyer, 
  Cruiser, 
  Frigate, 
  Corvette, 
  Gunboat, 
  PatrolBoat, 
  CoastGuard, 
  Navy, 
  Marine, 
  Admiral, 
  Captain, 
  Commander, 
  Lieutenant, 
  Ensign, 
  Sailor, 
  Seaman, 
  Crew, 
  Passenger, 
  Tourist, 
  Traveler, 
  Explorer, 
  Adventurer, 
  Nomad, 
  Wanderer, 
  Backpacker, 
  Hiker, 
  Camper, 
  Outdoorsman, 
  Survivalist, 
  Guide, 
  Ranger, 
  Scout, 
  Hunter, 
  Tracker, 
  Pathfinder, 
  Navigator, 
  Pilot, 
  Driver, 
  Chauffeur, 
  Mechanic, 
  Technician, 
  Engineer, 
  Architect, 
  Designer, 
  Artist, 
  Painter, 
  Sculptor, 
  Photographer, 
  Filmmaker, 
  Director, 
  Producer, 
  Actor, 
  Actress, 
  Performer, 
  Entertainer, 
  Musician, 
  Singer, 
  Songwriter, 
  Composer, 
  Conductor, 
  Pianist, 
  Guitarist, 
  Drummer, 
  Bassist, 
  Violinist, 
  Cellist, 
  Flutist, 
  Trumpeter, 
  Saxophonist, 
  Clarinetist, 
  Oboist, 
  Bassoonist, 
  Harpist, 
  Organist, 
  Keyboardist, 
  DJ, 
  SoundEngineer, 
  AudioTechnician, 
  Roadie, 
  StageManager, 
  Lighting, 
  Sound, 
  Audio, 
  Visual, 
  Film, 
  Movie, 
  Cinema, 
  Theater, 
  Stage, 
  Performance, 
  Show, 
  Concert, 
  Festival, 
  Event, 
  Party, 
  Celebration, 
  Wedding, 
  Birthday, 
  Anniversary, 
  Holiday, 
  Vacation, 
  Trip, 
  Journey, 
  Adventure, 
  Expedition, 
  Safari, 
  Tour, 
  Sightseeing, 
  Tourism, 
  Travel, 
  Destination, 
  Landmark, 
  Monument, 
  Museum, 
  Gallery, 
  Exhibition, 
  Display, 
  Collection, 
  Artifact, 
  Antique, 
  Vintage, 
  Classic, 
  Retro, 
  Old, 
  Ancient, 
  Historic, 
  Traditional, 
  Cultural, 
  Heritage, 
  Legacy, 
  Past, 
  Present, 
  Future, 
  Time, 
  Era, 
  Period, 
  Age, 
  Generation, 
  Century, 
  Millennium, 
  Decade, 
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
  Instant, 
  Moment, 
  Duration, 
  Interval, 
  Span, 
  Range, 
  Scope, 
  Extent, 
  Limit, 
  Boundary, 
  Border, 
  Edge, 
  Margin, 
  Padding, 
  Space, 
  Gap, 
  Distance, 
  Length, 
  Width, 
  Height, 
  Depth, 
  Thickness, 
  Size, 
  Scale, 
  Proportion, 
  Ratio, 
  Percentage, 
  Fraction, 
  Decimal, 
  Number, 
  Digit, 
  Numeral, 
  Figure, 
  Count, 
  Quantity, 
  Amount, 
  Total, 
  Sum, 
  Average, 
  Mean, 
  Median, 
  Mode, 
  Variance, 
  Deviation, 
  Standard, 
  Normal, 
  Distribution, 
  Probability, 
  Statistics, 
  Data, 
  Information, 
  Knowledge, 
  Wisdom, 
  Intelligence, 
  Smart, 
  Clever, 
  Brilliant, 
  Genius, 
  Expert, 
  Professional, 
  Specialist, 
  Master, 
  Guru, 
  Authority, 
  Leader, 
  Manager, 
  Executive, 
  CEO, 
  President, 
  VicePresident, 
  Chairman, 
  Board, 
  Shareholder, 
  Investor, 
  Partner, 
  Stakeholder, 
  Owner, 
  Founder, 
  Entrepreneur, 
  Businessman, 
  Businesswoman, 
  Employee, 
  Worker, 
  Staff, 
  Team, 
  Group, 
  Organization, 
  Company, 
  Corporation, 
  Enterprise, 
  Business, 
  Firm, 
  Agency, 
  Office, 
  Workplace, 
  Workspace, 
  Desk, 
  Chair, 
  Table, 
  Computer, 
  Desktop, 
  Network, 
  Internet, 
  Web, 
  Website, 
  Webpage, 
  Browser, 
  Google, 
  Yahoo, 
  Bing, 
  DuckDuckGo, 
  Yandex, 
  Baidu, 
  Ask, 
  AOL, 
  Excite, 
  Lycos, 
  AltaVista, 
  Dogpile, 
  MetaCrawler, 
  Webcrawler, 
  Infoseek, 
  HotBot, 
  Northern, 
  AllTheWeb, 
  Teoma, 
  Gigablast, 
  Clusty, 
  ChaCha, 
  Wolfram, 
  Alpha, 
  Wikipedia, 
  Wiktionary, 
  Wikimedia, 
  Commons, 
  Wikiquote, 
  Wikinews, 
  Wikibooks, 
  Wikiversity, 
  Wikivoyage, 
  Wikispecies, 
  Wikidata, 
  MediaWiki, 
  Meta, 
  Foundation, 
  Wikia, 
  Fandom, 
  Gamepedia, 
  Curse, 
  Twitch, 
  YouTube, 
  Vimeo, 
  Dailymotion, 
  Metacafe, 
  Veoh, 
  Break, 
  Funny, 
  CollegeHumor, 
  Crackle, 
  Hulu, 
  Netflix, 
  Amazon, 
  Prime, 
  Disney, 
  Plus, 
  HBO, 
  Max, 
  Showtime, 
  Starz, 
  Cinemax, 
  Epix, 
  Paramount, 
  Peacock, 
  AppleTV, 
  Roku, 
  Chromecast, 
  FireTV, 
  AndroidTV, 
  SmartTV, 
  HDTV, 
  UltraHD, 
  BluRay, 
  DVD, 
  CD, 
  Vinyl, 
  Cassette, 
  Tape, 
  Record, 
  Album, 
  Song, 
  Track, 
  Music, 
  Voice, 
  Speech, 
  Talk, 
  Conversation, 
  Discussion, 
  Debate, 
  Argument, 
  Dialogue, 
  Monologue, 
  Presentation, 
  Lecture, 
  Seminar, 
  Workshop, 
  Conference, 
  Meeting, 
  Assembly, 
  Gathering, 
  Convention, 
  Summit, 
  Symposium, 
  Forum, 
  Panel, 
  Roundtable, 
  Interview, 
  QandA, 
  FAQ, 
  Support, 
  Assistance, 
  Service, 
  Customer, 
  Client, 
  Consumer, 
  Buyer, 
  Purchaser, 
  Shopper, 
  Visitor, 
  Guest, 
  Member, 
  Subscriber, 
  Follower, 
  Fan, 
  Supporter, 
  Advocate, 
  Ambassador, 
  Representative, 
  Agent, 
  Broker, 
  Dealer, 
  Seller, 
  Vendor, 
  Supplier, 
  Provider, 
  Manufacturer, 
  Creator, 
  Maker, 
  Builder, 
  Developer, 
  Programmer, 
  Coder, 
  Software, 
  Hardware, 
  Firmware, 
  Middleware, 
  Application, 
  App, 
  Program, 
  System, 
  Platform, 
  Framework, 
  Library, 
  API, 
  SDK, 
  IDE, 
  Editor, 
  Compiler, 
  Interpreter, 
  Debugger, 
  Profiler, 
  Analyzer, 
  Optimizer, 
  Minifier, 
  Bundler, 
  Packager, 
  Installer, 
  Updater, 
  Patcher, 
  Fixer, 
  Repair, 
  Maintenance, 
  Documentation, 
  Manual, 
  Guide, 
  Tutorial, 
  Instructions, 
  Steps, 
  Process, 
  Procedure, 
  Method, 
  Technique, 
  Strategy, 
  Plan, 
  Blueprint, 
  Design, 
  Layout, 
  Structure, 
  Architecture, 
  Foundation, 
  Base, 
  Core, 
  Kernel, 
  Engine, 
  Motor, 
  Drive, 
  Energy, 
  Fuel, 
  Charge, 
  Electric, 
  Electricity, 
  Current, 
  Voltage, 
  Amperage, 
  Wattage, 
  Resistance, 
  Conductance, 
  Capacitance, 
  Inductance, 
  Impedance, 
  Frequency, 
  Wavelength, 
  Amplitude, 
  Phase, 
  Noise, 
  Interference, 
  Distortion, 
  Attenuation, 
  Amplification, 
  Modulation, 
  Demodulation, 
  Encoding, 
  Decoding, 
  Compression, 
  Decompression, 
  Encryption, 
  Decryption, 
  Hashing, 
  Checksum, 
  Verification, 
  Validation, 
  Authentication, 
  Authorization, 
  Permission, 
  Access, 
  Control, 
  Security, 
  Privacy, 
  Confidentiality, 
  Integrity, 
  Availability, 
  Reliability, 
  Durability, 
  Scalability, 
  Performance, 
  Speed, 
  Efficiency, 
  Optimization, 
  Quality, 
  Excellence, 
  Perfection, 
  Precision, 
  Accuracy, 
  Correctness, 
  Validity, 
  Legitimacy, 
  Authenticity, 
  Originality, 
  Uniqueness, 
  Novelty, 
  Innovation, 
  Creativity, 
  Imagination, 
  Inspiration, 
  Motivation, 
  Encouragement, 
  Aid, 
  Relief, 
  Rescue, 
  Salvation, 
  Recovery, 
  Restoration, 
  Renewal, 
  Revival, 
  Regeneration, 
  Rejuvenation, 
  Refresh, 
  Update, 
  Upgrade, 
  Enhancement, 
  Improvement, 
  Advancement, 
  Progress, 
  Development, 
  Growth, 
  Expansion, 
  Extension, 
  Addition, 
  Supplement, 
  Complement, 
  Completion, 
  Fulfillment, 
  Achievement, 
  Accomplishment, 
  Success, 
  Victory, 
  Win, 
  Triumph, 
  Conquest, 
  Domination, 
  Supremacy, 
  Leadership, 
  Power, 
  Influence, 
  Impact, 
  Effect, 
  Result, 
  Outcome, 
  Consequence, 
  Implication, 
  Significance, 
  Importance, 
  Relevance, 
  Value, 
  Worth, 
  Merit, 
  Benefit, 
  Advantage, 
  Profit, 
  Gain, 
  Earning, 
  Income, 
  Revenue, 
  Sales, 
  Turnover, 
  Gross, 
  Net, 
  Margin, 
  Markup, 
  Discount, 
  Rebate, 
  Refund, 
  Return, 
  Exchange, 
  Trade, 
  Commerce, 
  Industry, 
  Market, 
  Economy, 
  Finance, 
  Banking, 
  Investment, 
  Portfolio, 
  Asset, 
  Liability, 
  Equity, 
  Capital, 
  Stock, 
  Share, 
  Bond, 
  Commodity, 
  Currency, 
  Money, 
  Cash, 
  Credit, 
  Debit, 
  Loan, 
  Mortgage, 
  Interest, 
  Rate, 
  Fee, 
  Charge, 
  Cost, 
  Price, 
  Appraisal, 
  Valuation, 
  Assessment, 
  Evaluation, 
  Analysis, 
  Review, 
  Audit, 
  Inspection, 
  Examination, 
  Investigation, 
  Research, 
  Study, 
  Survey, 
  Poll, 
  Questionnaire, 
  Consultation, 
  Advisory, 
  Counseling, 
  Guidance, 
  Direction, 
  Instruction, 
  Teaching, 
  Education, 
  Learning, 
  Training, 
  Coaching, 
  Mentoring, 
  Tutoring, 
  Supervision, 
  Management, 
  Administration, 
  Governance, 
  Regulation, 
  Compliance, 
  Standard, 
  Norm, 
  Rule, 
  Law, 
  Policy, 
  Protocol, 
  Guideline, 
  Principle, 
  Ethics, 
  Morality, 
  Honesty, 
  Transparency, 
  Accountability, 
  Responsibility, 
  Duty, 
  Obligation, 
  Commitment, 
  Promise, 
  Guarantee, 
  Warranty, 
  Assurance, 
  Insurance, 
  Protection, 
  Safety, 
  Defense, 
  Guard, 
  Armor, 
  Helmet, 
  Mask, 
  Glove, 
  Boot, 
  Shoe, 
  Sock, 
  Clothing, 
  Apparel, 
  Garment, 
  Outfit, 
  Costume, 
  Uniform, 
  Dress, 
  Suit, 
  Shirt, 
  Blouse, 
  Top, 
  Bottom, 
  Pants, 
  Trousers, 
  Jeans, 
  Shorts, 
  Skirt, 
  Gown, 
  Robe, 
  Coat, 
  Jacket, 
  Blazer, 
  Sweater, 
  Cardigan, 
  Hoodie, 
  Sweatshirt, 
  TShirt, 
  Tank, 
  Camisole, 
  Bra, 
  Underwear, 
  Lingerie, 
  Pajamas, 
  Nightgown, 
  Sleepwear, 
  Loungewear, 
  Activewear, 
  Sportswear, 
  Athleisure, 
  Casual, 
  Formal, 
  Corporate, 
  Environment, 
  Setting, 
  Context, 
  Situation, 
  Circumstance, 
  Condition, 
  State, 
  Status, 
  Position, 
  Location, 
  Place, 
  Site, 
  Venue, 
  Facility, 
  Construction, 
  Sketch, 
  Draft, 
  Outline, 
  Template, 
  Model, 
  Prototype, 
  Sample, 
  Example, 
  Instance, 
  Case, 
  Scenario, 
  Background, 
  Timeline, 
  Schedule, 
  Agenda, 
  Date, 
  Appointment, 
  Occasion, 
  Ceremony, 
  Break, 
  Pause, 
  Stop, 
  End, 
  Finish, 
  Complete, 
  Done, 
  Ready, 
  Prepared, 
  Set, 
  Go, 
  Start, 
  Begin, 
  Launch, 
  Initialize, 
  Setup, 
  Configure, 
  Install, 
  Deploy, 
  Release, 
  Publish, 
  Distribute, 
  Spread, 
  Broadcast, 
  Transmit, 
  Deliver, 
  Transport, 
  Transfer, 
  Move, 
  Shift, 
  Change, 
  Modify, 
  Alter, 
  Adjust, 
  Adapt, 
  Customize, 
  Personalize, 
  Tailor, 
  Fit, 
  Match, 
  Align, 
  Sync, 
  Coordinate, 
  Organize, 
  Arrange, 
  Order, 
  Rank, 
  Rate, 
  Score, 
  Grade, 
  Mark, 
  Point, 
  Level, 
  Tier, 
  Class, 
  Category, 
  Type, 
  Kind, 
  Variety, 
  Diversity, 
  Spectrum, 
  Array, 
  Collection, 
  Set, 
  Batch, 
  Bundle, 
  Package, 
  Container, 
  Box, 
  Crate, 
  Carton, 
  Case, 
  Bag, 
  Sack, 
  Pouch, 
  Purse, 
  Handbag, 
  Backpack, 
  Suitcase, 
  Luggage
} from 'lucide-react';

const AdvancedCRMSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات نموذجية للعملاء
  const customers = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      company: 'شركة التقنية المتقدمة',
      status: 'نشط',
      value: 125000,
      lastContact: '2024-01-15',
      segment: 'VIP',
      satisfaction: 4.8
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '+966507654321',
      company: 'مؤسسة الإبداع',
      status: 'محتمل',
      value: 85000,
      lastContact: '2024-01-12',
      segment: 'متميز',
      satisfaction: 4.5
    },
    {
      id: 3,
      name: 'خالد السعد',
      email: 'khaled@example.com',
      phone: '+966509876543',
      company: 'شركة النجاح',
      status: 'نشط',
      value: 200000,
      lastContact: '2024-01-18',
      segment: 'VIP',
      satisfaction: 4.9
    },
    {
      id: 4,
      name: 'نورا الحسن',
      email: 'nora@example.com',
      phone: '+966502468135',
      company: 'مجموعة الرؤية',
      status: 'غير نشط',
      value: 45000,
      lastContact: '2024-01-05',
      segment: 'عادي',
      satisfaction: 3.8
    },
    {
      id: 5,
      name: 'محمد الزهراني',
      email: 'mohammed@example.com',
      phone: '+966508642097',
      company: 'شركة الابتكار',
      status: 'نشط',
      value: 150000,
      lastContact: '2024-01-20',
      segment: 'متميز',
      satisfaction: 4.7
    }
  ];

  // بيانات الفرص التجارية
  const opportunities = [
    {
      id: 1,
      title: 'مشروع نظام إدارة المخزون',
      customer: 'شركة التقنية المتقدمة',
      value: 300000,
      stage: 'مقترح',
      probability: 75,
      closeDate: '2024-02-28',
      owner: 'سارة أحمد'
    },
    {
      id: 2,
      title: 'تطوير موقع إلكتروني',
      customer: 'مؤسسة الإبداع',
      value: 120000,
      stage: 'تفاوض',
      probability: 60,
      closeDate: '2024-02-15',
      owner: 'محمد علي'
    },
    {
      id: 3,
      title: 'نظام إدارة علاقات العملاء',
      customer: 'شركة النجاح',
      value: 450000,
      stage: 'عرض سعر',
      probability: 85,
      closeDate: '2024-03-10',
      owner: 'أحمد خالد'
    },
    {
      id: 4,
      title: 'تطبيق الجوال',
      customer: 'مجموعة الرؤية',
      value: 180000,
      stage: 'مؤهل',
      probability: 40,
      closeDate: '2024-03-20',
      owner: 'فاطمة سعد'
    }
  ];

  // بيانات الأنشطة
  const activities = [
    {
      id: 1,
      type: 'مكالمة',
      customer: 'أحمد محمد',
      subject: 'متابعة المقترح التقني',
      date: '2024-01-20 10:30',
      status: 'مكتملة',
      notes: 'تم مناقشة التفاصيل التقنية والجدول الزمني'
    },
    {
      id: 2,
      type: 'اجتماع',
      customer: 'فاطمة علي',
      subject: 'عرض تقديمي للحلول',
      date: '2024-01-19 14:00',
      status: 'مكتملة',
      notes: 'عرض ناجح، العميل مهتم جداً'
    },
    {
      id: 3,
      type: 'بريد إلكتروني',
      customer: 'خالد السعد',
      subject: 'إرسال العقد النهائي',
      date: '2024-01-18 16:45',
      status: 'مكتملة',
      notes: 'تم إرسال العقد وننتظر الرد'
    },
    {
      id: 4,
      type: 'مهمة',
      customer: 'نورا الحسن',
      subject: 'إعداد عرض سعر مخصص',
      date: '2024-01-22 09:00',
      status: 'مجدولة',
      notes: 'يجب تحضير عرض سعر مفصل'
    }
  ];

  // بيانات التقارير والتحليلات
  const analytics = {
    totalCustomers: 1247,
    activeCustomers: 892,
    totalRevenue: 2850000,
    averageValue: 125000,
    conversionRate: 23.5,
    satisfactionScore: 4.6,
    monthlyGrowth: 15.2,
    churnRate: 3.8
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'محتمل': return 'bg-yellow-100 text-yellow-800';
      case 'غير نشط': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentColor = (segment) => {
    switch (segment) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'متميز': return 'bg-blue-100 text-blue-800';
      case 'عادي': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'مقترح': return 'bg-blue-100 text-blue-800';
      case 'تفاوض': return 'bg-yellow-100 text-yellow-800';
      case 'عرض سعر': return 'bg-orange-100 text-orange-800';
      case 'مؤهل': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityTypeIcon = (type) => {
    switch (type) {
      case 'مكالمة': return <Phone className="h-4 w-4" />;
      case 'اجتماع': return <Calendar className="h-4 w-4" />;
      case 'بريد إلكتروني': return <Mail className="h-4 w-4" />;
      case 'مهمة': return <CheckSquare className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
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
                نظام إدارة العلاقات المتقدم
              </h1>
              <p className="text-gray-600">
                إدارة شاملة ومتطورة لعلاقات العملاء والفرص التجارية
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 ml-2" />
                عميل جديد
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير البيانات
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalCustomers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +{analytics.monthlyGrowth}% هذا الشهر
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
                  <p className="text-sm font-medium text-gray-600">العملاء النشطون</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.activeCustomers.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {((analytics.activeCustomers / analytics.totalCustomers) * 100).toFixed(1)}% من الإجمالي
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold text-gray-900">{(analytics.totalRevenue / 1000000).toFixed(1)}M ريال</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +18.2% هذا الربع
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">معدل الرضا</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.satisfactionScore}/5.0</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(analytics.satisfactionScore) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="opportunities">الفرص</TabsTrigger>
            <TabsTrigger value="activities">الأنشطة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Customers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 ml-2" />
                    العملاء الجدد
                  </CardTitle>
                  <CardDescription>آخر العملاء المضافين للنظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers.slice(0, 3).map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-600">{customer.company}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 ml-2" />
                    أهم الفرص
                  </CardTitle>
                  <CardDescription>الفرص التجارية ذات القيمة العالية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {opportunities.slice(0, 3).map((opportunity) => (
                      <div key={opportunity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{opportunity.title}</p>
                          <p className="text-sm text-gray-600">{opportunity.customer}</p>
                          <p className="text-sm font-medium text-green-600">
                            {opportunity.value.toLocaleString()} ريال
                          </p>
                        </div>
                        <div className="text-left">
                          <Badge className={getStageColor(opportunity.stage)}>
                            {opportunity.stage}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {opportunity.probability}% احتمالية
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 ml-2" />
                  أداء المبيعات الشهري
                </CardTitle>
                <CardDescription>مقارنة الأداء خلال الأشهر الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
                  {[
                    { month: 'يناير', value: 85 },
                    { month: 'فبراير', value: 92 },
                    { month: 'مارس', value: 78 },
                    { month: 'أبريل', value: 95 },
                    { month: 'مايو', value: 88 },
                    { month: 'يونيو', value: 100 }
                  ].map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t-md mb-2 transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${data.value * 2}px` }}
                      ></div>
                      <p className="text-xs text-gray-600 text-center">{data.month}</p>
                      <p className="text-xs font-medium text-gray-900">{data.value}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 ml-2" />
                    قائمة العملاء
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4 font-medium text-gray-900">العميل</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الشركة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الشريحة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">القيمة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الرضا</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">آخر تواصل</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{customer.name}</p>
                                <p className="text-sm text-gray-600">{customer.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-900">{customer.company}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getSegmentColor(customer.segment)}>
                              {customer.segment}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {customer.value.toLocaleString()} ريال
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900 ml-1">
                                {customer.satisfaction}
                              </span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(customer.satisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {customer.lastContact}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 ml-2" />
                    الفرص التجارية
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 ml-2" />
                    فرصة جديدة
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {opportunity.title}
                            </h3>
                            <p className="text-sm text-gray-600">{opportunity.customer}</p>
                          </div>
                          <Badge className={getStageColor(opportunity.stage)}>
                            {opportunity.stage}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">القيمة:</span>
                            <span className="font-medium text-green-600">
                              {opportunity.value.toLocaleString()} ريال
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">الاحتمالية:</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${opportunity.probability}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{opportunity.probability}%</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">تاريخ الإغلاق:</span>
                            <span className="text-sm text-gray-900">{opportunity.closeDate}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">المسؤول:</span>
                            <span className="text-sm text-gray-900">{opportunity.owner}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 ml-2" />
                    الأنشطة والمهام
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 ml-2" />
                    نشاط جديد
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 space-x-reverse p-4 border rounded-lg hover:bg-gray-50">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {getActivityTypeIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{activity.subject}</h4>
                          <Badge variant={activity.status === 'مكتملة' ? 'default' : 'secondary'}>
                            {activity.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <User className="h-4 w-4 ml-1" />
                          <span className="ml-3">{activity.customer}</span>
                          <Clock className="h-4 w-4 mr-3 ml-1" />
                          <span>{activity.date}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700">{activity.notes}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
              {/* Customer Segments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 ml-2" />
                    توزيع شرائح العملاء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { segment: 'VIP', count: 156, percentage: 35, color: 'bg-purple-500' },
                      { segment: 'متميز', count: 234, percentage: 42, color: 'bg-blue-500' },
                      { segment: 'عادي', count: 178, percentage: 23, color: 'bg-gray-500' }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${data.color} ml-3`}></div>
                          <span className="font-medium text-gray-900">{data.segment}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 ml-3">{data.count} عميل</span>
                          <span className="font-medium text-gray-900">{data.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 ml-2" />
                    قمع التحويل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { stage: 'عملاء محتملون', count: 1250, percentage: 100 },
                      { stage: 'مؤهلون', count: 875, percentage: 70 },
                      { stage: 'مقترحات', count: 425, percentage: 34 },
                      { stage: 'تفاوض', count: 185, percentage: 15 },
                      { stage: 'إغلاق', count: 95, percentage: 8 }
                    ].map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{data.stage}</span>
                          <span className="text-sm text-gray-600">{data.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 ml-2" />
                  مؤشرات الأداء الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {analytics.conversionRate}%
                    </div>
                    <div className="text-sm text-gray-600">معدل التحويل</div>
                    <div className="text-xs text-green-600 mt-1">+2.3% من الشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {(analytics.averageValue / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">متوسط قيمة العميل</div>
                    <div className="text-xs text-green-600 mt-1">+5.7% من الشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      {analytics.churnRate}%
                    </div>
                    <div className="text-sm text-gray-600">معدل فقدان العملاء</div>
                    <div className="text-xs text-red-600 mt-1">-1.2% من الشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {analytics.satisfactionScore}
                    </div>
                    <div className="text-sm text-gray-600">مؤشر رضا العملاء</div>
                    <div className="text-xs text-green-600 mt-1">+0.3 من الشهر الماضي</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedCRMSystem;

