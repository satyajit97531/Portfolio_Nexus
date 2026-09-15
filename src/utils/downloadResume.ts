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

  // Clean top margin without purple accent bar
  let y = 44;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text(profileData.name.toUpperCase(), margin, y);

  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(79, 70, 229);
  doc.text('B.Tech in Computer Science & Engineering | Full-Stack & iOS Developer', margin, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Delhi Global Institute of Technology (DGIT) / MERI · Maharshi Dayanand University (MDU) | Roll: 23DGITM425', margin, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(`${profileData.phone}  |  ${profileData.email}  |  ${profileData.location}  |  github.com/satyajit97531`, margin, y);

  y += 10;
  doc.setTextColor(79, 70, 229);
  doc.text('LeetCode: leetcode.com/u/satyajitzzzzz (50+ Solved: 30E/15M/5H)  |  Codeforces: codeforces.com/profile/satyajitzzz (35+ Solved: Greedy & Implementation)', margin, y);

  y += 12;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  const addHeading = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(79, 70, 229);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + doc.getTextWidth(title.toUpperCase()) + 15, y);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin + doc.getTextWidth(title.toUpperCase()) + 15, y, pageWidth - margin, y);
    y += 10;
  };

  // Career Objective
  addHeading('Career Objective');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  const obj = 'Motivated B.Tech Computer Science student with a strong foundation in Full Stack Development (MERN, Next.js), Ollama AI integration, and iOS app development. Seeking an engineering or internship opportunity to build scalable, secure, and user-centric web & mobile solutions.';
  const splitObj = doc.splitTextToSize(obj, contentWidth);
  doc.text(splitObj, margin, y);
  y += splitObj.length * 10 + 6;

  // Education
  addHeading('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('Bachelor of Technology (B.Tech) - Computer Science & Engineering', margin, y);
  doc.setTextColor(79, 70, 229);
  doc.text('2023 - 2027 (7th Sem)', pageWidth - margin - doc.getTextWidth('2023 - 2027 (7th Sem)'), y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Delhi Global Institute of Technology (DGIT) / MERI · Maharshi Dayanand University (MDU) | Roll: 23DGITM425', margin, y);
  y += 9;
  doc.setTextColor(30, 41, 59);
  doc.text('• Core Coursework: Data Structures & Algorithms, OOP, Database Systems, Computer Networks, Operating Systems.', margin + 6, y);
  y += 14;

  // Projects
  addHeading('Key Technical Projects');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Service Portal Application (Major Project) | MERN Stack + Local Ollama AI', margin, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('• Diagnostic healthcare web platform with private local AI consultations via Ollama (Llama/Mistral) & zero external API telemetry.', margin + 6, y);
  y += 9;
  doc.text('• Implemented secure JWT auth, MongoDB document clustering, and interactive biometric vitals & BMI tracking.', margin + 6, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Games 24 (Minor Project) | High-Fidelity Game Storefront Platform (Figma UI/UX)', margin, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('• Designed an immersive dark-mode digital gaming distribution storefront with 2-step checkout flow & atomic component library.', margin + 6, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Medi_Map & AuraSpace | React, Leaflet Maps, TypeScript, Express.js', margin, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('• Real-time geospatial hospital/clinic routing with Leaflet, plus collaborative workspace management with full REST APIs.', margin + 6, y);
  y += 14;

  // Certifications
  addHeading('Industry Training & Certifications');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('iOS Application Development Certification | SKLZ TECT LLP (sklztect.com)', margin, y);
  doc.setTextColor(79, 70, 229);
  doc.text('8 Weeks (June - Aug 2024)', pageWidth - margin - doc.getTextWidth('8 Weeks (June - Aug 2024)'), y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Conducted at MERI New Delhi | Credential ID: SKLZ-TECT-IOS-2024-SAMANTA', margin, y);
  y += 9;
  doc.setTextColor(30, 41, 59);
  doc.text('• Specialized training in Swift, Xcode, iOS SDK, UIKit AutoLayout, and Apple Human Interface Guidelines.', margin + 6, y);
  y += 14;

  // Skills
  addHeading('Technical Skills');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Full-Stack: Next.js (App Router, SSR), React 19, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Tailwind CSS', margin, y);
  y += 10;
  doc.text('Mobile & AI: iOS Development (Swift, Xcode, UIKit), Local Ollama AI (Llama, Mistral), JWT Authentication', margin, y);
  y += 10;
  doc.text('Problem Solving: LeetCode (50+ Solved: 30 Easy, 15 Med, 5 Hard, @satyajitzzzzz), Codeforces (35+ Solved: Greedy & Implementation, @satyajitzzz)', margin, y);
  y += 10;
  doc.text('Tools: Figma UI/UX Prototyping, Git, GitHub, VS Code, Postman, Leaflet Maps', margin, y);

  doc.save('Satyajit_Samanta_Resume.pdf');
}

/**
 * Downloads the source code zip bundle
 */
export async function triggerSourceCodeDownload(): Promise<void> {
  const timestamp = Date.now();
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
