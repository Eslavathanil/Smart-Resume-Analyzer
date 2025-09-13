# Smart Resume Analyzer

A simple project to upload resumes, extract key information, and get AI-powered feedback and upskill suggestions.

## UI Preview

### Upload Resume Tab

![Upload Resume Tab](screenshots/upload-tab.png)

This screen allows users to upload a resume (PDF/DOCX). After uploading, resume is processed to extract data and analyzed by LLM for improvement suggestions.
# Smart Resume Analyzer

**Live Demo:** [https://smartairesume.netlify.app/](https://smartairesume.netlify.app/)


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


## Tech Stack

- **Frontend:** React  
- **Backend:** Python (FastAPI / Flask / Django)  
- **Database:** SQLite (default)  
- **LLM:** Gemini free tier APIs via LangChain  


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



