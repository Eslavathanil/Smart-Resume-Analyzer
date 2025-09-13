# Smart Resume Analyzer

A simple project to upload resumes, extract key information, and get AI-powered feedback and upskill suggestions.

---

## Assignment Brief

- **Frontend (React):**  
  UI with two tabs  
  1. Upload a new resume and display extracted information, resume rating, improvement areas, and upskill suggestions.  
  2. Show all previously uploaded resumes (from DB) in a table with a Details button that opens a modal showing the full extracted content.

- **Backend (Python – Flask/FastAPI/Django):**  
  - Accept resume upload (PDF/DOCX).  
  - Extract as much structured data as possible (skills, work experience, education, projects, certifications, contact info, links, languages, etc.).  
  - Store extracted data in a database (SQLite by default, can switch to Postgres).  
  - Use Gemini free tier APIs with LangChain to analyze the resume:
    - Suggest improvements.
    - Recommend additional skills to learn/upskill.
  - Return all data in JSON.

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Python (FastAPI / Flask / Django)  
- **Database:** SQLite (default)  
- **LLM:** Gemini free tier APIs via LangChain  

---

## API Output Example

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "core_skills": ["java", "react"],
  "soft_skills": ["hardworking", "team player"],
  "resume_rating": 8,
  "improvement_areas": "Add measurable achievements to work experience.",

  "upskill_suggestions": "Learn Docker, Kubernetes for deployment readiness."
}

**## Refresh GitHub**

Go to https://github.com/Eslavathanil/Smart-Resume-Analyzer
 in your browser.
Your new README.md will now appear automatically on the repository front page.

**Uploading through GitHub web UI** 

If you don’t want to use the terminal:

Open your repo page on GitHub.

**Click Add file **→ Upload files.

Drag-drop your README.md.

Scroll down, enter a commit message, and click Commit changes.

That’s it — your README.md is live on GitHub.
