import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4'
});

const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt
const margin = 36; // 0.5 inch margins
const contentWidth = pageWidth - margin * 2;

// Typography colors matching the uploaded CV
const primaryColor = [15, 23, 42]; // Slate 900 / Deep black-charcoal
const textDark = [24, 30, 42]; // Crisp charcoal text
const textMuted = [80, 95, 115]; // Subtle dark slate
const lineColor = [140, 150, 165]; // Clean subtle section line
const headerLineColor = [40, 50, 65]; // Strong divider line

let y = 42;

// 1. CENTERED HEADER
doc.setFont('helvetica', 'bold');
doc.setFontSize(24);
doc.setTextColor(...primaryColor);
doc.text('SATYAJIT SAMANTA', pageWidth / 2, y, { align: 'center' });

y += 16;
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...textDark);
doc.text('B.TECH IN COMPUTER SCIENCE & ENGINEERING | FULL-STACK & IOS DEVELOPER', pageWidth / 2, y, { align: 'center' });

y += 13;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('JANAKPURI, NEW DELHI, INDIA · DELHI GLOBAL INSTITUTE OF TECHNOLOGY (DGIT) · MAHARSHI DAYANAND UNIVERSITY (MDU)', pageWidth / 2, y, { align: 'center' });

// Contact Row with Clean Formatting
y += 14;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
const contactRow1 = '+91 8076522382    satyajit97531    in satyajit-samanta-07a461385    satyajit97531@gmail.com';
doc.text(contactRow1, pageWidth / 2, y, { align: 'center' });

y += 12;
doc.setFontSize(8.2);
doc.setTextColor(...textDark);
const contactRow2 = '</> LeetCode: satyajitzzzzz (50+ Solved: 30E/15M/5H)      Codeforces: satyajitzzz (35+ Problems Solved)';
doc.text(contactRow2, pageWidth / 2, y, { align: 'center' });

// Top Horizontal Divider
y += 11;
doc.setDrawColor(...headerLineColor);
doc.setLineWidth(0.8);
doc.line(margin, y, pageWidth - margin, y);
y += 16;

// Section Header Function with Underline across the page
function drawSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text(title.toUpperCase(), margin, y);
  y += 4;
  doc.setDrawColor(...headerLineColor);
  doc.setLineWidth(0.75);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;
}

// 1. CAREER OBJECTIVE
drawSectionHeader('Career Objective');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...textDark);
const objText = 'Motivated B.Tech Computer Science student with a strong foundation in Full Stack Development (MERN, Next.js), Ollama AI Integration, and iOS app development. Seeking an engineering or internship opportunity to build scalable, secure, and user-centric web & mobile solutions.';
const splitObj = doc.splitTextToSize(objText, contentWidth);
doc.text(splitObj, margin, y);
y += splitObj.length * 11.5 + 8;

// 2. EDUCATION
drawSectionHeader('Education');

// B.Tech
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Bachelor of Technology (B.Tech) – Computer Science & Engineering', margin, y);
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.text('2023 – 2027 (Ongoing)', pageWidth - margin - doc.getTextWidth('2023 – 2027 (Ongoing)'), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Delhi Global Institute of Technology (DGIT) · Maharshi Dayanand University (MDU), Haryana', margin, y);

y += 10.5;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Semester: 7th | University Roll No: 23DGITM425', margin + 6, y);
y += 10.5;
doc.text('• Core Subjects: Data Structures & Algorithms, Object-Oriented Programming, DBMS, OS, Computer Networks.', margin + 6, y);

y += 13;
// School
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Senior Secondary & High School (CBSE)', margin, y);
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.text('Completed', pageWidth - margin - doc.getTextWidth('Completed'), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Vinay Nagar Senior Secondary School, New Delhi', margin, y);

y += 10.5;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Science Stream (Physics, Chemistry, Mathematics, Computer Science Fundamentals).', margin + 6, y);
y += 16;

// 3. TECHNICAL SKILLS & PROBLEM SOLVING
drawSectionHeader('Technical Skills & Problem Solving');

function printSkillItem(category, details) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(...primaryColor);
  doc.text('• ' + category + ':', margin + 6, y);

  const prefix = '• ' + category + ': ';
  const prefixWidth = doc.getTextWidth(prefix);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...textDark);
  const remainingWidth = contentWidth - prefixWidth - 6;
  const lines = doc.splitTextToSize(details, remainingWidth);
  doc.text(lines, margin + 6 + prefixWidth, y);
  y += lines.length > 1 ? (lines.length * 11 + 2) : 12;
}

printSkillItem('Full-Stack', 'Next.js (App Router, SSR), React 19, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Tailwind CSS');
printSkillItem('Mobile & AI', 'Swift, Xcode, iOS SDK (MVC, AutoLayout), Local Ollama AI (Llama, Mistral), JWT Authentication');
printSkillItem('Problem Solving', 'LeetCode (@satyajitzzzzz, 50+ Solved: 30E/15M/5H), Codeforces (@satyajitzzz, 35+ Problems Solved), DSA Intermediate');
printSkillItem('Tools & Design', 'Figma UI/UX Prototyping, Git, GitHub, VS Code, Postman, Leaflet Maps, REST APIs');

y += 5;

// 4. TECHNICAL PROJECTS
drawSectionHeader('Technical Projects');

// Project 1: Service Portal
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Service Portal Application (Major Project) | MERN Stack + Local Ollama AI', margin, y);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
const p1Link = 'github.com/satyajit97531/Service_Portal';
doc.text(p1Link, pageWidth - margin - doc.getTextWidth(p1Link), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Architected full-stack portal with on-premise Ollama AI trained/conditioned with 45+ medical Q&A pairs.', margin + 6, y);
y += 10.5;
doc.text('• Modeled 5 MongoDB document schemas managing 60+ synthetic biometric telemetry records & vital trend histories.', margin + 6, y);
y += 10.5;
doc.text('• Implemented secure JWT authentication and sub-80ms queries with 0% external cloud data leakage or API fees.', margin + 6, y);

y += 13;
// Project 2: Games 24
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Games 24 (Minor Project) | High-Fidelity Game Storefront Platform (Figma UI/UX)', margin, y);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
const p2Tag = 'Figma UI/UX & Prototyping';
doc.text(p2Tag, pageWidth - margin - doc.getTextWidth(p2Tag), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Designed high-fidelity storefront modeling 40+ game title catalog items, 12 genre taxonomies, and 35+ design tokens.', margin + 6, y);
y += 10.5;
doc.text('• Engineered 20+ atomic UI components and tested an interactive 10+ screen prototype with a frictionless 2-step checkout flow.', margin + 6, y);

y += 13;
// Project 3: Medi_Map
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Medi_Map | Geospatial Clinic & Emergency Navigation | React, Leaflet, Node.js', margin, y);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
const p3Link = 'github.com/satyajit97531/Medi_Map';
doc.text(p3Link, pageWidth - margin - doc.getTextWidth(p3Link), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Constructed geospatial data model indexing 50+ verified clinic coordinates and 25+ emergency centers across 12 specialties.', margin + 6, y);

y += 13;
// Project 4: AuraSpace & Product_Store
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('AuraSpace & Product_Store | TypeScript, React 19, Express.js, Tailwind CSS', margin, y);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
const p4Link = 'github.com/satyajit97531/AuraSpace';
doc.text(p4Link, pageWidth - margin - doc.getTextWidth(p4Link), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Engineered TypeScript workspace models managing 50+ document nodes and Product_Store catalog with 45+ SKU records.', margin + 6, y);

y += 15;

// 5. INDUSTRY TRAINING & CERTIFICATIONS
drawSectionHeader('Industry Training & Certifications');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('iOS Application Development Certification | SKLZ TECT LLP (sklztect.com)', margin, y);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.text('June – August 2024 (8 Weeks)', pageWidth - margin - doc.getTextWidth('June – August 2024 (8 Weeks)'), y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Management Education & Research Institute (MERI), New Delhi | Credential: SKLZ-TECT-IOS-2024-SAMANTA', margin, y);

y += 10.5;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Completed intensive 8-week corporate training in native iOS development using Swift and Xcode.', margin + 6, y);
y += 10.5;
doc.text('• Built responsive iOS view hierarchies conforming to Apple Human Interface Guidelines and MVC architectural patterns.', margin + 6, y);

// Ensure public directory exists and write file
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Satyajit_Samanta_Resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log('PDF generated successfully at:', outputPath, 'Size:', fs.statSync(outputPath).size, 'bytes', 'Total Height used:', y, 'pt out of', pageHeight, 'pt');

