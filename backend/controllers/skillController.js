import pdf from "pdf-parse-debugging-disabled";
import mammoth from "mammoth";

const SKILL_KEYWORDS = [
  "JavaScript", "React", "Node.js", "Express", "MongoDB", "Python",
  "Django", "Flask", "HTML", "CSS", "TypeScript", "Next.js", "AWS",
  "SQL", "GraphQL", "REST", "Docker", "Kubernetes", "C++", "Java",
];

const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text || "";
  } catch (err) {
    console.error("PDF parse error:", err);
    throw new Error("Failed to extract text from PDF");
  }
};

export const extractSkillsFromResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const { buffer, originalname, mimetype } = req.file;
    let text = "";

    if (mimetype === "application/pdf" || originalname.toLowerCase().endsWith(".pdf")) {
      text = await extractTextFromPDF(buffer);

    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      originalname.toLowerCase().endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;

    } else {
      return res.status(400).json({ message: "Unsupported file type. Use PDF or DOCX." });
    }

    const lowerText = text.toLowerCase();

    const extractedSkills = SKILL_KEYWORDS.filter(skill =>
      lowerText.includes(skill.toLowerCase())
    );

    return res.status(200).json({ skills: [...new Set(extractedSkills)] });

  } catch (err) {
    console.error("Skill extraction error:", err);
    return res.status(500).json({ message: "Error parsing resume" });
  }
};
