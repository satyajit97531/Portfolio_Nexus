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
const margin = 36; // 0.5 inch inner margin
const contentWidth = pageWidth - margin * 2;

// Clean typography colors matching the uploaded CV
const primaryColor = [15, 23, 42]; // Slate 900 / Deep black-charcoal
const textDark = [24, 30, 42]; // Crisp charcoal text
const textMuted = [80, 95, 115]; // Subtle dark slate
const headerLineColor = [40, 50, 65]; // Strong divider line
const thinLineColor = [210, 218, 226]; // Subtle thin divider line

// Outer Border framing the entire page (exact match to uploaded CV)
doc.saveGraphicsState();
doc.setDrawColor(24, 30, 42);
doc.setLineWidth(1.0);
doc.rect(20, 20, pageWidth - 40, pageHeight - 40);
doc.restoreGraphicsState();

let y = 44;

// 1. CENTERED HEADER
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...primaryColor);
doc.text('SATYAJIT SAMANTA', pageWidth / 2, y, { align: 'center' });

y += 15;
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...textDark);
doc.text('B.TECH IN COMPUTER SCIENCE & ENGINEERING | FULL-STACK & IOS DEVELOPER', pageWidth / 2, y, { align: 'center' });

y += 12;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
doc.setTextColor(...textMuted);
doc.text('JANAKPURI, NEW DELHI, INDIA · MAHARSHI DAYANAND UNIVERSITY (MDU)', pageWidth / 2, y, { align: 'center' });

// Thin horizontal rule below institution line
y += 8;
doc.setDrawColor(...thinLineColor);
doc.setLineWidth(0.6);
doc.line(margin, y, pageWidth - margin, y);

// Contact Icon Drawing Helpers (Clean monochromatic vector icons matching CV)
function drawPhoneIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setDrawColor(...textDark);
  doc.setLineWidth(0.75);
  doc.roundedRect(x, y - 6.5, 6, 8, 1, 1, 'S');
  doc.line(x + 1.2, y - 5, x + 4.8, y - 5);
  doc.line(x + 1.2, y - 1, x + 4.8, y - 1);
  doc.circle(x + 3, y - 2, 0.45, 'F');
  doc.restoreGraphicsState();
}

function drawGithubIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setFillColor(...textDark);
  doc.circle(x + 3.5, y - 3, 3.8, 'F');
  doc.triangle(x + 1.2, y - 5.8, x + 2.2, y - 6.8, x + 2.8, y - 5.8, 'F');
  doc.triangle(x + 4.2, y - 5.8, x + 4.8, y - 6.8, x + 5.8, y - 5.8, 'F');
  doc.restoreGraphicsState();
}

function drawLinkedinIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setFillColor(...textDark);
  doc.roundedRect(x, y - 7, 7.5, 7.5, 1.2, 1.2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.text('in', x + 3.75, y - 1.5, { align: 'center' });
  doc.restoreGraphicsState();
}

function drawEmailIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setDrawColor(...textDark);
  doc.setLineWidth(0.75);
  doc.roundedRect(x, y - 6.5, 8.5, 6, 0.8, 0.8, 'S');
  doc.line(x, y - 6.5, x + 4.25, y - 2.8);
  doc.line(x + 8.5, y - 6.5, x + 4.25, y - 2.8);
  doc.restoreGraphicsState();
}

function drawLeetcodeIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  doc.text('</>', x, y);
  doc.restoreGraphicsState();
}

function drawExternalLinkIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setDrawColor(...textDark);
  doc.setLineWidth(0.65);
  doc.rect(x, y - 5, 4.5, 4.5, 'S');
  doc.line(x + 2.5, y - 6.5, x + 6, y - 6.5);
  doc.line(x + 6, y - 6.5, x + 6, y - 3);
  doc.line(x + 2.5, y - 3, x + 5.8, y - 6.3);
  doc.restoreGraphicsState();
}

function drawFigmaIcon(doc, x, y) {
  doc.saveGraphicsState();
  doc.setFillColor(...textDark);
  doc.roundedRect(x, y - 6.5, 2.5, 2.5, 0.8, 0.8, 'F');
  doc.roundedRect(x + 2.8, y - 6.5, 2.5, 2.5, 0.8, 0.8, 'F');
  doc.roundedRect(x, y - 3.8, 2.5, 2.5, 0.8, 0.8, 'F');
  doc.circle(x + 4.05, y - 2.55, 1.25, 'F');
  doc.roundedRect(x, y - 1.1, 2.5, 2.5, 0.8, 0.8, 'F');
  doc.restoreGraphicsState();
}

// Contact Row 1 with Vector Icons
y += 14;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);

const itemsRow1 = [
  { icon: drawPhoneIcon, iconW: 6, text: '+91 8076522382', link: 'tel:+918076522382' },
  { icon: drawGithubIcon, iconW: 7, text: 'satyajit97531', link: 'https://github.com/satyajit97531' },
  { icon: drawLinkedinIcon, iconW: 7.5, text: 'satyajit-samanta-07a461385', link: 'https://linkedin.com/in/satyajit-samanta-07a461385' },
  { icon: drawEmailIcon, iconW: 8.5, text: 'satyajit97531@gmail.com', link: 'mailto:satyajit97531@gmail.com' },
];

const gap = 13;
const spaceAfterIcon = 3.5;
let totalW = 0;
itemsRow1.forEach((item, i) => {
  item.textW = doc.getTextWidth(item.text);
  item.itemW = item.iconW + spaceAfterIcon + item.textW;
  totalW += item.itemW;
  if (i > 0) totalW += gap;
});

let curX = (pageWidth - totalW) / 2;
itemsRow1.forEach((item) => {
  item.icon(doc, curX, y);
  curX += item.iconW + spaceAfterIcon;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  doc.text(item.text, curX, y);
  if (item.link) {
    doc.link(curX, y - 7, item.textW, 9, { url: item.link });
  }
  curX += item.textW + gap;
});

// Contact Row 2 with LeetCode
y += 12;
const leetcodeText = 'LeetCode: satyajitzzzzz (50+ Solved: 30E/15M/5H)';
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
const lcTextW = doc.getTextWidth(leetcodeText);
const lcIconW = 12;
const lcTotalW = lcIconW + spaceAfterIcon + lcTextW;
const lcX = (pageWidth - lcTotalW) / 2;
drawLeetcodeIcon(doc, lcX, y);
doc.setTextColor(...textDark);
doc.text(leetcodeText, lcX + lcIconW + spaceAfterIcon, y);
doc.link(lcX, y - 7, lcTotalW, 9, { url: 'https://leetcode.com/u/satyajitzzzzz' });

// Top Horizontal Divider
y += 10;
doc.setDrawColor(...headerLineColor);
doc.setLineWidth(1.0);
doc.line(margin, y, pageWidth - margin, y);
y += 15;

// Section Header Function with Underline across the page
function drawSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text(title.toUpperCase(), margin, y);
  y += 3.5;
  doc.setDrawColor(...headerLineColor);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 11;
}

// 1. CAREER OBJECTIVE
drawSectionHeader('Career Objective');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
const objText = 'Motivated B.Tech Computer Science student with a strong foundation in Full Stack Development (MERN, Next.js), Ollama AI Integration, and iOS app development. Seeking an engineering or internship opportunity to build scalable, secure, and user-centric web & mobile solutions.';
const splitObj = doc.splitTextToSize(objText, contentWidth);
doc.text(splitObj, margin, y);
y += splitObj.length * 11 + 6;

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
doc.setFont('helvetica', 'italic');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Maharshi Dayanand University (MDU), Haryana', margin, y);

y += 10.5;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Semester: 7th | University Roll No: 23DGITM425', margin + 4, y);
y += 10.5;
doc.text('• Core Subjects: Data Structures & Algorithms, Object-Oriented Programming, DBMS, OS, Computer Networks.', margin + 4, y);

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
doc.setFont('helvetica', 'italic');
doc.setFontSize(8.5);
doc.setTextColor(...textMuted);
doc.text('Vinay Nagar Senior Secondary School, New Delhi', margin, y);

y += 10.5;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Science Stream (Physics, Chemistry, Mathematics, Computer Science Fundamentals).', margin + 4, y);
y += 16;

// 3. TECHNICAL SKILLS & PROBLEM SOLVING
drawSectionHeader('Technical Skills & Problem Solving');

function printSkillItem(category, details) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text('• ' + category + ':', margin + 4, y);

  const prefix = '• ' + category + ': ';
  const prefixWidth = doc.getTextWidth(prefix);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  const remainingWidth = contentWidth - prefixWidth - 4;
  const lines = doc.splitTextToSize(details, remainingWidth);
  doc.text(lines, margin + 4 + prefixWidth, y);
  y += lines.length > 1 ? (lines.length * 11 + 2) : 11.5;
}

printSkillItem('Full-Stack', 'Next.js (App Router, SSR), React 19, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Tailwind CSS');
printSkillItem('Mobile & AI', 'Swift, Xcode, iOS SDK (MVC, AutoLayout), Local Ollama AI (Llama, Mistral), JWT Authentication');
printSkillItem('Problem Solving', 'LeetCode (@satyajitzzzzz, 50+ Solved: 30E/15M/5H), DSA Intermediate');
printSkillItem('Tools & Design', 'Figma UI/UX Prototyping, Git, GitHub, VS Code, Postman, Leaflet Maps, REST APIs');

y += 5;

// 4. TECHNICAL PROJECTS
drawSectionHeader('Technical Projects');

// Project 1: Service Portal
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Service Portal Application (Major Project)', margin, y);
const p1TitleW = doc.getTextWidth('Service Portal Application (Major Project)');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text(' | MERN Stack + Local Ollama AI', margin + p1TitleW, y);

const p1Link = 'github.com/satyajit97531/Service_Portal';
const p1LinkW = doc.getTextWidth(p1Link);
const p1LinkX = pageWidth - margin - p1LinkW;
drawExternalLinkIcon(doc, p1LinkX - 8, y);
doc.text(p1Link, p1LinkX, y);
doc.link(p1LinkX - 8, y - 7, p1LinkW + 8, 9, { url: 'https://github.com/satyajit97531/Service_Portal' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Architected full-stack portal with on-premise Ollama AI trained/conditioned with 45+ medical Q&A pairs.', margin + 4, y);
y += 10.5;
doc.text('• Modeled 5 MongoDB document schemas managing 60+ synthetic biometric telemetry records & vital trend histories.', margin + 4, y);
y += 10.5;
doc.text('• Implemented secure JWT authentication and sub-80ms queries with 0% external cloud data leakage or API fees.', margin + 4, y);

y += 13;
// Project 2: Games 24
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Games 24 (Minor Project)', margin, y);
const p2TitleW = doc.getTextWidth('Games 24 (Minor Project)');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text(' | High-Fidelity Game Storefront Platform (Figma UI/UX)', margin + p2TitleW, y);

const p2Tag = 'Figma UI/UX & Prototyping';
const p2TagW = doc.getTextWidth(p2Tag);
const p2TagX = pageWidth - margin - p2TagW;
drawFigmaIcon(doc, p2TagX - 8, y);
doc.text(p2Tag, p2TagX, y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Designed high-fidelity storefront modeling 40+ game title catalog items, 12 genre taxonomies, and 35+ design tokens.', margin + 4, y);
y += 10.5;
doc.text('• Engineered 20+ atomic UI components and tested an interactive 10+ screen prototype with a frictionless 2-step checkout flow.', margin + 4, y);

y += 13;
// Project 3: Medi_Map
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('Medi_Map', margin, y);
const p3TitleW = doc.getTextWidth('Medi_Map');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text(' | Geospatial Clinic & Emergency Navigation | React, Leaflet, Node.js', margin + p3TitleW, y);

const p3Link = 'github.com/satyajit97531/Medi_Map';
const p3LinkW = doc.getTextWidth(p3Link);
const p3LinkX = pageWidth - margin - p3LinkW;
drawExternalLinkIcon(doc, p3LinkX - 8, y);
doc.text(p3Link, p3LinkX, y);
doc.link(p3LinkX - 8, y - 7, p3LinkW + 8, 9, { url: 'https://github.com/satyajit97531/Medi_Map' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Constructed geospatial data model indexing 50+ verified clinic coordinates and 25+ emergency centers across 12 specialties.', margin + 4, y);

y += 13;
// Project 4: AuraSpace & Product_Store
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('AuraSpace & Product_Store', margin, y);
const p4TitleW = doc.getTextWidth('AuraSpace & Product_Store');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text(' | TypeScript, React 19, Express.js, Tailwind CSS', margin + p4TitleW, y);

const p4Link = 'github.com/satyajit97531/AuraSpace';
const p4LinkW = doc.getTextWidth(p4Link);
const p4LinkX = pageWidth - margin - p4LinkW;
drawExternalLinkIcon(doc, p4LinkX - 8, y);
doc.text(p4Link, p4LinkX, y);
doc.link(p4LinkX - 8, y - 7, p4LinkW + 8, 9, { url: 'https://github.com/satyajit97531/AuraSpace' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text('• Engineered TypeScript workspace models managing 50+ document nodes and Product_Store catalog with 45+ SKU records.', margin + 4, y);

y += 16;

// 5. INDUSTRY TRAINING & CERTIFICATIONS
drawSectionHeader('Industry Training & Certifications');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text('iOS Application Development Certification', margin, y);
const certTitleW = doc.getTextWidth('iOS Application Development Certification');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
doc.text(' | SKLZ TECT LLP (sklztect.com)', margin + certTitleW, y);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...primaryColor);
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
doc.text('• Completed intensive 8-week corporate training in native iOS development using Swift and Xcode.', margin + 4, y);
y += 10.5;
doc.text('• Built responsive iOS view hierarchies conforming to Apple Human Interface Guidelines and MVC architectural patterns.', margin + 4, y);

// Ensure public directory exists and write file
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Satyajit_Samanta_Resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log('PDF generated successfully at:', outputPath, 'Size:', fs.statSync(outputPath).size, 'bytes', 'Total Height used:', y, 'pt out of', pageHeight, 'pt');

