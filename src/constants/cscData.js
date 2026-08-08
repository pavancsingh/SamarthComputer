/**
 * Centralized CSC & Government Online Services Data Catalog
 * Contains detailed specifications, required document checklists, and processing timelines.
 */
export const CSC_SERVICES_DATA = [
  {
    id: 'pan-card',
    slug: 'pan-card',
    titleMr: 'झटपट पॅन कार्ड (Instant PAN Card)',
    titleEn: 'Instant PAN Card Application & Correction',
    category: 'identity',
    badge: 'झटपट २ तासात ई-पॅन',
    timelineMr: '२ ते २४ तास (ई-पॅन), ७ ते १० दिवस (फिजिकल कार्ड)',
    timelineEn: '2-24 Hours (E-PAN), 7-10 Days (Physical Card)',
    govtFeeMr: '₹१०७ (शासकीय शुल्क) + सेतू प्रक्रिया फी',
    govtFeeEn: '₹107 (Govt Fee) + Processing Charge',
    overviewMr: 'नवीन पॅन कार्ड काढणे किंवा जुन्या पॅन कार्डमध्ये नाव, जन्मतारीख व पत्ता दुरुस्ती करणे. आधार कार्ड लिंक करून फक्त २ तासात डिजिटल ई-पॅन प्राप्त करा.',
    overviewEn: 'Apply for a new PAN card or request corrections in name, date of birth, or photo. Get digital E-PAN in just 2 hours via Aadhaar biometric/OTP verification.',
    requiredDocsMr: [
      'आधार कार्ड (Aadhaar Card)',
      '२ नवीन पासपोर्ट साईझ फोटो',
      'आधार कार्डशी लिंक असलेला मोबाईल नंबर',
      'जुन्या पॅन कार्डची प्रत (दुरुस्तीसाठी असल्यास)'
    ],
    requiredDocsEn: [
      'Aadhaar Card copy',
      '2 Recent Passport Size Photographs',
      'Aadhaar Linked Active Mobile Number',
      'Copy of Existing PAN Card (If requesting correction)'
    ],
    stepsMr: [
      'केंद्रावर आधार कार्ड घेऊन या.',
      'बायोमेट्रिक (अंगठा) किंवा मोबाईल OTP द्वारे व्हेरिफिकेशन करा.',
      '२ तासात तुमच्या ईमेल व व्हाट्सॲपवर ई-पॅन प्राप्त करा.'
    ],
    stepsEn: [
      'Visit center with Aadhaar Card.',
      'Verify via Aadhaar OTP or Biometric Thumb scan.',
      'Receive digital E-PAN PDF on your WhatsApp within 2 hours.'
    ]
  },
  {
    id: 'income-certificate',
    slug: 'income-certificate',
    titleMr: 'उत्पन्न दाखला (Income Certificate)',
    titleEn: 'Income Certificate (1 Year & 3 Years)',
    category: 'certificates',
    badge: 'तहसीलदार मान्यताप्राप्त',
    timelineMr: '३ ते ५ कार्यदिवस',
    timelineEn: '3-5 Working Days',
    govtFeeMr: '₹५६ (आपले सरकार पोर्टल शुल्क)',
    govtFeeEn: '₹56 (Aaple Sarkar Portal Fee)',
    overviewMr: 'शासकीय शिष्यवृत्ती, कॉलेज प्रवेश, रेशन कार्ड व विविध योजनांसाठी १ वर्ष किंवा ३ वर्षाचा तहसीलदार स्वाक्षरीचा अधिकृत उत्पन्नाचा दाखला.',
    overviewEn: 'Official Tehsildar signed Income Certificate valid for 1 year or 3 years. Essential for college scholarship applications, fee concessions, and government welfare schemes.',
    requiredDocsMr: [
      'रेशन कार्ड प्रत (Ration Card Copy)',
      'तलाठी उत्पन्नाचा दाखला किंवा बँक पासबुक',
      'अर्जदाराचे आधार कार्ड',
      'स्वयंघोषणा पत्र (केंद्रामध्ये उपलब्ध)'
    ],
    requiredDocsEn: [
      'Ration Card Copy',
      'Talathi Income Certificate or Bank Passbook',
      'Applicant Aadhaar Card',
      'Self-Declaration Form (Provided at center)'
    ],
    stepsMr: [
      'कागदपत्रांची सेतू केंद्रामध्ये तपासणी.',
      'आपले सरकार पोर्टलवर ऑनलाइन अर्ज सादर करणे.',
      'डिजिटल स्वाक्षरीचा दाखला प्राप्त करणे.'
    ],
    stepsEn: [
      'Document verification at center desk.',
      'Online application on Aaple Sarkar portal.',
      'Receive digitally signed Tehsildar certificate.'
    ]
  },
  {
    id: 'gazette',
    slug: 'gazette',
    titleMr: 'महाराष्ट्र राजपत्र (Govt Gazette)',
    titleEn: 'Maharashtra Govt Gazette (Name Change)',
    category: 'identity',
    badge: 'शासकीय नाव बदल',
    timelineMr: '७ ते १५ दिवस',
    timelineEn: '7-15 Working Days',
    govtFeeMr: '₹५२० ते ₹१,०२० (शासकीय गॅझेट फी)',
    govtFeeEn: '₹520 to ₹1,020 (Official Gazette Fee)',
    overviewMr: 'लग्नानंतर नाव बदल, नावातील स्पेलिंग दुरुस्ती, धर्म बदल किंवा जन्मतारीख बदल करण्यासाठी महाराष्ट्र शासनाच्या अधिकृत राजपत्रात (Gazette) नाव प्रसिद्ध करणे.',
    overviewEn: 'Official Maharashtra Government Gazette publication for name change after marriage, spelling correction, religion change, or date of birth correction across all legal identity documents.',
    requiredDocsMr: [
      'आधार कार्ड व पॅन कार्ड',
      'नाव बदलाचे कारण (उदा. मॅरेज सर्टिफिकेट किंवा शपथपत्र)',
      '२ पासपोर्ट साईझ फोटो',
      'जाहिरात नमुना फॉर्म'
    ],
    requiredDocsEn: [
      'Aadhaar Card & PAN Card',
      'Marriage Certificate or Affidavit stating reason for name change',
      '2 Passport Size Photos',
      'Gazette Application Declaration Form'
    ],
    stepsMr: [
      'शपथपत्र व गॅझेट फॉर्म भरणे.',
      'शासकीय मुद्रणालयाच्या पोर्टलर अर्ज अपलोड करणे.',
      'अधिकृत गॅझेट ई-बुक PDF डाऊनलोड करणे.'
    ],
    stepsEn: [
      'Drafting affidavit and Gazette application form.',
      'Uploading to Govt Printing Press online portal.',
      'Downloading official Gazette PDF e-book.'
    ]
  },
  {
    id: 'shop-act',
    slug: 'shop-act',
    titleMr: 'शॉप ॲक्ट लायसन्स (Gumasta)',
    titleEn: 'Shop Act License (Gumasta Registration)',
    category: 'business',
    badge: '२४ तासात लायसन्स',
    timelineMr: '२४ ते ४८ तास',
    timelineEn: '24-48 Hours',
    govtFeeMr: 'कामगार विभाग नियमानुसार',
    govtFeeEn: 'Labour Dept Approved Fee',
    overviewMr: 'नवीन दुकान, व्यवसाय, हॉटेल, मेडिकल किंवा सर्व्हिस सेंटर सुरू करण्यासाठी कामगार विभागाचेShop Act (गुमास्ता) लायसन्स. बँक खाते उघडण्यासाठी अत्यंत आवश्यक.',
    overviewEn: 'Mandatory Shop Act (Gumasta) License issued by Labour Department for opening any new shop, retail store, hotel, medical store, or business. Required for opening business current bank accounts.',
    requiredDocsMr: [
      'दुकानाचा फोटो (बोर्ड स्पष्ट दिसेल असा)',
      'व्यवसाय मालकाचे आधार कार्ड व पॅन कार्ड',
      'जागेचा पुरावा (लाइट बिल किंवा भाडेकरार)'
    ],
    requiredDocsEn: [
      'Clear Photograph of Shop with Signboard',
      'Owner Aadhaar Card & PAN Card',
      'Address Proof (Electricity Bill or Rent Agreement)'
    ],
    stepsMr: [
      'दुकानाचा फोटो व कागदपत्रे जमा करा.',
      'कामगार विभाग पोर्टलवर ऑनलाईन अर्ज.',
      '२४ तासात अधिकृत लायसन्स प्रिंट मिळवा.'
    ],
    stepsEn: [
      'Submit shop photo & identity proofs.',
      'Online filing on Labour Department portal.',
      'Receive official Shop Act License within 24 hours.'
    ]
  },
  {
    id: 'udyam-registration',
    slug: 'udyam-registration',
    titleMr: 'उद्यम MSME नोंदणी (Udyam Registration)',
    titleEn: 'Udyam MSME Government Registration',
    category: 'business',
    badge: 'मोफत शासकीय दाखला',
    timelineMr: 'त्याच दिवशी डाउनलोड',
    timelineEn: 'Same Day Processing',
    govtFeeMr: 'मोफत (फक्त प्रक्रिया फी)',
    govtFeeEn: 'Free (Only Service Charge)',
    overviewMr: 'लहान व मध्यम उद्योगांसाठी केंद्र सरकारचे अधिकृत MSME उद्यम नोंदणी प्रमाणपत्र. बँक कर्ज, सरकारी सबसिडी आणि टेंडरसाठी आवश्यक.',
    overviewEn: 'Official Central Government MSME Udyam Registration Certificate for micro, small, and medium enterprises. Essential for collateral-free bank loans and govt subsidies.',
    requiredDocsMr: [
      'आधार कार्ड (मोबाईल नंबर लिंक)',
      'पॅन कार्ड',
      'बँक पासबुक / रद्द केलेला चेक'
    ],
    requiredDocsEn: [
      'Aadhaar Card (Mobile Linked)',
      'PAN Card',
      'Bank Passbook / Cancelled Cheque'
    ],
    stepsMr: [
      'आधार ओटीपी व्हेरिफिकेशन.',
      'उद्योगाचे नाव व गुंतवणूक माहिती भरणे.',
      'झटपट MSME दाखला डाऊनलोड करणे.'
    ],
    stepsEn: [
      'Aadhaar OTP verification.',
      'Entering business investment & turnover details.',
      'Instant download of MSME Udyam Certificate.'
    ]
  }
];
