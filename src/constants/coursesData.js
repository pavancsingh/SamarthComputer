/**
 * Centralized Production Course Database
 * Handcrafted comprehensive catalog for Samarth Computers, Khandala.
 * Includes MS-CIT, Tally Prime + GST, Advanced Excel, and KLiC Career Courses.
 */
const getMediaUrl = (path) => {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (baseUrl && !baseUrl.includes('placeholder')) {
    return `${baseUrl}/storage/v1/object/public/samarth-media/${path}`;
  }
  return `/assets/${path}`;
};

export const COURSE_LOGOS = {
  'mscit': getMediaUrl('logos/mscit-logo.png'),
  'tally-prime-gst': getMediaUrl('logos/tally-logo.png'),
  'advanced-excel': getMediaUrl('logos/excel-logo.png')
};

export const COURSES_DATA = [
  {
    id: 'mscit',
    slug: 'mscit',
    title: 'MS-CIT (MKCL Certified)',
    subtitleMr: 'आंतरराष्ट्रीय दर्जाचा परिपूर्ण कॉम्प्युटर कोर्स',
    subtitleEn: 'Complete Computer Theory & Practical with Certification',
    category: 'govt',
    tag: 'सर्वात लोकप्रिय',
    isPrimary: true,
    isFeatured: true,
    displayOrder: 1,
    logoUrl: getMediaUrl('logos/mscit-logo.png'),
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने (रोज २ तास) किंवा ३ महिने (रोज १ तास)',
    durationEn: '2 Months (2 hrs/day) or 3 Months (1 hr/day)',
    certificationMr: 'महाराष्ट्र ज्ञान महामंडळ (MKCL) व महाराष्ट्र शासन',
    certificationEn: 'Maharashtra Knowledge Corporation Limited (MKCL) & Govt of Maharashtra',
    eligibilityMr: 'इयत्ता ५ वी पुढील सर्व विद्यार्थी, लिपिक भरती उमेदवार, नोकरदार, गृहिणी व नागरिक',
    eligibilityEn: 'Students 5th Standard & Above, Govt Clerk Aspirants, Housewives & Job Seekers',
    overviewMr: 'MS-CIT हा महाराष्ट्र शासनाचा सर्वात लोकप्रिय आंतरराष्ट्रीय दर्जाचा कॉम्प्युटर कोर्स आहे. यामध्ये संगणक पायाभूत ज्ञान, Windows 11, MS Office 2021, AI पॉवर्ड लर्निंग आणि डिजिटल जीवन कौशल्ये शिकवली जातात.',
    overviewEn: 'MS-CIT is Maharashtra’s flagship IT literacy program featuring AI-Powered Learning, Windows 11, MS Office 2021, internet safety, and essential digital skills for modern career readiness.',
    modulesMr: [
      { name: '१. संगणक पायाभूत ज्ञान (Computer Fundamentals)', desc: 'संगणक कार्यपद्धती, हार्डवेअर मूलभूत, CPU, RAM आणि स्टोरेजची ओळख' },
      { name: '२. Windows 11 & फाइल मॅनेजमेंट (File & Windows Management)', desc: 'Windows 11 ऑपरेट करणे, फाइल-फोल्डर रचना, शॉर्टकट्स व सिस्टीम सेटिंग्ज' },
      { name: '३. इंटरनेट & ऑनलाइन सेवा (Internet & Online Services)', desc: 'वेब ब्राउझिंग, ईमेल, Google Workspace, डिजी लॉकर, महाऑनलाइन व ऑनलाइन बिल पेमेंट' },
      { name: '४. MS Word 2021 (डॉक्युमेंटेशन & टायपिंग)', desc: 'पत्रव्यवहार, रिपोर्ट टायपिंग, रिज्युमे बनवणे, टेबल फॉरमॅटिंग व मेल मर्ज' },
      { name: '५. MS Excel 2021 (डेटा मॅनेजमेंट & स्प्रेडशीट)', desc: 'डेटा एंट्री, मूलभूत फॉर्म्युले, तक्ते, चार्ट्स, बजेट व सॉर्टिंग/फिल्टरिंग' },
      { name: '६. MS PowerPoint 2021 (व्हिज्युअल प्रेझेंटेशन)', desc: 'आकर्षक स्लाइड्स, ॲनिमेशन, ट्रान्झिशन, प्रेझेंटेशन डिझाइन व व्हिडिओ पब्लिशिंग' },
      { name: '७. डिजिटल जीवन कौशल्ये & ऑनलाइन सुरक्षा (Digital Safety & AI)', desc: 'सायबर सुरक्षा, पासवर्ड सुरक्षा, UPI पेमेंट खबरदारी, ChatGPT व AI सर्च टूल्स' }
    ],
    modulesEn: [
      { name: '1. Computer Fundamentals', desc: 'Computer architecture, CPU, RAM, storage devices, and operating system principles' },
      { name: '2. Windows 11 & File Management', desc: 'Operating system navigation, file-folder structure, shortcuts, and system settings' },
      { name: '3. Internet & Online Services', desc: 'Web browsing, email etiquette, Google Workspace, DigiLocker, MahaOnline & online utility bills' },
      { name: '4. MS Word 2021 Documentation', desc: 'Letter drafting, report typing, table formatting, Mail Merge, and professional resume building' },
      { name: '5. MS Excel 2021 Data Management', desc: 'Spreadsheet layout, basic formulas, cell formatting, data sorting, filtering & visual charts' },
      { name: '6. MS PowerPoint 2021 Presentations', desc: 'Visual slide creation, animations, transitions, presentation styling & video export' },
      { name: '7. Digital Skills & Cyber Safety', desc: 'Cybersecurity, password protection, secure UPI payments, ChatGPT & AI search tools' }
    ],
    practicalSkillsMr: [
      'दैनंदिन १-ऑन-१ लॅब संगणक सराव',
      'शासकीय पोर्टल्स व ऑनलाइन अर्ज भरणे',
      'रिज्युमे व अधिकृत कागदपत्रे प्रिंट करणे',
      'डिजिटल दाखले डाऊनलोड व फाइल बॅकअप',
      'सायबर सुरक्षा व सुरक्षित ऑनलाइन बँकिंग'
    ],
    practicalSkillsEn: [
      'Daily 1-on-1 hands-on lab PC practice',
      'Filling online government service & exam applications',
      'Resume typing, document formatting & printing',
      'Downloading digital certificates & managing cloud backup',
      'Cybersecurity & safe online payment simulation'
    ],
    careersMr: ['सरकारी लिपिक / टंकलेखक नोकरीसाठी अनिवार्य', 'डाटा एंट्री ऑपरेटर', 'ऑफिस असिस्टंट / प्रशासकीय सहाय्यक', 'संगणक ऑपरेटर'],
    careersEn: ['Mandatory for Govt Clerk & Typing Exams', 'Data Entry Operator', 'Office Assistant / Admin Executive', 'Computer Operator']
  },
  {
    id: 'tally-prime-gst',
    slug: 'tally-prime-gst',
    title: 'Tally Prime - Accounting & GST',
    subtitleMr: 'प्रॅक्टिकल अकाउंटिंग, GST इन्व्हॉईसिंग आणि टॅली ऑथोराईज्ड प्रमाणपत्र',
    subtitleEn: 'TALLY PRIME - Accounting & GST Made Easy',
    category: 'job',
    tag: 'नोकरीसाठी १००% उपयुक्त',
    isPrimary: true,
    isFeatured: true,
    displayOrder: 2,
    logoUrl: getMediaUrl('logos/tally-logo.png'),
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने (रोज २ तास)',
    durationEn: '2 Months (2 hrs/day)',
    certificationMr: 'टॅली एज्युकेशन प्रा. लि. (Tally Authorized Certificate)',
    certificationEn: 'Tally Education Pvt. Ltd. Authorized Certificate',
    eligibilityMr: '१० वी / १२ वी / बी.कॉम / एम.कॉम विद्यार्थी, व्यापारी, व्यावसायिक व अकाउंटंट्स',
    eligibilityEn: 'Commerce & Non-Commerce Students, Job Seekers, Shopkeepers & Accountants',
    overviewMr: 'Tally Prime हा प्रॅक्टिकल व्यावसायिक अकाउंटिंग शिकवणारा कोर्स आहे. लेजर क्रिएशन, GST इन्व्हॉईसिंग, E-Way बिल, इन्व्हेंटरी, पेरोल, TDS आणि आर्थिक ताळेबंद (Balance Sheet) रिपोर्ट्सचे सखोल ज्ञान मिळवून अकाउंटिंग क्षेत्रात करिअर करा.',
    overviewEn: 'Comprehensive practical computerised accounting training. Master Tally Prime, GST invoicing, E-Way bills, inventory management, manufacturing vouchers, payroll, TDS, and corporate financial reporting.',
    modulesMr: [
      { name: '१. अकाउंटिंग तत्त्वे व नियमावली (Accounting Fundamentals)', desc: 'अकाउंटिंगचे सुवर्ण नियम (Golden Rules), डेबिट-क्रेडिट, जर्नल नोंदी व लेजर खाती' },
      { name: '२. कंपनी निर्मिती व सेटअप (Company Creation & Configuration)', desc: 'Tally मध्ये कंपनी तयार करणे, लेजर्स, सिक्युरिटी कंट्रोल व F11/F12 फीचर्स' },
      { name: '३. लेजर व व्हाऊचर नोंदी (Ledger & Voucher Entries)', desc: 'Payment, Receipt, Sales, Purchase, Journal व Contra व्हाऊचर्सची नोंद' },
      { name: '४. व्यावसायिक व्यवहार (Trading & Non-Trading Transactions)', desc: 'खरेदी-विक्री व्यवहार, सेवा उद्योग नोंदी व व्यावसायिक बँकिंग व्यवहार' },
      { name: '५. GST कार्यपद्धती (GST Workflow & Invoicing)', desc: 'CGST, SGST, IGST हिशोब, GST टॅक्स बिलिंग, E-Way बिल व GSTR रिटर्न परिचय' },
      { name: '६. इन्व्हेंटरी व साठा व्यवस्थापन (Inventory Management)', desc: 'स्टॉक आयटम्स, ग्रुप्स, युनिट्स ऑफ मेजर, गोदाम (Godown) व बॅच-वाईज एक्सपायरी ट्रॅकिंग' },
      { name: '७. मॅन्युफॅक्चरिंग पायाभूत (Manufacturing Basics)', desc: 'Bill of Materials (BOM), उत्पादनाची नोंद (Stock Journal) व मॅन्युफॅक्चरिंग व्हाऊचर्स' },
      { name: '८. आर्थिक अहवाल व ताळेबंद (Reports & Financial Statements)', desc: 'नफा-तोटा खाते (P&L), ताळेबंद (Balance Sheet), कॅश फ्लो, BRS व स्टॉक समरी' }
    ],
    modulesEn: [
      { name: '1. Accounting Fundamentals', desc: 'Golden rules of accounting, double-entry system, journal entries, ledger setup & trial balance' },
      { name: '2. Company Creation & Configuration', desc: 'Company creation in Tally Prime, voucher types, security controls & F11/F12 settings' },
      { name: '3. Ledger & Voucher Entries', desc: 'Payment, Receipt, Sales, Purchase, Journal & Contra voucher posting' },
      { name: '4. Trading & Non-Trading Transactions', desc: 'Retail, wholesale, service sector accounting & corporate bank transactions' },
      { name: '5. GST Workflow & Invoicing', desc: 'CGST, SGST, IGST billing, GST tax invoice printing, E-Way bill generation & GSTR summary' },
      { name: '6. Inventory Management', desc: 'Stock items, groups, categories, units of measure, godown tracking & batch-wise expiry' },
      { name: '7. Manufacturing Basics', desc: 'Bill of Materials (BOM), stock journal vouchers & production cost allocation' },
      { name: '8. Reports & Financial Statements', desc: 'Profit & Loss Statement, Balance Sheet, Cash Flow, Bank Reconciliation (BRS) & Stock Summary' }
    ],
    practicalSkillsMr: [
      'प्रत्यक्ष GST इन्व्हॉईस बिलिंग व प्रिंटिंग',
      'महिन्याचे बँक जुळवणी पत्रक (BRS) तयार करणे',
      'गोदाम साठा (Stock Godown) तपासणी व ट्रॅकिंग',
      'व्यावसायिक बिलिंग व खरेदी-विक्री रजिस्टर जुळवणी',
      'ताळेबंद (Balance Sheet) व नफा-तोटा रिपोर्ट विश्लेषण'
    ],
    practicalSkillsEn: [
      'Real-world GST tax invoice creation & printing',
      'Bank Reconciliation Statement (BRS) practice',
      'Warehouse godown inventory management',
      'Sales & Purchase register reconciliation',
      'Balance Sheet & Profit & Loss statement auditing'
    ],
    careersMr: ['टॅली अकाउंटंट (शिरवळ MIDC व स्थानिक बाजारपेठ)', 'अकाउंट्स असिस्टंट / ज्युनियर अकाउंटंट', 'GST बिलिंग ऑपरेटर', 'स्टॉक व इन्व्हेंटरी मॅनेजर'],
    careersEn: ['Tally Accountant (Shirwal MIDC & Local Businesses)', 'Accounts Assistant / Junior Accountant', 'GST Billing Operator', 'Inventory & Stock Manager']
  },
  {
    id: 'advanced-excel',
    slug: 'advanced-excel',
    title: 'Advanced EXCEL',
    subtitleMr: 'VLOOKUP, पिव्होट टेबल, डॅशबोर्ड व कॉर्पोरेट डेटा ॲनालिटिक्स',
    subtitleEn: 'Data Management • Formulas • Dashboard • Reporting',
    category: 'job',
    tag: 'कॉर्पोरेट डिमांड',
    isPrimary: true,
    isFeatured: true,
    displayOrder: 3,
    logoUrl: getMediaUrl('logos/excel-logo.png'),
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    durationMr: '१.५ महिने',
    durationEn: '1.5 Months',
    certificationMr: 'समर्थ कॉम्प्युटर्स ॲडव्हान्स एक्सल एक्स्पर्ट प्रमाणपत्र',
    certificationEn: 'Samarth Computers Advanced Excel Certificate',
    eligibilityMr: 'कॉम्प्युटर बेसिक माहिती असलेले विद्यार्थी, नोकरदार, एमआयएस उमेदवार व डेटा विश्लेषक',
    eligibilityEn: 'Students, Office Executives, Accountants, MIS Aspirants & Data Analysts',
    overviewMr: 'एमआयएस आणि डेटा ॲनालिटिक्स क्षेत्रातील उच्च पगाराच्या नोकऱ्यांसाठी ॲडव्हान्स एक्सल. VLOOKUP, XLOOKUP, Pivot Tables, Conditional Formatting आणि Dynamic Dashboards शिकून कॉर्पोरेट विश्लेषक बना.',
    overviewEn: 'Master Advanced Excel for high-paying MIS and data analyst roles. Covers VLOOKUP, XLOOKUP, IF/SUMIFS, Pivot Tables, Data Cleaning, Conditional Formatting, and Dynamic Executive KPI Dashboards.',
    modulesMr: [
      { name: '१. ॲडव्हान्स फॉर्म्युले व फंक्शन्स (Advanced Formulas & Functions)', desc: 'INDEX-MATCH, HLOOKUP, XLOOKUP, नेस्टेड IF, IFERROR व लॉजिकल फॉर्म्युले' },
      { name: '२. VLOOKUP व XLOOKUP प्रभुत्व (VLOOKUP & XLOOKUP Masterclass)', desc: 'संतुलित डेटा शोध, मल्टी-टेबल लुकअप, कॉलम इंडेक्सिंग व एरर हाताळणी' },
      { name: '३. IF, SUMIFS, COUNTIFS व संबंधित फंक्शन्स (Logical & Conditional Functions)', desc: 'अटींनुसार बेरीज (SUMIFS), मोजणी (COUNTIFS), सरासरी (AVERAGEIFS) व AND/OR लॉजिक' },
      { name: '४. पिव्होट टेबल व स्लायसर (Pivot Tables & Slicers)', desc: 'मोठ्या डेटाचे विश्लेषण, ग्रुपिंग, कॅल्क्युलेटेड फील्ड्स, स्लायसर्स व टाइमलाईन' },
      { name: '५. चार्ट्स व डायनॅमिक डॅशबोर्ड (Charts & Executive Dashboards)', desc: 'कॉम्बो चार्ट्स, स्पार्कलाइन्स, KPI व्हिज्युअलायझेशन व कॉर्पोरेट डॅशबोर्ड डिझाइन' },
      { name: '६. MIS रिपोर्टिंग तंत्र (MIS Business Reporting)', desc: 'दैनिक/मासिक व्यावसायिक अहवाल ऑटोमेशन, डेटा तुलना व समरी शीट्स' },
      { name: '७. डेटा क्लीनिंग व ॲनालिसिस (Data Cleaning & Analysis)', desc: 'Text-to-Columns, Flash Fill, Data Validation ड्रॉपडाउन, डुप्लिकेट्स फिल्टरिंग व कंडिशनल फॉरमॅटिंग' }
    ],
    modulesEn: [
      { name: '1. Advanced Formulas & Functions', desc: 'INDEX-MATCH, HLOOKUP, XLOOKUP, nested IF, IFERROR, and dynamic logical arrays' },
      { name: '2. VLOOKUP & XLOOKUP Masterclass', desc: 'Exact & approximate match, multi-table lookup, column indexing & error handling' },
      { name: '3. IF, SUMIFS, COUNTIFS & Conditional Functions', desc: 'Multi-criteria summation (SUMIFS), counting (COUNTIFS), AVERAGEIFS & AND/OR logic' },
      { name: '4. Pivot Tables & Slicers', desc: 'Large dataset analysis, grouping, calculated fields, slicers, timelines & Pivot charts' },
      { name: '5. Charts & Executive Dashboards', desc: 'Combo charts, sparklines, dynamic chart ranges & KPI executive dashboards' },
      { name: '6. MIS Business Reporting', desc: 'Automated daily/monthly reporting, variance analysis & executive summaries' },
      { name: '7. Data Cleaning & Analysis', desc: 'Text-to-Columns, Flash Fill, Data Validation dropdowns, duplicate removal & conditional formatting rules' }
    ],
    practicalSkillsMr: [
      'मासिक विक्री व महसूल विश्लेषण डॅशबोर्ड',
      'कर्मचारी उपस्थिती व पगार पत्रक कॅल्क्युलेटर',
      'इन्व्हेंटरी साठा व री-ऑर्डर ट्रॅकर ऑटोमेशन',
      'Pivot Slicers सह डायनॅमिक KPI रिपोर्ट',
      'कॉर्पोरेट डेटा क्लीनिंग व फॉरमॅटिंग सराव'
    ],
    practicalSkillsEn: [
      'Monthly sales & revenue analytics dashboard',
      'Employee attendance & automated payroll calculation sheet',
      'Inventory stock tracker with re-order alert automation',
      'Dynamic KPI executive report using Pivot Slicers & Timelines',
      'Corporate raw data cleaning & formatting exercises'
    ],
    careersMr: ['MIS एक्झिक्युटिव्ह', 'डेटा ॲनालिस्ट ट्रॅनी', 'ऑपरेशनल व फायनान्स ॲनालिस्ट', 'ऑफिस डेटा मॅनेजर'],
    careersEn: ['MIS Executive', 'Data Analyst Trainee', 'Operations & Finance Analyst', 'Office Data Manager']
  },
  {
    id: 'klic-graphic-design',
    slug: 'klic-graphic-design',
    title: 'MKCL KLiC Graphic Design',
    subtitleMr: 'फोटोशॉप, कोरेलड्रॉ आणि इलस्ट्रेटर डिझायनिंग कोर्स',
    subtitleEn: 'Photoshop • CorelDRAW • Illustrator • Digital Media',
    category: 'klic',
    tag: 'क्रेएटिव्ह करिअर',
    isPrimary: false,
    isFeatured: false,
    displayOrder: 4,
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने',
    durationEn: '2 Months',
    certificationMr: 'महाराष्ट्र ज्ञान महामंडळ (MKCL KLiC)',
    certificationEn: 'Maharashtra Knowledge Corporation Limited (MKCL KLiC)',
    eligibilityMr: '१० वी / १२ वी / कला शाखेचे विद्यार्थी',
    eligibilityEn: '10th Pass, 12th Pass & Design Enthusiasts',
    overviewMr: 'ग्राफिक डिझायनिंग, फोटो एडिटींग, फ्लेक्स प्रिंटिंग बॅनर डिझाइन, लोगो मेकिंग आणि सोशल मीडिया पोस्ट डिझाइन शिकवणारा MKCL चा अधिकृत कोर्स.',
    overviewEn: 'Master Adobe Photoshop, CorelDRAW, and Illustrator for professional logo design, flex banner printing, and digital social media graphics.',
    modulesMr: [
      { name: 'Adobe Photoshop CS/CC', desc: 'फोटो एडिटींग, बॅकग्राउंड रिमूव्हल, कलर करेक्शन' },
      { name: 'CorelDRAW Graphics', desc: 'वेक्टर व्हेक्टर आर्ट, फ्लेक्स बॅनर, व्हिजिटिंग कार्ड डिझाइन' },
      { name: 'Adobe Illustrator', desc: 'लोगो मेकिंग, ब्रँडिंग आर्टवर्क, पेन टूल व्हिज्युअल्स' },
      { name: 'प्रिंट & सोशल मीडिया लेआउट्स', desc: 'CMYK प्रिंटींग फाइल्स व डिजिटल पोस्टर्स' }
    ],
    modulesEn: [
      { name: 'Adobe Photoshop', desc: 'Photo editing, background removal, skin retouching & masking' },
      { name: 'CorelDRAW Graphics', desc: 'Vector graphics, flex banner printing, business cards' },
      { name: 'Adobe Illustrator', desc: 'Logo design, brand identity, vector typography' },
      { name: 'Print & Digital Media Layouts', desc: 'CMYK press file prep & social media ad banners' }
    ],
    careersMr: ['ग्राफिक डिझायनर', 'फ्लेक्स प्रिंटिंग एक्स्पर्ट', 'सोशल मीडिया पोस्ट डिझायनर'],
    careersEn: ['Graphic Designer', 'Flex Printing Designer', 'Social Media Visual Creator']
  },
  {
    id: 'klic-web-design',
    slug: 'klic-web-design',
    title: 'MKCL KLiC Web Design',
    subtitleMr: 'HTML5, CSS3, Bootstrap आणि जावास्क्रिप्ट वेब डेव्हलपमेंट',
    subtitleEn: 'HTML5 • CSS3 • Bootstrap • JavaScript • Responsive Websites',
    category: 'klic',
    tag: 'आयटी कोडिंग',
    isPrimary: false,
    isFeatured: false,
    displayOrder: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने',
    durationEn: '2 Months',
    certificationMr: 'महाराष्ट्र ज्ञान महामंडळ (MKCL KLiC)',
    certificationEn: 'Maharashtra Knowledge Corporation Limited (MKCL KLiC)',
    eligibilityMr: '१० वी / १२ वी / आयटी डिप्लोमा / बीसीए विद्यार्थी',
    eligibilityEn: '10th Pass, 12th Pass, Diploma & Computer Science Students',
    overviewMr: 'आधुनिक रिस्पॉन्सिव्ह वेबसाईट डिझायनिंग शिकवणारा प्रॅक्टिकल कोर्स. HTML5, CSS3, Bootstrap 5 आणि जावास्क्रिप्ट कोडिंग शिकल्या नंतर लाईव्ह साईट पब्लिश करा.',
    overviewEn: 'Master HTML5, CSS3, Bootstrap 5, and JavaScript to build modern responsive mobile-first websites from scratch.',
    modulesMr: [
      { name: 'HTML5 फाऊंडेशन', desc: 'वेब पेजेस स्ट्रक्चर, टॅग्स, टेबल्स व फॉर्म्स' },
      { name: 'CSS3 स्टाइलिंग & फ्लेक्सबॉक्स', desc: 'रंग, फॉन्ट, बॉक्स मॉडेल, CSS लेआउट्स' },
      { name: 'Bootstrap 5 ग्रीड फ्रेमवर्क', desc: 'मोबाइल फ्रेंडली नेव्हबार्स, कार्ड्स व कंपोनंट्स' },
      { name: 'JavaScript फंडामेंटल्स', desc: 'DOM मॅनिप्युलेशन, फॉर्म व्हॅलिडेशन व डायनॅमिक इफेक्ट्स' }
    ],
    modulesEn: [
      { name: 'HTML5 Structure', desc: 'Web page layout, semantic tags, tables & forms' },
      { name: 'CSS3 Styling & Flexbox', desc: 'Color palettes, box model, Flexbox & CSS Grid' },
      { name: 'Bootstrap 5 Framework', desc: 'Mobile-first 12-column grid, responsive navbars & modals' },
      { name: 'JavaScript Basics', desc: 'DOM manipulation, form validation & dynamic scripts' }
    ],
    careersMr: ['फ्रंट-एंड वेब डेव्हलपर', 'UI वेब डिझायनर', 'फ्रीलान्स वेबसाईट डेव्हलपर'],
    careersEn: ['Front-End Web Developer', 'UI Web Designer', 'Freelance Web Developer']
  },
  {
    id: 'klic-hardware-networking',
    slug: 'klic-hardware-networking',
    title: 'MKCL KLiC Hardware & Networking',
    subtitleMr: 'कॉम्प्युटर असेंब्ली, ओएस फॉरमॅटिंग आणि नेटवर्क कॉन्फिगरेशन',
    subtitleEn: 'PC Assembly • OS Installation • Router Setup • Network Security',
    category: 'klic',
    tag: 'हार्डवेअर तज्ज्ञ',
    isPrimary: false,
    isFeatured: false,
    displayOrder: 6,
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने',
    durationEn: '2 Months',
    certificationMr: 'महाराष्ट्र ज्ञान महामंडळ (MKCL KLiC)',
    certificationEn: 'Maharashtra Knowledge Corporation Limited (MKCL KLiC)',
    eligibilityMr: '१० वी / १२ वी उत्तीर्ण',
    eligibilityEn: '10th Pass or above',
    overviewMr: 'कॉम्प्युटर असेंब्ली, मदरबोर्ड जोडणी, Windows फॉरमॅटिंग, लॅन केबल क्रिम्पिंग, वायफाय राउटर कॉन्फिगरेशन आणि रिपेअरिंग शिकवणारा प्रॅक्टिकल कोर्स.',
    overviewEn: 'Master desktop PC assembly, OS formatting, hardware troubleshooting, CAT6 cable crimping, and LAN router setup.',
    modulesMr: [
      { name: 'कॉम्प्युटर पार्ट्स् & असेंब्ली', desc: 'मदरबोर्ड, CPU, RAM, SSD, SMPS कनेक्शन' },
      { name: 'BIOS & Windows फॉरमॅटिंग', desc: 'बूट करण्यायोग्य पेनड्राइव्ह, OS इन्स्टॉलेशन व ड्रायव्हर्स' },
      { name: 'LAN नेटवर्किंग & केबल क्रिम्पिंग', desc: 'CAT6 केबल, RJ45 सॉकेट क्रिम्पिंग व आयपी ॲड्रेसिंग' },
      { name: 'वायफाय राउटर & ट्रबलशूटिंग', desc: 'राउटर सेटिंग्ज, नेटवर्क सिक्युरिटी व रिपेअरिंग' }
    ],
    modulesEn: [
      { name: 'PC Components & Assembly', desc: 'Motherboard, CPU, RAM, SSD & SMPS installation' },
      { name: 'BIOS & OS Formatting', desc: 'Bootable USB, Windows 11 formatting & driver setup' },
      { name: 'LAN Networking & Crimping', desc: 'CAT6 cable, RJ45 crimping & IP addressing' },
      { name: 'Wi-Fi Router & Troubleshooting', desc: 'Router configuration, network security & PC repair' }
    ],
    careersMr: ['हार्डवेअर तंत्रज्ञ', 'आयटी सपोर्ट इंजिनिअर', 'नेटवर्क असिस्टंट'],
    careersEn: ['Hardware Technician', 'IT Support Engineer', 'Network Assistant']
  },
  {
    id: 'klic-autocad',
    slug: 'klic-autocad',
    title: 'MKCL KLiC AutoCAD',
    subtitleMr: '२डी ड्राफ्टिंग आणि ३डी आर्किटेक्चरल प्लॅन्स',
    subtitleEn: '2D Drafting • 3D Architectural Plans • Building Layouts',
    category: 'klic',
    tag: 'सिव्हिल ड्राफ्टिंग',
    isPrimary: false,
    isFeatured: false,
    displayOrder: 7,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने',
    durationEn: '2 Months',
    certificationMr: 'महाराष्ट्र ज्ञान महामंडळ (MKCL KLiC)',
    certificationEn: 'Maharashtra Knowledge Corporation Limited (MKCL KLiC)',
    eligibilityMr: '१० वी / आयटीआय / डिप्लोमा सिव्हिल / बी.ई. सिव्हिल',
    eligibilityEn: '10th / ITI / Diploma Civil / BE Civil or Mechanical',
    overviewMr: 'सिव्हिल इंजिनिअरिंग, बांधकाम आणि वास्तूशास्त्रासाठी २डी ऑटोकॅड ड्राफ्टिंग. बिल्डिंग 2BHK प्लॅन्स, एलिव्हेशन, लेयर्स व प्रिंटिंग लेआउट्स शिकवले जातात.',
    overviewEn: 'Master 2D & 3D AutoCAD drafting for civil engineering building plans, house layouts, and architectural elevations.',
    modulesMr: [
      { name: 'AutoCAD २डी कमांड्स', desc: 'Line, Circle, Offset, Trim, Modify कमांड्स' },
      { name: 'बिल्डिंग 2BHK प्लॅन ड्राफ्टिंग', desc: 'घराचे प्लॅन्स, दारे-खिडक्या मोजमापे व लेयर्स' },
      { name: 'एलिव्हेशन & हॅचिंग', desc: 'फ्रंट एलिव्हेशन, सेक्शनल व्ह्यू व हॅच पॅटर्न' },
      { name: 'प्लॉटिंग & ब्लू प्रिंट्स', desc: 'स्केल प्रिंटिंग व शासकीय मंजुरी प्लॅन लेआउट्स' }
    ],
    modulesEn: [
      { name: 'AutoCAD 2D Commands', desc: 'Line, Circle, Offset, Trim, Modify & Snap tools' },
      { name: 'Building Floor Plans', desc: '2BHK residential plans, door/window schedules & layers' },
      { name: 'Elevations & Hatching', desc: 'Front elevation, sectional view & wall hatching' },
      { name: 'Plotting \u0026 Blueprints', desc: 'Scale printing \u0026 municipal sanction drawing layouts' }
    ],
    careersMr: ['ऑटोकॅड ड्राफ्ट्समन (सिव्हिल)', 'कन्स्ट्रक्शन CAD ऑपरेटर'],
    careersEn: ['AutoCAD Draftsman (Civil)', 'CAD Operator in Construction']
  },
  {
    id: 'diploma-financial-accounting',
    slug: 'diploma-financial-accounting',
    title: 'Diploma in Financial Accounting',
    subtitleMr: 'व्यावसायिक लेखांकन, फायनान्शियल स्टेटमेंट्स आणि ऑडिटिंग',
    subtitleEn: 'Accounting • Financial Statements • Budgeting • Auditing',
    category: 'job',
    tag: 'फायनान्स करिअर',
    isPrimary: true,
    isFeatured: true,
    displayOrder: 8,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    durationMr: '३ महिने',
    durationEn: '3 Months',
    certificationMr: 'समर्थ कॉम्प्युटर्स डिप्लोमा इन फायनान्शियल अकाउंटिंग प्रमाणपत्र',
    certificationEn: 'Samarth Computers Diploma in Financial Accounting Certificate',
    eligibilityMr: '१२ वी (कॉमर्स) / बी.कॉम / कोणत्याही शाखेचे विद्यार्थी',
    eligibilityEn: '12th Commerce / B.Com / Any Graduate or Job Seeker',
    overviewMr: 'व्यावसायिक लेखांकनाचे संपूर्ण ज्ञान — जर्नल, लेजर, ट्रायल बॅलन्स, फायनल अकाउंट्स, GST बिलिंग, Tally Prime आणि फायनान्शियल रेशो ॲनालिसिस शिकवणारा सर्वसमावेशक डिप्लोमा कोर्स.',
    overviewEn: 'Comprehensive diploma covering Journal entries, Ledger, Trial Balance, Final Accounts (P&L and Balance Sheet), GST billing, Tally Prime, and financial ratio analysis for real-world finance careers.',
    modulesMr: [
      { name: 'अकाउंटिंग फाऊंडेशन', desc: 'जर्नल, लेजर, ट्रायल बॅलन्स, दुहेरी नोंद पद्धत' },
      { name: 'फायनल अकाउंट्स तयार करणे', desc: 'नफा-तोटा खाते, ताळेबंद, कॅश फ्लो स्टेटमेंट' },
      { name: 'GST बिलिंग \u0026 रिटर्न', desc: 'GST नोंदणी, GSTR-1, GSTR-3B, E-Invoice' },
      { name: 'Tally Prime इंटीग्रेशन', desc: 'Tally मध्ये अकाउंटिंग, इन्व्हेंटरी व रिपोर्ट' },
      { name: 'फायनान्शियल ॲनालिसिस', desc: 'रेशो ॲनालिसिस, बजेटिंग, ऑडिट तपासणी' }
    ],
    modulesEn: [
      { name: 'Accounting Fundamentals', desc: 'Journal entries, Ledger posting, Trial Balance, Double-entry' },
      { name: 'Final Account Preparation', desc: 'Profit & Loss, Balance Sheet, Cash Flow Statements' },
      { name: 'GST Billing & Returns', desc: 'GST registration, GSTR-1, GSTR-3B, E-Invoice filing' },
      { name: 'Tally Prime Integration', desc: 'Accounting, inventory & reporting inside Tally Prime' },
      { name: 'Financial Analysis & Audit', desc: 'Ratio analysis, budgeting, internal audit basics' }
    ],
    careersMr: ['जूनिअर अकाउंटंट', 'GST कन्सल्टंट', 'बँक क्लर्क परीक्षा तयारी'],
    careersEn: ['Junior Accountant', 'GST Consultant', 'Finance Executive', 'Bank Clerk Aspirant']
  },
  {
    id: 'share-market-banking',
    slug: 'share-market-banking',
    title: 'Share Market / Banking & Finance',
    subtitleMr: 'शेअर मार्केट, म्युच्युअल फंड, बँकिंग आणि फायनान्शियल प्लॅनिंग',
    subtitleEn: 'Stock Market • Mutual Funds • Banking Basics • Financial Planning',
    category: 'job',
    tag: 'इन्व्हेस्टमेंट करिअर',
    isPrimary: true,
    isFeatured: true,
    displayOrder: 9,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने',
    durationEn: '2 Months',
    certificationMr: 'समर्थ कॉम्प्युटर्स शेअर मार्केट \u0026 फायनान्स प्रमाणपत्र',
    certificationEn: 'Samarth Computers Share Market & Finance Certificate',
    eligibilityMr: '१२ वी उत्तीर्ण / कोणत्याही शाखेचे विद्यार्थी / नोकरदार',
    eligibilityEn: '12th Pass or above, Investors & Finance Enthusiasts',
    overviewMr: 'NSE/BSE शेअर मार्केट, Demat अकाउंट उघडणे, IPO, म्युच्युअल फंड, SIP इन्व्हेस्टमेंट, बँकिंग प्रक्रिया आणि पर्सनल फायनान्शियल प्लॅनिंग शिकवणारा व्यावहारिक कोर्स.',
    overviewEn: 'Practical course covering NSE/BSE stock market, opening Demat accounts, IPO investing, Mutual Funds, SIP planning, banking processes, and personal financial management.',
    modulesMr: [
      { name: 'शेअर मार्केट मूलभूत', desc: 'NSE/BSE, Demat अकाउंट, ब्रोकर निवड, IPO अर्ज' },
      { name: 'टेक्निकल ॲनालिसिस', desc: 'चार्ट रीडिंग, कँडलस्टिक पॅटर्न, सपोर्ट-रेझिस्टन्स' },
      { name: 'म्युच्युअल फंड \u0026 SIP', desc: 'फंड निवड, SIP कॅल्क्युलेटर, NAV, ELSS टॅक्स बेनिफिट' },
      { name: 'बँकिंग प्रक्रिया', desc: 'बँक अकाउंट, FD, RD, लोन प्रक्रिया, NEFT/RTGS' },
      { name: 'पर्सनल फायनान्शियल प्लॅनिंग', desc: 'बजेट, बचत योजना, जीवन विमा, आयकर मूलभूत' }
    ],
    modulesEn: [
      { name: 'Stock Market Fundamentals', desc: 'NSE/BSE, Demat account, broker selection, IPO applications' },
      { name: 'Technical Analysis', desc: 'Chart reading, candlestick patterns, support & resistance' },
      { name: 'Mutual Funds & SIP', desc: 'Fund selection, SIP calculator, NAV, ELSS tax saving' },
      { name: 'Banking Processes', desc: 'Bank accounts, FD/RD, loans, NEFT/RTGS/UPI transfers' },
      { name: 'Personal Financial Planning', desc: 'Budgeting, savings plans, life insurance, income tax basics' }
    ],
    careersMr: ['शेअर मार्केट ट्रेडर', 'म्युच्युअल फंड एजंट', 'फायनान्शियल प्लॅनर'],
    careersEn: ['Stock Market Trader', 'Mutual Fund Distributor', 'Financial Planner', 'Bank Sales Executive']
  },
  {
    id: 'work-from-home-tools',
    slug: 'work-from-home-tools',
    title: 'Work From Home Tools',
    subtitleMr: 'घरातून काम करण्यासाठी डिजिटल टूल्स आणि फ्रीलान्सिंग स्किल्स',
    subtitleEn: 'Remote Work • Digital Tools • Freelancing • Online Income',
    category: 'job',
    tag: 'फ्रीलान्सिंग',
    isPrimary: true,
    isFeatured: true,
    displayOrder: 10,
    imageUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80',
    durationMr: '१.५ महिने',
    durationEn: '1.5 Months',
    certificationMr: 'समर्थ कॉम्प्युटर्स वर्क फ्रॉम होम टूल्स प्रमाणपत्र',
    certificationEn: 'Samarth Computers Work From Home Tools Certificate',
    eligibilityMr: 'गृहिणी, विद्यार्थी, नोकरदार — कोणीही शिकू शकतो',
    eligibilityEn: 'Housewives, Students, Job Seekers & Working Professionals',
    overviewMr: 'घरून ऑनलाइन काम करण्यासाठी आवश्यक डिजिटल टूल्स — Zoom/Google Meet, Google Workspace, Canva डिझाइन, ChatGPT, Fiverr/Upwork फ्रीलान्सिंग, डिजिटल मार्केटिंग आणि ऑनलाइन पेमेंट सेटअप शिकवणारा प्रॅक्टिकल कोर्स.',
    overviewEn: 'Practical course on digital tools for remote work and online income — Zoom/Google Meet, Google Workspace, Canva design, ChatGPT AI, Fiverr/Upwork freelancing, and digital marketing basics.',
    modulesMr: [
      { name: 'व्हिडिओ कॉन्फरन्सिंग टूल्स', desc: 'Zoom, Google Meet, MS Teams — मीटिंग व स्क्रीन शेअर' },
      { name: 'Google Workspace', desc: 'Gmail, Drive, Docs, Sheets, Forms व Calendar' },
      { name: 'Canva डिझाइन', desc: 'पोस्टर, रिज्युमे, सोशल मीडिया व YouTube थंबनेल' },
      { name: 'ChatGPT \u0026 AI टूल्स', desc: 'कंटेंट लेखन, अनुवाद, AI इमेज व ऑटोमेशन' },
      { name: 'फ्रीलान्सिंग \u0026 ऑनलाइन कमाई', desc: 'Fiverr/Upwork प्रोफाइल, गिग तयार करणे, UPI पेमेंट' }
    ],
    modulesEn: [
      { name: 'Video Conferencing Tools', desc: 'Zoom, Google Meet, MS Teams — meetings & screen sharing' },
      { name: 'Google Workspace', desc: 'Gmail, Drive, Docs, Sheets, Forms & Calendar' },
      { name: 'Canva Design', desc: 'Posters, resume, social media & YouTube thumbnail design' },
      { name: 'ChatGPT & AI Tools', desc: 'Content writing, translation, AI image creation & automation' },
      { name: 'Freelancing & Online Income', desc: 'Fiverr/Upwork profile, gig creation, UPI payment setup' }
    ],
    careersMr: ['फ्रीलान्स कंटेंट रायटर', 'सोशल मीडिया मॅनेजर', 'व्हर्च्युअल असिस्टंट'],
    careersEn: ['Freelance Content Writer', 'Social Media Manager', 'Virtual Assistant', 'Online Tutor']
  }
];
