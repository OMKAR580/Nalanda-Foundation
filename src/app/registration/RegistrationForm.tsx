"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Loader2,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";
import {
  getCollegeOptions,
  isOtherCollegeOption,
  resolveCollegeSelection,
} from "@/data/colleges";
import { courses } from "@/data/courses";
import { useLanguage } from "@/hooks/useLanguage";
import { captureEvent } from "@/lib/analytics/posthog";

const collegeOptions = getCollegeOptions();

export default function RegistrationForm({
  initialEmail = "",
  initialName = "",
}: {
  initialEmail?: string;
  initialName?: string;
}) {
  const router = useRouter();
  const { refreshRegistrationStatus } = useRegistrationStatus();
  const { messages } = useLanguage();
  const formMessages = messages.registrationForm;
  const { personal, academic, preferences, emergency, consent } = formMessages;
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
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
    university_name: "",
    college_name: "",
    other_college_name: "",
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
    emergency_contact_name: "",
    emergency_contact_number: "",
    emergency_contact_relationship: "",
    id_card_link: "",
    resume_link: "",
    photo_link: "",
    declaration_consent: false,
    terms_agreed: false,
  });

  const tabs = [
    { id: "personal", label: formMessages.tabs.personal, icon: User },
    { id: "academic", label: formMessages.tabs.academic, icon: BookOpen },
    { id: "preferences", label: formMessages.tabs.preferences, icon: Settings },
    { id: "emergency", label: formMessages.tabs.emergency, icon: AlertTriangle },
    { id: "consent", label: formMessages.tabs.consent, icon: ShieldCheck },
  ] as const;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "college_name" && !isOtherCollegeOption(value)
        ? { other_college_name: "" }
        : {}),
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleProgramToggle = (programTitle: string) => {
    setFormData((previous) => {
      const selected = previous.internship_programs.includes(programTitle)
        ? previous.internship_programs.filter((program) => program !== programTitle)
        : [...previous.internship_programs, programTitle];

      return {
        ...previous,
        internship_programs: selected,
      };
    });
  };

  const validateForm = () => {
    if (
      !formData.full_name ||
      !formData.date_of_birth ||
      !formData.gender ||
      !formData.parent_guardian_name ||
      !formData.mobile_number ||
      !formData.email ||
      !formData.permanent_address ||
      !formData.city ||
      !formData.state ||
      !formData.pin_code
    ) {
      setActiveTab("personal");
      return formMessages.validation.personalRequired;
    }

    if (!/^\d{10}$/.test(formData.mobile_number)) {
      setActiveTab("personal");
      return formMessages.validation.mobileNumber;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setActiveTab("personal");
      return formMessages.validation.email;
    }

    if (
      !formData.university_name ||
      !formData.college_name ||
      !formData.degree ||
      !formData.department_stream ||
      !formData.class_semester ||
      !formData.academic_session ||
      !formData.university_roll_number ||
      !formData.university_registration_number ||
      !formData.course_program
    ) {
      setActiveTab("academic");
      return formMessages.validation.academicRequired;
    }

    const resolvedCollege = resolveCollegeSelection(
      formData.college_name,
      formData.other_college_name
    );

    if (resolvedCollege.error === "invalid_college") {
      setActiveTab("academic");
      return formMessages.validation.collegeSelection;
    }

    if (resolvedCollege.error === "missing_other_college") {
      setActiveTab("academic");
      return formMessages.validation.otherCollegeRequired;
    }

    if (formData.internship_programs.length < 2) {
      setActiveTab("preferences");
      return formMessages.validation.minimumPrograms;
    }

    if (
      !formData.first_preference ||
      !formData.preferred_mode ||
      !formData.laptop_device_availability ||
      !formData.internet_availability ||
      !formData.why_join
    ) {
      setActiveTab("preferences");
      return formMessages.validation.preferencesRequired;
    }

    if (
      !formData.emergency_contact_name ||
      !formData.emergency_contact_number ||
      !formData.emergency_contact_relationship
    ) {
      setActiveTab("emergency");
      return formMessages.validation.emergencyRequired;
    }

    if (!/^\d{10}$/.test(formData.emergency_contact_number)) {
      setActiveTab("emergency");
      return formMessages.validation.emergencyNumber;
    }

    if (!formData.declaration_consent || !formData.terms_agreed) {
      setActiveTab("consent");
      return formMessages.validation.consent;
    }

    return null;
  };

  const isOtherCollegeSelected = isOtherCollegeOption(formData.college_name);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/registration/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        captureEvent("registration_completed");
        setSuccessMsg(formMessages.submitSuccess);
        setTimeout(() => {
          void refreshRegistrationStatus().finally(() => {
            router.push("/dashboard");
          });
        }, 1500);
      } else {
        setErrorMsg(result.error || formMessages.submitFailure);
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(formMessages.networkError);
      setSubmitting(false);
    }
  };

  const renderCardTitle = () => {
    if (activeTab === "personal") return formMessages.headers.personal;
    if (activeTab === "academic") return formMessages.headers.academic;
    if (activeTab === "preferences") return formMessages.headers.preferences;
    if (activeTab === "emergency") return formMessages.headers.emergency;
    return formMessages.headers.consent;
  };

  return (
    <>
      {errorMsg ? (
        <div className="animate-pulse mb-8 flex items-start gap-3 rounded-r-lg border-l-4 border-red-600 bg-red-50 p-4 text-red-900 shadow-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-bold">{messages.common.validationError}</p>
            <p className="mt-0.5 text-xs">{errorMsg}</p>
          </div>
        </div>
      ) : null}

      {successMsg ? (
        <div className="mb-8 flex items-start gap-3 rounded-r-lg border-l-4 border-green-600 bg-green-50 p-4 text-green-900 shadow-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <div>
            <p className="text-sm font-bold">{messages.common.success}</p>
            <p className="mt-0.5 text-xs">{successMsg}</p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "translate-x-1 transform border-[#800020] bg-[#800020] text-[#FAF6EE] shadow-md"
                    : "border-[#D6C7B2] bg-[#FFFDF9] text-[#5C4D4D] hover:bg-[#FAF6EE] hover:text-[#800020]"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-[#FAF6EE]" : "text-[#C35237]"}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-3">
          <Card className="overflow-hidden rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] shadow-xl">
            <CardHeader className="border-b border-[#D6C7B2] bg-[#800020] p-6 text-[#FAF6EE]">
              <CardTitle className="flex items-center gap-2 font-serif text-xl font-bold">
                {renderCardTitle()}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 p-8">
              {activeTab === "personal" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.fullNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.dobLabel}
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      required
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.genderLabel}
                    </label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                    >
                      <option value="">{personal.genderPlaceholder}</option>
                      <option value="Male">{personal.genderMale}</option>
                      <option value="Female">{personal.genderFemale}</option>
                      <option value="Other">{personal.genderOther}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.guardianLabel}
                    </label>
                    <input
                      type="text"
                      name="parent_guardian_name"
                      required
                      value={formData.parent_guardian_name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.guardianPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE]/70 px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.mobileLabel}
                    </label>
                    <input
                      type="tel"
                      name="mobile_number"
                      maxLength={10}
                      required
                      value={formData.mobile_number}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.mobilePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.whatsappLabel}
                    </label>
                    <input
                      type="tel"
                      name="whatsapp_number"
                      maxLength={10}
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.whatsappPlaceholder}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.addressLabel}
                    </label>
                    <textarea
                      name="permanent_address"
                      required
                      value={formData.permanent_address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.addressPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.cityLabel}
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.cityPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.stateLabel}
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.statePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {personal.pinLabel}
                    </label>
                    <input
                      type="text"
                      name="pin_code"
                      maxLength={6}
                      required
                      value={formData.pin_code}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={personal.pinPlaceholder}
                    />
                  </div>
                </div>
              ) : null}

              {activeTab === "academic" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.universityLabel}
                    </label>
                    <input
                      type="text"
                      name="university_name"
                      required
                      value={formData.university_name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.universityPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.collegeLabel}
                    </label>
                    <input
                      type="text"
                      list="approved-college-options"
                      name="college_name"
                      required
                      value={formData.college_name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.collegeSearchPlaceholder}
                      autoComplete="off"
                    />
                    <datalist id="approved-college-options">
                      {collegeOptions.map((collegeName) => (
                        <option key={collegeName} value={collegeName} />
                      ))}
                    </datalist>
                    <p className="mt-1 text-[10px] text-[#5C4D4D]">
                      {academic.collegeHelperText}
                    </p>
                  </div>

                  {isOtherCollegeSelected ? (
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {academic.otherCollegeLabel}
                      </label>
                      <input
                        type="text"
                        name="other_college_name"
                        required
                        value={formData.other_college_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder={academic.otherCollegePlaceholder}
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.degreeLabel}
                    </label>
                    <input
                      type="text"
                      name="degree"
                      required
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.degreePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.departmentLabel}
                    </label>
                    <input
                      type="text"
                      name="department_stream"
                      required
                      value={formData.department_stream}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.departmentPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.classLabel}
                    </label>
                    <input
                      type="text"
                      name="class_semester"
                      required
                      value={formData.class_semester}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.classPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.sessionLabel}
                    </label>
                    <input
                      type="text"
                      name="academic_session"
                      required
                      value={formData.academic_session}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.sessionPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.majorLabel}
                    </label>
                    <input
                      type="text"
                      name="major_subject"
                      value={formData.major_subject}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.majorPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.rollLabel}
                    </label>
                    <input
                      type="text"
                      name="university_roll_number"
                      required
                      value={formData.university_roll_number}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.rollPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.registrationLabel}
                    </label>
                    <input
                      type="text"
                      name="university_registration_number"
                      required
                      value={formData.university_registration_number}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.registrationPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.courseProgramLabel}
                    </label>
                    <input
                      type="text"
                      name="course_program"
                      required
                      value={formData.course_program}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.courseProgramPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.branchLabel}
                    </label>
                    <input
                      type="text"
                      name="branch_specialization"
                      value={formData.branch_specialization}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.branchPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {academic.cgpaLabel}
                    </label>
                    <input
                      type="text"
                      name="cgpa_percentage"
                      value={formData.cgpa_percentage}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={academic.cgpaPlaceholder}
                    />
                  </div>
                </div>
              ) : null}

              {activeTab === "preferences" ? (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {preferences.selectProgramsLabel}
                    </label>
                    <div className="grid max-h-[300px] grid-cols-1 gap-3 overflow-y-auto rounded-md border border-[#D6C7B2] bg-[#FAF6EE] p-2 md:grid-cols-2">
                      {courses.map((course) => {
                        const isSelected = formData.internship_programs.includes(
                          course.title
                        );

                        return (
                          <div
                            key={course.id}
                            onClick={() => handleProgramToggle(course.title)}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-xs font-semibold transition-all ${
                              isSelected
                                ? "border-[#D97706] bg-[#FAF0D9] text-[#800020]"
                                : "border-[#D6C7B2] bg-[#FFFDF9] hover:bg-[#FAF6EE]"
                            }`}
                          >
                            <div
                              className={`flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-[#D97706] bg-[#D97706] text-white"
                                  : "border-[#D6C7B2] bg-white"
                              }`}
                            >
                              {isSelected ? "✓" : null}
                            </div>
                            <span className="truncate">{course.title}</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-1.5 text-xxs italic text-[#5C4D4D]">
                      {preferences.selectedPrefix} {formData.internship_programs.length}{" "}
                      {preferences.selectedSuffix}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.firstPreferenceLabel}
                      </label>
                      <select
                        name="first_preference"
                        required
                        value={formData.first_preference}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      >
                        <option value="">
                          {preferences.firstPreferencePlaceholder}
                        </option>
                        {formData.internship_programs.map((title) => (
                          <option key={title} value={title}>
                            {title}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-[10px] text-[#5C4D4D]">
                        {preferences.firstPreferenceHint}
                      </p>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.preferredModeLabel}
                      </label>
                      <select
                        name="preferred_mode"
                        required
                        value={formData.preferred_mode}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      >
                        <option value="">
                          {preferences.preferredModePlaceholder}
                        </option>
                        <option value="Online">{preferences.modeOnline}</option>
                        <option value="Hybrid">{preferences.modeHybrid}</option>
                        <option value="Offline">{preferences.modeOffline}</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.preferredTimeLabel}
                      </label>
                      <input
                        type="text"
                        name="preferred_time_slot"
                        value={formData.preferred_time_slot}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder={preferences.preferredTimePlaceholder}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.laptopLabel}
                      </label>
                      <select
                        name="laptop_device_availability"
                        required
                        value={formData.laptop_device_availability}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      >
                        <option value="">{preferences.availabilityPlaceholder}</option>
                        <option value="Yes">{preferences.laptopYes}</option>
                        <option value="No">{preferences.laptopNo}</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.internetLabel}
                      </label>
                      <select
                        name="internet_availability"
                        required
                        value={formData.internet_availability}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      >
                        <option value="">{preferences.availabilityPlaceholder}</option>
                        <option value="Yes">{preferences.internetYes}</option>
                        <option value="No">{preferences.internetNo}</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.previousInternshipLabel}
                      </label>
                      <input
                        type="text"
                        name="previous_internship"
                        value={formData.previous_internship}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder={preferences.previousInternshipPlaceholder}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.skillsLabel}
                      </label>
                      <input
                        type="text"
                        name="skills_to_learn"
                        value={formData.skills_to_learn}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder={preferences.skillsPlaceholder}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.hearAboutLabel}
                      </label>
                      <input
                        type="text"
                        name="how_did_you_hear"
                        value={formData.how_did_you_hear}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder={preferences.hearAboutPlaceholder}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {preferences.referralLabel}
                      </label>
                      <input
                        type="text"
                        name="referral_code"
                        value={formData.referral_code}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder={preferences.referralPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {preferences.whyJoinLabel}
                    </label>
                    <textarea
                      name="why_join"
                      required
                      value={formData.why_join}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={preferences.whyJoinPlaceholder}
                    />
                  </div>
                </div>
              ) : null}

              {activeTab === "emergency" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {emergency.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="emergency_contact_name"
                      required
                      value={formData.emergency_contact_name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={emergency.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {emergency.numberLabel}
                    </label>
                    <input
                      type="tel"
                      name="emergency_contact_number"
                      maxLength={10}
                      required
                      value={formData.emergency_contact_number}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={emergency.numberPlaceholder}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                      {emergency.relationshipLabel}
                    </label>
                    <input
                      type="text"
                      name="emergency_contact_relationship"
                      required
                      value={formData.emergency_contact_relationship}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                      placeholder={emergency.relationshipPlaceholder}
                    />
                  </div>
                </div>
              ) : null}

              {activeTab === "consent" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 border-b border-[#D6C7B2] pb-6">
                    <h3 className="font-serif text-lg font-bold text-[#800020]">
                      {consent.documentsTitle}
                    </h3>
                    <p className="-mt-4 text-xs text-[#5C4D4D]">
                      {consent.documentsDescription}
                    </p>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {consent.idCardLabel}
                      </label>
                      <input
                        type="url"
                        name="id_card_link"
                        value={formData.id_card_link}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {consent.resumeLabel}
                      </label>
                      <input
                        type="url"
                        name="resume_link"
                        value={formData.resume_link}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C4D4D]">
                        {consent.photoLabel}
                      </label>
                      <input
                        type="url"
                        name="photo_link"
                        value={formData.photo_link}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#D6C7B2] bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#2E1E1E] shadow-inner transition-shadow focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="font-serif text-lg font-bold text-[#800020]">
                      {consent.declarationTitle}
                    </h3>

                    <div className="flex items-start gap-3 rounded border border-[#D6C7B2] bg-[#FAF6EE] p-3">
                      <input
                        type="checkbox"
                        id="declaration_consent"
                        name="declaration_consent"
                        checked={formData.declaration_consent}
                        onChange={handleCheckboxChange}
                        className="mt-0.5 h-5 w-5 cursor-pointer rounded border-[#D6C7B2] text-[#800020] focus:ring-[#800020]"
                      />
                      <label
                        htmlFor="declaration_consent"
                        className="cursor-pointer text-xs leading-relaxed text-[#2E1E1E] selection:bg-[#FAF0D9]"
                      >
                        {consent.declarationLabel}
                      </label>
                    </div>

                    <div className="flex items-start gap-3 rounded border border-[#D6C7B2] bg-[#FAF6EE] p-3">
                      <input
                        type="checkbox"
                        id="terms_agreed"
                        name="terms_agreed"
                        checked={formData.terms_agreed}
                        onChange={handleCheckboxChange}
                        className="mt-0.5 h-5 w-5 cursor-pointer rounded border-[#D6C7B2] text-[#800020] focus:ring-[#800020]"
                      />
                      <label
                        htmlFor="terms_agreed"
                        className="cursor-pointer text-xs leading-relaxed text-[#2E1E1E] selection:bg-[#FAF0D9]"
                      >
                        {consent.termsLabel}
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>

            <div className="flex items-center justify-between border-t border-[#D6C7B2] bg-[#FAF6EE] p-6">
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
                  {messages.common.previousSection}
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
                  className="bg-[#800020] text-[#FAF6EE] hover:bg-[#6B1D2F]"
                >
                  {messages.common.nextSection}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-[#800020] px-6 font-bold text-[#FAF6EE] shadow-lg hover:bg-[#6B1D2F]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#FAF6EE]" />
                      <span>{consent.submitting}</span>
                    </>
                  ) : (
                    consent.submit
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
