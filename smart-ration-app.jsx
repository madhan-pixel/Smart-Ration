import React, { useState, useEffect, useRef } from "react";
import {
  Mic, MicOff, Home, Package, Users, Ticket, MessageSquare, User as UserIcon,
  ChevronRight, ChevronDown, CheckCircle2, AlertTriangle, ShieldCheck, BarChart3, MapPin,
  Bell, LogOut, ArrowLeft, QrCode, Fingerprint, Volume2, Globe, Search, X, Clock,
  TrendingUp, Store, Camera, RefreshCw, FileText, Download, Settings, History,
  PlusCircle, MinusCircle, Sparkles, AlertOctagon, ClipboardCheck, Navigation
} from "lucide-react";

/* ---------------------------------------------------------
   DESIGN TOKENS — unchanged from the original build.
   ink      #16302B  (deep ledger ink, near-black green)
   paper    #F3EFE3  (aged ledger paper)
   seal     #0E5C4A  (government seal green, primary)
   marigold #E2A125  (marigold/turmeric — India, warmth, alerts)
   stamp    #9A2D2D  (rubber-stamp red — verified/receipt/risk)
--------------------------------------------------------- */
const T = {
  ink: "#16302B", paper: "#F3EFE3", paperDark: "#E8E1CE",
  seal: "#0E5C4A", sealDark: "#0A4237", marigold: "#E2A125", stamp: "#9A2D2D",
  wheat: "#C8B384", muted: "#16302B66",
};

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
`;

/* =========================================================
   CENTRALIZED TRANSLATIONS
========================================================= */
const STR = {
  en: {
    welcome: "Smart Ration AI", tagline: "Public Distribution System",
    login: "Login", register: "New here? Register", aadhaar: "Aadhaar number",
    password: "Password", getStarted: "Aadhaar / QR verification",
    home: "Home", stock: "Stock", queue: "Queue & Token", complaint: "Complaint",
    profile: "Profile", voiceAssist: "Voice Assistant", tapToSpeak: "Tap to speak",
    myToken: "My Token", getToken: "Get my token", liveQueue: "Live queue at your shop",
    estWait: "Est. wait", stockTitle: "Stock availability", entitlement: "Monthly entitlement",
    fileComplaint: "File a complaint", describeIssue: "Describe your issue",
    submit: "Submit complaint", speakComplaint: "Speak instead",
    govtDash: "Admin Dashboard", fraudAlerts: "Anomaly alerts", shopsMonitored: "Shops monitored",
    complaintsOpen: "Open complaints", switchRole: "Switch view",
    citizen: "Citizen", employee: "Shop Employee", officer: "Govt. Officer",
    card: "Ration Card", transactions: "Transactions", notifications: "Notifications",
    analytics: "Smart Analytics", staffDash: "Staff Dashboard",
    cardNumber: "Card number", cardType: "Card type", familyMembers: "Family members",
    remaining: "Remaining this month", verified: "Digitally verified", viewHistory: "View past months",
    nearbyShops: "Nearby ration shops", distance: "away", open: "Open", closed: "Closed",
    selectShop: "Select shop", selectSlot: "Preferred time slot", confirmToken: "Confirm token",
    cancelToken: "Cancel token", pending: "Pending", confirmed: "Confirmed", ready: "Ready",
    collected: "Collected", expired: "Expired", tokenHistory: "Token history",
    turnApproaching: "Your turn is approaching — please be ready",
    nowServing: "Now serving", yourPosition: "Your position",
    allocated: "Allocated", distributed: "Distributed", lowStock: "Low stock", outOfStock: "Out of stock",
    monthlyTrend: "Monthly usage trend", filter: "Filter", search: "Search transactions",
    all: "All", viewReceipt: "View receipt", receipt: "Digital Receipt", downloadReceipt: "Download",
    prepared: "Receipt ready ✓", txnId: "Transaction ID", items: "Items", noResults: "No matching records",
    markRead: "Mark all read", noNotifications: "You're all caught up",
    prefLanguage: "Preferred language", prefShop: "Preferred shop", address: "Address",
    notifSettings: "Notification settings", security: "Security", logout: "Log out",
    totalCardHolders: "Card holders", activeUsers: "Active users", totalShops: "Total shops",
    todayTxns: "Today's transactions", pendingTokens: "Pending tokens", lowStockItems: "Low-stock items",
    riskLevel: "Risk", status: "Status", date: "Date", shop: "Shop", smartAnalyticsNote:
      "Based on sample historical data for demonstration — connect a live ML API for real predictions.",
    consumptionAnalysis: "Monthly consumption analysis", demandPrediction: "Next-month demand prediction",
    confidence: "confidence", shopComparison: "Shop-wise demand comparison",
    anomalyPrediction: "Predicted low-stock risk", todaysTokens: "Today's tokens", currentQueue: "Current queue",
    scanQr: "Scan ration card QR", scanning: "Scanning…", cardDetails: "Card details found",
    confirmDistribution: "Confirm distribution", recordUpdate: "Update stock", callNext: "Call next",
    markCollected: "Mark collected", reportIssue: "Report stock issue", high: "High", medium: "Medium", low: "Low",
    waiting: "Waiting", called: "Called", served: "Served", yes: "Yes", cancel: "Cancel",
    confirmCancelToken: "Cancel your active token? You'll need to get a new one.",
  },
  ta: {
    welcome: "ஸ்மார்ட் ரேஷன் AI", tagline: "பொது விநியோக முறைமை",
    login: "உள்நுழைய", register: "புதியவரா? பதிவு செய்ய", aadhaar: "ஆதார் எண்",
    password: "கடவுச்சொல்", getStarted: "ஆதார் / QR சரிபார்ப்பு",
    home: "முகப்பு", stock: "இருப்பு", queue: "வரிசை & டோக்கன்", complaint: "புகார்",
    profile: "சுயவிவரம்", voiceAssist: "குரல் உதவியாளர்", tapToSpeak: "பேச தட்டவும்",
    myToken: "என் டோக்கன்", getToken: "டோக்கன் பெறவும்", liveQueue: "உங்கள் கடையில் நேரடி வரிசை",
    estWait: "தோராயமான காத்திருப்பு", stockTitle: "இருப்பு நிலவரம்", entitlement: "மாதாந்திர பங்கு",
    fileComplaint: "புகார் பதிவு செய்யவும்", describeIssue: "உங்கள் பிரச்சனையை விவரிக்கவும்",
    submit: "புகார் சமர்ப்பிக்கவும்", speakComplaint: "பேசி சொல்லவும்",
    govtDash: "நிர்வாக டாஷ்போர்டு", fraudAlerts: "முரண்பாடு எச்சரிக்கைகள்", shopsMonitored: "கண்காணிக்கப்படும் கடைகள்",
    complaintsOpen: "நிலுவையிலுள்ள புகார்கள்", switchRole: "பார்வையை மாற்று",
    citizen: "குடிமகன்", employee: "கடை ஊழியர்", officer: "அரசு அதிகாரி",
    card: "ரேஷன் கார்டு", transactions: "பரிவர்த்தனைகள்", notifications: "அறிவிப்புகள்",
    analytics: "ஸ்மார்ட் பகுப்பாய்வு", staffDash: "ஊழியர் டாஷ்போர்டு",
    cardNumber: "கார்டு எண்", cardType: "கார்டு வகை", familyMembers: "குடும்ப உறுப்பினர்கள்",
    remaining: "இந்த மாதம் மீதமுள்ளது", verified: "டிஜிட்டல் சரிபார்க்கப்பட்டது", viewHistory: "முந்தைய மாதங்களை பார்க்க",
    nearbyShops: "அருகிலுள்ள ரேஷன் கடைகள்", distance: "தொலைவில்", open: "திறந்துள்ளது", closed: "மூடப்பட்டது",
    selectShop: "கடையை தேர்ந்தெடுக்கவும்", selectSlot: "விருப்ப நேரம்", confirmToken: "டோக்கனை உறுதிப்படுத்தவும்",
    cancelToken: "டோக்கனை ரத்து செய்", pending: "நிலுவையில்", confirmed: "உறுதி செய்யப்பட்டது", ready: "தயார்",
    collected: "பெறப்பட்டது", expired: "காலாவதியானது", tokenHistory: "டோக்கன் வரலாறு",
    turnApproaching: "உங்கள் முறை நெருங்குகிறது — தயாராக இருங்கள்",
    nowServing: "இப்போது சேவை", yourPosition: "உங்கள் இடம்",
    allocated: "ஒதுக்கப்பட்டது", distributed: "விநியோகிக்கப்பட்டது", lowStock: "குறைந்த இருப்பு", outOfStock: "இருப்பு இல்லை",
    monthlyTrend: "மாதாந்திர பயன்பாடு போக்கு", filter: "வடிகட்டி", search: "பரிவர்த்தனைகளை தேடு",
    all: "அனைத்தும்", viewReceipt: "ரசீதை பார்க்க", receipt: "டிஜிட்டல் ரசீது", downloadReceipt: "பதிவிறக்கு",
    prepared: "ரசீது தயார் ✓", txnId: "பரிவர்த்தனை எண்", items: "பொருட்கள்", noResults: "பொருந்தும் பதிவுகள் இல்லை",
    markRead: "அனைத்தும் படிக்கப்பட்டதாக குறி", noNotifications: "புதிய அறிவிப்புகள் இல்லை",
    prefLanguage: "விருப்ப மொழி", prefShop: "விருப்ப கடை", address: "முகவரி",
    notifSettings: "அறிவிப்பு அமைப்புகள்", security: "பாதுகாப்பு", logout: "வெளியேறு",
    totalCardHolders: "கார்டு வைத்திருப்பவர்கள்", activeUsers: "செயலில் உள்ள பயனர்கள்", totalShops: "மொத்த கடைகள்",
    todayTxns: "இன்றைய பரிவர்த்தனைகள்", pendingTokens: "நிலுவை டோக்கன்கள்", lowStockItems: "குறைந்த இருப்பு பொருட்கள்",
    riskLevel: "ஆபத்து", status: "நிலை", date: "தேதி", shop: "கடை", smartAnalyticsNote:
      "விளக்கத்திற்கான மாதிரி தரவு — நேரடி கணிப்புகளுக்கு ML API இணைக்கவும்.",
    consumptionAnalysis: "மாதாந்திர நுகர்வு பகுப்பாய்வு", demandPrediction: "அடுத்த மாத தேவை கணிப்பு",
    confidence: "நம்பகத்தன்மை", shopComparison: "கடை வாரியான தேவை ஒப்பீடு",
    anomalyPrediction: "கணிக்கப்பட்ட குறைந்த இருப்பு ஆபத்து", todaysTokens: "இன்றைய டோக்கன்கள்", currentQueue: "தற்போதைய வரிசை",
    scanQr: "ரேஷன் கார்டு QR ஸ்கேன் செய்", scanning: "ஸ்கேன் செய்கிறது…", cardDetails: "கார்டு விவரங்கள் கிடைத்தன",
    confirmDistribution: "விநியோகத்தை உறுதிப்படுத்தவும்", recordUpdate: "இருப்பை புதுப்பிக்கவும்", callNext: "அடுத்ததை அழை",
    markCollected: "பெறப்பட்டதாக குறி", reportIssue: "இருப்பு பிரச்சனையை தெரிவிக்க", high: "அதிகம்", medium: "நடுத்தரம்", low: "குறைவு",
    waiting: "காத்திருக்கிறது", called: "அழைக்கப்பட்டது", served: "சேவை செய்யப்பட்டது", yes: "ஆம்", cancel: "ரத்து செய்",
    confirmCancelToken: "உங்கள் செயலில் உள்ள டோக்கனை ரத்து செய்யவா? புதிதாக பெற வேண்டும்.",
  },
};

/* =========================================================
   MOCK DATA — structured so a real backend/API can replace
   each block directly (see inline notes).
========================================================= */
const RATION_CARD = {
  number: "TN-04-1182937", type: "PHH", verified: true,
  members: [
    { name: { en: "Selvi Murugan", ta: "செல்வி முருகன்" }, age: 52, relation: { en: "Head", ta: "தலைவர்" } },
    { name: { en: "Madhan S", ta: "மதன் S" }, age: 24, relation: { en: "Son", ta: "மகன்" } },
    { name: { en: "Kavya M", ta: "காவ்யா M" }, age: 20, relation: { en: "Daughter", ta: "மகள்" } },
  ],
};

const STOCK = [
  { id: "rice", name: { en: "Rice", ta: "அரிசி" }, allocated: 500, distributed: 160, unit: "kg",
    history: [420, 460, 480, 440, 470, 500] },
  { id: "wheat", name: { en: "Wheat", ta: "கோதுமை" }, allocated: 100, distributed: 82, unit: "kg",
    history: [90, 95, 88, 92, 97, 100] },
  { id: "sugar", name: { en: "Sugar", ta: "சர்க்கரை" }, allocated: 80, distributed: 18, unit: "kg",
    history: [70, 75, 72, 78, 76, 80] },
  { id: "kerosene", name: { en: "Kerosene", ta: "மண்ணெண்ணெய்" }, allocated: 40, distributed: 31, unit: "litre",
    history: [38, 36, 40, 35, 39, 40] },
  { id: "dal", name: { en: "Toor Dal", ta: "துவரம் பருப்பு" }, allocated: 90, distributed: 5, unit: "kg",
    history: [80, 84, 82, 88, 86, 90] },
];

const ENTITLEMENT = { rice: 25, wheat: 10, sugar: 2, kerosene: 4, dal: 3 };
const USED_THIS_MONTH = { rice: 10, wheat: 10, sugar: 0, kerosene: 2, dal: 0 };

const SHOPS = [
  { id: 1, name: "Govt. Fair Price Shop #114", address: "Gandhi Nagar, Erode", distance: 0.6, status: "open", queue: 6, wait: 18 },
  { id: 2, name: "Fair Price Shop #027", address: "Periyar Street, Erode", distance: 1.4, status: "open", queue: 2, wait: 6 },
  { id: 3, name: "Fair Price Shop #202", address: "Anna Nagar, Erode", distance: 2.1, status: "closed", queue: 0, wait: 0 },
];

const MOCK_QUEUE = [
  { token: 41, status: "SERVED" }, { token: 42, status: "SERVED" },
  { token: 43, status: "CALLED" }, { token: 44, status: "WAITING" },
  { token: 45, status: "WAITING" }, { token: 46, status: "WAITING" },
];

const TOKEN_HISTORY = [
  { id: "TK-1082", shop: "Shop #114", date: "2026-09-02", status: "COLLECTED" },
  { id: "TK-1061", shop: "Shop #114", date: "2026-08-03", status: "COLLECTED" },
  { id: "TK-1030", shop: "Shop #114", date: "2026-07-05", status: "EXPIRED" },
];

const TRANSACTIONS = [
  { id: "TXN-88213", date: "2026-09-02", shop: "Shop #114", tokenNumber: 38, status: "VERIFIED",
    items: [{ name: { en: "Rice", ta: "அரிசி" }, qty: 10, unit: "kg" }, { name: { en: "Wheat", ta: "கோதுமை" }, qty: 10, unit: "kg" }] },
  { id: "TXN-77410", date: "2026-08-03", shop: "Shop #114", tokenNumber: 22, status: "VERIFIED",
    items: [{ name: { en: "Rice", ta: "அரிசி" }, qty: 25, unit: "kg" }, { name: { en: "Kerosene", ta: "மண்ணெண்ணெய்" }, qty: 4, unit: "litre" }] },
  { id: "TXN-65902", date: "2026-07-05", shop: "Shop #027", tokenNumber: 9, status: "FLAGGED",
    items: [{ name: { en: "Sugar", ta: "சர்க்கரை" }, qty: 2, unit: "kg" }] },
];

const ANOMALIES = [
  { id: "ANM-301", shop: "Shop #114 — Erode", txn: "TXN-88301", date: "2026-09-28 14:12", reason: "Duplicate scan within 4 hrs", score: 0.81, status: "PENDING" },
  { id: "ANM-298", shop: "Shop #027 — Salem", txn: "TXN-87990", date: "2026-09-27 10:05", reason: "Quantity exceeds entitlement", score: 0.63, status: "PENDING" },
  { id: "ANM-290", shop: "Shop #202 — Coimbatore", txn: "TXN-87820", date: "2026-09-25 09:40", reason: "Unusual withdrawal pattern", score: 0.44, status: "REVIEWED" },
];

const CONSUMPTION_TREND = [210, 230, 245, 238, 260, 275];
const SHOP_DEMAND = [
  { name: "#114", value: 275 }, { name: "#027", value: 190 }, { name: "#202", value: 140 }, { name: "#305", value: 205 },
];

const NOTIFICATIONS_SEED = [
  { id: 1, type: "token", title: { en: "Token confirmed", ta: "டோக்கன் உறுதி" }, msg: { en: "Your token #47 is confirmed for today 4:00–4:30 PM.", ta: "உங்கள் டோக்கன் #47 இன்று 4:00–4:30 PM-க்கு உறுதி செய்யப்பட்டது." }, time: "2h ago", read: false },
  { id: 2, type: "stock", title: { en: "Low stock alert", ta: "குறைந்த இருப்பு எச்சரிக்கை" }, msg: { en: "Wheat is running low at Shop #114.", ta: "ஷாப் #114-ல் கோதுமை குறைவாக உள்ளது." }, time: "5h ago", read: false },
  { id: 3, type: "announce", title: { en: "Monthly allocation updated", ta: "மாதாந்திர ஒதுக்கீடு புதுப்பிக்கப்பட்டது" }, msg: { en: "October entitlements have been credited to your card.", ta: "அக்டோபர் பங்கு உங்கள் கார்டில் சேர்க்கப்பட்டது." }, time: "1d ago", read: true },
];

/* =========================================================
   SMALL REUSABLE PRIMITIVES
========================================================= */
function Stamp({ label, tone = T.seal }) {
  return (
    <div className="inline-flex items-center justify-center rounded-full border-2 px-3 py-1 rotate-[-6deg] select-none"
      style={{ borderColor: tone, color: tone, fontFamily: "'IBM Plex Mono', monospace" }}>
      <span className="text-[10px] font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
}

function Badge({ text, tone = T.seal }) {
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
      style={{ background: `${tone}1A`, color: tone }}>
      {text}
    </span>
  );
}

function TicketStub({ number, wait, lang }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 260 }}>
      <div className="rounded-2xl px-6 py-7 text-center relative overflow-hidden" style={{ background: T.ink, color: T.paper }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 7px, #fff 7px, #fff 8px)",
        }} />
        <p className="text-[11px] tracking-[0.3em] uppercase opacity-70 relative">
          {lang === "ta" ? "டோக்கன் எண்" : "Token Number"}
        </p>
        <p className="relative" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 64, lineHeight: 1, fontWeight: 600, marginTop: 8 }}>
          {number}
        </p>
        <p className="relative mt-3 text-sm opacity-80">
          {lang === "ta" ? "தோராயமான காத்திருப்பு" : "Est. wait"}: {wait} min
        </p>
      </div>
      <div className="flex justify-between px-2" style={{ marginTop: -1 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ background: T.paper, marginTop: -8 }} />
        ))}
      </div>
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-5 pb-4">
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1" style={{ color: T.ink }}>
          <ArrowLeft size={22} />
        </button>
      )}
      <h1 className="text-xl font-semibold flex-1" style={{ color: T.ink, fontFamily: "'Fraunces', serif" }}>{title}</h1>
      {right}
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3 opacity-60">
      <Icon size={32} color={T.ink} />
      <p className="text-sm" style={{ color: T.ink }}>{text}</p>
    </div>
  );
}

function Skeleton({ h = 56 }) {
  return <div className="rounded-xl animate-pulse" style={{ height: h, background: T.paperDark }} />;
}

function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, tone = T.stamp }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: "#00000055" }}>
      <div className="w-full rounded-t-3xl p-6" style={{ background: "#fff" }}>
        <p className="text-lg font-semibold mb-2" style={{ color: T.ink, fontFamily: "'Fraunces', serif" }}>{title}</p>
        <p className="text-sm mb-5 opacity-75" style={{ color: T.ink }}>{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 font-semibold" style={{ border: `2px solid ${T.ink}30`, color: T.ink }}>
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-xl py-3 font-semibold" style={{ background: tone, color: "#fff" }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniBarChart({ data, labels, color = T.seal, height = 70 }) {
  const max = Math.max(...data, 1);
  const w = data.length * 30;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${height + 16}`} preserveAspectRatio="xMidYMid meet">
      {data.map((v, i) => {
        const h = (v / max) * height;
        return (
          <g key={i}>
            <rect x={i * 30 + 5} y={height - h} width={18} height={h} rx={4} fill={color} opacity={0.88} />
            {labels && (
              <text x={i * 30 + 14} y={height + 13} fontSize="8" textAnchor="middle" fill={T.ink} opacity={0.6}>
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function MiniLineChart({ data, color = T.stamp, height = 64, width = 230 }) {
  const max = Math.max(...data, 1), min = Math.min(...data, 0);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 10) + 5;
    const y = height - ((v - min) / (max - min || 1)) * (height - 10) - 5;
    return [x, y];
  });
  const points = pts.map((p) => p.join(",")).join(" ");
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={color} />)}
    </svg>
  );
}

function BigButton({ icon: Icon, label, onClick, tone = T.seal, subtle = false, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform active:scale-[0.98] disabled:opacity-40"
      style={{ background: subtle ? "transparent" : tone, border: subtle ? `2px solid ${tone}` : "none", color: subtle ? tone : T.paper }}>
      <Icon size={26} strokeWidth={2} />
      <span className="text-lg font-semibold flex-1 text-left">{label}</span>
      <ChevronRight size={20} />
    </button>
  );
}

/* =========================================================
   ROOT APP
========================================================= */
export default function SmartRationApp() {
  const [screen, setScreen] = useState("splash");
  const [lang, setLang] = useState("ta");
  const [role, setRole] = useState("citizen");
  const [tab, setTab] = useState("home");
  const s = STR[lang];

  // Queue / token state
  const [myToken, setMyToken] = useState(null); // {number, shopName, slot, status}
  const [tokenHistory, setTokenHistory] = useState(TOKEN_HISTORY);
  const [currentServing, setCurrentServing] = useState(43);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Voice
  const [listening, setListening] = useState(false);
  const [assistantHeard, setAssistantHeard] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const timerRef = useRef(null);

  // Complaint
  const [complaintText, setComplaintText] = useState("");
  const [complaintSent, setComplaintSent] = useState(false);

  // Transactions / receipts
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Notifications
  const [notifications, setNotifications] = useState(NOTIFICATIONS_SEED);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Staff-side mutable copies
  const [staffQueue, setStaffQueue] = useState(MOCK_QUEUE);
  const [staffStock, setStaffStock] = useState(STOCK);
  const [qrState, setQrState] = useState("idle"); // idle | scanning | found | confirmed

  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("language"), 1600);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Live queue auto-refresh simulation
  useEffect(() => {
    if (tab !== "queue" || !myToken || myToken.status === "COLLECTED" || myToken.status === "EXPIRED") return;
    const iv = setInterval(() => {
      setCurrentServing((prev) => {
        const next = Math.min(prev + 1, myToken.number);
        if (next === myToken.number) setMyToken((t) => (t ? { ...t, status: "READY" } : t));
        return next;
      });
    }, 4000);
    return () => clearInterval(iv);
  }, [tab, myToken]);

  const simulateVoice = (setter, samples, after) => {
    setListening(true);
    timerRef.current = setTimeout(() => {
      const text = samples[Math.floor(Math.random() * samples.length)];
      setter(text);
      setListening(false);
      if (after) after(text);
    }, 1300);
  };

  const issueToken = (shopName, slot) => {
    setMyToken({ number: 47 + Math.floor(Math.random() * 3), shopName, slot, status: "PENDING" });
    setTimeout(() => setMyToken((t) => (t ? { ...t, status: "CONFIRMED" } : t)), 1200);
  };

  const cancelToken = () => {
    setConfirmDialog({
      title: s.cancelToken, message: s.confirmCancelToken,
      onConfirm: () => {
        setTokenHistory((h) => [{ id: `TK-${Math.floor(Math.random() * 9000 + 1000)}`, shop: myToken.shopName, date: "2026-10-03", status: "EXPIRED" }, ...h]);
        setMyToken(null);
        setConfirmDialog(null);
      },
    });
  };

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));

  /* ---------------- SPLASH ---------------- */
  if (screen === "splash") {
    return (
      <Shell>
        <div className="h-full flex flex-col items-center justify-center gap-4" style={{ background: T.seal }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: T.paper }}>
            <Package size={40} color={T.seal} />
          </div>
          <p className="text-2xl font-semibold" style={{ color: T.paper, fontFamily: "'Fraunces', serif" }}>Smart Ration AI</p>
          <p className="text-sm opacity-80" style={{ color: T.paper }}>ஸ்மார்ட் ரேஷன் AI</p>
        </div>
      </Shell>
    );
  }

  /* ---------------- LANGUAGE ---------------- */
  if (screen === "language") {
    return (
      <Shell>
        <div className="h-full flex flex-col justify-center px-6 gap-6" style={{ background: T.paper }}>
          <div className="text-center mb-2">
            <Globe size={30} color={T.seal} className="mx-auto mb-2" />
            <p className="text-lg font-medium" style={{ color: T.ink }}>மொழியை தேர்ந்தெடுக்கவும்</p>
            <p className="text-sm" style={{ color: T.ink, opacity: 0.6 }}>Select your language</p>
          </div>
          {[{ code: "ta", label: "தமிழ்" }, { code: "en", label: "English" }].map((l) => (
            <button key={l.code} onClick={() => { setLang(l.code); setScreen("login"); }}
              className="w-full py-5 rounded-2xl text-xl font-semibold"
              style={{ border: `2px solid ${T.seal}`, color: T.seal, fontFamily: "'Fraunces', serif" }}>
              {l.label}
            </button>
          ))}
        </div>
      </Shell>
    );
  }

  /* ---------------- LOGIN ---------------- */
  if (screen === "login") {
    return (
      <Shell>
        <div className="h-full flex flex-col px-6 pt-10" style={{ background: T.paper }}>
          <p className="text-2xl font-semibold mb-1" style={{ color: T.ink, fontFamily: "'Fraunces', serif" }}>{s.welcome}</p>
          <p className="text-sm mb-8" style={{ color: T.ink, opacity: 0.65 }}>{s.tagline}</p>

          <label className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: T.ink, opacity: 0.6 }}>{s.aadhaar}</label>
          <input placeholder="XXXX XXXX XXXX" className="rounded-xl px-4 py-3 mb-4 outline-none" style={{ background: T.paperDark, color: T.ink }} />
          <label className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: T.ink, opacity: 0.6 }}>{s.password}</label>
          <input type="password" placeholder="••••••••" className="rounded-xl px-4 py-3 mb-3 outline-none" style={{ background: T.paperDark, color: T.ink }} />

          <div className="flex items-center gap-2 mb-6 opacity-70">
            <QrCode size={16} color={T.ink} /><Fingerprint size={16} color={T.ink} />
            <span className="text-xs" style={{ color: T.ink }}>{s.getStarted}</span>
          </div>

          <button onClick={() => setScreen("app")} className="rounded-2xl py-4 text-lg font-semibold mb-3" style={{ background: T.seal, color: T.paper }}>
            {s.login}
          </button>
          <button className="text-sm font-medium" style={{ color: T.stamp }}>{s.register}</button>

          <div className="mt-auto mb-6 flex justify-center gap-2">
            {["citizen", "employee", "officer"].map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide"
                style={{ background: role === r ? T.marigold : "transparent", border: `1px solid ${T.marigold}`, color: role === r ? T.ink : T.marigold }}>
                {s[r]}
              </button>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------------- MAIN APP ---------------- */
  const navItems = role === "officer"
    ? [{ id: "home", icon: Home, label: s.home }, { id: "officer", icon: BarChart3, label: s.govtDash },
       { id: "analytics", icon: Sparkles, label: s.analytics }, { id: "complaint", icon: MessageSquare, label: s.complaint }]
    : role === "employee"
    ? [{ id: "home", icon: Home, label: s.home }, { id: "staff", icon: ClipboardCheck, label: s.staffDash },
       { id: "stock", icon: Package, label: s.stock }, { id: "complaint", icon: MessageSquare, label: s.complaint }]
    : [{ id: "home", icon: Home, label: s.home }, { id: "stock", icon: Package, label: s.stock },
       { id: "queue", icon: Ticket, label: s.queue }, { id: "complaint", icon: MessageSquare, label: s.complaint }];

  const fullScreenTabs = ["voice"];

  return (
    <Shell>
      <div className="h-full flex flex-col relative" style={{ background: T.paper }}>
        <style>{`input::placeholder,textarea::placeholder{color:${T.ink}88}`}</style>
        <div className="flex-1 overflow-y-auto">
          {tab === "home" && (
            <HomeTab s={s} lang={lang} role={role} setTab={setTab} setScreen={setScreen}
              unreadCount={unreadCount} onVoice={() => setTab("voice")} />
          )}
          {tab === "stock" && <StockTab s={s} lang={lang} setTab={setTab} />}
          {tab === "queue" && (
            <QueueTab s={s} lang={lang} myToken={myToken} issueToken={issueToken} cancelToken={cancelToken}
              currentServing={currentServing} tokenHistory={tokenHistory} setTab={setTab} />
          )}
          {tab === "complaint" && (
            <ComplaintTab s={s} lang={lang} setTab={setTab} text={complaintText} setText={setComplaintText}
              listening={listening}
              onSpeak={() => simulateVoice(setComplaintText,
                lang === "ta" ? ["கடையில் அரிசி குறைவாக உள்ளது", "ஊழியர் நேரம் தவறி கடையை திறக்கிறார்"]
                              : ["Shop is short on rice this week", "Employee opens the shop late every day"])}
              sent={complaintSent} onSubmit={() => setComplaintSent(true)} />
          )}
          {tab === "voice" && (
            <VoiceTab s={s} lang={lang} setTab={setTab} listening={listening} heard={assistantHeard} reply={assistantReply}
              onTap={() => simulateVoice(setAssistantHeard,
                lang === "ta" ? ["அரிசி எவ்வளவு மீதம்", "என் அடுத்த டோக்கன் எப்போது", "அருகிலுள்ள கடை எது"]
                              : ["How much rice is remaining", "When is my next token", "Which ration shop is nearby"],
                (text) => {
                  const t = text.toLowerCase();
                  let reply = lang === "ta" ? "புரியல, மீண்டும் சொல்லுங்க" : "Sorry, I didn't catch that — try again";
                  if (t.includes("rice") || t.includes("அரிசி")) reply = lang === "ta" ? "15 கிலோ அரிசி மீதம் உள்ளது" : "You have 15 kg of rice remaining this month";
                  else if (t.includes("token") || t.includes("டோக்கன்")) reply = lang === "ta" ? "உங்கள் அடுத்த டோக்கன் நாளை 10 AM" : "Your next token is tomorrow at 10 AM";
                  else if (t.includes("shop") || t.includes("கடை")) reply = lang === "ta" ? "அருகிலுள்ள கடை 0.6 கிமீ தொலைவில்" : "Nearest shop is 0.6 km away and open now";
                  setAssistantReply(reply);
                })} />
          )}
          {tab === "officer" && <AdminTab s={s} setTab={setTab} />}
          {tab === "analytics" && <AnalyticsTab s={s} setTab={setTab} />}
          {tab === "staff" && (
            <StaffTab s={s} lang={lang} setTab={setTab} queue={staffQueue} setQueue={setStaffQueue}
              stock={staffStock} setStock={setStaffStock} qrState={qrState} setQrState={setQrState} />
          )}
          {tab === "card" && <CardTab s={s} lang={lang} setTab={setTab} />}
          {tab === "transactions" && (
            <TransactionsTab s={s} lang={lang} setTab={setTab} selected={selectedTxn} setSelected={setSelectedTxn} />
          )}
          {tab === "notifications" && (
            <NotificationsTab s={s} lang={lang} setTab={setTab} notifications={notifications}
              setNotifications={setNotifications} onMarkAll={markAllRead} />
          )}
          {tab === "profile" && <ProfileTab s={s} lang={lang} setLang={setLang} setTab={setTab} setScreen={setScreen} role={role} />}
        </div>

        {!fullScreenTabs.includes(tab) && <BottomNav items={navItems} tab={tab} setTab={setTab} />}

        <ConfirmDialog
          open={!!confirmDialog}
          title={confirmDialog?.title} message={confirmDialog?.message}
          confirmLabel={s.yes} cancelLabel={s.cancel}
          onConfirm={confirmDialog?.onConfirm} onCancel={() => setConfirmDialog(null)}
        />
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="w-full flex items-center justify-center py-6" style={{ minHeight: 700 }}>
      <style>{FONT_IMPORT}</style>
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{ width: 380, height: 720, border: `8px solid ${T.ink}`, fontFamily: "'Public Sans', sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */
function HomeTab({ s, lang, role, setTab, setScreen, unreadCount, onVoice }) {
  const tiles = role === "officer"
    ? [{ icon: BarChart3, label: s.govtDash, tab: "officer", tone: T.stamp },
       { icon: Sparkles, label: s.analytics, tab: "analytics" },
       { icon: Bell, label: s.notifications, tab: "notifications" },
       { icon: UserIcon, label: s.profile, tab: "profile" }]
    : role === "employee"
    ? [{ icon: ClipboardCheck, label: s.staffDash, tab: "staff", tone: T.stamp },
       { icon: FileText, label: s.transactions, tab: "transactions" },
       { icon: Bell, label: s.notifications, tab: "notifications" },
       { icon: UserIcon, label: s.profile, tab: "profile" }]
    : [{ icon: QrCode, label: s.card, tab: "card" },
       { icon: FileText, label: s.transactions, tab: "transactions" },
       { icon: Bell, label: s.notifications, tab: "notifications" },
       { icon: UserIcon, label: s.profile, tab: "profile" }];

  return (
    <div className="px-5 pt-6 pb-4">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-60" style={{ color: T.ink }}>{s[role]}</p>
          <p className="text-2xl font-semibold" style={{ color: T.ink, fontFamily: "'Fraunces', serif" }}>
            {lang === "ta" ? "வணக்கம்!" : "Welcome!"}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onVoice} className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: T.marigold }}>
            <Mic size={20} color={T.ink} />
          </button>
          <button onClick={() => setTab("notifications")} className="relative w-11 h-11 rounded-full flex items-center justify-center" style={{ border: `2px solid ${T.ink}30` }}>
            <Bell size={18} color={T.ink} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center" style={{ background: T.stamp, color: "#fff" }}>
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={() => setScreen("login")} className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: `2px solid ${T.ink}30` }}>
            <LogOut size={18} color={T.ink} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl p-4 mb-5 flex items-center gap-3" style={{ background: T.sealDark }}>
        <ShieldCheck size={22} color={T.marigold} />
        <p className="text-sm" style={{ color: T.paper }}>
          {lang === "ta" ? "உங்கள் கடை: அரசினர் நியாய விலை கடை #114" : "Your shop: Govt. Fair Price Shop #114"}
        </p>
      </div>

      {role === "citizen" && (
        <div className="grid grid-cols-2 gap-3 mb-3">
          <HomeTile icon={Package} label={s.stock} onClick={() => setTab("stock")} />
          <HomeTile icon={Ticket} label={s.queue} onClick={() => setTab("queue")} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {tiles.map((t, i) => (
          <HomeTile key={i} icon={t.icon} label={t.label} tone={t.tone} onClick={() => setTab(t.tab)} />
        ))}
      </div>
    </div>
  );
}

function HomeTile({ icon: Icon, label, onClick, tone = T.seal }) {
  return (
    <button onClick={onClick} className="rounded-2xl p-5 flex flex-col items-start gap-3" style={{ background: "#fff" }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${tone}1A` }}>
        <Icon size={22} color={tone} />
      </div>
      <span className="text-base font-semibold text-left" style={{ color: T.ink }}>{label}</span>
    </button>
  );
}

function BottomNav({ items, tab, setTab }) {
  return (
    <div className="flex items-center justify-around py-3 border-t" style={{ borderColor: `${T.ink}15`, background: "#fff" }}>
      {items.map((it) => (
        <button key={it.id} onClick={() => setTab(it.id)} className="flex flex-col items-center gap-1">
          <it.icon size={20} color={tab === it.id ? T.seal : `${T.ink}66`} />
          <span className="text-[10px] font-medium" style={{ color: tab === it.id ? T.seal : `${T.ink}66` }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   STOCK — expanded with allocated/distributed/remaining + trend
========================================================= */
function StockTab({ s, lang, setTab }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <TopBar title={s.stockTitle} onBack={() => setTab("home")} />
      <div className="px-5 pb-6 flex flex-col gap-3">
        {STOCK.map((item) => {
          const remaining = item.allocated - item.distributed;
          const pct = Math.round((item.distributed / item.allocated) * 100);
          const low = remaining > 0 && remaining < item.allocated * 0.2;
          const out = remaining <= 0;
          const isOpen = open === item.id;
          return (
            <div key={item.id} className="rounded-xl overflow-hidden" style={{ background: "#fff" }}>
              <button onClick={() => setOpen(isOpen ? null : item.id)} className="w-full px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {out ? <AlertOctagon size={20} color={T.stamp} /> : low ? <AlertTriangle size={20} color={T.marigold} /> : <CheckCircle2 size={20} color={T.seal} />}
                  <span className="font-medium" style={{ color: T.ink }}>{item.name[lang]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: T.ink, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {remaining} {item.unit}
                  </span>
                  <ChevronDown size={16} color={T.ink} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: T.paperDark }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: out ? T.stamp : low ? T.marigold : T.seal }} />
                  </div>
                  <div className="flex justify-between text-xs mb-4" style={{ color: T.ink, opacity: 0.7 }}>
                    <span>{s.allocated}: {item.allocated} {item.unit}</span>
                    <span>{s.distributed}: {item.distributed} {item.unit}</span>
                  </div>
                  <p className="text-xs font-semibold mb-1" style={{ color: T.ink, opacity: 0.7 }}>{s.monthlyTrend}</p>
                  <MiniBarChart data={item.history} color={T.seal} />
                  {out && <Badge text={s.outOfStock} tone={T.stamp} />}
                  {low && !out && <Badge text={s.lowStock} tone={T.marigold} />}
                </div>
              )}
            </div>
          );
        })}
        <p className="text-xs opacity-60 mt-2" style={{ color: T.ink }}>
          {lang === "ta" ? "* ஒவ்வொரு பொருளையும் தட்டி விவரம் பார்க்கவும்" : "* Tap any item to see allocation detail & trend"}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   QUEUE & TOKEN — shop/slot selection, status lifecycle,
   duplicate prevention, auto-refresh, approaching-turn banner
========================================================= */
function QueueTab({ s, lang, myToken, issueToken, cancelToken, currentServing, tokenHistory, setTab }) {
  const [shopId, setShopId] = useState(SHOPS[0].id);
  const [slot, setSlot] = useState("4:00–4:30 PM");
  const statusTone = { PENDING: T.marigold, CONFIRMED: T.seal, READY: T.stamp, COLLECTED: T.seal, EXPIRED: `${T.ink}66` };
  const statusLabel = { PENDING: s.pending, CONFIRMED: s.confirmed, READY: s.ready, COLLECTED: s.collected, EXPIRED: s.expired };
  const approaching = myToken && myToken.status !== "READY" && (myToken.number - currentServing) <= 2 && (myToken.number - currentServing) > 0;

  return (
    <div>
      <TopBar title={s.queue} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        {myToken ? (
          <>
            <TicketStub number={myToken.number} wait={Math.max((myToken.number - currentServing) * 3, 0)} lang={lang} />
            <div className="flex items-center justify-center gap-2 mt-3">
              <Badge text={statusLabel[myToken.status]} tone={statusTone[myToken.status]} />
            </div>
            {approaching && (
              <div className="mt-4 rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: `${T.marigold}22` }}>
                <AlertTriangle size={16} color={T.marigold} />
                <p className="text-xs font-medium" style={{ color: T.ink }}>{s.turnApproaching}</p>
              </div>
            )}
            <button onClick={cancelToken} className="w-full mt-4 rounded-xl py-3 font-semibold text-sm" style={{ border: `2px solid ${T.stamp}`, color: T.stamp }}>
              {s.cancelToken}
            </button>
          </>
        ) : (
          <div className="rounded-2xl p-4 mb-2" style={{ background: "#fff" }}>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: T.ink, opacity: 0.6 }}>{s.selectShop}</label>
            <select value={shopId} onChange={(e) => setShopId(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2.5 mb-3 outline-none text-sm" style={{ background: T.paperDark, color: T.ink }}>
              {SHOPS.filter((sh) => sh.status === "open").map((sh) => <option key={sh.id} value={sh.id}>{sh.name}</option>)}
            </select>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: T.ink, opacity: 0.6 }}>{s.selectSlot}</label>
            <select value={slot} onChange={(e) => setSlot(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 mb-4 outline-none text-sm" style={{ background: T.paperDark, color: T.ink }}>
              {["10:00–10:30 AM", "1:00–1:30 PM", "4:00–4:30 PM"].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button onClick={() => issueToken(SHOPS.find((sh) => sh.id === shopId).name, slot)}
              className="w-full rounded-2xl py-4 font-semibold text-lg" style={{ background: T.marigold, color: T.ink }}>
              {s.getToken}
            </button>
          </div>
        )}

        <p className="text-sm font-semibold mt-7 mb-1" style={{ color: T.ink }}>{s.liveQueue}</p>
        <p className="text-xs mb-3" style={{ color: T.ink, opacity: 0.6 }}>{s.nowServing}: #{currentServing}</p>
        <div className="flex flex-col gap-2 mb-6">
          {MOCK_QUEUE.map((q) => (
            <div key={q.token} className="rounded-xl px-4 py-2.5 flex items-center justify-between" style={{ background: "#fff" }}>
              <span style={{ color: T.ink, fontFamily: "'IBM Plex Mono', monospace" }} className="font-semibold">#{q.token}</span>
              <Badge text={q.status === "SERVED" ? s.served : q.status === "CALLED" ? s.called : s.waiting}
                tone={q.status === "SERVED" ? T.seal : q.status === "CALLED" ? T.stamp : `${T.ink}99`} />
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: T.ink }}>
          <History size={15} /> {s.tokenHistory}
        </p>
        <div className="flex flex-col gap-2">
          {tokenHistory.map((t, i) => (
            <div key={i} className="rounded-xl px-4 py-2.5 flex items-center justify-between" style={{ background: "#fff" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: T.ink }}>{t.id} · {t.shop}</p>
                <p className="text-[11px] opacity-60" style={{ color: T.ink }}>{t.date}</p>
              </div>
              <Badge text={statusLabel[t.status] || t.status} tone={statusTone[t.status] || T.ink} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPLAINT — unchanged flow, preserved as-is
========================================================= */
function ComplaintTab({ s, lang, setTab, text, setText, listening, onSpeak, sent, onSubmit }) {
  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-4">
        <Stamp label={lang === "ta" ? "பதிவு செய்யப்பட்டது" : "Registered"} tone={T.stamp} />
        <p className="text-lg font-semibold" style={{ color: T.ink, fontFamily: "'Fraunces', serif" }}>
          {lang === "ta" ? "உங்கள் புகார் பதிவு செய்யப்பட்டது" : "Your complaint has been filed"}
        </p>
        <button onClick={() => setTab("home")} className="rounded-xl px-5 py-2.5 font-semibold" style={{ background: T.seal, color: T.paper }}>{s.home}</button>
      </div>
    );
  }
  return (
    <div>
      <TopBar title={s.fileComplaint} onBack={() => setTab("home")} />
      <div className="px-5 pb-6 flex flex-col gap-4">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={s.describeIssue} rows={4}
          className="rounded-xl px-4 py-3 outline-none resize-none" style={{ background: "#fff", color: T.ink }} />
        <button onClick={onSpeak} className="rounded-2xl py-3.5 flex items-center justify-center gap-2 font-semibold"
          style={{ background: listening ? T.stamp : "transparent", border: `2px solid ${listening ? T.stamp : T.seal}`, color: listening ? "#fff" : T.seal }}>
          {listening ? <MicOff size={18} /> : <Mic size={18} />}
          {listening ? s.tapToSpeak : s.speakComplaint}
        </button>
        <button disabled={!text} onClick={onSubmit} className="rounded-2xl py-4 font-semibold text-lg disabled:opacity-40" style={{ background: T.seal, color: T.paper }}>
          {s.submit}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   VOICE ASSISTANT — expanded command handling + spoken reply
========================================================= */
function VoiceTab({ s, lang, setTab, listening, heard, reply, onTap }) {
  const examples = lang === "ta"
    ? ["அரிசி எவ்வளவு மீதம்?", "என் டோக்கன் எண் என்ன?", "சர்க்கரை இருக்கா?"]
    : ["How much rice is remaining?", "What is my token number?", "Is sugar available?"];
  return (
    <div className="h-full flex flex-col" style={{ background: T.ink }}>
      <div className="px-5 pt-6"><button onClick={() => setTab("home")} className="p-1"><ArrowLeft size={22} color={T.paper} /></button></div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <button onClick={onTap} className="w-32 h-32 rounded-full flex items-center justify-center transition-transform active:scale-95"
          style={{ background: listening ? T.stamp : T.marigold }}>
          {listening ? <MicOff size={44} color={T.ink} /> : <Mic size={44} color={T.ink} />}
        </button>
        <p className="text-center text-base" style={{ color: T.paper }}>{heard || s.tapToSpeak}</p>
        {reply && (
          <div className="rounded-2xl px-4 py-3 w-full" style={{ background: `${T.paper}15` }}>
            <p className="text-sm text-center" style={{ color: T.marigold }}>{reply}</p>
          </div>
        )}
        <div className="w-full">
          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2 text-center" style={{ color: T.paper }}>
            {lang === "ta" ? "முயற்சிக்கவும்" : "Try asking"}
          </p>
          <div className="flex flex-col gap-1.5">
            {examples.map((ex, i) => (
              <p key={i} className="text-xs text-center opacity-70" style={{ color: T.paper }}>"{ex}"</p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-60">
          <Volume2 size={16} color={T.paper} />
          <span className="text-xs" style={{ color: T.paper }}>{lang === "ta" ? "தமிழ் / English" : "Tamil / English"}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RATION CARD — digital card, QR, family, entitlement
========================================================= */
function CardTab({ s, lang, setTab }) {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div>
      <TopBar title={s.card} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        <div className="rounded-2xl p-5 mb-5 relative overflow-hidden" style={{ background: T.sealDark }}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-60" style={{ color: T.paper }}>{s.cardType}</p>
              <p className="text-lg font-semibold" style={{ color: T.paper, fontFamily: "'Fraunces', serif" }}>{RATION_CARD.type}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: T.paper }}>
              <QrCode size={26} color={T.ink} />
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1" style={{ color: T.paper }}>{s.cardNumber}</p>
          <p className="text-xl mb-4" style={{ color: T.paper, fontFamily: "'IBM Plex Mono', monospace" }}>{RATION_CARD.number}</p>
          {RATION_CARD.verified && <Stamp label={s.verified} tone={T.marigold} />}
        </div>

        <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: T.ink }}><Users size={15} /> {s.familyMembers}</p>
        <div className="flex flex-col gap-2 mb-6">
          {RATION_CARD.members.map((m, i) => (
            <div key={i} className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: "#fff" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: T.ink }}>{m.name[lang]}</p>
                <p className="text-[11px] opacity-60" style={{ color: T.ink }}>{m.relation[lang]} · {m.age} {lang === "ta" ? "வயது" : "yrs"}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold mb-3" style={{ color: T.ink }}>{s.remaining}</p>
        <div className="flex flex-col gap-2 mb-5">
          {STOCK.map((item) => {
            const ent = ENTITLEMENT[item.id] || 0;
            const used = USED_THIS_MONTH[item.id] || 0;
            const left = ent - used;
            const pct = ent ? Math.round((used / ent) * 100) : 0;
            return (
              <div key={item.id} className="rounded-xl px-4 py-3" style={{ background: "#fff" }}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: T.ink }}>{item.name[lang]}</span>
                  <span className="text-sm font-semibold" style={{ color: T.ink, fontFamily: "'IBM Plex Mono', monospace" }}>{left}/{ent} {item.unit}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: T.paperDark }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: T.seal }} />
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => setShowHistory(!showHistory)} className="w-full rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
          style={{ border: `2px solid ${T.seal}`, color: T.seal }}>
          <History size={15} /> {s.viewHistory}
        </button>
        {showHistory && (
          <div className="flex flex-col gap-2 mt-3">
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="rounded-xl px-4 py-2.5 flex items-center justify-between" style={{ background: "#fff" }}>
                <span className="text-xs" style={{ color: T.ink }}>{t.date}</span>
                <span className="text-xs font-semibold" style={{ color: T.ink }}>
                  {t.items.map((it) => `${it.name[lang]} ${it.qty}${it.unit}`).join(", ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   TRANSACTIONS + RECEIPT
========================================================= */
function TransactionsTab({ s, lang, setTab, selected, setSelected }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const filtered = TRANSACTIONS.filter((t) => {
    const matchesQ = !q || t.id.toLowerCase().includes(q.toLowerCase()) || t.shop.toLowerCase().includes(q.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    return matchesQ && matchesStatus;
  });

  if (selected) return <ReceiptView s={s} lang={lang} txn={selected} onBack={() => setSelected(null)} />;

  return (
    <div>
      <TopBar title={s.transactions} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3" style={{ background: "#fff" }}>
          <Search size={16} color={T.ink} opacity={0.5} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={s.search}
            className="flex-1 outline-none text-sm bg-transparent" style={{ color: T.ink }} />
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {["ALL", "VERIFIED", "FLAGGED"].map((f) => (
            <button key={f} onClick={() => setStatusFilter(f)} className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{ background: statusFilter === f ? T.seal : "#fff", color: statusFilter === f ? "#fff" : T.ink }}>
              {f === "ALL" ? s.all : f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? <EmptyState icon={FileText} text={s.noResults} /> : (
          <div className="flex flex-col gap-2">
            {filtered.map((t) => (
              <button key={t.id} onClick={() => setSelected(t)} className="rounded-xl px-4 py-3 text-left" style={{ background: "#fff" }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold" style={{ color: T.ink, fontFamily: "'IBM Plex Mono', monospace" }}>{t.id}</span>
                  <Badge text={t.status} tone={t.status === "FLAGGED" ? T.stamp : T.seal} />
                </div>
                <p className="text-xs opacity-70" style={{ color: T.ink }}>{t.date} · {t.shop}</p>
                <p className="text-xs mt-1" style={{ color: T.ink }}>
                  {t.items.map((it) => it.name[lang]).join(", ")}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReceiptView({ s, lang, txn, onBack }) {
  const [downloaded, setDownloaded] = useState(false);
  return (
    <div>
      <TopBar title={s.receipt} onBack={onBack} />
      <div className="px-5 pb-6">
        <div className="rounded-2xl p-5" style={{ background: T.ink }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-60" style={{ color: T.paper }}>{s.txnId}</p>
              <p className="font-semibold" style={{ color: T.paper, fontFamily: "'IBM Plex Mono', monospace" }}>{txn.id}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: T.paper }}>
              <QrCode size={22} color={T.ink} />
            </div>
          </div>
          <div className="h-px mb-4" style={{ background: `${T.paper}33` }} />
          {[[s.date, txn.date], [s.shop, txn.shop], ["Token", `#${txn.tokenNumber}`]].map(([k, v]) => (
            <div key={k} className="flex justify-between mb-2 text-sm">
              <span style={{ color: T.paper, opacity: 0.6 }}>{k}</span>
              <span style={{ color: T.paper }}>{v}</span>
            </div>
          ))}
          <div className="h-px my-4" style={{ background: `${T.paper}33` }} />
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2" style={{ color: T.paper }}>{s.items}</p>
          {txn.items.map((it, i) => (
            <div key={i} className="flex justify-between mb-1.5 text-sm">
              <span style={{ color: T.paper }}>{it.name[lang]}</span>
              <span style={{ color: T.paper, fontFamily: "'IBM Plex Mono', monospace" }}>{it.qty} {it.unit}</span>
            </div>
          ))}
          <div className="mt-4"><Stamp label={txn.status === "FLAGGED" ? "FLAGGED" : s.verified} tone={txn.status === "FLAGGED" ? T.stamp : T.marigold} /></div>
        </div>
        <button onClick={() => setDownloaded(true)} className="w-full mt-4 rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2"
          style={{ background: downloaded ? T.seal : "transparent", border: `2px solid ${T.seal}`, color: downloaded ? "#fff" : T.seal }}>
          <Download size={16} /> {downloaded ? s.prepared : s.downloadReceipt}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */
function NotificationsTab({ s, lang, setTab, notifications, setNotifications, onMarkAll }) {
  const iconFor = { token: Ticket, stock: Package, announce: Bell };
  return (
    <div>
      <TopBar title={s.notifications} onBack={() => setTab("home")}
        right={<button onClick={onMarkAll} className="text-xs font-semibold" style={{ color: T.seal }}>{s.markRead}</button>} />
      <div className="px-5 pb-6">
        {notifications.length === 0 ? <EmptyState icon={Bell} text={s.noNotifications} /> : (
          <div className="flex flex-col gap-2">
            {notifications.map((n) => {
              const Icon = iconFor[n.type] || Bell;
              return (
                <button key={n.id} onClick={() => setNotifications((ns) => ns.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                  className="rounded-xl px-4 py-3 text-left flex gap-3 items-start" style={{ background: "#fff" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${T.seal}1A` }}>
                    <Icon size={16} color={T.seal} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold" style={{ color: T.ink }}>{n.title[lang]}</p>
                      {!n.read && <span className="w-2 h-2 rounded-full" style={{ background: T.stamp }} />}
                    </div>
                    <p className="text-xs opacity-70 mt-0.5" style={{ color: T.ink }}>{n.msg[lang]}</p>
                    <p className="text-[10px] opacity-50 mt-1" style={{ color: T.ink }}>{n.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */
function ProfileTab({ s, lang, setLang, setTab, setScreen, role }) {
  const [notifPrefs, setNotifPrefs] = useState({ sms: true, voice: false, push: true });
  return (
    <div>
      <TopBar title={s.profile} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        <div className="rounded-2xl p-5 mb-5 flex items-center gap-4" style={{ background: "#fff" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${T.seal}1A` }}>
            <UserIcon size={26} color={T.seal} />
          </div>
          <div>
            <p className="font-semibold" style={{ color: T.ink, fontFamily: "'Fraunces', serif" }}>{RATION_CARD.members[0].name[lang]}</p>
            <p className="text-xs opacity-60" style={{ color: T.ink }}>{RATION_CARD.number}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          {[[s.address, "Gandhi Nagar, Erode, Tamil Nadu"], [s.prefShop, SHOPS[0].name]].map(([k, v]) => (
            <div key={k} className="rounded-xl px-4 py-3" style={{ background: "#fff" }}>
              <p className="text-[10px] uppercase tracking-wide opacity-50" style={{ color: T.ink }}>{k}</p>
              <p className="text-sm font-medium mt-0.5" style={{ color: T.ink }}>{v}</p>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.prefLanguage}</p>
        <div className="flex gap-2 mb-5">
          {[{ code: "ta", label: "தமிழ்" }, { code: "en", label: "English" }].map((l) => (
            <button key={l.code} onClick={() => setLang(l.code)} className="flex-1 rounded-xl py-2.5 text-sm font-semibold"
              style={{ background: lang === l.code ? T.seal : "#fff", color: lang === l.code ? "#fff" : T.ink }}>
              {l.label}
            </button>
          ))}
        </div>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.notifSettings}</p>
        <div className="rounded-xl p-4 mb-5 flex flex-col gap-3" style={{ background: "#fff" }}>
          {Object.entries(notifPrefs).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-sm capitalize" style={{ color: T.ink }}>{k}</span>
              <button onClick={() => setNotifPrefs((p) => ({ ...p, [k]: !p[k] }))}
                className="w-11 h-6 rounded-full flex items-center px-0.5" style={{ background: v ? T.seal : T.paperDark, justifyContent: v ? "flex-end" : "flex-start" }}>
                <div className="w-5 h-5 rounded-full" style={{ background: "#fff" }} />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full rounded-xl py-3 mb-3 font-semibold text-sm flex items-center justify-center gap-2" style={{ border: `2px solid ${T.ink}30`, color: T.ink }}>
          <Settings size={15} /> {s.security}
        </button>
        <button onClick={() => setScreen("login")} className="w-full rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2" style={{ background: T.stamp, color: "#fff" }}>
          <LogOut size={15} /> {s.logout}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN DASHBOARD (officer role)
========================================================= */
function AdminTab({ s, setTab }) {
  const stats = [
    { label: s.totalCardHolders, value: "48,120" }, { label: s.activeUsers, value: "31,804" },
    { label: s.totalShops, value: "212" }, { label: s.todayTxns, value: "1,096" },
    { label: s.pendingTokens, value: "340" }, { label: s.lowStockItems, value: "17" },
  ];
  return (
    <div>
      <TopBar title={s.govtDash} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        <div className="grid grid-cols-2 gap-2 mb-6">
          {stats.map((m, i) => (
            <div key={i} className="rounded-xl px-3 py-4" style={{ background: "#fff" }}>
              <p className="text-xl font-semibold" style={{ color: T.seal, fontFamily: "'IBM Plex Mono', monospace" }}>{m.value}</p>
              <p className="text-[10px] uppercase tracking-wide mt-1 opacity-60" style={{ color: T.ink }}>{m.label}</p>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold mb-3" style={{ color: T.ink }}>{s.fraudAlerts}</p>
        <div className="flex flex-col gap-2">
          {ANOMALIES.map((f) => {
            const risk = f.score >= 0.7 ? s.high : f.score >= 0.4 ? s.medium : s.low;
            const tone = f.score >= 0.7 ? T.stamp : f.score >= 0.4 ? T.marigold : T.seal;
            return (
              <div key={f.id} className="rounded-xl px-4 py-3" style={{ background: "#fff" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold flex items-center gap-2" style={{ color: T.ink }}>
                    <MapPin size={14} color={T.stamp} /> {f.shop}
                  </span>
                  <Badge text={`${risk} · ${(f.score * 100).toFixed(0)}%`} tone={tone} />
                </div>
                <p className="text-xs opacity-70 mb-1" style={{ color: T.ink }}>{f.reason}</p>
                <p className="text-[10px] opacity-50" style={{ color: T.ink }}>{f.txn} · {f.date} · {f.status}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMART ANALYTICS — AI/ML dashboard (sample data, clearly labeled)
========================================================= */
function AnalyticsTab({ s, setTab }) {
  return (
    <div>
      <TopBar title={s.analytics} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        <div className="rounded-xl px-4 py-3 mb-5 flex items-start gap-2" style={{ background: `${T.marigold}22` }}>
          <Sparkles size={16} color={T.marigold} className="shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: T.ink }}>{s.smartAnalyticsNote}</p>
        </div>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.consumptionAnalysis}</p>
        <div className="rounded-xl p-4 mb-5" style={{ background: "#fff" }}>
          <MiniLineChart data={CONSUMPTION_TREND} color={T.stamp} />
        </div>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.demandPrediction}</p>
        <div className="rounded-xl p-4 mb-5 flex items-center justify-between" style={{ background: "#fff" }}>
          <div>
            <p className="text-2xl font-semibold" style={{ color: T.seal, fontFamily: "'IBM Plex Mono', monospace" }}>289 kg</p>
            <p className="text-xs opacity-60" style={{ color: T.ink }}>{s.consumptionAnalysis} — Rice</p>
          </div>
          <Badge text={`82% ${s.confidence}`} tone={T.seal} />
        </div>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.shopComparison}</p>
        <div className="rounded-xl p-4 mb-5" style={{ background: "#fff" }}>
          <MiniBarChart data={SHOP_DEMAND.map((d) => d.value)} labels={SHOP_DEMAND.map((d) => d.name)} color={T.seal} />
        </div>

        <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "#fff" }}>
          <TrendingUp size={18} color={T.stamp} />
          <div>
            <p className="text-sm font-medium" style={{ color: T.ink }}>{s.anomalyPrediction}</p>
            <p className="text-xs opacity-60" style={{ color: T.ink }}>Wheat · Shop #114 — within 9 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAFF DASHBOARD (shop employee role)
========================================================= */
function StaffTab({ s, lang, setTab, queue, setQueue, stock, setStock, qrState, setQrState }) {
  const callNext = () => {
    setQueue((q) => {
      const idx = q.findIndex((t) => t.status === "WAITING");
      if (idx === -1) return q;
      const copy = [...q]; copy[idx] = { ...copy[idx], status: "CALLED" }; return copy;
    });
  };
  const markCollected = (token) => {
    setQueue((q) => q.map((t) => t.token === token ? { ...t, status: "SERVED" } : t));
  };
  const adjustStock = (id, delta) => {
    setStock((st) => st.map((it) => it.id === id ? { ...it, distributed: Math.max(0, Math.min(it.allocated, it.distributed + delta)) } : it));
  };

  return (
    <div>
      <TopBar title={s.staffDash} onBack={() => setTab("home")} />
      <div className="px-5 pb-6">
        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.scanQr}</p>
        <div className="rounded-xl p-4 mb-5" style={{ background: "#fff" }}>
          {qrState === "idle" && (
            <button onClick={() => { setQrState("scanning"); setTimeout(() => setQrState("found"), 1200); }}
              className="w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2" style={{ background: T.seal, color: "#fff" }}>
              <Camera size={16} /> {s.scanQr}
            </button>
          )}
          {qrState === "scanning" && (
            <div className="flex items-center justify-center gap-2 py-3">
              <RefreshCw size={16} color={T.ink} className="animate-spin" />
              <span className="text-sm" style={{ color: T.ink }}>{s.scanning}</span>
            </div>
          )}
          {(qrState === "found" || qrState === "confirmed") && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} color={T.seal} />
                <span className="text-sm font-semibold" style={{ color: T.ink }}>{s.cardDetails}</span>
              </div>
              <div className="rounded-lg px-3 py-2 mb-3" style={{ background: T.paperDark }}>
                <p className="text-xs" style={{ color: T.ink }}>{RATION_CARD.number} — {RATION_CARD.members[0].name[lang]}</p>
                <p className="text-[11px] opacity-60" style={{ color: T.ink }}>{s.remaining}: 15 kg {lang === "ta" ? "அரிசி" : "rice"}</p>
              </div>
              {qrState === "found" ? (
                <button onClick={() => setQrState("confirmed")} className="w-full rounded-xl py-2.5 font-semibold text-sm" style={{ background: T.marigold, color: T.ink }}>
                  {s.confirmDistribution}
                </button>
              ) : (
                <div className="flex items-center justify-between">
                  <Stamp label={s.verified} tone={T.marigold} />
                  <button onClick={() => setQrState("idle")} className="text-xs font-semibold" style={{ color: T.seal }}>
                    {lang === "ta" ? "புதிய ஸ்கேன்" : "New scan"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.todaysTokens}</p>
        <div className="flex flex-col gap-2 mb-5">
          {queue.map((q) => (
            <div key={q.token} className="rounded-xl px-4 py-2.5 flex items-center justify-between" style={{ background: "#fff" }}>
              <span style={{ color: T.ink, fontFamily: "'IBM Plex Mono', monospace" }} className="font-semibold">#{q.token}</span>
              <div className="flex items-center gap-2">
                <Badge text={q.status === "SERVED" ? s.served : q.status === "CALLED" ? s.called : s.waiting}
                  tone={q.status === "SERVED" ? T.seal : q.status === "CALLED" ? T.stamp : `${T.ink}99`} />
                {q.status === "CALLED" && (
                  <button onClick={() => markCollected(q.token)} className="text-xs font-semibold" style={{ color: T.seal }}>{s.markCollected}</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button onClick={callNext} className="w-full rounded-xl py-3 mb-6 font-semibold text-sm" style={{ border: `2px solid ${T.seal}`, color: T.seal }}>
          {s.callNext}
        </button>

        <p className="text-sm font-semibold mb-2" style={{ color: T.ink }}>{s.recordUpdate}</p>
        <div className="flex flex-col gap-2">
          {stock.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-xl px-4 py-2.5 flex items-center justify-between" style={{ background: "#fff" }}>
              <span className="text-sm font-medium" style={{ color: T.ink }}>{item.name[lang]}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => adjustStock(item.id, -1)}><MinusCircle size={20} color={T.stamp} /></button>
                <span className="text-sm font-semibold w-10 text-center" style={{ color: T.ink, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {item.allocated - item.distributed}
                </span>
                <button onClick={() => adjustStock(item.id, 1)}><PlusCircle size={20} color={T.seal} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
