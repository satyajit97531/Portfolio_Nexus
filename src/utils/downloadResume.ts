/**
 * Utilities for direct client-side resume (PDF/HTML) and project source code downloading
 */
import { jsPDF } from 'jspdf';
import { profileData } from '../data/portfolioData';

/**
 * Downloads the official CV in PDF format
 */
export async function triggerResumeDownload(): Promise<void> {
  try {
    // Attempt to download the high-quality pre-rendered PDF directly with cache busting
    const timestamp = Date.now();
    const response = await fetch(`/Satyajit_Samanta_Resume.pdf?t=${timestamp}`, {
      cache: 'no-store'
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Satyajit_Samanta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
      return;
    }
  } catch (err) {
    console.warn('Direct PDF fetch failed, generating client-side PDF fallback...', err);
  }

  // Fallback: Generate the PDF on the client using jsPDF
  generateClientSidePdf();
}

/**
 * Fallback client-side generator in case the static asset cannot be fetched
 */
export function generateClientSidePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  const primaryColor = [15, 23, 42] as const;
  const textDark = [24, 30, 42] as const;
  const textMuted = [80, 95, 115] as const;
  const headerLineColor = [40, 50, 65] as const;

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
  const drawSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...primaryColor);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(...headerLineColor);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;
  };

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

  const printSkillItem = (category: string, details: string) => {
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
  };

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

  doc.save('Satyajit_Samanta_Resume.pdf');
}

/**
 * Downloads the source code zip bundle
 */
export async function triggerSourceCodeDownload(): Promise<void> {
  const timestamp = Date.now();
  try {
    // Attempt to download via API endpoint first, which sets optimal attachment headers and checks both public and dist
    const apiResponse = await fetch(`/api/download-project-zip?t=${timestamp}`, {
      cache: 'no-store'
    });
    if (apiResponse.ok) {
      const blob = await apiResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'satyajit-samanta-portfolio.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
      return;
    }
  } catch (err) {
    console.warn('API zip download failed, trying static asset...', err);
  }

  try {
    const response = await fetch(`/satyajit-samanta-portfolio.zip?t=${timestamp}`, {
      cache: 'no-store'
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'satyajit-samanta-portfolio.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
      return;
    }
  } catch (err) {
    console.warn('Direct zip fetch failed, falling back to direct link', err);
  }

  const link = document.createElement('a');
  link.href = `/satyajit-samanta-portfolio.zip?t=${timestamp}`;
  link.download = 'satyajit-samanta-portfolio.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
