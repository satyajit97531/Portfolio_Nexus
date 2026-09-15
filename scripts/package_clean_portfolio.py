import os
import shutil
import zipfile

def create_clean_portfolio_zip():
    project_root = os.path.abspath('.')
    temp_dir = os.path.abspath('dist_package_temp')
    target_folder_name = 'satyajit-samanta-portfolio'
    bundle_dir = os.path.join(temp_dir, target_folder_name)
    public_dir = os.path.join(project_root, 'public')
    zip_dest = os.path.join(public_dir, 'satyajit-samanta-portfolio.zip')

    # Clean up previous temp
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(bundle_dir, exist_ok=True)

    # 1. Copy required files and folders from workspace root
    files_to_copy = [
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'index.html',
        'metadata.json'
    ]

    for f in files_to_copy:
        src = os.path.join(project_root, f)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(bundle_dir, f))

    # Copy src/ completely
    shutil.copytree(
        os.path.join(project_root, 'src'),
        os.path.join(bundle_dir, 'src'),
        ignore=shutil.ignore_patterns('*.tmp', '*.bak', '.DS_Store')
    )

    # Copy public/ completely, BUT STRICTLY EXCLUDE ANY .ZIP FILES
    os.makedirs(os.path.join(bundle_dir, 'public'), exist_ok=True)
    for root, dirs, files in os.walk(public_dir):
        rel = os.path.relpath(root, public_dir)
        dest_subdir = os.path.join(bundle_dir, 'public', rel) if rel != '.' else os.path.join(bundle_dir, 'public')
        os.makedirs(dest_subdir, exist_ok=True)
        for f in files:
            if f.endswith('.zip') or f.startswith('.'):
                continue
            shutil.copy2(os.path.join(root, f), os.path.join(dest_subdir, f))

    # Create a helpful README.md for the user extracting the portfolio
    readme_content = """# Satyajit Samanta - Portfolio Nexus

Full-Stack Developer | MERN & Local AI Systems | iOS Developer
B.Tech Computer Science & Engineering · Roll No: 23DGITM425
Delhi Global Institute of Technology (DGIT) · Maharshi Dayanand University (MDU)

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Open terminal inside this folder:
   ```bash
   cd satyajit-samanta-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## 🛠️ Tech Stack & Features
- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion
- **3D Interactive Graphics**: Three.js Orbital Canvas with soft blurred celestial rings
- **Local AI Integration**: Ollama LLM integration architecture (Llama/Mistral)
- **Mobile Development**: Native iOS Architecture & Swift
- **Design System**: Atomic UI components engineered in Figma
- **Competitive Profiles**: LeetCode (@satyajitzzzzz) & Codeforces (@satyajitzzz)
- **Resume Included**:
  - `public/Satyajit_Samanta_Resume.pdf` (Printable & Applicant-Ready PDF)
  - `public/Satyajit_Samanta_Resume.html` (Standalone HTML format)

## 👤 Contact Satyajit Samanta
- Email: satyajit97531@gmail.com
- Phone: +91 8076522382
- GitHub: https://github.com/satyajit97531
- LinkedIn: https://www.linkedin.com/in/satyajit-samanta-07a461385/
- LeetCode: https://leetcode.com/u/satyajitzzzzz/
- Codeforces: https://codeforces.com/profile/satyajitzzz
"""
    with open(os.path.join(bundle_dir, 'README.md'), 'w', encoding='utf-8') as rf:
        rf.write(readme_content)

    # 2. Build the ZIP using standard zipfile.ZIP_DEFLATED
    if os.path.exists(zip_dest):
        os.remove(zip_dest)

    print(f"Creating zip at: {zip_dest}")
    with zipfile.ZipFile(zip_dest, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for root, dirs, files in os.walk(bundle_dir):
            for file in sorted(files):
                full_path = os.path.join(root, file)
                # Archive name starting from satyajit-samanta-portfolio/...
                rel_to_temp = os.path.relpath(full_path, temp_dir)
                # Ensure forward slashes for cross-platform Windows / Mac / Linux compatibility
                arcname = rel_to_temp.replace(os.path.sep, '/')
                zf.write(full_path, arcname)

    # 3. Clean up temp folder
    shutil.rmtree(temp_dir)

    print("Zip created successfully! File size:", os.path.getsize(zip_dest), "bytes")

    # 4. Verify ZIP integrity immediately
    with zipfile.ZipFile(zip_dest, 'r') as verify_zf:
        bad_file = verify_zf.testzip()
        if bad_file:
            raise Exception(f"Corrupted file in zip: {bad_file}")
        namelist = verify_zf.namelist()
        print(f"Verification PASSED! {len(namelist)} entries in archive.")
        has_recursive_zip = any(n.endswith('.zip') for n in namelist)
        print("Contains recursive .zip?", has_recursive_zip)
        assert not has_recursive_zip, "Error: Archive must not contain any nested .zip files!"

if __name__ == '__main__':
    create_clean_portfolio_zip()
