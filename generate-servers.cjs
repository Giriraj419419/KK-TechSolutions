const fs = require('fs');
const path = require('path');

const azureTemplatePath = path.join(__dirname, 'src', 'pages', 'Azure.tsx');
const templateContent = fs.readFileSync(azureTemplatePath, 'utf-8');

function generatePage(config) {
  let content = templateContent;
  
  // Replace Component Name
  content = content.replace(/export default function Azure\(\) {/g, `export default function ${config.componentName}() {`);
  content = content.replace(/function AzurePremiumCard/g, `function ${config.componentName}PremiumCard`);
  content = content.replace(/<AzurePremiumCard/g, `<${config.componentName}PremiumCard`);
  content = content.replace(/<\/AzurePremiumCard>/g, `</${config.componentName}PremiumCard>`);
  
  // Replace Colors
  content = content.replace(/rgba\(0,120,212,0.15\)/g, `rgba(${config.rgb},0.15)`);
  content = content.replace(/rgba\(0,120,212,0.08\)/g, `rgba(${config.rgb},0.08)`);
  content = content.replace(/hover:border-blue-500\/20/g, `hover:border-${config.colorName}-500/20`);
  content = content.replace(/text-blue-400/g, `text-${config.colorName}-400`);
  content = content.replace(/color="blue"/g, `color="${config.colorName}"`);
  content = content.replace(/from-blue-500/g, `from-${config.colorName}-500`);
  content = content.replace(/to-cyan-400/g, `to-${config.gradientEnd}-400`);
  content = content.replace(/text-blue-500/g, `text-${config.colorName}-500`);
  content = content.replace(/bg-blue-500\/20/g, `bg-${config.colorName}-500/20`);
  content = content.replace(/bg-blue-500/g, `bg-${config.colorName}-500`);

  // Replace Content Data Arrays
  const dataReplacement = `
const reasons = [
  ${config.reasons.map(r => `{ icon: ${r.icon}, title: '${r.title}', desc: '${r.desc}' }`).join(',\n  ')}
];

const solutions = [
  ${config.solutions.map(s => `{ icon: ${s.icon}, title: '${s.title}', desc: '${s.desc}' }`).join(',\n  ')}
];

const industries = [
  ${config.industries.map(i => `{ icon: ${i.icon}, name: '${i.name}' }`).join(',\n  ')}
];

const migrationSteps = [
  ${config.process.map(p => `{ title: '${p.title}', desc: '${p.desc}' }`).join(',\n  ')}
];

const benefits = [
  ${config.benefits.map(b => `'${b}'`).join(', ')}
];

const whyUs = [
  ${config.whyUs.map(w => `'${w}'`).join(', ')}
];

const faqs = [
  ${config.faqs.map(f => `{ q: '${f.q}', a: '${f.a}' }`).join(',\n  ')}
];
`;

  content = content.replace(/const reasons = \[[\s\S]*?\];\s*const solutions = \[[\s\S]*?\];\s*const industries = \[[\s\S]*?\];\s*const migrationSteps = \[[\s\S]*?\];\s*const benefits = \[[\s\S]*?\];\s*const whyUs = \[[\s\S]*?\];\s*const faqs = \[[\s\S]*?\];/m, dataReplacement.trim());

  // Replace Text Content
  content = content.replace(/Microsoft Cloud Services/g, 'Enterprise Server Solutions');
  content = content.replace(/Microsoft Azure/g, config.brandName);
  content = content.replace(/Empower your business with secure, scalable, and intelligent cloud infrastructure designed for the modern enterprise./g, config.subtitle);
  content = content.replace(/Why Choose Azure/g, 'Why Choose This Server Platform');
  content = content.replace(/Azure Ecosystem/g, 'Our Server Solutions');
  content = content.replace(/Migration Process/g, 'Our Process');
  content = content.replace(/Azure Migration FAQ/g, 'Server Solutions FAQ');
  content = content.replace(/Start Your Cloud Journey/g, 'Request a Server Consultation');
  content = content.replace(/Schedule a consultation to assess your infrastructure and plan your seamless migration to Microsoft Azure./g, 'Get a custom quotation tailored to your business needs and talk to a server specialist today.');
  content = content.replace(/Start your seamless migration/g, 'Upgrade your server infrastructure');
  
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, `import {\n  Cloud, ShieldCheck, Server, Database, Globe, ArrowRight, Activity, Cpu, \n  Lock, Network, Monitor, Code, CheckCircle, HelpCircle, ChevronDown, \n  HeartPulse, LineChart, Factory, ShoppingCart, GraduationCap, Building2,\n  Briefcase, TerminalSquare, BrainCircuit, LayoutGrid, Zap, Shield, HardDrive, Settings, BarChart, CheckSquare, Wrench\n} from 'lucide-react';`);

  fs.writeFileSync(path.join(__dirname, 'src', 'pages', config.filename), content);
  console.log(`Generated ${config.filename}`);
}

const sharedSolutions = [
  { icon: 'Server', title: 'Sales – New & Refurbished', desc: 'Premium enterprise servers.' },
  { icon: 'Settings', title: 'Installation & Configuration', desc: 'Expert deployment services.' },
  { icon: 'ShieldCheck', title: 'Annual Maintenance (AMC)', desc: 'Comprehensive support contracts.' },
  { icon: 'Activity', title: 'On-site Support', desc: 'Rapid technical assistance.' },
  { icon: 'Cpu', title: 'Hardware Upgrades', desc: 'Performance enhancements.' },
  { icon: 'HardDrive', title: 'Genuine Spare Parts', desc: 'Authentic brand components.' },
  { icon: 'Briefcase', title: 'Server Consultation', desc: 'Strategic infrastructure planning.' }
];

const sharedIndustries = [
  { icon: 'TerminalSquare', name: 'IT & Software' },
  { icon: 'Factory', name: 'Manufacturing' },
  { icon: 'HeartPulse', name: 'Healthcare' },
  { icon: 'Building2', name: 'Banking & Finance' },
  { icon: 'GraduationCap', name: 'Education' },
  { icon: 'Globe', name: 'Government' },
  { icon: 'ShoppingCart', name: 'Retail' },
  { icon: 'Wrench', name: 'Engineering' },
  { icon: 'LayoutGrid', name: 'Construction' },
  { icon: 'Database', name: 'Data Centers' }
];

const sharedProcess = [
  { title: 'Consultation', desc: 'Understand the client workload, business goals, and budget.' },
  { title: 'Quotation', desc: 'Recommend the ideal configuration with a transparent quote.' },
  { title: 'Installation', desc: 'Source, test, deliver, and install the server.' },
  { title: 'Handover', desc: 'Diagnostics, performance validation, and walkthrough.' },
  { title: 'Ongoing Support', desc: 'Long-term support, AMC, and responsive assistance.' }
];

const sharedWhyUs = [
  'Authorized Technology Partner', 'Genuine Enterprise Hardware', 'Certified Technical Engineers', 
  'End-to-End Deployment', 'Annual Maintenance Contracts', 'Rapid Technical Support', 
  'Flexible Upgrade Options', 'Long-Term Partnership'
];

const sharedFaqs = [
  { q: 'Which server brand is best for my business?', a: 'The ideal brand depends on your specific workload, budget, and existing infrastructure. We provide tailored recommendations during our free consultation.' },
  { q: 'Do you supply new and refurbished servers?', a: 'Yes, we supply both brand-new and certified refurbished enterprise servers to accommodate different budget requirements.' },
  { q: 'Do you provide installation and migration services?', a: 'Absolutely. Our certified engineers handle everything from physical rack installation to OS configuration and data migration.' },
  { q: 'Can you upgrade existing servers?', a: 'Yes, we provide genuine spare parts and perform RAM, storage, and CPU upgrades for existing server infrastructure.' },
  { q: 'Is AMC available?', a: 'We offer comprehensive Annual Maintenance Contracts (AMC) to ensure your servers operate at peak performance with minimized downtime.' },
  { q: 'Do you provide on-site support?', a: 'Yes, our rapid response technical team provides on-site support for hardware troubleshooting and maintenance.' },
  { q: 'Can you help select the right server configuration?', a: 'Our enterprise specialists will assess your application workloads and business goals to design the perfect server specification.' }
];

const sharedBenefits = [
  'High Performance', 'Enterprise Reliability', 'Scalable Architecture', 
  'Advanced Security', 'Energy Efficient', 'Cost-Effective'
];

const pages = [
  {
    componentName: 'DellServers',
    filename: 'DellServers.tsx',
    brandName: 'Dell PowerEdge',
    subtitle: 'Enterprise Rack, Tower & Blade Servers',
    rgb: '14,165,233', // sky/blue
    colorName: 'blue',
    gradientEnd: 'cyan',
    reasons: [
      { icon: 'Activity', title: 'Enterprise Performance', desc: 'Handle the most demanding workloads with exceptional compute power.' },
      { icon: 'BrainCircuit', title: 'Intelligent Automation', desc: 'Streamline IT management with automated server lifecycle tasks.' },
      { icon: 'LayoutGrid', title: 'Scalable Infrastructure', desc: 'Easily expand your resources as your business requirements grow.' },
      { icon: 'Zap', title: 'Energy Efficient', desc: 'Optimize data center cooling and lower your overall power consumption.' },
      { icon: 'Shield', title: 'Advanced Security', desc: 'Built-in cyber-resilient architecture protecting data from the core.' },
      { icon: 'Server', title: 'AI & Virtualization', desc: 'Optimized architectures for dense virtualization and AI inference.' }
    ],
    solutions: sharedSolutions,
    industries: sharedIndustries,
    process: sharedProcess,
    whyUs: sharedWhyUs,
    faqs: sharedFaqs,
    benefits: sharedBenefits
  },
  {
    componentName: 'HPServers',
    filename: 'HPServers.tsx',
    brandName: 'HP (HPE ProLiant)',
    subtitle: 'Intelligent Enterprise Compute Solutions',
    rgb: '34,197,94', // green
    colorName: 'green',
    gradientEnd: 'emerald',
    reasons: [
      { icon: 'CheckSquare', title: 'High Reliability', desc: 'Engineered for maximum uptime and continuous enterprise operations.' },
      { icon: 'Monitor', title: 'Intelligent Management', desc: 'Advanced remote management capabilities with HPE iLO.' },
      { icon: 'Server', title: 'Flexible Deployment', desc: 'Versatile configurations suitable for edge to cloud environments.' },
      { icon: 'ShieldCheck', title: 'Enterprise Security', desc: 'Silicon root of trust protecting servers from firmware attacks.' },
      { icon: 'Cloud', title: 'Hybrid Cloud Ready', desc: 'Seamlessly bridge your on-premises infrastructure with the cloud.' },
      { icon: 'Globe', title: 'Remote Management', desc: 'Complete server control from anywhere in the world.' }
    ],
    solutions: sharedSolutions,
    industries: sharedIndustries,
    process: sharedProcess,
    whyUs: sharedWhyUs,
    faqs: sharedFaqs,
    benefits: sharedBenefits
  },
  {
    componentName: 'LenovoServers',
    filename: 'LenovoServers.tsx',
    brandName: 'Lenovo ThinkSystem',
    subtitle: 'Reliable High-Performance Data Center Servers',
    rgb: '239,68,68', // red
    colorName: 'red',
    gradientEnd: 'orange',
    reasons: [
      { icon: 'Cpu', title: 'High Performance', desc: 'Record-breaking performance for critical enterprise applications.' },
      { icon: 'Zap', title: 'Energy Efficiency', desc: 'Industry-leading cooling technology minimizing data center costs.' },
      { icon: 'Database', title: 'Enterprise Scalability', desc: 'Modular designs allowing seamless expansion of compute and storage.' },
      { icon: 'CheckCircle', title: 'Superior Reliability', desc: 'Consistently ranked #1 in x86 server reliability worldwide.' },
      { icon: 'Server', title: 'Data Center Ready', desc: 'Engineered to fit seamlessly into modern dense data centers.' },
      { icon: 'LineChart', title: 'Cost-Effective', desc: 'Outstanding price-to-performance ratio for growing businesses.' }
    ],
    solutions: sharedSolutions,
    industries: sharedIndustries,
    process: sharedProcess,
    whyUs: sharedWhyUs,
    faqs: sharedFaqs,
    benefits: sharedBenefits
  },
  {
    componentName: 'Servers',
    filename: 'Servers.tsx',
    brandName: 'Enterprise Server Solutions',
    subtitle: 'Powerful, scalable, and reliable server infrastructure featuring Dell PowerEdge, HP ProLiant, and Lenovo ThinkSystem.',
    rgb: '59,130,246', // blue
    colorName: 'blue',
    gradientEnd: 'indigo',
    reasons: [
      { icon: 'Server', title: 'Dell PowerEdge', desc: 'Intelligent, automated, and secure enterprise rack and tower servers.' },
      { icon: 'Server', title: 'HPE ProLiant', desc: 'Highly reliable and flexible servers with advanced remote management.' },
      { icon: 'Server', title: 'Lenovo ThinkSystem', desc: 'Industry-leading reliability and performance for modern data centers.' },
      { icon: 'ShieldCheck', title: 'End-to-End Security', desc: 'Hardware-level security ensuring your critical enterprise data is protected.' },
      { icon: 'Activity', title: '24/7 AMC Support', desc: 'Comprehensive annual maintenance to keep your infrastructure running.' },
      { icon: 'Briefcase', title: 'Expert Consultation', desc: 'Custom tailored server configurations designed for your workloads.' }
    ],
    solutions: sharedSolutions,
    industries: sharedIndustries,
    process: sharedProcess,
    whyUs: sharedWhyUs,
    faqs: sharedFaqs,
    benefits: sharedBenefits
  }
];

pages.forEach(generatePage);
