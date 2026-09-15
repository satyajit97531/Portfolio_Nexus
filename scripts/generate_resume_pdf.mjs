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
const margin = 36; // 0.5 inch margins for clean standard resume
const contentWidth = pageWidth - margin * 2;

// Colors
const primaryColor = [15, 23, 42]; // Slate 900
const accentColor = [79, 70, 229]; // Indigo 600
const textDark = [30, 41, 59]; // Slate 800
const textMuted = [100, 116, 139]; // Slate 500
const lineColor = [226, 232, 240]; // Slate 200
const tagBg = [238, 242, 255]; // Indigo 50

// Start content from clean top margin without accent bar
let y = 44;

// Header: Name
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...primaryColor);
doc.text('SATYAJIT SAMANTA', margin, y);

// Subtitle
y += 14;
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...accentColor);
doc.text('B.Tech in Computer Science & Engineering | Full-Stack & iOS Developer', margin, y);

// College & Roll info
y += 12;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Delhi Global Institute of Technology (DGIT) · Maharshi Dayanand University (MDU) | Roll: 23DGITM425', margin, y);

// Contact info row
y += 12;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
const contactLine = '+91 8076522382  |  satyajit97531@gmail.com  |  Janakpuri, New Delhi, India  |  github.com/satyajit97531  |  linkedin.com/in/satyajit-samanta-07a461385';
doc.text(contactLine, margin, y);

y += 10;
doc.setFontSize(8);
doc.setTextColor(...accentColor);
doc.text('LeetCode: leetcode.com/u/satyajitzzzzz (50+ Solved: 30E/15M/5H)  |  Codeforces: codeforces.com/profile/satyajitzzz (Rating: 1184)', margin, y);

// Divider
y += 10;
doc.setDrawColor(...lineColor);
doc.setLineWidth(0.8);
doc.line(margin, y, pageWidth - margin, y);
y += 12;

function drawSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...accentColor);
  doc.text(title.toUpperCase(), margin, y);
  y += 3;
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.75);
  doc.line(margin, y, margin + doc.getTextWidth(title.toUpperCase()) + 15, y);
  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.4);
  doc.line(margin + doc.getTextWidth(title.toUpperCase()) + 15, y, pageWidth - margin, y);
  y += 10;
}

// 1. CAREER OBJECTIVE
drawSectionHeader('Career Objective');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
const objText = 'Motivated B.Tech Computer Science student with a strong foundation in Full Stack Development (MERN, Next.js), Ollama AI integration, and iOS app development. Seeking an engineering or internship opportunity to build scalable, secure, and user-centric web & mobile solutions.';
const splitObj = doc.splitTextToSize(objText, contentWidth);
doc.text(splitObj, margin, y);
y += splitObj.length * 10 + 6;

// 2. EDUCATION
drawSectionHeader('Education');

// Degree
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('Bachelor of Technology (B.Tech) - Computer Science & Engineering', margin, y);
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...accentColor);
doc.text('2023 - 2027 (Ongoing)', pageWidth - margin - doc.getTextWidth('2023 - 2027 (Ongoing)'), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textMuted);
doc.text('Delhi Global Institute of Technology (DGIT) / MERI · Maharshi Dayanand University (MDU), Haryana', margin, y);

y += 9;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
doc.text('• Semester: 7th  |  University Roll No: 23DGITM425', margin + 6, y);
y += 9;
doc.text('• Core Subjects: Data Structures & Algorithms, Object-Oriented Programming, DBMS, OS, Computer Networks.', margin + 6, y);

y += 12;
// School
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('Senior Secondary & High School (CBSE)', margin, y);
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Completed', pageWidth - margin - doc.getTextWidth('Completed'), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textMuted);
doc.text('Vinay Nagar Senior Secondary School, New Delhi', margin, y);
y += 9;
doc.setTextColor(...textDark);
doc.text('• Science Stream (Physics, Chemistry, Mathematics, Computer Science Fundamentals).', margin + 6, y);
y += 14;

// 3. TECHNICAL PROJECTS
drawSectionHeader('Technical Projects');

// Project 1: Service Portal
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('Service Portal Application (Major Project) | MERN Stack + Local Ollama AI', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...accentColor);
const p1Link = 'github.com/satyajit97531/Service_Portal';
doc.text(p1Link, pageWidth - margin - doc.getTextWidth(p1Link), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
doc.text('• Architected full-stack diagnostic portal featuring private on-device LLM consultations via Ollama (Llama/Mistral).', margin + 6, y);
y += 9;
doc.text('• Implemented secure JWT authentication, MongoDB document clustering, and interactive biometric vitals & BMI tracking.', margin + 6, y);
y += 9;
doc.text('• Eliminates recurring cloud AI API costs and guarantees zero external medical data transmission.', margin + 6, y);

y += 12;
// Project 2: Games 24
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('Games 24 (Minor Project) | High-Fidelity Game Storefront Platform (Figma UI/UX)', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...accentColor);
const p2Tag = 'Figma UI/UX & Prototyping';
doc.text(p2Tag, pageWidth - margin - doc.getTextWidth(p2Tag), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
doc.text('• Designed an immersive dark-mode digital distribution platform inspired by Steam and Epic Games Store.', margin + 6, y);
y += 9;
doc.text('• Engineered atomic design design system, interactive micro-interactions, and streamlined 2-step checkout flow.', margin + 6, y);

y += 12;
// Project 3: Medi_Map
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('Medi_Map | Geospatial Clinic & Emergency Navigation | React, Leaflet, Node.js', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...accentColor);
const p3Link = 'github.com/satyajit97531/Medi_Map';
doc.text(p3Link, pageWidth - margin - doc.getTextWidth(p3Link), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
doc.text('• Interactive geospatial locator mapping hospitals, specialty clinics, and emergency response routes.', margin + 6, y);

y += 12;
// Project 4: AuraSpace & Product_Store
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('AuraSpace & Product_Store | TypeScript, React 19, Express.js, Tailwind CSS', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...accentColor);
const p4Link = 'github.com/satyajit97531/AuraSpace';
doc.text(p4Link, pageWidth - margin - doc.getTextWidth(p4Link), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
doc.text('• Built modular TypeScript collaborative workspaces and reactive product inventory with real-time REST CRUD APIs.', margin + 6, y);

y += 14;

// 4. CERTIFICATIONS & INDUSTRY TRAINING
drawSectionHeader('Industry Training & Certifications');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...textDark);
doc.text('iOS Application Development Certification | SKLZ TECT LLP (sklztect.com)', margin, y);
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...accentColor);
doc.text('June - August 2024 (8 Weeks)', pageWidth - margin - doc.getTextWidth('June - August 2024 (8 Weeks)'), y);

y += 10;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textMuted);
doc.text('Conducted at Management Education & Research Institute (MERI), New Delhi | Credential: SKLZ-TECT-IOS-2024-SAMANTA', margin, y);

y += 9;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
doc.text('• Completed intensive 8-week corporate training in native iOS development using Swift and Xcode.', margin + 6, y);
y += 9;
doc.text('• Built responsive iOS view hierarchies conforming to Apple Human Interface Guidelines and MVC architectural patterns.', margin + 6, y);

y += 14;

// 5. TECHNICAL SKILLS & ARSENAL
drawSectionHeader('Technical Skills & Problem Solving');

function printSkillRow(category, skills) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...accentColor);
  doc.text(category + ':', margin, y);
  
  const catWidth = doc.getTextWidth(category + ': ') + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  doc.text(skills, margin + catWidth, y);
  y += 11;
}

printSkillRow('Full-Stack', 'Next.js (App Router, SSR), React 19, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Tailwind CSS');
printSkillRow('Mobile & AI', 'Swift, Xcode, iOS SDK (MVC, AutoLayout), Local Ollama AI (Llama, Mistral), JWT Authentication');
printSkillRow('Competitive', 'LeetCode (@satyajitzzzzz, 50+ Solved: 30 Easy, 15 Med, 5 Hard), Codeforces (@satyajitzzz, Rating 1184), DSA Mastery');
printSkillRow('Tools & Design', 'Figma UI/UX Prototyping, Git, GitHub, VS Code, Postman, Leaflet Maps, REST APIs');

// Ensure public directory exists and write file
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Satyajit_Samanta_Resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log('PDF generated successfully at:', outputPath, 'Size:', fs.statSync(outputPath).size, 'bytes');
