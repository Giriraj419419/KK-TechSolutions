/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from 'react';
import { Send, ChevronRight, Check, Building2, Calendar, Clock, Loader2, CheckCircle2, Search, UploadCloud, X, Lock, File } from 'lucide-react';
import { Reveal, Eyebrow, TextReveal } from '../components/Section';
import { SectionGlow } from '../components/Atmosphere';
import { motion, AnimatePresence } from 'framer-motion';
import FlagshipContactEnvironment from '../components/FlagshipContactEnvironment';

const offices = [
  {
    id: 'ho',
    name: 'Ahmedabad, Gujarat (HO)',
    address: '715, Shilp Arista\nSindhu Bhawan Road\nBodakdev\nAhmedabad, Gujarat – 380054',
    mapQuery: 'Shilp Arista, Sindhu Bhawan Road, Bodakdev, Ahmedabad, Gujarat'
  },
  {
    id: 'delhi',
    name: 'Nehru Place, New Delhi',
    address: '818, 8th Floor\nDevika Tower\nNehru Place\nNew Delhi – 110019',
    mapQuery: '818, 8th Floor, Devika Tower, Nehru Place, New Delhi'
  }
];

const servicesData = [
  { id: 'm365', vendor: 'Microsoft', title: 'Microsoft 365', description: 'Cloud Productivity & Licensing', logo: '/microsoft.svg', badge: 'Most Popular' },
  { id: 'azure', vendor: 'Azure', title: 'Microsoft Azure', description: 'Cloud Computing Platform', logo: '/azure.svg', badge: 'Enterprise Choice' },
  { id: 'aws', vendor: 'AWS', title: 'AWS Cloud', description: 'Enterprise Cloud Solutions', logo: '/aws.svg', badge: 'Recommended' },
  { id: 'adobe', vendor: 'Adobe', title: 'Adobe Solutions', description: 'Creative Cloud Software', logo: '/adobe.svg' },
  { id: 'autodesk', vendor: 'Autodesk', title: 'Autodesk Solutions', description: '3D Design & Engineering', logo: '/autodesk.svg' },
  { id: 'zwcad', vendor: 'ZWCAD', title: 'ZWCAD Solutions', description: 'Reliable CAD Software', logo: '/zwcad.svg' }
];

const serversData = [
  { id: 'dell', vendor: 'Dell', title: 'Dell PowerEdge', description: 'Enterprise servers for virtualization.', logo: '/dell.svg', badge: 'Most Popular' },
  { id: 'hp', vendor: 'HPE', title: 'HPE ProLiant', description: 'Intelligent compute & hybrid cloud.', logo: '/hp.svg' },
  { id: 'lenovo', vendor: 'Lenovo', title: 'Lenovo ThinkSystem', description: 'AI-powered computing and data.', logo: '/lenovo.svg' }
];

// ==========================================
// Main Component
// ==========================================
export default function Contact() {
  const [activeOffice, setActiveOffice] = useState(offices[0]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  
  // New States for Simplified Step 1
  const [activeTab, setActiveTab] = useState<'services' | 'servers'>('services');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedOption: '',
    budget: '',
    projectNotes: '',
    priority: '',
    timeline: '',
    date: '',
    time: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    // Final Submit
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.selectedOption,
        budget: formData.budget,
        projectDetails: formData.projectNotes,
        priority: formData.priority,
        timeline: formData.timeline
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setLeadId(data.leadId);
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit form', data.error);
        setSubmitError(data.error || 'Something went wrong while submitting your request.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgets = [
    'Below ₹50K',
    '₹50K–₹2L',
    '₹2L–₹10L',
    '₹10L+',
    'Custom'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'
  ];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        dates.push(d);
      }
    }
    return dates;
  };
  const availableDates = generateDates();

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <Reveal className="h-full flex flex-col items-center justify-center py-12">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            <Check className="w-12 h-12 text-cyan-400" />
          </motion.div>
          
          <h3 className="text-3xl font-bold text-white mb-4">Thank You For Contacting KK Tech Solutions</h3>
          <p className="text-gray-400 max-w-lg mx-auto text-center text-lg leading-relaxed mb-6">
            Your consultation request has been submitted successfully.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-6 py-4 mb-6 text-center">
            <span className="block text-sm text-blue-300 font-semibold mb-1">Reference ID:</span>
            <span className="block text-xl text-white font-mono font-bold">[{leadId || 'KKT-PENDING'}]</span>
          </div>
          <p className="text-gray-400 max-w-lg mx-auto text-center leading-relaxed">
            A confirmation email has been sent to your inbox.<br/>
            Our team will contact you shortly.
          </p>
        </Reveal>
      );
    }
    switch (step) {
      case 1: {
        const currentData = (activeTab === 'services' ? servicesData : serversData).filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (item.vendor && item.vendor.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        return (
          <Reveal className="h-full flex flex-col items-center justify-start max-w-5xl mx-auto w-full pt-4">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">Choose Your Solution</h3>
              <p className="text-base text-gray-400">Select a core service or server infrastructure to begin.</p>
            </div>
            
            {/* Top Tabs & Search */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 relative z-20">
              <div className="flex bg-black/40 border border-white/10 p-1.5 rounded-full relative">
                {(['services', 'servers'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
                    className={`relative px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors z-10 ${
                      activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="tab-indicator"
                        className="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] -z-10"
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Microsoft, AWS, Autodesk..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors py-3 pl-12 pr-4 rounded-full text-white text-sm"
                />
              </div>
            </div>

            {/* Grid Container */}
            <div className="w-full relative min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + searchQuery}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
                >
                  {currentData.length > 0 ? currentData.map((item) => {
                    const isSelected = formData.selectedOption === item.title;
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedOption: item.title })}
                        className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group overflow-hidden ${
                          isSelected
                            ? 'border-blue-500 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex flex-col gap-5 relative z-10">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2.5 shadow-inner border border-gray-100">
                                <img src={item.logo} alt={item.vendor} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">{item.vendor}</span>
                                <h4 className={`text-xl font-bold transition-colors ${isSelected ? 'text-white' : 'text-gray-100'}`}>{item.title}</h4>
                              </div>
                            </div>
                            {isSelected ? (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold">
                                <Check className="w-3.5 h-3.5" /> Selected
                              </motion.div>
                            ) : item.badge ? (
                              <div className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full text-xs font-semibold">
                                {item.badge}
                              </div>
                            ) : null}
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed max-w-[90%]">{item.description}</p>
                        </div>
                        
                        {/* Hover glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </motion.button>
                    );
                  }) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                      No results found for "{searchQuery}".
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        );
      }
      case 2: {
        return (
          <Reveal className="space-y-6 h-full flex flex-col justify-center max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-3">Customize Your Solution</h3>
              <p className="text-base text-gray-400 mb-10">Select an estimated budget for your <strong className="text-blue-400">{formData.selectedOption}</strong> deployment.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {budgets.map((b) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={b}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: b })}
                    className={`p-6 rounded-2xl border text-left transition-all ${
                      formData.budget === b
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                        : 'border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold">{b}</span>
                      {formData.budget === b && <CheckCircle2 className="w-6 h-6" />}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>
        );
      }
      case 3: {
        const maxChars = 2000;
        
        const handleDrag = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
          } else if (e.type === "dragleave") {
            setIsDragging(false);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const newFiles = Array.from(e.dataTransfer.files);
            setUploadedFiles(prev => [...prev, ...newFiles]);
          }
        };

        const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            const newFiles = Array.from(e.target.files);
            setUploadedFiles(prev => [...prev, ...newFiles]);
          }
        };
        
        const removeFile = (index: number) => {
          setUploadedFiles(prev => prev.filter((_, i) => i !== index));
        };

        const formatFileSize = (bytes: number) => {
          if (bytes === 0) return '0 Bytes';
          const k = 1024;
          const sizes = ['Bytes', 'KB', 'MB', 'GB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        return (
          <Reveal className="space-y-8 h-full flex flex-col justify-center max-w-4xl mx-auto w-full pt-10">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-white mb-3">Project Briefing</h3>
              <p className="text-base text-gray-400">Provide detailed information so our enterprise architects can assist you effectively.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Personal Info & Priority */}
              <div className="space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-3xl h-fit">
                <h4 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">Contact Details</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="spatial-input w-full bg-black/40 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors p-3.5 rounded-xl text-white text-base"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Work Email *</label>
                    <input
                      type="email"
                      required
                      className="spatial-input w-full bg-black/40 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors p-3.5 rounded-xl text-white text-base"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      className="spatial-input w-full bg-black/40 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors p-3.5 rounded-xl text-white text-base"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Company Name</label>
                    <input
                      type="text"
                      className="spatial-input w-full bg-black/40 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors p-3.5 rounded-xl text-white text-base"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Project Priority</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Low', 'Medium', 'High', 'Critical'].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority: p })}
                        className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                          formData.priority === p 
                            ? 'border-blue-500 bg-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                            : 'border-white/10 bg-black/40 text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expected Timeline</label>
                  <select 
                    className="spatial-input w-full bg-black/40 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors p-3.5 rounded-xl text-white text-base appearance-none cursor-pointer"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="" disabled className="text-gray-500">Select Timeline...</option>
                    <option value="Immediately" className="bg-black text-white">Immediately</option>
                    <option value="Within 1 Week" className="bg-black text-white">Within 1 Week</option>
                    <option value="Within 1 Month" className="bg-black text-white">Within 1 Month</option>
                    <option value="Planning Stage" className="bg-black text-white">Planning Stage</option>
                    <option value="No Fixed Timeline" className="bg-black text-white">No Fixed Timeline</option>
                  </select>
                </div>
              </div>

              {/* Right Column: Project Details & File Upload */}
              <div className="space-y-6">
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Project Requirements</label>
                    <span className={`text-xs font-semibold ${formData.projectNotes.length > maxChars * 0.9 ? 'text-red-400' : 'text-gray-500'}`}>
                      {formData.projectNotes.length} / {maxChars}
                    </span>
                  </div>
                  
                  <textarea
                    required
                    maxLength={maxChars}
                    className="spatial-input w-full bg-black/40 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 transition-colors p-4 rounded-xl text-white text-base min-h-[140px] resize-y mb-6"
                    placeholder="Tell us about your project...&#10;&#10;E.g., Current infrastructure, required products, number of users, existing challenges, goals..."
                    value={formData.projectNotes}
                    onChange={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                      setFormData({ ...formData, projectNotes: e.target.value });
                    }}
                  />

                  {/* File Upload Area */}
                  <div className="mt-auto">
                    <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Supporting Documents</label>
                    
                    <div 
                      className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
                        isDragging 
                          ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-[1.02]' 
                          : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.zip"
                      />
                      
                      <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragging ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm mb-1">Drag & Drop Files Here</p>
                          <p className="text-gray-500 text-xs">PDF, DOCX, XLSX, PPTX, PNG, JPG, ZIP (Max 25MB)</p>
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white transition-colors cursor-pointer relative z-10"
                      >
                        Browse Files
                      </button>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                        {uploadedFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-black/40 border border-white/10 p-3 rounded-xl group hover:border-white/20 transition-colors">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <File className="w-5 h-5 text-blue-400 flex-shrink-0" />
                              <div className="overflow-hidden">
                                <p className="text-sm text-white font-medium truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeFile(idx)}
                              className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-5 flex items-start gap-2 text-[11px] text-gray-500 bg-black/20 p-3 rounded-xl border border-white/5">
                      <Lock className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>Your uploaded files are encrypted and will only be accessed by certified KK Tech Solutions consultants.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      }
      case 4:
        return (
          <Reveal className="space-y-6 h-full flex flex-col justify-center max-w-4xl mx-auto">
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl text-center mb-4">
                <p className="font-bold">Something went wrong while submitting your request.</p>
                <p className="text-sm mt-1">{submitError}</p>
              </div>
            )}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">Schedule Consultation</h3>
              <p className="text-base text-gray-400">Select a time to discuss your {formData.selectedOption} solution.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-base font-bold text-white">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    Available Dates
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {availableDates.slice(0, 12).map((d, i) => {
                    const dateStr = d.toISOString().split('T')[0];
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = d.getDate();
                    const isSelected = formData.date === dateStr;
                    return (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, date: dateStr })}
                        className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                            : 'border-white/10 bg-black/40 text-gray-400 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1">{dayName}</span>
                        <span className="text-2xl font-black">{dayNum}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-base font-bold text-white">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Time Slots
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {timeSlots.map((time) => {
                    const isSelected = formData.time === time;
                    return (
                      <motion.button
                        whileHover={formData.date ? { x: 5 } : {}}
                        whileTap={formData.date ? { scale: 0.98 } : {}}
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, time })}
                        disabled={!formData.date}
                        className={`w-full py-4 px-6 text-base font-bold rounded-2xl border text-left transition-all flex items-center justify-between ${
                          !formData.date 
                            ? 'opacity-30 cursor-not-allowed border-white/5 bg-transparent text-gray-600'
                            : isSelected
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                              : 'border-white/10 bg-black/40 text-gray-400 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {time}
                        {isSelected && <CheckCircle2 className="w-6 h-6" />}
                      </motion.button>
                    );
                  })}
                </div>
                {!formData.date && (
                  <p className="text-sm text-gray-500 italic mt-4 text-center">Select a date first to view available times.</p>
                )}
              </div>
            </div>
          </Reveal>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !formData.selectedOption) return true;
    if (step === 2 && !formData.budget) return true;
    if (step === 3) {
      if (formData.name.trim().length < 2) return true;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return true;
      if (formData.phone && !/^\+?[\d\s-]{7,15}$/.test(formData.phone)) return true;
      if (!formData.projectNotes.trim()) return true;
    }
    if (step === 4 && (!formData.date || !formData.time)) return true;
    return false;
  };

  const timelineSteps = [
    { num: 1, title: 'Select' },
    { num: 2, title: 'Customize' },
    { num: 3, title: 'Connect' },
    { num: 4, title: 'Schedule' }
  ];

  return (
    <div className="relative min-h-screen bg-transparent">
      <FlagshipContactEnvironment />

      {/* ===== HEADER ===== */}
      <section className="relative z-10 pt-36 pb-12 overflow-hidden">
        <SectionGlow color="blue" position="top-left" opacity={0.15} size={500} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="down">
            <Eyebrow>Book a Consultation</Eyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight text-white">
              <TextReveal text="Ready to Elevate" delay={0.08} />{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Your Enterprise?
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ===== FORM WIZARD ===== */}
      <section className="relative z-10 pb-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="bottom-right" opacity={0.08} size={500} />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-10">
          
          <div className="w-full relative overflow-hidden shadow-2xl premium-glass rounded-[40px] border border-white/10 p-6 md:p-12 min-h-[600px] flex flex-col">
            
            {/* Dynamic Timeline */}
            {!isSubmitted && (
              <div className="mb-12 border-b border-white/10 pb-8 relative z-20">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                  {timelineSteps.map((s, i) => (
                    <div key={s.num} className="flex-1 relative flex items-center">
                      <div className={`relative z-10 flex flex-col items-center gap-3 transition-colors duration-500 ${step >= s.num ? 'text-blue-400' : 'text-gray-600'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#0B121F] transition-all duration-500 ${step >= s.num ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-white/10'}`}>
                          {step > s.num ? <Check className="w-5 h-5 text-blue-400" /> : <span className="text-sm font-bold">{s.num}</span>}
                        </div>
                        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest hidden sm:block whitespace-nowrap">{s.title}</span>
                      </div>
                      
                      {i < timelineSteps.length - 1 && (
                        <div className="flex-1 h-0.5 mx-4 relative overflow-hidden rounded bg-white/5">
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                            initial={{ width: '0%' }}
                            animate={{ width: step > s.num ? '100%' : '0%' }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              {!isSubmitted && (
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between relative z-20">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-full text-base font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                    >
                      Go Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isNextDisabled() || isSubmitting}
                    className={`btn-primary px-10 py-4 text-base inline-flex items-center gap-3 transition-all group ${
                      (isNextDisabled() || isSubmitting) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        Submitting Request...
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : step === 4 ? (
                      <>
                        Finalize & Connect
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : step === 1 ? (
                      <>
                        Continue to Budget
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        Proceed to Next Stage
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ===== MAP & LOCATIONS ===== */}
      <section className="relative z-10 py-16 lg:py-24 overflow-hidden">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="grid lg:grid-cols-[350px_1fr] gap-8">
              {/* Office Selector */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white mb-2">Our Offices</h3>
                {offices.map((office) => {
                  const isActive = activeOffice.id === office.id;
                  return (
                    <motion.div
                      key={office.id}
                      onClick={() => setActiveOffice(office)}
                      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden group ${
                        isActive 
                          ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' 
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/20'
                      }`}
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Traveling reflection */}
                      <div className="absolute -inset-[100%] z-0 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-300">
                        <motion.div
                          animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400 group-hover:text-gray-300'}`}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`text-base font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {office.name}
                          </h4>
                          <p className={`text-sm leading-relaxed whitespace-pre-line transition-colors duration-300 ${isActive ? 'text-blue-100/70' : 'text-gray-500 group-hover:text-gray-400'}`}>
                            {office.address}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map View */}
              <div className="w-full h-[400px] lg:h-full min-h-[500px] bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative group">
                 <div className="absolute inset-0 bg-black/20 pointer-events-none z-10 transition-opacity duration-300 group-hover:bg-transparent" />
                 
                 // eslint-disable-next-line @typescript-eslint/no-unused-vars
                 {offices.map((office, i) => {
                   const isActive = activeOffice.id === office.id;
                   return (
                     <div 
                       key={office.id} 
                       className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                       style={{ 
                         opacity: isActive ? 1 : 0, 
                         pointerEvents: isActive ? 'auto' : 'none',
                         zIndex: isActive ? 20 : 10
                       }}
                     >
                       <iframe
                         src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=m&z=15&output=embed&iwloc=near`}
                         className="w-full h-full border-0 filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                         allowFullScreen={false} 
                         loading="lazy" 
                         referrerPolicy="no-referrer-when-downgrade"
                       />
                     </div>
                   );
                 })}
              </div>
            </Reveal>
         </div>
      </section>

    </div>
  );
}
