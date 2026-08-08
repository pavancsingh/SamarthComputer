/**
 * Centralized Government Online Services Data Catalog
 * Detailed specifications for Maharashtra Government & Central Govt Portal online application services.
 */
export const GOVT_SERVICES_DATA = [
  {
    id: 'caste-certificate',
    slug: 'caste-certificate',
    titleMr: 'जातीचा दाखला (Caste Certificate)',
    titleEn: 'Caste Certificate Application',
    category: 'revenue',
    badge: 'उपविभागीय अधिकारी (SDO) स्वाक्षरी',
    timelineMr: '१५ ते २१ कार्यदिवस',
    timelineEn: '15-21 Working Days',
    govtFeeMr: '₹५६ (आपले सरकार पोर्टलकडून)',
    govtFeeEn: '₹56 (Aaple Sarkar Portal Fee)',
    overviewMr: 'शासकीय नोकरी सवलत, शैक्षणिक प्रवेश आरक्षण व सवलतीसाठी उपविभागीय अधिकारी (SDO) यांच्याकडून जारी केला जाणारा अधिकृत जातीचा दाखला.',
    overviewEn: 'Official Caste Certificate issued by Sub-Divisional Officer (SDO). Essential for educational seat reservations, scholarship fee concessions, and government job quota applications.',
    requirementsMr: [
      'अर्जदाराचे आधार कार्ड व शाळा सोडल्याचा दाखला (TC/LC)',
      'वडिलांचे किंवा आजोबांचे शाळा सोडल्याचा दाखला / जन्म नोंद',
      '१९६७ पूर्वीचा महसुली पुरावा किंवा जातीची नोंद (SC/ST/OBC/VJNT)',
      'स्वयंघोषणा पत्र व वंशावळ शपथपत्र (सेतू केंद्रात उपलब्ध)'
    ],
    requirementsEn: [
      'Applicant Aadhaar Card & School Leaving Certificate (TC/LC)',
      'Father’s or Grandfather’s School Leaving Certificate / Birth Proof',
      'Pre-1967/1961 Revenue Proof or Caste Record Entry',
      'Self-Declaration Form & Pedigree Affidavit (Provided at center)'
    ],
    stepsMr: [
      'वंशावळ पुरावे व आधार कार्ड सेतू केंद्रात जमा करा.',
      'आपले सरकार पोर्टलवर ऑनलाईन अर्ज व शपथपत्र अपलोड करा.',
      'एसडीओ कार्यालयाकडून पडताळणीनंतर डिजिटल दाखला प्राप्त करा.'
    ],
    stepsEn: [
      'Submit family genealogy proof & identity cards.',
      'Filing application on Aaple Sarkar portal with affidavit.',
      'Receive digitally signed SDO Caste Certificate.'
    ]
  },
  {
    id: 'domicile-certificate',
    slug: 'domicile-certificate',
    titleMr: 'महाराष्ट्राचे रहिवासी प्रमाणपत्र (Domicile Certificate)',
    titleEn: 'Domicile & Nationality Certificate',
    category: 'revenue',
    badge: 'तहसीलदार प्रमाणपत्र',
    timelineMr: '७ ते १० कार्यदिवस',
    timelineEn: '7-10 Working Days',
    govtFeeMr: '₹५६ (पोर्टल शुल्क)',
    govtFeeEn: '₹56 (Portal Fee)',
    overviewMr: 'महाराष्ट्र राज्यात सलग १५ वर्षे किंवा त्याहून अधिक काळ राहणाऱ्या नागरिकांसाठी तहसीलदार स्वाक्षरीचे अधिवास व भारतीय राष्ट्रीयत्व प्रमाणपत्र.',
    overviewEn: 'Official Domicile & Nationality Certificate issued by Tehsildar for citizens residing in Maharashtra for 15+ years. Mandatory for Engineering, Medical, & Govt job admissions.',
    requirementsMr: [
      'अर्जदाराचे आधार कार्ड व शाळा सोडल्याचा दाखला',
      'मागील १५ वर्षांचा रहिवासी पुरावा (लाइट बिल / रेशन कार्ड / कर पावती)',
      'वडिलांचे आधार कार्ड व रहिवासी पुरावा',
      'स्वयंघोषणा पत्र'
    ],
    requirementsEn: [
      'Applicant Aadhaar Card & School Leaving Certificate',
      '15 Years Residence Proof (Electricity Bill / Ration Card / Property Tax Receipt)',
      'Father’s Aadhaar Card & Residence Proof',
      'Self-Declaration Form'
    ],
    stepsMr: [
      'मागील १५ वर्षांचे रहिवासी पुरावे तपासा.',
      'ऑनलाईन अर्ज व फोटो अपलोड करा.',
      'डिजिटल स्वाक्षरीचे अधिवास प्रमाणपत्र डाऊनलोड करा.'
    ],
    stepsEn: [
      'Verify 15-year continuous residence proofs.',
      'Online filing on Aaple Sarkar portal.',
      'Download digitally signed Domicile Certificate.'
    ]
  },
  {
    id: 'driving-license',
    slug: 'driving-license',
    titleMr: 'ड्रायव्हिंग लायसन्स & RTO सेवा (Driving License)',
    titleEn: 'Driving License Online & RTO Booking',
    category: 'transport',
    badge: 'सारथी RTO पोर्टल',
    timelineMr: 'लर्निंग लायसन्स (त्याच दिवशी), पक्के लायसन्स (१५ दिवस)',
    timelineEn: 'Learning DL (Same Day), Permanent DL (15 Days)',
    govtFeeMr: 'RTO नियमानुसार',
    govtFeeEn: 'As per Sarathi RTO Norms',
    overviewMr: 'टू-व्हीलर व फोर-व्हीलर गाड्यांसाठी लर्निंग ड्रायव्हिंग लायसन्स (LL) ऑनलाईन काढणे, पक्क्या लायसन्ससाठी RTO स्लॉट बुकिंग करणे आणि लायसन्स नूतनीकरण.',
    overviewEn: 'Online Learning Driving License (LL) test booking and issuing for 2-wheelers & 4-wheelers. Slot booking for Permanent DL test at RTO and DL renewal assistance.',
    requirementsMr: [
      'आधार कार्ड (मोबाईल नंबर लिंक)',
      'वयाचा पुरावा (शाळा सोडल्याचा दाखला किंवा टीसी)',
      'ब्लड ग्रुप रिपोर्ट',
      'पासपोर्ट साईझ फोटो'
    ],
    requirementsEn: [
      'Aadhaar Card (Mobile Linked)',
      'Age Proof (School Leaving Certificate or Birth Certificate)',
      'Blood Group Report',
      'Passport Size Photo'
    ],
    stepsMr: [
      'आधार कार्ड द्वारे सारथी पोर्टलवर ऑनलाइन अर्ज.',
      'ऑनलाइन लर्निंग लायसन्स टेस्ट द्या.',
      'त्याच दिवशी लर्निंग लायसन्स डाऊनलोड करा.'
    ],
    stepsEn: [
      'Online filing on Sarathi RTO portal via Aadhaar.',
      'Complete online LL test from center/home.',
      'Download Learning License instantly.'
    ]
  },
  {
    id: 'ration-card',
    slug: 'ration-card',
    titleMr: 'रेशन कार्ड नाव समाविष्ट व बदल (Ration Card Services)',
    titleEn: 'Ration Card Member Addition & Corrections',
    category: 'food',
    badge: 'अन्न व नागरी पुरवठा',
    timelineMr: '१० ते १५ कार्यदिवस',
    timelineEn: '10-15 Working Days',
    govtFeeMr: 'शासकीय पोर्टल शुल्क',
    govtFeeEn: 'Govt Portal Fee',
    overviewMr: 'नवीन रेशन कार्ड काढणे, रेशन कार्डमध्ये नवीन बाळाचे किंवा पत्नीचे नाव समाविष्ट करणे, किंवा नाव वगळणे.',
    overviewEn: 'Addition of new family member names (newborn child or married wife) in existing Ration Card, address updates, or split ration card applications.',
    requirementsMr: [
      'मूळ रेशन कार्ड (Original Ration Card)',
      'समाविष्ट करायच्या व्यक्तीचे आधार कार्ड',
      'जन्म दाखला (बाळासाठी) किंवा विवाह नोंदणी दाखला (पत्नीसाठी)',
      'कमी केल्याचा दाखला (नवीन नाव समाविष्ट करत असल्यास)'
    ],
    requirementsEn: [
      'Original Ration Card',
      'Aadhaar Card of the member to be added',
      'Birth Certificate (For child) or Marriage Certificate (For wife)',
      'Deletion Certificate from previous Ration Card'
    ],
    stepsMr: [
      'पुरवठा विभाग पोर्टलवर ऑनलाईन नाव नोंदणी अर्ज.',
      'तहसील कार्यालय धान्य पुरवठा विभागात अर्ज पडताळणी.',
      'अपडेट झालेले रेशन कार्ड प्राप्त करणे.'
    ],
    stepsEn: [
      'Online application on Food & Civil Supplies portal.',
      'Document verification at Tehsil Supply Office.',
      'Receive updated Ration Card.'
    ]
  }
];
