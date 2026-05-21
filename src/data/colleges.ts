export const OTHER_COLLEGE_OPTION = "Other / Not listed";

const collegeNames = [
  "A. N. D. College, Shahpur Patory, Samastipur",
  "A. P. S. M. College, Barauni, Begusarai",
  "A.H.S.A. College, Madhubani",
  "A.M.M. College, Benipur, Darbhanga",
  "B. M. A. College, Baheri, Darbhanga",
  "B. M. College, Rahika, Madhubani",
  "B. R. B. College, Samastipur",
  "Baba Vishwanath Kedarnath Vimala College, Rampur Dulhpura, Samastipur",
  "Bahera College, Bahera, Darbhanga",
  "Basudev Ram Kishor Choudhary College, Jitwarpur Kumhira, Mushrigharari, Samastipur",
  "Bhardwaj College, Sakarpura, Hasanpur Road, Samastipur",
  "C. M. B. College, Deorh, Ghoghardiha, Madhubani",
  "C. M. College, Darbhanga",
  "C. M. J. College, Downwarihat, Madhubani",
  "C. M. Science College, Darbhanga",
  "Chattu Roy College, Kishanpur, Samastipur",
  "D. B. College, Jaynagar, Madhubani",
  "D. B. K. N. College, Narhan, Samastipur",
  "D.N.Y. College, Madhubani",
  "Dr. L. K. V. D. College, Tajpur, Samastipur",
  "G. D. College, Begusarai",
  "G. M. R. D. College, Mohanpur, Samastipur",
  "G.K.P.D. College, Karpoorigram, Samastipur",
  "H. P. S. College, Madhepur, Madhubani",
  "Hari Anand College, Akaur, Benipatti, Madhubani",
  "J. K. College, Biraul, Darbhanga",
  "J. M. D. P. L. Mahila College, Madhubani",
  "J. N. College, Madhubani",
  "J. N. College, Nehra, Darbhanga",
  "Janaki Devi Gaurishankar Saraf Degree Mahila College, Jaynagar, Madhubani",
  "Janta Degree College, Korthu, Darbhanga",
  "K. S. College, Laheriasarai, Darbhanga",
  "K. V. Sc. College, Ucchaith, Madhubani",
  "K.S.R. College, Saraianjan, Samastipur",
  "L.C.S. College, Darbhanga",
  "L. N. J. College, Jhanjharpur, Madhubani",
  "Lutan Jha College, Nanaur, Madhubani",
  "M. K. College, Laheriasarai, Darbhanga",
  "M. K. S. College, Trimuhan Chandauna, Darbhanga",
  "M. L. S. College, Sarisabpahi, Madhubani",
  "M. L. S. M. College, Darbhanga",
  "M. R. M. College, Darbhanga",
  "M.G. College, Darbhanga",
  "M.M. College, Kadirabad, Darbhanga",
  "M.M.T.M. College, Darbhanga",
  "M.R.S.M. College, Anandpur, Darbhanga",
  "Mahanth Narayan Das College, Chandauli, Ujiyarpur, Samastipur",
  "Mahanth Ram Jiwan Das College, Vishnupur, Begusarai",
  "Marwari College, Darbhanga",
  "Millat College, Laheriasarai, Darbhanga",
  "N. Jha Mahila College, Laheriasarai, Darbhanga",
  "P.D.K.J. College, Andharatharhi, Madhubani",
  "P.L.M. College, Jhanjharpur, Madhubani",
  "Q.A. Degree College, Jale, Darbhanga",
  "R. B. College, Dalsinghsarai, Samastipur",
  "R. B. S. College, Andaur, Samastipur",
  "R. C. S. College, Manjhaul, Begusarai",
  "R. K. College, Madhubani",
  "R. N. A. R. College, Samastipur",
  "R. N. College, Pandaul, Madhubani",
  "R.B.J. College, Bela, Darbhanga",
  "R.B.S. College, Teyai, Begusarai",
  "R.C.S.S. College, Bihat, Begusarai",
  "R.K.A. Law College, Begusarai",
  "R.L.S.R.M.D. College, Shivajinagar, Samastipur",
  "R.N.J.D. College, Madhwarpur, Madhubani",
  "S. B. S. S. College, Begusarai",
  "S. K. M. College, Begusarai",
  "S.K. College, Thatiya, Rosera, Samastipur",
  "S.M.J. College, Khajedih, Madhubani",
  "S.M.R.C.K. College, Samastipur",
  "S.N.M. College, Bhairaw Sthan, Madhubani",
  "Samastipur College, Samastipur",
  "Sant Kabir College, Samastipur",
  "Sati-Bharat College, Parari, Darbhanga",
  "Subdivision Govt. Degree College, Benipur, Darbhanga",
  "Triveni College, Chamtha, Begusarai",
  "U. P. College, Pusa, Samastipur",
  "U. R. College, Rosera, Samastipur",
  "V. S. J. College, Rajnagar, Madhubani",
  "Vidhi Mahavidyalay, Samastipur",
  "Women’s College, Samastipur",
] as const;

export const approvedColleges = [...collegeNames].sort((left, right) =>
  left.localeCompare(right)
);

const approvedCollegeSet = new Set<string>(approvedColleges);

export function getCollegeOptions() {
  return [...approvedColleges, OTHER_COLLEGE_OPTION];
}

export function isApprovedCollegeName(value: string | null | undefined) {
  return Boolean(value && approvedCollegeSet.has(value.trim()));
}

export function isOtherCollegeOption(value: string | null | undefined) {
  return value?.trim() === OTHER_COLLEGE_OPTION;
}

export function resolveCollegeSelection(
  collegeName: string | null | undefined,
  otherCollegeName: string | null | undefined
) {
  const normalizedCollegeName = collegeName?.trim() ?? "";
  const normalizedOtherCollegeName = otherCollegeName?.trim() ?? "";

  if (isApprovedCollegeName(normalizedCollegeName)) {
    return {
      collegeName: normalizedCollegeName,
      otherCollegeName: null,
      error: null,
    } as const;
  }

  if (isOtherCollegeOption(normalizedCollegeName)) {
    if (!normalizedOtherCollegeName) {
      return {
        collegeName: null,
        otherCollegeName: null,
        error: "missing_other_college",
      } as const;
    }

    return {
      collegeName: `Other: ${normalizedOtherCollegeName}`,
      otherCollegeName: normalizedOtherCollegeName,
      error: null,
    } as const;
  }

  return {
    collegeName: null,
    otherCollegeName: null,
    error: "invalid_college",
  } as const;
}
