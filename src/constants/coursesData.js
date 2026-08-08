/**
 * Centralized Production Course Database
 * Handcrafted comprehensive catalog for Samarth Computers, Khandala.
 * Includes MS-CIT, Tally Prime + GST, Advanced Excel, and KLiC Career Courses.
 */
export const COURSES_DATA = [
  {
    id: 'mscit',
    slug: 'mscit',
    title: 'MS-CIT (MKCL Certified)',
    subtitleMr: 'आंतरराष्ट्रीय दर्जाचा परिपूर्ण कॉम्प्युटर कोर्स',
    subtitleEn: 'Complete Computer Theory & Practical with Certification',
    category: 'govt',
    tag: 'सर्वात लोकप्रिय',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने (रोज २ तास) किंवा ३ महिने (रोज १ तास)',
    durationEn: '2 Months (2 hrs/day) or 3 Months (1 hr/day)',
    certificationMr: 'महाराष्ट्र ज्ञान महामंडळ (MKCL) व महाराष्ट्र शासन',
    certificationEn: 'Maharashtra Knowledge Corporation Limited (MKCL) & Govt of Maharashtra',
    eligibilityMr: 'इयत्ता ५ वी पुढील सर्व विद्यार्थी, नागरिक व नोकरदार',
    eligibilityEn: 'Students 5th Standard & Above, Job Seekers, Housewives & Seniors',
    overviewMr: 'MS-CIT हा महाराष्ट्र शासनाचा सर्वात लोकप्रिय आंतरराष्ट्रीय दर्जाचा कॉम्प्युटर कोर्स आहे. यामध्ये कम्प्युटर थिअरी, प्रॅक्टिकल, AI पॉवर्ड लर्निंग, Windows 11, MS Office 2021 आणि डिजिटल लाईफ स्किल्स शिकवले जातात.',
    overviewEn: 'MS-CIT is Maharashtra’s flagship IT literacy program featuring AI-Powered Learning, Windows 11, MS Office 2021, internet safety, and essential digital skills.',
    modulesMr: [
      { name: 'संगणक पायाभूत ज्ञान (Fundamentals)', desc: 'Windows 11, फाइल मॅनेजमेंट, कॉम्प्युटर सेटिंग्ज' },
      { name: 'MS Word 2021 (डॉक्युमेंटेशन)', desc: 'पत्रव्यवहार, रिज्युमे बनवणे, रिपोर्ट टायपिंग, मेल मर्ज' },
      { name: 'MS Excel 2021 (डेटा मॅनेजमेंट)', desc: 'स्प्रेडशीट, फॉर्म्युले, चार्ट्स, बजेट व फिल्टरिंग' },
      { name: 'MS PowerPoint 2021 (प्रेझेंटेशन)', desc: 'ॲनिमेशन, व्हिज्युअल स्लाइड्स व व्हिडिओ प्रेझेंटेशन' },
      { name: 'AI & डिजिटल टूल्स', desc: 'ChatGPT, AI सर्च, ऑनलाइन पेमेंट, डिजी लॉकर व महाऑनलाइन सेवा' }
    ],
    modulesEn: [
      { name: 'Computer Operating & Windows 11', desc: 'Operating basics, file management, settings' },
      { name: 'MS Word 2021', desc: 'Letter drafting, resume building, mail merge' },
      { name: 'MS Excel 2021', desc: 'Data management, formulas, charts, budgets' },
      { name: 'MS PowerPoint 2021', desc: 'Slide animations, visual presentations, video export' },
      { name: 'AI & Digital Life Tools', desc: 'ChatGPT, AI search, UPI safety, DigiLocker & MahaOnline' }
    ],
    careersMr: ['सरकारी लिपिक भरतीसाठी आवश्यक', 'डाटा एंट्री ऑपरेटर', 'ऑफिस असिस्टंट'],
    careersEn: ['Mandatory for Govt Clerk Exams', 'Data Entry Operator', 'Office Assistant']
  },
  {
    id: 'tally-prime-gst',
    slug: 'tally-prime-gst',
    title: 'Tally Prime - Accounting & GST',
    subtitleMr: 'प्रॅक्टिकल अकाउंटिंग, GST इन्व्हॉईसिंग आणि टॅली ऑथोराईज्ड प्रमाणपत्र',
    subtitleEn: 'TALLY PRIME - Accounting & GST Made Easy',
    category: 'job',
    tag: 'नोकरीसाठी १००% उपयुक्त',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    durationMr: '२ महिने (रोज २ तास)',
    durationEn: '2 Months (2 hrs/day)',
    certificationMr: 'टॅली एज्युकेशन प्रा. लि. (Tally Authorized Certificate)',
    certificationEn: 'Tally Education Pvt. Ltd. Authorized Certificate',
    eligibilityMr: '१० वी / १२ वी / बी.कॉम / एम.कॉम विद्यार्थी व व्यावसायिक',
    eligibilityEn: 'Commerce Students, Job Seekers, Shopkeepers & Accountants',
    overviewMr: 'Tally Prime हा प्रॅक्टिकल व्यावसायिक अकाउंटिंग शिकवणारा कोर्स आहे. लेजर क्रिएशन, GST इन्व्हॉईसिंग, E-Way बिल, पेरोल, TDS आणि टॅली ऑडिट शिकून शिरवळ MIDC मध्ये नोकरी मिळवा.',
    overviewEn: 'Comprehensive practical accounting training. Master Tally Prime, GST invoicing, E-Way bills, payroll, TDS, and corporate financial reporting.',
    modulesMr: [
      { name: 'अकाउंटिंग तत्त्वे व नियमावली', desc: 'गोल्डन रूल्स, जर्नल एंट्रीज, लेजर क्लासिफिकेशन' },
      { name: 'Tally Prime कंपनी सेटअप', desc: 'कंपनी क्रिएशन, लेजर्स, सिक्युरिटीज व F11/F12 फीचर्स' },
      { name: 'GST इन्व्हॉईसिंग & बिलिंग', desc: 'CGST, SGST, IGST बिलिंग, डेबिट/क्रेडिट नोट्स & E-Way बिल' },
      { name: 'इन्व्हेंटरी & स्टॉक मॅनेजमेंट', desc: 'स्टॉक ग्रुप्स, युनिट्स, बॅच-वाईज एक्सपायरी ट्रॅकिंग' },
      { name: 'पेरोल, TDS & फायनान्शियल रिपोर्ट्स', desc: 'पगार पत्रक, PF, TDS कपात, BRS व ताळेबंद (Balance Sheet)' }
    ],
    modulesEn: [
      { name: 'Accounting Fundamentals', desc: 'Golden rules, journal entries, ledger setup' },
      { name: 'Tally Prime Company Setup', desc: 'Company creation, ledger hierarchy & F11/F12 settings' },
      { name: 'GST Billing & Invoicing', desc: 'CGST, SGST, IGST & E-Way bills generation' },
      { name: 'Inventory & Stock Management', desc: 'Stock items, batch-wise expiry & warehouse tracking' },
      { name: 'Payroll, TDS & Financial Auditing', desc: 'Pay slips, PF, TDS, Bank Reconciliation & Balance Sheet' }
    ],
    careersMr: ['टॅली अकाउंटंट (शिरवळ MIDC)', 'अकाउंट्स असिस्टंट', 'GST बिलिंग ऑपरेटर'],
    careersEn: ['Tally Accountant (Shirwal MIDC)', 'Accounts Executive', 'GST Billing Operator']
  },
  {
    id: 'advanced-excel',
    slug: 'advanced-excel',
    title: 'Advanced EXCEL',
    subtitleMr: 'VLOOKUP, पिव्होट टेबल, डॅशबोर्ड व कॉर्पोरेट डेटा ॲनालिटिक्स',
    subtitleEn: 'Data Management • Formulas • Dashboard • Reporting',
    category: 'job',
    tag: 'कॉर्पोरेट डिमांड',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    durationMr: '१.५ महिने',
    durationEn: '1.5 Months',
    certificationMr: 'समर्थ कॉम्प्युटर्स ॲडव्हान्स एक्सल एक्स्पर्ट प्रमाणपत्र',
    certificationEn: 'Samarth Computers Advanced Excel Certificate',
    eligibilityMr: 'कॉम्प्युटर बेसिक माहित असलेले विद्यार्थी व नोकरदार',
    eligibilityEn: 'Students, Working Professionals & MIS Aspirants',
    overviewMr: 'एमआयएस आणि डेटा ॲनालिटिक्स क्षेत्रातील उच्च पगाराच्या नोकऱ्यांसाठी ॲडव्हान्स एक्सल. VLOOKUP, XLOOKUP, Pivot Tables, Conditional Formatting आणि Dynamic Dashboards शिकवले जातात.',
    overviewEn: 'Master Advanced Excel for high-paying MIS and data analyst roles. Covers VLOOKUP, XLOOKUP, Pivot Tables, Conditional Formatting, and Dynamic KPI Dashboards.',
    modulesMr: [
      { name: 'ॲडव्हान्स फॉर्म्युले & लुकअप्स', desc: 'VLOOKUP, XLOOKUP, INDEX-MATCH, IF-THEN, SUMIFS' },
      { name: 'डेटा क्लीनिंग & टेक्स टू कॉलम्स', desc: 'Text-to-Columns, Flash Fill, Data Validation ड्रॉपडाउन' },
      { name: 'पिव्होट टेबल & स्लायसर', desc: 'डेटा विश्लेषणासाठी पिव्होट तक्ते, चार्ट्स व टाइमलाईन' },
      { name: 'कंडिशनल फॉरमॅटिंग', desc: 'हायलाईट रूल्स, डेटा बार्स, डुप्लिकेट्स फिल्टरिंग' },
      { name: 'डायनॅमिक डॅशबोर्ड & पॉवर क्वेरी', desc: 'कॉर्पोरेट रिपोर्टिंग डॅशबोर्ड डिझाइन व मॅक्रो ऑटोमेशन' }
    ],
    modulesEn: [
      { name: 'Advanced Lookup Formulas', desc: 'VLOOKUP, XLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS' },
      { name: 'Data Cleaning & Management', desc: 'Text-to-Columns, Flash Fill, Data Validation dropdowns' },
      { name: 'Pivot Tables & Slicers', desc: 'Large dataset analysis with Pivot Charts & Timelines' },
      { name: 'Conditional Formatting', desc: 'Data bars, color scales, dynamic formula rules' },
      { name: 'Executive Dashboards & Power Query', desc: 'Building corporate KPI dashboards & basic Macro automation' }
    ],
    careersMr: ['MIS एक्झिक्युटिव्ह', 'डेटा ॲनालिस्ट ट्रॅनी', 'ऑपरेशनल ॲनालिस्ट'],
    careersEn: ['MIS Executive', 'Data Analyst Trainee', 'Operations Analyst']
  },
  {
    id: 'klic-graphic-design',
    slug: 'klic-graphic-design',
    title: 'MKCL KLiC Graphic Design',
    subtitleMr: 'फोटोशॉप, कोरेलड्रॉ आणि इलस्ट्रेटर डिझायनिंग कोर्स',
    subtitleEn: 'Photoshop • CorelDRAW • Illustrator • Digital Media',
    category: 'design',
    tag: 'क्रेएटिव्ह करिअर',
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
    category: 'job',
    tag: 'आयटी कोडिंग',
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
    category: 'job',
    tag: 'हार्डवेअर तज्ज्ञ',
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
    category: 'design',
    tag: 'सिव्हिल ड्राफ्टिंग',
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
      { name: 'Plotting & Blueprints', desc: 'Scale printing & municipal sanction drawing layouts' }
    ],
    careersMr: ['ऑटोकॅड ड्राफ्ट्समन (सिव्हिल)', 'कन्स्ट्रक्शन CAD ऑपरेटर'],
    careersEn: ['AutoCAD Draftsman (Civil)', 'CAD Operator in Construction']
  }
];
