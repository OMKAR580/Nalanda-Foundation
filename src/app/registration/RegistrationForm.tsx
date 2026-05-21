"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";
import { courses } from "@/data/courses";
import { User, BookOpen, Settings, AlertTriangle, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

export default function RegistrationForm({ initialEmail = "", initialName = "" }: { initialEmail?: string, initialName?: string }) {
  const router = useRouter();
  const { refreshRegistrationStatus } = useRegistrationStatus();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sections progress tracking
  const [activeTab, setActiveTab] = useState("personal");

  // Form State
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: initialName,
    date_of_birth: "",
    gender: "",
    parent_guardian_name: "",
    mobile_number: "",
    whatsapp_number: "",
    email: initialEmail,
    permanent_address: "",
    city: "",
    state: "",
    pin_code: "",

    // Academic Information
    university_name: "",
    college_name: "",
    degree: "",
    department_stream: "",
    class_semester: "",
    academic_session: "",
    major_subject: "",
    university_roll_number: "",
    university_registration_number: "",
    course_program: "",
    branch_specialization: "",
    cgpa_percentage: "",

    // Internship Preferences
    internship_programs: [] as string[],
    first_preference: "",
    preferred_mode: "",
    preferred_time_slot: "",
    laptop_device_availability: "",
    internet_availability: "",
    previous_internship: "",
    skills_to_learn: "",
    why_join: "",
    how_did_you_hear: "",
    referral_code: "",

    // Emergency Contact
    emergency_contact_name: "",
    emergency_contact_number: "",
    emergency_contact_relationship: "",

    // Optional Links
    id_card_link: "",
    resume_link: "",
    photo_link: "",

    // Consent
    declaration_consent: false,
    terms_agreed: false
  });

  // Field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Programs multi-select toggler
  const handleProgramToggle = (programTitle: string) => {
    setFormData((prev) => {
      const selected = prev.internship_programs.includes(programTitle)
        ? prev.internship_programs.filter((p) => p !== programTitle)
        : [...prev.internship_programs, programTitle];
      return {
        ...prev,
        internship_programs: selected
      };
    });
  };

  // Validations
  const validateForm = () => {
    // Personal checks
    if (!formData.full_name || !formData.date_of_birth || !formData.gender || !formData.parent_guardian_name || !formData.mobile_number || !formData.email || !formData.permanent_address || !formData.city || !formData.state || !formData.pin_code) {
      setActiveTab("personal");
      return "All fields in Personal Information are required.";
    }
    if (!/^\d{10}$/.test(formData.mobile_number)) {
      setActiveTab("personal");
      return "Mobile Number must be exactly 10 digits.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setActiveTab("personal");
      return "Please enter a valid email address.";
    }

    // Academic checks
    if (!formData.university_name || !formData.college_name || !formData.degree || !formData.department_stream || !formData.class_semester || !formData.academic_session || !formData.university_roll_number || !formData.university_registration_number || !formData.course_program) {
      setActiveTab("academic");
      return "All fields in Academic Information are required.";
    }

    // Internship checks
    if (formData.internship_programs.length < 2) {
      setActiveTab("preferences");
      return "You must select a minimum of 2 internship programs under Internship Preferences.";
    }
    if (!formData.first_preference || !formData.preferred_mode || !formData.laptop_device_availability || !formData.internet_availability || !formData.why_join) {
      setActiveTab("preferences");
      return "Please complete all required fields under Internship Preferences.";
    }

    // Emergency Contact
    if (!formData.emergency_contact_name || !formData.emergency_contact_number || !formData.emergency_contact_relationship) {
      setActiveTab("emergency");
      return "All fields in Emergency Contact are required.";
    }
    if (!/^\d{10}$/.test(formData.emergency_contact_number)) {
      setActiveTab("emergency");
      return "Emergency Contact Number must be exactly 10 digits.";
    }

    // Consents
    if (!formData.declaration_consent || !formData.terms_agreed) {
      setActiveTab("consent");
      return "You must accept the declaration and terms of agreement to proceed.";
    }

    return null;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const err = validateForm();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/registration/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMsg("Registration successfully saved! Redirecting to dashboard...");
        setTimeout(() => {
          void refreshRegistrationStatus().finally(() => {
            router.push("/dashboard");
          });
        }, 1500);
      } else {
        setErrorMsg(result.error || "Failed to submit registration.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error occurred during form submission.");
      setSubmitting(false);
    }
  };

  return (
    <>

        {errorMsg && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-lg flex items-start gap-3 text-red-900 shadow-sm animate-pulse">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Validation Error</p>
              <p className="text-xs mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg flex items-start gap-3 text-green-900 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Success</p>
              <p className="text-xs mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        {/* Multi-Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="space-y-2">
            {[
              { id: "personal", label: "Personal Information", icon: User },
              { id: "academic", label: "Academic Profile", icon: BookOpen },
              { id: "preferences", label: "Internship Preferences", icon: Settings },
              { id: "emergency", label: "Emergency Contacts", icon: AlertTriangle },
              { id: "consent", label: "Consents & Documents", icon: ShieldCheck }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-[#800020] text-[#FAF6EE] border-[#800020] shadow-md transform translate-x-1"
                      : "bg-[#FFFDF9] text-[#5C4D4D] border-[#D6C7B2] hover:bg-[#FAF6EE] hover:text-[#800020]"
                  }`}
                >
                  <IconComp className={`h-4 w-4 ${isActive ? "text-[#FAF6EE]" : "text-[#C35237]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="lg:col-span-3">
            <Card className="border border-[#D6C7B2] bg-[#FFFDF9] shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-[#800020] text-[#FAF6EE] p-6 border-b border-[#D6C7B2]">
                <CardTitle className="text-xl font-bold font-serif flex items-center gap-2">
                  {activeTab === "personal" && "1. Personal Information"}
                  {activeTab === "academic" && "2. Academic Information"}
                  {activeTab === "preferences" && "3. Internship Preferences"}
                  {activeTab === "emergency" && "4. Emergency Contact"}
                  {activeTab === "consent" && "5. Optional Documents & Declarations"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {/* 1. PERSONAL INFORMATION */}
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Enter your legal full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Date of Birth *</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        required
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Gender *</label>
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        name="parent_guardian_name"
                        required
                        value={formData.parent_guardian_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Enter parent/guardian full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE]/70 px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="student@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Mobile Number (10 digits) *</label>
                      <input
                        type="tel"
                        name="mobile_number"
                        maxLength={10}
                        required
                        value={formData.mobile_number}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. 9876543210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">WhatsApp Number (Optional)</label>
                      <input
                        type="tel"
                        name="whatsapp_number"
                        maxLength={10}
                        value={formData.whatsapp_number}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Leave blank if same as mobile"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Permanent Address *</label>
                      <textarea
                        name="permanent_address"
                        required
                        value={formData.permanent_address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Enter your complete house number, street, landmark, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Rajgir"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">State *</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Bihar"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Pin Code *</label>
                      <input
                        type="text"
                        name="pin_code"
                        maxLength={6}
                        required
                        value={formData.pin_code}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="6-digit ZIP code"
                      />
                    </div>
                  </div>
                )}

                {/* 2. ACADEMIC INFORMATION */}
                {activeTab === "academic" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">University Name *</label>
                      <input
                        type="text"
                        name="university_name"
                        required
                        value={formData.university_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Patliputra University"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">College Name *</label>
                      <input
                        type="text"
                        name="college_name"
                        required
                        value={formData.college_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Nalanda College"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Degree *</label>
                      <input
                        type="text"
                        name="degree"
                        required
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. B.Tech / B.Sc / BCA"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Department / Stream *</label>
                      <input
                        type="text"
                        name="department_stream"
                        required
                        value={formData.department_stream}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Computer Science"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Class / Semester *</label>
                      <input
                        type="text"
                        name="class_semester"
                        required
                        value={formData.class_semester}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Semester IV / 2nd Year"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Academic Session *</label>
                      <input
                        type="text"
                        name="academic_session"
                        required
                        value={formData.academic_session}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. 2024-2028"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Major Subject (Optional)</label>
                      <input
                        type="text"
                        name="major_subject"
                        value={formData.major_subject}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Physics / Software Eng"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">University Roll Number *</label>
                      <input
                        type="text"
                        name="university_roll_number"
                        required
                        value={formData.university_roll_number}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Roll number"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">University Registration Number *</label>
                      <input
                        type="text"
                        name="university_registration_number"
                        required
                        value={formData.university_registration_number}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Registration number"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Course Program *</label>
                      <input
                        type="text"
                        name="course_program"
                        required
                        value={formData.course_program}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. BCA Honours"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Branch Specialization (Optional)</label>
                      <input
                        type="text"
                        name="branch_specialization"
                        value={formData.branch_specialization}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Data Analytics"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">CGPA / Percentage (Optional)</label>
                      <input
                        type="text"
                        name="cgpa_percentage"
                        value={formData.cgpa_percentage}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. 8.5 CGPA or 82%"
                      />
                    </div>
                  </div>
                )}

                {/* 3. INTERNSHIP PREFERENCES */}
                {activeTab === "preferences" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-2">
                        Select Internship Programs (Select Minimum 2) *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-2 border border-[#D6C7B2] rounded-md bg-[#FAF6EE]">
                        {courses.map((course) => {
                          const isSelected = formData.internship_programs.includes(course.title);
                          return (
                            <div
                              key={course.id}
                              onClick={() => handleProgramToggle(course.title)}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                                isSelected
                                  ? "bg-[#FAF0D9] border-[#D97706] text-[#800020]"
                                  : "bg-[#FFFDF9] border-[#D6C7B2] hover:bg-[#FAF6EE]"
                              }`}
                            >
                              <div
                                className={`h-4.5 w-4.5 flex-shrink-0 rounded border flex items-center justify-center ${
                                  isSelected ? "bg-[#D97706] border-[#D97706] text-white" : "border-[#D6C7B2] bg-white"
                                }`}
                              >
                                {isSelected && "✓"}
                              </div>
                              <span className="truncate">{course.title}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xxs text-[#5C4D4D] mt-1.5 italic">
                        Currently Selected: {formData.internship_programs.length} programs (need at least 2)
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">First Preference Program *</label>
                        <select
                          name="first_preference"
                          required
                          value={formData.first_preference}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        >
                          <option value="">Select First Preference</option>
                          {formData.internship_programs.map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-[#5C4D4D] mt-1">Must be chosen from the selected programs list above.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Preferred Mode *</label>
                        <select
                          name="preferred_mode"
                          required
                          value={formData.preferred_mode}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        >
                          <option value="">Select Mode</option>
                          <option value="Online">Online</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Preferred Time Slot (Optional)</label>
                        <input
                          type="text"
                          name="preferred_time_slot"
                          value={formData.preferred_time_slot}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="e.g. 10:00 AM - 01:00 PM"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Laptop / Device Availability *</label>
                        <select
                          name="laptop_device_availability"
                          required
                          value={formData.laptop_device_availability}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        >
                          <option value="">Select Availability</option>
                          <option value="Yes">Yes (I have a functional laptop)</option>
                          <option value="No">No (I do not have a personal laptop)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Internet / Wi-Fi Availability *</label>
                        <select
                          name="internet_availability"
                          required
                          value={formData.internet_availability}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        >
                          <option value="">Select Availability</option>
                          <option value="Yes">Yes (I have stable Internet)</option>
                          <option value="No">No (I face issues with connectivity)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Previous Internship Details (Optional)</label>
                        <input
                          type="text"
                          name="previous_internship"
                          value={formData.previous_internship}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="Organization name, profile, or none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Skills to Learn (Optional)</label>
                        <input
                          type="text"
                          name="skills_to_learn"
                          value={formData.skills_to_learn}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="e.g. Next.js, Data Analysis, SEO"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">How Did You Hear About Us? (Optional)</label>
                        <input
                          type="text"
                          name="how_did_you_hear"
                          value={formData.how_did_you_hear}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="e.g. Social Media, Friends, College"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Referral / Coupon Code (Optional)</label>
                        <input
                          type="text"
                          name="referral_code"
                          value={formData.referral_code}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="Enter referral code"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Why do you want to join this program? *</label>
                      <textarea
                        name="why_join"
                        required
                        value={formData.why_join}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Explain your goals, what you wish to achieve, and why you are suitable."
                      />
                    </div>
                  </div>
                )}

                {/* 4. EMERGENCY CONTACTS */}
                {activeTab === "emergency" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Emergency Contact Full Name *</label>
                      <input
                        type="text"
                        name="emergency_contact_name"
                        required
                        value={formData.emergency_contact_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="Enter contact full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Emergency Contact Number (10 digits) *</label>
                      <input
                        type="tel"
                        name="emergency_contact_number"
                        maxLength={10}
                        required
                        value={formData.emergency_contact_number}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. 9876543210"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Emergency Contact Relationship *</label>
                      <input
                        type="text"
                        name="emergency_contact_relationship"
                        required
                        value={formData.emergency_contact_relationship}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                        placeholder="e.g. Father / Mother / Sibling / Uncle"
                      />
                    </div>
                  </div>
                )}

                {/* 5. CONSENTS & DOCUMENTS */}
                {activeTab === "consent" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 pb-6 border-b border-[#D6C7B2]">
                      <h3 className="font-serif font-bold text-lg text-[#800020]">Documents Links (Optional)</h3>
                      <p className="text-xs text-[#5C4D4D] -mt-4">
                        You can upload documents to Google Drive, Dropbox, or OneDrive and paste public, shareable links below.
                      </p>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">College ID Card Link</label>
                        <input
                          type="url"
                          name="id_card_link"
                          value={formData.id_card_link}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="https://drive.google.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Resume / CV Link</label>
                        <input
                          type="url"
                          name="resume_link"
                          value={formData.resume_link}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="https://drive.google.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D4D] mb-1.5">Passport Photo Link</label>
                        <input
                          type="url"
                          name="photo_link"
                          value={formData.photo_link}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] focus:outline-none focus:ring-1 focus:ring-[#800020] transition-shadow shadow-inner"
                          placeholder="https://drive.google.com/..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h3 className="font-serif font-bold text-[#800020] text-lg">Declaration & Terms</h3>

                      <div className="flex items-start gap-3 p-3 rounded bg-[#FAF6EE] border border-[#D6C7B2]">
                        <input
                          type="checkbox"
                          id="declaration_consent"
                          name="declaration_consent"
                          checked={formData.declaration_consent}
                          onChange={handleCheckboxChange}
                          className="h-5 w-5 rounded border-[#D6C7B2] text-[#800020] focus:ring-[#800020] mt-0.5 cursor-pointer"
                        />
                        <label htmlFor="declaration_consent" className="text-xs text-[#2E1E1E] leading-relaxed cursor-pointer selection:bg-[#FAF0D9]">
                          <strong>Declaration *</strong>: I hereby declare that all information submitted in this application is correct, complete, and true to the best of my knowledge. I understand that any false documentation will lead to immediate suspension from the Nalanda Foundation internship panel.
                        </label>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded bg-[#FAF6EE] border border-[#D6C7B2]">
                        <input
                          type="checkbox"
                          id="terms_agreed"
                          name="terms_agreed"
                          checked={formData.terms_agreed}
                          onChange={handleCheckboxChange}
                          className="h-5 w-5 rounded border-[#D6C7B2] text-[#800020] focus:ring-[#800020] mt-0.5 cursor-pointer"
                        />
                        <label htmlFor="terms_agreed" className="text-xs text-[#2E1E1E] leading-relaxed cursor-pointer selection:bg-[#FAF0D9]">
                          <strong>Terms Agreement *</strong>: I agree to the rules, code of conduct, flexible internship hours, and structural rules set by the academic panel of Nalanda Foundation for the Summer Internship Program 2026.
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Card Footer Actions */}
              <div className="bg-[#FAF6EE] p-6 border-t border-[#D6C7B2] flex items-center justify-between">
                {activeTab !== "personal" ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (activeTab === "consent") setActiveTab("emergency");
                      else if (activeTab === "emergency") setActiveTab("preferences");
                      else if (activeTab === "preferences") setActiveTab("academic");
                      else if (activeTab === "academic") setActiveTab("personal");
                    }}
                    className="border-[#800020] text-[#800020] hover:bg-[#FAF0D9]"
                  >
                    Previous Section
                  </Button>
                ) : (
                  <div />
                )}

                {activeTab !== "consent" ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (activeTab === "personal") setActiveTab("academic");
                      else if (activeTab === "academic") setActiveTab("preferences");
                      else if (activeTab === "preferences") setActiveTab("emergency");
                      else if (activeTab === "emergency") setActiveTab("consent");
                    }}
                    className="bg-[#800020] hover:bg-[#6B1D2F] text-[#FAF6EE]"
                  >
                    Next Section
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#800020] hover:bg-[#6B1D2F] text-[#FAF6EE] shadow-lg flex items-center gap-2 font-bold px-6"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#FAF6EE]" />
                        <span>Submitting Details...</span>
                      </>
                    ) : (
                      "Submit & Complete Registration"
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </form>
        </div>
    </>
  );
}
