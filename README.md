<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 🚀 AI Resume Rewrite & Preview Platform

An AI-powered backend system that rewrites resumes, converts them into structured JSON, and generates real-time HTML previews using customizable themes. This project demonstrates strong backend architecture, API design, and data transformation skills.

## 📌 Project Overview

This platform helps users:
* Upload their resume
* Rewrite and optimize it using AI
* Convert unstructured resume content into structured JSON
* Generate dynamic HTML previews with multiple themes
* Ensure scalable and clean backend architecture

This project was built to showcase backend engineering, API integrations, and system design capabilities.

## 🧠 Key Features

✅ AI-based resume rewriting
✅ Resume parsing and normalization
✅ Conversion to standardized JSON resume schema
✅ Dynamic HTML generation
✅ Theme-based resume preview
✅ Secure API architecture
✅ Scalable backend design
✅ Modular and maintainable code

## 🏗️ System Architecture

1. User uploads a resume and selects the feature
2. Backend processes based on the feature that was redirected to the respective API and uses AI
3. Resume content converted into structured JSON
4. JSON passed to resume CLI
5. HTML preview generated
6. Frontend displays preview

## ⚙️ Tech Stack

### Backend

* Node.js
* NestJS
* TypeScript
* REST APIs
* Handlebars

### AI & Processing

* Gemini
* Resume parsing
* JSON transformation

## 📂 Folder Structure

```
src
 ├── resume
 │   ├── controller
 │   ├── service
 │   └── helper
 └── script
     ├── generateHTML.ts
     └── generatePdf.ts
```
## 🔄 Resume Processing Flow

### Step 1: Resume Upload

User uploads resume file or pastes content.

### Step 2: AI Rewrite

AI enhances:

* Summary
* Skills
* Experience
* Achievements

### Step 3: Data Structuring

Content is mapped into a standardized resume JSON format.

### Step 4: HTML Generation

Resume CLI generates theme-based HTML.

### Step 5: Preview API

Frontend fetches the preview using a secure API.

## 🔐 Security Considerations

* Input validation
* Secure API handling
* Sanitized HTML preview
* Protection against injection attacks

## 🚀 How to Run Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Configure environment variables

Create `.env` file:

```
GEMINI_API_KEY=your_key
```

### 4️⃣ Run the application

```
npm run start:dev
```
