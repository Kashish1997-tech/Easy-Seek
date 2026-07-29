/* ==========================================================================
   EasySeek — Placeholder Data Layer
   Replace the arrays below with real data (or wire them up to an API)
   whenever it becomes available — the rest of the site reads only
   from these structures, so no other file needs to change.
   ========================================================================== */

const EASYSEEK_DATA = {

  universities: {
    punjabi: {
      id: "punjabi",
      name: "Punjabi University",
      short: "Punjabi University, Patiala",
      established: "1962",
      location: "Patiala, Punjab",
      students: "12,000+",
      programs: "180+",
      overview: "Punjabi University, Patiala is a public state university known for its strong programs across languages, sciences, commerce and engineering. EasySeek collects its syllabus books, semester results and previous year solved papers in one easy-to-search hub for enrolled students.",
      color: "punjabi"
    },
    thapar: {
      id: "thapar",
      name: "Thapar University",
      short: "Thapar Institute of Engineering & Technology",
      established: "1956",
      location: "Patiala, Punjab",
      students: "9,000+",
      programs: "60+",
      overview: "Thapar Institute of Engineering & Technology (Thapar University) is a leading private technical institute recognised for engineering, computer science and management programs. EasySeek organises its reference books, result updates and solved papers for quick exam-time access.",
      color: "thapar"
    }
  },

  books: [
    { id:1, university:"punjabi", name:"Fundamentals of Data Structures", subject:"Computer Science", semester:"3" },
    { id:2, university:"punjabi", name:"Principles of Microeconomics", subject:"Economics", semester:"2" },
    { id:3, university:"punjabi", name:"Punjabi Sahit Da Itihaas", subject:"Punjabi Literature", semester:"1" },
    { id:4, university:"punjabi", name:"Organic Chemistry — Part I", subject:"Chemistry", semester:"4" },
    { id:5, university:"punjabi", name:"Business Statistics", subject:"Commerce", semester:"3" },
    { id:6, university:"punjabi", name:"Introduction to Sociology", subject:"Sociology", semester:"2" },
    { id:7, university:"punjabi", name:"Discrete Mathematics", subject:"Computer Science", semester:"2" },
    { id:8, university:"punjabi", name:"Indian Political System", subject:"Political Science", semester:"5" },
    { id:9, university:"thapar", name:"Engineering Mechanics", subject:"Mechanical Engineering", semester:"1" },
    { id:10, university:"thapar", name:"Digital Logic & Design", subject:"Computer Science", semester:"3" },
    { id:11, university:"thapar", name:"Signals and Systems", subject:"Electronics & Comm.", semester:"4" },
    { id:12, university:"thapar", name:"Object Oriented Programming with C++", subject:"Computer Science", semester:"2" },
    { id:13, university:"thapar", name:"Thermodynamics", subject:"Mechanical Engineering", semester:"3" },
    { id:14, university:"thapar", name:"Managerial Economics", subject:"Management", semester:"2" },
    { id:15, university:"thapar", name:"Database Management Systems", subject:"Computer Science", semester:"5" },
    { id:16, university:"thapar", name:"Strength of Materials", subject:"Civil Engineering", semester:"3" }
  ],

  results: [
    { id:1, university:"punjabi", exam:"B.A. Semester 4 Regular Examination", semester:"4", date:"18 Jun 2026" },
    { id:2, university:"punjabi", exam:"B.Com Semester 2 Regular Examination", semester:"2", date:"05 Jun 2026" },
    { id:3, university:"punjabi", exam:"BCA Semester 6 Regular Examination", semester:"6", date:"29 May 2026" },
    { id:4, university:"punjabi", exam:"M.Sc. Semester 2 Regular Examination", semester:"2", date:"14 May 2026" },
    { id:5, university:"punjabi", exam:"B.Sc. Semester 1 Reappear Examination", semester:"1", date:"02 May 2026" },
    { id:6, university:"thapar", exam:"B.E. Semester 6 End Term Examination", semester:"6", date:"22 Jun 2026" },
    { id:7, university:"thapar", exam:"B.E. Semester 4 End Term Examination", semester:"4", date:"10 Jun 2026" },
    { id:8, university:"thapar", exam:"MBA Semester 2 End Term Examination", semester:"2", date:"28 May 2026" },
    { id:9, university:"thapar", exam:"B.E. Semester 2 End Term Examination", semester:"2", date:"16 May 2026" },
    { id:10, university:"thapar", exam:"M.Tech Semester 1 End Term Examination", semester:"1", date:"03 May 2026" }
  ],

  papers: [
    { id:1, university:"punjabi", subject:"Data Structures", semester:"3", year:"2025" },
    { id:2, university:"punjabi", subject:"Microeconomics", semester:"2", year:"2025" },
    { id:3, university:"punjabi", subject:"Organic Chemistry", semester:"4", year:"2024" },
    { id:4, university:"punjabi", subject:"Business Statistics", semester:"3", year:"2024" },
    { id:5, university:"punjabi", subject:"Punjabi Literature", semester:"1", year:"2023" },
    { id:6, university:"punjabi", subject:"Indian Political System", semester:"5", year:"2023" },
    { id:7, university:"thapar", subject:"Engineering Mechanics", semester:"1", year:"2025" },
    { id:8, university:"thapar", subject:"Digital Logic & Design", semester:"3", year:"2025" },
    { id:9, university:"thapar", subject:"Signals and Systems", semester:"4", year:"2024" },
    { id:10, university:"thapar", subject:"Database Management Systems", semester:"5", year:"2024" },
    { id:11, university:"thapar", subject:"Thermodynamics", semester:"3", year:"2023" },
    { id:12, university:"thapar", subject:"Strength of Materials", semester:"3", year:"2023" }
  ],

  testimonials: [
    { name:"Simran Kaur", role:"B.Com, Punjabi University", quote:"I found last year's solved papers within a minute during my exam prep. Saved me hours of searching WhatsApp groups." },
    { name:"Arjun Mehta", role:"B.E. CSE, Thapar University", quote:"The semester-wise book filter is exactly what I needed. Everything for my course is in one place." },
    { name:"Harpreet Singh", role:"BCA, Punjabi University", quote:"Results were listed the same day they were announced. Clean layout, easy to scan on my phone." }
  ],

  faqs: [
    { q:"Is EasySeek free to use?", a:"Yes. Browsing books, results and previous year papers on EasySeek is completely free for students of both supported universities." },
    { q:"Which universities does EasySeek cover?", a:"EasySeek currently covers Punjabi University and Thapar University. We plan to add more institutions as the platform grows." },
    { q:"Are the download links live?", a:"This preview uses placeholder buttons for books, results and papers. They'll be connected to real files as content is added." },
    { q:"How often are results updated?", a:"Once connected to live data, results will be listed as soon as they're officially declared by the university examination branch." },
    { q:"Can I request a book that's missing?", a:"Yes — use the contact form to send us the subject, semester and university, and we'll try to add it." }
  ]
};
