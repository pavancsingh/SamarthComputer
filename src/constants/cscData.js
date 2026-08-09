/**
 * Centralized CSC & Government Online Services Data Catalog
 * Comprehensive list of CSC services, Scholarship Forms, Exam Applications, Admissions, and Student Utilities.
 */
export const CSC_SERVICES_DATA = [
  // ================= 1. SCHOLARSHIP FORMS =================
  {
    id: 'mahadbt-scholarship',
    slug: 'mahadbt-scholarship',
    titleMr: 'MahaDBT महाडीबीटी स्कॉलरशिप अर्ज (Post-Matric)',
    titleEn: 'MahaDBT Post-Matric Scholarship Portal 2026',
    category: 'scholarship',
    badge: 'महाराष्ट्र शासन शिष्यवृत्ती',
    status: 'Open',
    deadlineMr: '३१ ऑक्टोबर २०२६ (मुदतवाढ शंकास्पद)',
    deadlineEn: '31st October 2026',
    officialUrl: 'https://mahadbt.maharashtra.gov.in',
    isFeatured: true,
    timelineMr: 'अर्ज सादर केल्यापासून ३० ते ४५ दिवसात बँक खात्यात',
    timelineEn: '30-45 Days after approval',
    govtFeeMr: 'मोफत शासकीय अर्ज (फक्त सेतू प्रक्रिया फी)',
    govtFeeEn: 'Free Govt Portal (Processing Charge Applicable)',
    overviewMr: 'महाराष्ट्र शासनाची SC, ST, VJNT, OBC, SBC आणि EWS / SEBC विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती व शिक्षण शुल्क प्रतिपूर्ती योजना.',
    overviewEn: 'Official Maharashtra Govt Post-Matric Scholarship & Tuition Fee Concession for SC/ST/OBC/VJNT/SBC/EWS/SEBC college & diploma students.',
    requiredDocsMr: [
      'मागील वर्षांची मार्कशीट (Last Year Marksheet)',
      'उत्पन्नाचा दाखला (Tehsildar Income Certificate 1/3 Yr)',
      'जातीचा दाखला (Caste Certificate) व व्हॅलिडिटी (लागू असल्यास)',
      'अधिवास प्रमाणपत्र (Domicile Certificate)',
      'बँक पासबुक आधार लिंक असणारे (Aadhaar Seeded Bank Account)',
      'कॉलेज फी पावती व बोनाफाइड प्रमाणपत्र (College Fee Receipt & Bonafide)'
    ],
    requiredDocsEn: [
      'Previous Year Marksheet / Passing Certificate',
      'Tehsildar Income Certificate (Valid for current year)',
      'Caste Certificate & Validity (If applicable)',
      'Domicile Certificate of Maharashtra',
      'Aadhaar Seeded Bank Account Details',
      'Current Year College Fee Receipt & Bonafide'
    ],
    stepsMr: [
      'MahaDBT पोर्टलवर ऑनलाईन प्रोफाइल तयार करणे.',
      'कागदपत्रे स्कॅन करून अचूक रिझोल्युशनमध्ये अपलोड करणे.',
      'फॉर्म फायनल सबमिट करून कॉलेजमध्ये प्रिंट जमा करणे.'
    ],
    stepsEn: [
      'Create profile on MahaDBT Online Portal.',
      'Scan and upload clear document copies in required sizes.',
      'Final submission and submitting hardcopy printout to college.'
    ]
  },
  {
    id: 'nsp-scholarship',
    slug: 'nsp-scholarship',
    titleMr: 'NSP नॅशनल स्कॉलरशिप पोर्टल (Central Govt)',
    titleEn: 'NSP National Scholarship Portal 2026',
    category: 'scholarship',
    badge: 'केंद्र सरकार स्कॉलरशिप',
    status: 'Open',
    deadlineMr: '१५ नोव्हेंबर २०२६',
    deadlineEn: '15th November 2026',
    officialUrl: 'https://scholarships.gov.in',
    isFeatured: false,
    timelineMr: 'थेट DBT द्वारे विद्यार्थ्यांच्या बँक खात्यात जमा',
    timelineEn: 'Direct Benefit Transfer (DBT) to Bank Account',
    govtFeeMr: 'शासकीय पोर्टल शुल्क मोफत',
    govtFeeEn: 'Free Official Portal Application',
    overviewMr: 'केंद्र सरकारची नॅशनल स्कॉलरशिप योजना - अल्पसंख्याक (Minority Muslim, Jain, Buddhist, Sikh, Parsi, Christian), अपंग विद्यार्थी, सेंट्रल सेक्टर स्कॉलरशिप आणि CSSS गुणवंत स्कॉलरशिप.',
    overviewEn: 'Central Government NSP scheme for Minority community (Muslim, Christian, Sikh, Buddhist, Jain, Parsi), Pre & Post Matric, and CSSS Merit Scholarships.',
    requiredDocsMr: [
      'आधार कार्ड (Aadhaar Card)',
      'अल्पसंख्याक स्वयंघोषणा पत्र (Minority Affidavit)',
      'मागील वर्षाचे मार्कशीट (min 50% गुण आवश्यक)',
      'कुटुंबाचा उत्पन्नाचा दाखला',
      'बँक पासबुक व कॉलेज बोनाफाइड'
    ],
    requiredDocsEn: [
      'Aadhaar Card copy',
      'Minority Community Self-Declaration Form',
      'Previous Year Marksheet (Minimum 50% Marks required)',
      'Family Income Certificate',
      'Bank Passbook & School/College Bonafide'
    ],
    stepsMr: [
      'NSP पोर्टलर आधार ओटीपीद्वारे ओटीआर (OTR) नोंदणी करणे.',
      'पात्र योजनेची निवड करून कागदपत्रे अपलोड करणे.',
      'शाळा/कॉलेजकडून ऑनलाइन व्हेरिफिकेशन करून घेणे.'
    ],
    stepsEn: [
      'Register on NSP portal via Aadhaar OTP.',
      'Select eligible scheme and upload documents.',
      'Submit printout for institute level verification.'
    ]
  },
  {
    id: 'pre-matric-scholarship',
    slug: 'pre-matric-scholarship',
    titleMr: 'प्री-मॅट्रिक स्कॉलरशिप (इयत्ता १ ली ते १० वी)',
    titleEn: 'Pre-Matric School Scholarship (Class 1 to 10)',
    category: 'scholarship',
    badge: 'शालेय शिष्यवृत्ती',
    status: 'Open',
    deadlineMr: '३० सप्टेंबर २०२६',
    deadlineEn: '30th September 2026',
    officialUrl: 'https://mahadbt.maharashtra.gov.in',
    isFeatured: false,
    timelineMr: 'शाळा स्तरावरून पडताळणीनंतर जमा',
    timelineEn: 'Direct School Verification',
    govtFeeMr: 'शासकीय अर्ज मोफत',
    govtFeeEn: 'Free Govt Form',
    overviewMr: 'मागासवर्गीय (SC/ST/OBC/VJNT) व अल्पसंख्याक शालेय विद्यार्थ्यांसाठी (इयत्ता १ ली ते १० वी) केंद्र व राज्य शासनाची शालेय शिष्यवृत्ती.',
    overviewEn: 'State and Central Pre-Matric scholarships for school students belonging to SC/ST/OBC/VJNT and Minority communities.',
    requiredDocsMr: [
      'विद्यार्थ्याचे आधार कार्ड',
      'मागील वर्षाची मार्कशीट',
      'पालकांचा उत्पन्नाचा दाखला',
      'बँक पासबुक (आधार लिंक)'
    ],
    requiredDocsEn: [
      'Student Aadhaar Card',
      'Previous Year School Marksheet',
      'Parents Income Certificate',
      'Aadhaar Seeded Bank Account'
    ],
    stepsMr: [
      'शालेय पोर्टलर विद्यार्थी प्रोफाइल अपडेट करणे.',
      'फॉर्म भरून शाळेत जमा करणे.'
    ],
    stepsEn: [
      'Update student profile.',
      'Submit form to school headmaster.'
    ]
  },

  // ================= 2. EXAM FORMS =================
  {
    id: 'mpsc-exam-form',
    slug: 'mpsc-exam-form',
    titleMr: 'MPSC महाराष्ट्र लोकसेवा आयोग ऑनलाईन अर्ज',
    titleEn: 'MPSC Civil Services & Combined Exam Application',
    category: 'exam',
    badge: 'MPSC अधिकृत फॉर्म',
    status: 'Open',
    deadlineMr: 'अधिसूचनेनुसार (शासकीय तारखा)',
    deadlineEn: 'As per MPSC Official Advertisement',
    officialUrl: 'https://mpsconline.gov.in',
    isFeatured: true,
    timelineMr: 'झटपट ऑनलाईन अर्ज नोंदणी',
    timelineEn: 'Instant Online Application Processing',
    govtFeeMr: '₹३९४ (खुला प्रवर्ग) / ₹२९४ (राखीव प्रवर्ग)',
    govtFeeEn: '₹394 (Open) / ₹294 (Reserved Category)',
    overviewMr: 'महाराष्ट्र लोकसेवा आयोग (MPSC) राज्यसेवा पूर्व परीक्षा, संयुक्त गट-ब (PSI/STI/ASO), गट-क (Clerk Typist/Tax Assistant) आणि तांत्रिक सेवा ऑनलाईन अर्ज.',
    overviewEn: 'MPSC State Services, Combined Group B (PSI, STI, ASO), Group C (Clerk Typist, Tax Assistant), and Technical Services exam forms.',
    requiredDocsMr: [
      'आधार कार्ड व पॅन कार्ड',
      '१०वी, १२वी व पदवी (Graduation) मार्कशीट',
      'जातीचा दाखला व नॉन-क्रिमीलेअर (NCL)',
      'मराठी / इंग्रजी टायपिंग प्रमाणपत्र (Clerk साठी)',
      'पासपोर्ट फोटो व स्वाक्षरी (स्पेसिफिकेशननुसार)'
    ],
    requiredDocsEn: [
      'Aadhaar Card & Photo ID Proof',
      '10th, 12th & Graduation Marksheet / Degree Certificate',
      'Caste Certificate & Non-Creamy Layer (NCL)',
      'Typing GCC-TBC Certificate (For Clerk posts)',
      'Passport size Photo & Signature scan'
    ],
    stepsMr: [
      'MPSC पोर्टलर प्रोफाईल तयार करणे किंवा अपडेट करणे.',
      'पात्रतेनुसार परीक्षेची निवड करणे.',
      'फी भरून परीक्षा केंद्र (Center) लॉक करणे.'
    ],
    stepsEn: [
      'Create / Update MPSC profile with personal & education details.',
      'Select eligible examination post.',
      'Pay exam fee online and select examination center.'
    ]
  },
  {
    id: 'upsc-exam-form',
    slug: 'upsc-exam-form',
    titleMr: 'UPSC केंद्रीय लोकसेवा आयोग (IAS / IPS / NDA / CDS)',
    titleEn: 'UPSC Civil Services & Defense Online Application',
    category: 'exam',
    badge: 'UPSC अधिकृत अर्ज',
    status: 'Open',
    deadlineMr: 'जाहिरातीनुसार',
    deadlineEn: 'As per UPSC Calendar',
    officialUrl: 'https://upsconline.nic.in',
    isFeatured: false,
    timelineMr: 'OTR नोंदणी व फॉर्म भरून देणे',
    timelineEn: 'Instant OTR & Form Submission',
    govtFeeMr: '₹१०० (महिला / SC / ST साठी मोफत)',
    govtFeeEn: '₹100 (Free for Female / SC / ST / PwD)',
    overviewMr: 'केंद्रीय लोकसेवा आयोग (UPSC) नागरी सेवा परीक्षा (IAS, IPS, IFS), NDA, CDS आणि इतर केंद्रीय स्पर्धा परीक्षांचे अचूक अर्ज.',
    overviewEn: 'Union Public Service Commission (UPSC) Civil Services (IAS/IPS/IFS), NDA, CDS, and Central Armed Police Forces online registration.',
    requiredDocsMr: [
      'आधार कार्ड / ओळखपत्र',
      '१०वी व पदवी मार्कशीट',
      'पासपोर्ट फोटो व सही (UPSC साईझनुसार)'
    ],
    requiredDocsEn: [
      'Aadhaar Card / Photo ID',
      '10th & Graduation Marksheet',
      'Passport Photo & Signature'
    ],
    stepsMr: [
      'UPSC OTR पोर्टलर नोंदणी करणे.',
      'फॉर्म भरून सेंटर निवडणे.'
    ],
    stepsEn: [
      'Complete UPSC OTR registration.',
      'Select exam center and pay fee.'
    ]
  },
  {
    id: 'police-bharti-form',
    slug: 'police-bharti-form',
    titleMr: 'महाराष्ट्र पोलीस भरती २०२६ ऑनलाईन फॉर्म',
    titleEn: 'Maharashtra Police Bharti Online Application 2026',
    category: 'exam',
    badge: 'पोलीस शिपाई / SRPF',
    status: 'Open',
    deadlineMr: 'अधिसूचना लागू',
    deadlineEn: 'Active as per Dept Notification',
    officialUrl: 'https://policerecruitment2024.mahait.org',
    isFeatured: true,
    timelineMr: 'फॉर्म भरून हॉल तिकीट जनरेट होईपर्यंत',
    timelineEn: 'Instant Registration & Receipt',
    govtFeeMr: '₹४५० (खुला) / ₹३५० (राखीव)',
    govtFeeEn: '₹450 (Open) / ₹350 (Reserved)',
    overviewMr: 'महाराष्ट्र पोलीस दल - पोलीस शिपाई (Constable), चालक (Driver), SRPF आणि बँडस्मॅन पदांसाठी ऑनलाईन अर्ज भरून देणे.',
    overviewEn: 'Maharashtra State Police Constable, Police Driver, SRPF, and Bandsman online application filling with physical eligibility verification.',
    requiredDocsMr: [
      '१२वी पास मार्कशीट (12th Passed Marksheet)',
      'शाळा सोडल्याचा दाखला (TC/LC)',
      'अधिवास प्रमाणपत्र (Domicile Certificate)',
      'जातीचा दाखला व NCL (Non Creamy Layer)',
      'ड्रायव्हिंग लायसन्स (चालक पदासाठी)'
    ],
    requiredDocsEn: [
      '12th Standard Passed Marksheet & Board Certificate',
      'School Leaving Certificate (TC/LC)',
      'Maharashtra Domicile Certificate',
      'Caste Certificate & NCL Certificate',
      'Valid LMV Driving License (For Driver post)'
    ],
    stepsMr: [
      'वैयक्तिक व शारीरिक पात्रतेची अचूक नोंद करणे.',
      'जिल्हा पोलीस घटक निवडणे.',
      'ऑनलाईन फी भरून पोच पावती प्रिंट करणे.'
    ],
    stepsEn: [
      'Enter personal credentials & physical specs.',
      'Select application unit (District / SRPF Unit).',
      'Complete online payment and get final acknowledgment print.'
    ]
  },
  {
    id: 'ssc-exam-form',
    slug: 'ssc-exam-form',
    titleMr: 'SSC कर्मचारी निवड आयोग (CGL, CHSL, GD, MTS)',
    titleEn: 'SSC Staff Selection Commission Forms (CGL, CHSL, GD)',
    category: 'exam',
    badge: 'केंद्र शासन नोकरी',
    status: 'Open',
    deadlineMr: 'जाहिरातीनुसार',
    deadlineEn: 'As per SSC Calendar',
    officialUrl: 'https://ssc.gov.in',
    isFeatured: false,
    timelineMr: 'ओटीआर (OTR) नोंदणी झटपट',
    timelineEn: 'Instant OTR & Form Submission',
    govtFeeMr: '₹१०० (महिला / SC / ST साठी मोफत)',
    govtFeeEn: '₹100 (Free for Women, SC, ST, PwD)',
    overviewMr: 'स्टाफ सिलेक्शन कमिशन (SSC) द्वारे घेतली जाणारी SSC GD Constable, CHSL (10+2), CGL, MTS आणि स्टेनोग्राफर भरती अर्ज.',
    overviewEn: 'SSC Staff Selection Commission recruitment forms for GD Constable, CHSL 10+2, CGL Graduate Level, MTS, and Stenographer posts.',
    requiredDocsMr: [
      'आधार कार्ड (Aadhaar Card)',
      '१०वी / १२वी / पदवी गुणपत्रिका',
      'थेट लाईव्ह फोटो (Live Camera Capture feature)',
      'स्वाक्षरी (Signature)'
    ],
    requiredDocsEn: [
      'Aadhaar Card details',
      '10th / 12th / Degree Certificate',
      'Live photo capture as per new SSC portal rules',
      'Scanned Signature image'
    ],
    stepsMr: [
      'SSC नवीन OTR (One Time Registration) करणे.',
      'वेबकॅमद्वारे लाईव्ह फोटो कॅप्चर करणे.',
      'फॉर्म फायनल सबमिट करणे.'
    ],
    stepsEn: [
      'Complete SSC OTR registration.',
      'Capture live webcam photo as required by SSC.',
      'Final submission and payment.'
    ]
  },
  {
    id: 'ibps-sbi-bank-exam',
    slug: 'ibps-sbi-bank-exam',
    titleMr: 'बँकिंग परीक्षा अर्ज (IBPS PO, Clerk & SBI)',
    titleEn: 'Banking Exam Forms (IBPS PO, Clerk, SBI & RRB)',
    category: 'exam',
    badge: 'बँकिंग सेक्टर',
    status: 'Open',
    deadlineMr: 'जाहिरातीनुसार',
    deadlineEn: 'As per Bank Notification',
    officialUrl: 'https://ibps.in',
    isFeatured: false,
    timelineMr: 'झटपट फॉर्म भरून देणे',
    timelineEn: 'Instant Online Filing',
    govtFeeMr: '₹८५० (General) / ₹१७५ (SC/ST/PwD)',
    govtFeeEn: '₹850 (General) / ₹175 (SC/ST/PwD)',
    overviewMr: 'राष्ट्रीयकृत बँकांमध्ये IBPS PO, Clerk, SO आणि स्टेट बँक ऑफ इंडिया (SBI) क्लर्क/अधिकारी पदांचे ऑनलाईन अर्ज.',
    overviewEn: 'Online registration for IBPS PO, Clerk, Regional Rural Banks (RRB), and State Bank of India (SBI) recruitment exams.',
    requiredDocsMr: [
      'पदवी मार्कशीट (Graduation Marksheet)',
      'पासपोर्ट फोटो, स्वाक्षरी व डाव्या हाताच्या अंगठ्याचा ठसा (Thumb Impression)',
      'हस्तलिखित प्रतिज्ञापत्र (Handwritten Declaration)'
    ],
    requiredDocsEn: [
      'Graduation Marksheet & Certificate',
      'Passport Photo, Signature & Left Thumb Impression',
      'Handwritten Declaration Text Scan'
    ],
    stepsMr: [
      'आईबीपीएस पोर्टलवर नवीन नोंदणी करणे.',
      'अंगठ्याचा ठसा व डिक्लेरेशन अपलोड करणे.',
      'फी भरून कन्फर्मेशन डाऊनलोड करणे.'
    ],
    stepsEn: [
      'Register on IBPS portal.',
      'Upload photo, thumb impression & declaration.',
      'Complete online payment.'
    ]
  },

  // ================= 3. ADMISSIONS =================
  {
    id: 'cap-option-form',
    slug: 'cap-option-form',
    titleMr: 'अभियांत्रिकी व डिप्लोमा CAP ऑप्शन फॉर्म (Engineering / ITI / Pharmacy)',
    titleEn: 'CAP Round Option Form Filling (Engg, Pharmacy, Diploma)',
    category: 'admission',
    badge: 'DTE / State CET Cell Desk',
    status: 'Open',
    deadlineMr: 'CAP फेऱ्यांच्या वेळापत्रकानुसार',
    deadlineEn: 'As per State CET Cell Schedule',
    officialUrl: 'https://cetcell.mahacet.org',
    isFeatured: true,
    timelineMr: 'तज्ज्ञ मार्गदर्शनाखाली कॉलेज पसंतीक्रम',
    timelineEn: 'Expert Assisted Option Form Submission',
    govtFeeMr: 'CET Cell नियमानुसार',
    govtFeeEn: 'As per Admission Regulatory Authority',
    overviewMr: 'प्रथम वर्ष व थेट द्वितीय वर्ष अभियांत्रिकी (Degree/Diploma), फार्मसी (B.Pharm/D.Pharm) आणि MBA/MCA साठी अचूक CAP पसंतीक्रम (Option Form) भरून देणे.',
    overviewEn: 'Expert guidance for preference option form filling for First Year & Direct Second Year Engineering, Pharmacy, Agriculture, and Diploma admissions.',
    requiredDocsMr: [
      'CET / NEET स्कोर कार्ड',
      'CAP मेरिट नंबर / Application ID व पासवर्ड',
      'कटऑफ लिस्ट व आवडीच्या कॉलेजेसची यादी'
    ],
    requiredDocsEn: [
      'MHT-CET / NEET Score Card',
      'CAP Application Login ID & Password',
      'List of preferred Colleges & Branches'
    ],
    stepsMr: [
      'कटऑफनुसार कॉलेजेसची यादी निश्चित करणे.',
      'CET Cell लॉगिनमध्ये पसंतीक्रम अचूक भरणे.',
      'फॉर्म कन्फर्म करून लॉक करणे.'
    ],
    stepsEn: [
      'Shortlist colleges based on cutoff percentile.',
      'Enter college codes in order of preference.',
      'Confirm and lock the final Option Form.'
    ]
  },
  {
    id: 'iti-admission-form',
    slug: 'iti-admission-form',
    titleMr: 'ITI ऑनलाईन प्रवेश प्रक्रिया २०२६',
    titleEn: 'ITI Online Admission & Counseling 2026',
    category: 'admission',
    badge: 'DVET महाराष्ट्र',
    status: 'Open',
    deadlineMr: 'जुलै - ऑगस्ट २०२६',
    deadlineEn: 'July - August 2026',
    officialUrl: 'https://admission.dvet.gov.in',
    isFeatured: false,
    timelineMr: 'त्याच दिवशी अर्ज नोंदणी व स्क्रूटिनी',
    timelineEn: 'Same Day Registration & Verification',
    govtFeeMr: '₹१५० (शासकीय अर्ज शुल्क)',
    govtFeeEn: '₹150 (Govt Application Fee)',
    overviewMr: 'शासकीय व खाजगी औद्योगिक प्रशिक्षण संस्था (ITI) मधील इलेक्ट्रिशियन, फिटर, मोटार मेकॅनिक, संगणक (COPA) इत्यादी ट्रेडसाठी ऑनलाईन प्रवेश.',
    overviewEn: 'DVET Maharashtra ITI Online Admission form filling, document verification, and trade preference options.',
    requiredDocsMr: [
      '१०वी पास / नापास गुणपत्रिका',
      'शाळा सोडल्याचा दाखला (TC)',
      'आधार कार्ड व जातीचा दाखला',
      'उत्पन्नाचा दाखला (स्कॉलरशिपसाठी)'
    ],
    requiredDocsEn: [
      '10th Passed / Failed Marksheet',
      'School Leaving Certificate (TC)',
      'Aadhaar Card & Caste Certificate',
      'Income Certificate'
    ],
    stepsMr: [
      'DVET पोर्टलवर ऑनलाईन नोंदणी करणे.',
      'ट्रेड पसंतीक्रम भरणे.',
      'आयटीआय केंद्रात कागदपत्रे पडताळणी करणे.'
    ],
    stepsEn: [
      'Online registration on DVET portal.',
      'Fill trade & ITI college options.',
      'Scrutiny and verification at nearest ITI.'
    ]
  },

  // ================= 4. STUDENT UTILITY SERVICES =================
  {
    id: 'resume-maker-desk',
    slug: 'resume-maker-desk',
    titleMr: 'प्रोफेशनल बायोडाटा & रेझ्युमे मेकर (Resume / CV Making)',
    titleEn: 'Professional Resume & CV Building Desk',
    category: 'utility',
    badge: 'झटपट ३० मिनिटात तयार',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://samarthcomputers.in',
    isFeatured: true,
    timelineMr: '१५ ते ३० मिनिटात प्रिमियम PDF प्रिंट',
    timelineEn: '15-30 Minutes Turnaround',
    govtFeeMr: '₹५० ते ₹१५० (डिझाईननुसार)',
    govtFeeEn: '₹50 to ₹150 (Based on template)',
    overviewMr: 'नोकरी, कॅम्पस इंटरव्यू आणि शासकीय फॉर्मसाठी आकर्षक आधुनिक प्रिमियम रेझ्युमे (Job CV) व विवाह बायोडाटा (Marriage Biodata) तयार करून मिळणे.',
    overviewEn: 'Modern, ATS-friendly professional Resume / CV building and custom Marriage Biodata creation with instant high-quality PDF printouts.',
    requiredDocsMr: [
      'शिक्षण व अनुभवाची माहिती (Education & Work Exp)',
      'वैयक्तिक तपशील व फोटो (Personal Details & Photo)',
      'कौशल्ये व प्रोजेक्ट्स (Skills & Projects)'
    ],
    requiredDocsEn: [
      'Educational qualifications & passing years',
      'Work experience certificates (if any)',
      'Contact information & photo'
    ],
    stepsMr: [
      'माहिती फॉर्ममध्ये लिहून द्या किंवा व्हाट्सॲप करा.',
      'आकर्षक लेआउट निवडा.',
      'झटपट PDF व प्रिंटआऊट मिळवा.'
    ],
    stepsEn: [
      'Provide details at counter or via WhatsApp.',
      'Choose preferred modern format layout.',
      'Receive instant PDF & color printout.'
    ]
  },
  {
    id: 'photo-signature-resize',
    slug: 'photo-signature-resize',
    titleMr: 'फोटो & स्वाक्षरी आकार दुरुस्ती (Photo & Signature Crop/Resize)',
    titleEn: 'Govt Exam Photo & Signature Specification Resize Desk',
    category: 'utility',
    badge: 'MPSC / SSC / Police Spec',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://samarthcomputers.in',
    isFeatured: false,
    timelineMr: '५ मिनिटात ऑनलाईन अर्ज ready',
    timelineEn: '5 Minutes Service',
    govtFeeMr: '₹२० ते ₹३०',
    govtFeeEn: '₹20 to ₹30',
    overviewMr: 'MPSC, SSC, IBPS, पोलीस भरती व महाडीबीटीसाठी लागणारे फोटो (20KB - 50KB) व सही (10KB - 20KB) अचूक पिक्सेल व KB मध्ये रीझाईज करून देणे.',
    overviewEn: 'Precision cropping and KB/Pixel resizing for photos and signatures matching exact MPSC, SSC, UPSC, and Govt exam portal specs.',
    requiredDocsMr: [
      'कॅमेराने काढलेला फोटो किंवा स्वाक्षरी'
    ],
    requiredDocsEn: [
      'Passport photo or signature image'
    ],
    stepsMr: [
      'फोटो केंद्रात द्या किंवा व्हाट्सॲप करा.',
      'फॉर्म नियमानुसार रिझाईज करून मिळवा.'
    ],
    stepsEn: [
      'Share photo via WhatsApp or counter.',
      'Get portal-ready resized image files.'
    ]
  },

  // ================= 5. CSC & IDENTITY SERVICES =================
  {
    id: 'pan-card',
    slug: 'pan-card',
    titleMr: 'झटपट पॅन कार्ड (Instant PAN Card)',
    titleEn: 'Instant PAN Card Application & Correction',
    category: 'csc',
    badge: 'झटपट २ तासात ई-पॅन',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://eportal.incometax.gov.in',
    isFeatured: true,
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
    id: 'gazette',
    slug: 'gazette',
    titleMr: 'महाराष्ट्र राजपत्र (Govt Gazette Name Change)',
    titleEn: 'Maharashtra Govt Gazette Publication',
    category: 'csc',
    badge: 'शासकीय नाव बदल',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://dgps.maharashtra.gov.in',
    isFeatured: false,
    timelineMr: '७ ते १५ कार्यदिवस',
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
    titleMr: 'शॉप ॲक्ट लायसन्स (Gumasta Registration)',
    titleEn: 'Shop Act License (Gumasta)',
    category: 'csc',
    badge: '२४ तासात लायसन्स',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://lms.mahaonline.gov.in',
    isFeatured: false,
    timelineMr: '२४ ते ४८ तास',
    timelineEn: '24-48 Hours',
    govtFeeMr: 'कामगार विभाग नियमानुसार',
    govtFeeEn: 'Labour Dept Approved Fee',
    overviewMr: 'नवीन दुकान, व्यवसाय, हॉटेल, मेडिकल किंवा सर्व्हिस सेंटर सुरू करण्यासाठी कामगार विभागाचे Shop Act (गुमास्ता) लायसन्स.',
    overviewEn: 'Mandatory Shop Act (Gumasta) License issued by Labour Department for opening any new shop, retail store, hotel, medical store, or business.',
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
    category: 'csc',
    badge: 'मोफत शासकीय दाखला',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://udyamregistration.gov.in',
    isFeatured: false,
    timelineMr: 'त्याच दिवशी डाउनलोड',
    timelineEn: 'Same Day Processing',
    govtFeeMr: 'मोफत (फक्त प्रक्रिया फी)',
    govtFeeEn: 'Free (Only Service Charge)',
    overviewMr: 'लहान व मध्यम उद्योगांसाठी केंद्र सरकारचे अधिकृत MSME उद्यम नोंदणी प्रमाणपत्र. बँक कर्ज व सरकारी सबसिडीसाठी आवश्यक.',
    overviewEn: 'Official Central Government MSME Udyam Registration Certificate for micro, small, and medium enterprises. Essential for collateral-free bank loans.',
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
  },

  // ================= 6. GOVT CERTIFICATES & REVENUE =================
  {
    id: 'income-certificate',
    slug: 'income-certificate',
    titleMr: 'उत्पन्न दाखला (Income Certificate)',
    titleEn: 'Income Certificate (1 Year & 3 Years)',
    category: 'revenue',
    badge: 'तहसीलदार स्वाक्षरी',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
    isFeatured: true,
    timelineMr: '३ ते ५ कार्यदिवस',
    timelineEn: '3-5 Working Days',
    govtFeeMr: '₹५६ (आपले सरकार पोर्टल शुल्क)',
    govtFeeEn: '₹56 (Aaple Sarkar Portal Fee)',
    overviewMr: 'शासकीय शिष्यवृत्ती, कॉलेज प्रवेश, रेशन कार्ड व विविध योजनांसाठी १ वर्ष किंवा ३ वर्षाचा तहसीलदार स्वाक्षरीचा अधिकृत उत्पन्नाचा दाखला.',
    overviewEn: 'Official Tehsildar signed Income Certificate valid for 1 year or 3 years. Essential for college scholarship applications and fee concessions.',
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
    id: 'caste-certificate',
    slug: 'caste-certificate',
    titleMr: 'जातीचा दाखला (Caste Certificate)',
    titleEn: 'Caste Certificate Application',
    category: 'revenue',
    badge: 'उपविभागीय अधिकारी (SDO)',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
    isFeatured: false,
    timelineMr: '१५ ते २१ कार्यदिवस',
    timelineEn: '15-21 Working Days',
    govtFeeMr: '₹५६ (आपले सरकार पोर्टलकडून)',
    govtFeeEn: '₹56 (Aaple Sarkar Portal Fee)',
    overviewMr: 'शासकीय नोकरी सवलत, शैक्षणिक प्रवेश आरक्षण व सवलतीसाठी उपविभागीय अधिकारी (SDO) यांच्याकडून जारी केला जाणारा अधिकृत जातीचा दाखला.',
    overviewEn: 'Official Caste Certificate issued by Sub-Divisional Officer (SDO). Essential for educational seat reservations and scholarship fee concessions.',
    requiredDocsMr: [
      'अर्जदाराचे आधार कार्ड व शाळा सोडल्याचा दाखला (TC/LC)',
      'वडिलांचे किंवा आजोबांचे शाळा सोडल्याचा दाखला / जन्म नोंद',
      '१९६७ पूर्वीचा महसुली पुरावा किंवा जातीची नोंद (SC/ST/OBC/VJNT)',
      'स्वयंघोषणा पत्र व वंशावळ शपथपत्र'
    ],
    requiredDocsEn: [
      'Applicant Aadhaar Card & School Leaving Certificate (TC/LC)',
      'Father’s or Grandfather’s School Leaving Certificate / Birth Proof',
      'Pre-1967/1961 Revenue Proof or Caste Record Entry',
      'Self-Declaration Form & Pedigree Affidavit'
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
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
    isFeatured: false,
    timelineMr: '७ ते १० कार्यदिवस',
    timelineEn: '7-10 Working Days',
    govtFeeMr: '₹५६ (पोर्टल शुल्क)',
    govtFeeEn: '₹56 (Portal Fee)',
    overviewMr: 'महाराष्ट्र राज्यात सलग १५ वर्षे किंवा त्याहून अधिक काळ राहणाऱ्या नागरिकांसाठी तहसीलदार स्वाक्षरीचे अधिवास व भारतीय राष्ट्रीयत्व प्रमाणपत्र.',
    overviewEn: 'Official Domicile & Nationality Certificate issued by Tehsildar for citizens residing in Maharashtra for 15+ years. Mandatory for Engineering, Medical, & Govt job admissions.',
    requiredDocsMr: [
      'अर्जदाराचे आधार कार्ड व शाळा सोडल्याचा दाखला',
      'मागील १५ वर्षांचा रहिवासी पुरावा (लाइट बिल / रेशन कार्ड / कर पावती)',
      'वडिलांचे आधार कार्ड व रहिवासी पुरावा',
      'स्वयंघोषणा पत्र'
    ],
    requiredDocsEn: [
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
    id: 'non-creamy-layer',
    slug: 'non-creamy-layer',
    titleMr: 'नॉन-क्रिमीलेअर प्रमाणपत्र (Non-Creamy Layer - NCL)',
    titleEn: 'Non-Creamy Layer (NCL) Certificate',
    category: 'revenue',
    badge: 'OBC / VJNT / SBC सवलत',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
    isFeatured: false,
    timelineMr: '५ ते ७ कार्यदिवस',
    timelineEn: '5-7 Working Days',
    govtFeeMr: '₹५६ (शासकीय शुल्क)',
    govtFeeEn: '₹56 (Govt Portal Fee)',
    overviewMr: 'OBC, VJNT आणि SBC प्रवर्गातील विद्यार्थ्यांना नोकरी व शैक्षणिक प्रवेश आरक्षणाचा लाभ मिळण्यासाठी ३ वर्षांच्या उत्पन्नावर आधारित नन-क्रिमीलेअर दाखला.',
    overviewEn: 'Non-Creamy Layer Certificate based on 3 years family income for OBC, VJNT, and SBC category candidates to avail reservation benefits.',
    requiredDocsMr: [
      'जातीचा दाखला (Caste Certificate)',
      'मागील ३ वर्षांचा उत्पन्नाचा दाखला (3 Yrs Income Cert)',
      'आधार कार्ड व शाळा सोडल्याचा दाखला'
    ],
    requiredDocsEn: [
      'Caste Certificate Copy',
      '3 Years Tehsildar Income Certificate',
      'Applicant Aadhaar Card & School Leaving Certificate'
    ],
    stepsMr: [
      'आपले सरकार पोर्टलवर ऑनलाईन अर्ज भरून घेणे.',
      'डिजिटल नन-क्रिमीलेअर दाखला प्राप्त करणे.'
    ],
    stepsEn: [
      'Online application on Aaple Sarkar portal.',
      'Download digitally signed NCL Certificate.'
    ]
  },
  {
    id: 'ews-certificate',
    slug: 'ews-certificate',
    titleMr: 'EWS आर्थिकदृष्ट्या दुर्बल घटक १०% आरक्षण प्रमाणपत्र',
    titleEn: 'EWS Certificate (Economically Weaker Section)',
    category: 'revenue',
    badge: '१०% खुला प्रवर्ग आरक्षण',
    status: 'Open',
    deadlineMr: 'सदैव उपलब्ध',
    deadlineEn: 'Always Available',
    officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
    isFeatured: false,
    timelineMr: '७ ते १० कार्यदिवस',
    timelineEn: '7-10 Working Days',
    govtFeeMr: '₹५६ (पोर्टल फी)',
    govtFeeEn: '₹56 (Portal Fee)',
    overviewMr: 'खुल्या प्रवर्गातील (General Category) ८ लाखांपेक्षा कमी वार्षिक उत्पन्न असणाऱ्या कुटुंबांसाठी १०% शैक्षणिक व नोकरी आरक्षणाचा EWS दाखला.',
    overviewEn: 'Official EWS Certificate for Open / General Category candidates with annual family income under 8 Lakhs to get 10% educational & job reservation.',
    requiredDocsMr: [
      'कुटुंबाचे मागील वर्षाचे उत्पन्न (उत्पन्नाचा दाखला)',
      '१९६७ पूर्वीचा रहिवासी किंवा महसुली पुरावा',
      'आधार कार्ड व रेशन कार्ड'
    ],
    requiredDocsEn: [
      'Annual Income Proof (Under 8 Lakhs)',
      'Pre-1967 Residence / Land Proof',
      'Aadhaar Card & Ration Card'
    ],
    stepsMr: [
      'तहसीलदार कार्यालयाकडे ऑनलाईन अर्ज सादर करणे.',
      'पडताळणीनंतर EWS प्रमाणपत्र प्राप्त करणे.'
    ],
    stepsEn: [
      'Online submission to Tehsildar office.',
      'Download verified EWS Certificate.'
    ]
  }
];
